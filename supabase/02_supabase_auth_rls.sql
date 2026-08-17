-- ═══════════════════════════════════════════════════════════════
-- ETAPA 2 — LOGIN REAL (Supabase Auth) + RLS DE VERDADE
-- Execute no Supabase: Painel → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════
--
-- CONTEXTO
-- Até agora o login era caseiro: a senha era verificada por uma função
-- no banco e a sessão ficava só no navegador. O Supabase nunca sabia
-- que alguém estava logado — toda requisição chegava como "anônima".
-- Por isso era impossível proteger os dados: não havia como distinguir
-- "usuário da equipe" de "qualquer pessoa na internet".
--
-- O QUE ESTE SCRIPT FAZ
-- Passa a exigir uma sessão autenticada de verdade (Supabase Auth) para
-- ler ou gravar qualquer dado da esteira. Depois disso, a chave pública
-- sozinha (que fica visível no código do site) deixa de dar acesso.
--
-- ⚠️ ORDEM IMPORTA: rode este script SOMENTE depois de criar os
-- usuários no Authentication → Users (instruções no final).
-- Se rodar antes, o site para de carregar dados até você criar os
-- usuários e fazer login.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. esteira_data — o coração dos dados (projetos, tarefas, etc.) ──
alter table public.esteira_data enable row level security;

-- Remove qualquer política antiga, se existir (idempotente)
drop policy if exists "leitura_autenticada"   on public.esteira_data;
drop policy if exists "escrita_autenticada"   on public.esteira_data;
drop policy if exists "update_autenticado"    on public.esteira_data;
drop policy if exists "delete_autenticado"    on public.esteira_data;

-- Só quem tem sessão autenticada acessa
create policy "leitura_autenticada" on public.esteira_data
  for select to authenticated using (true);

create policy "escrita_autenticada" on public.esteira_data
  for insert to authenticated with check (true);

create policy "update_autenticado" on public.esteira_data
  for update to authenticated using (true) with check (true);

-- DELETE fica bloqueado para todos, inclusive autenticados.
-- O app nunca precisa apagar linhas aqui (usa upsert), então bloquear
-- elimina o risco de alguém zerar a base — mesmo por acidente.
-- (nenhuma policy de delete criada = ninguém apaga)

-- Garante que anônimo não tem nada
revoke all on public.esteira_data from anon;
grant select, insert, update on public.esteira_data to authenticated;

-- ── 2. activity_logs — histórico de quem fez o quê ──
alter table public.activity_logs enable row level security;

drop policy if exists "logs_leitura"  on public.activity_logs;
drop policy if exists "logs_escrita"  on public.activity_logs;

create policy "logs_leitura" on public.activity_logs
  for select to authenticated using (true);

create policy "logs_escrita" on public.activity_logs
  for insert to authenticated with check (true);

revoke all on public.activity_logs from anon;
grant select, insert on public.activity_logs to authenticated;

-- ── 3. app_users — não é mais usada para login ──
-- O Supabase Auth passa a ser a fonte de verdade das credenciais.
-- A tabela é mantida (histórico), mas as funções de login antigas são
-- removidas para não existirem dois caminhos de autenticação.
drop function if exists public.login_user(text, text);
drop function if exists public.register_user(text, text, text);
drop function if exists public.update_last_login(text);
drop function if exists public.update_last_login(uuid);

-- ═══════════════════════════════════════════════════════════════
-- PASSO A PASSO (faça na ordem)
--
-- 1) ANTES de rodar este script, crie os usuários:
--    Painel do Supabase → Authentication → Users → "Add user"
--      → "Create new user"
--      → E-mail + senha (marque "Auto Confirm User")
--    Crie ao menos:
--      • bruno.granito@valemobi.com.br
--      • lunardi.tec@gmail.com   (Daniel)
--    Use senhas novas — as antigas ficaram expostas no passado.
--
-- 2) Rode este script (botão Run).
--
-- 3) Confirme que fechou: o comando abaixo, rodado de fora com a
--    chave pública, deve passar a responder 401 em vez de 200:
--      GET /rest/v1/esteira_data?select=id
--
-- 4) Abra o site e faça login com o e-mail/senha criados no passo 1.
--
-- SE ALGO DER ERRADO (site sem carregar dados):
--    Rode isto para voltar ao estado anterior temporariamente:
--      alter table public.esteira_data disable row level security;
--      alter table public.activity_logs disable row level security;
--    e me avise para eu investigar.
-- ═══════════════════════════════════════════════════════════════
