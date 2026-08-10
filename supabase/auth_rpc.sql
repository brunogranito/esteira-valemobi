-- ═══════════════════════════════════════════════════════════════
-- CORREÇÃO DE SEGURANÇA — Esteira Valemobi
-- Execute este script no Supabase: Painel → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════
-- Problema corrigido: a tabela app_users estava acessível via chave
-- pública (anon key), permitindo que qualquer pessoa lesse o hash de
-- senha de todos os usuários diretamente pela API REST.
--
-- Solução: bloqueia o acesso direto à tabela para a chave pública e
-- move a verificação de login/registro para dentro do banco, via
-- funções RPC (SECURITY DEFINER). O hash de senha nunca mais trafega
-- para o navegador.
-- ═══════════════════════════════════════════════════════════════

-- 1) Habilita Row Level Security na tabela de usuários
alter table public.app_users enable row level security;

-- 2) Remove qualquer acesso direto que a chave pública (anon) tinha
revoke select, insert, update, delete on public.app_users from anon;
revoke select, insert, update, delete on public.app_users from authenticated;

-- (Nenhuma policy é criada de propósito — sem policy + RLS habilitado
--  = ninguém acessa a tabela diretamente, só via as funções abaixo)

-- 3) Função de LOGIN: recebe e-mail + hash da senha, retorna o usuário
--    SOMENTE se o hash bater. Roda com privilégio do dono (SECURITY
--    DEFINER), então consegue ler a tabela mesmo com RLS ativo.
create or replace function public.login_user(p_email text, p_hash text)
returns table(id uuid, email text, name text, role text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select u.id, u.email, u.name, u.role
  from app_users u
  where u.email = lower(p_email) and u.password_hash = p_hash;
end;
$$;

revoke all on function public.login_user(text, text) from public;
grant execute on function public.login_user(text, text) to anon;

-- 4) Função de REGISTRO: cria o usuário se o e-mail ainda não existir.
--    Lança uma exceção 'EMAIL_EXISTS' se já houver conta com esse e-mail.
create or replace function public.register_user(p_email text, p_name text, p_hash text)
returns table(id uuid, email text, name text, role text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (select 1 from app_users where email = lower(p_email)) then
    raise exception 'EMAIL_EXISTS';
  end if;

  return query
  insert into app_users(email, name, password_hash, role)
  values (lower(p_email), p_name, p_hash, 'user')
  returning app_users.id, app_users.email, app_users.name, app_users.role;
end;
$$;

revoke all on function public.register_user(text, text, text) from public;
grant execute on function public.register_user(text, text, text) to anon;

-- 5) Função para atualizar o último login (sem precisar de UPDATE direto)
create or replace function public.update_last_login(p_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update app_users set last_login = now() where id = p_id;
$$;

revoke all on function public.update_last_login(uuid) from public;
grant execute on function public.update_last_login(uuid) to anon;

-- ═══════════════════════════════════════════════════════════════
-- IMPORTANTE — depois de rodar este script:
--
-- 1. Todas as senhas atuais foram expostas publicamente (confirmado
--    em teste). Recomenda-se fortemente pedir que todos os usuários
--    troquem de senha assim que possível, já que o hash antigo
--    (SHA-256 sem salt) pode ter sido capturado por terceiros.
--
-- 2. Este script não impede leitura de OUTRAS tabelas do projeto.
--    Se você tiver mais tabelas sensíveis além de app_users e
--    esteira_data, revise o RLS delas também.
-- ═══════════════════════════════════════════════════════════════
