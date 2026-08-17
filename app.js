/* Esteira Valemobi — RV · lógica da aplicação
   Extraído de index.html na v2.2 para facilitar manutenção. */
/* ── CONSTANTS ──────────────────────────────────────── */
const STAGES=[
  {id:"aguardando",label:"Ag. Aprovação de Horas",icon:"⏳",color:"#C77A3D"},
  {id:"escopo",    label:"Escopo",                icon:"📋",color:"#7A9B6B"},
  {id:"descoberta",label:"Descob./Refin.",icon:"🔍",color:"#5FA8B0"},
  {id:"dev",       label:"Dev",        icon:"⚙️",color:"#D9A94A"},
  {id:"qa",        label:"QA",         icon:"✅",color:"#C24F4F"},
  {id:"prerdm",    label:"Pré-RDM",    icon:"🎯",color:"#C24F6E"},
  {id:"homolog",   label:"Homologação",icon:"🏠",color:"#4A7FB0"},
  {id:"rdm",       label:"RDM",        icon:"🚀",color:"#8067B0"},
  {id:"posrdm",    label:"Pós-RDM",   icon:"📊",color:"#6B6BB0"},
];
const PRIO={
  urgent:{icon:"🔴",label:"Urgente"},
  high:  {icon:"🟠",label:"Alta"},
  normal:{icon:"🟡",label:"Normal"},
  low:   {icon:"🟢",label:"Baixa"},
};
const TFS="https://azuredevops.mca.corp/tfs/TeamDDSProjectCollection/Agora.DevOps/_release?_a=releases&view=mine&definitionId=1105";
const RITM="https://wwwcasb.itbm.bancobradescosa.myshn.net/track?id=aiops_home";
const RITM_C="https://wwwcasb.itbm.bancobradescosa.myshn.net/now/nav/ui/classic/params/target/%24pa_dashboards_overview.do%3Fsysparm_border%3Dtrue";

/* ── CHECKLISTS ─────────────────────────────────────── */
const CL={
  escopo:[
    {s:"Recebimento e Análise",t:[
      {id:"e1",tx:"Receber documento preliminar de escopo da Ágora/Bradesco ou Diretoria Valemobi"},
      {id:"e2",tx:"Analisar e julgar alinhamento com plataformas existentes Valemobi"},
      {id:"e3",tx:"Desenhar escopo inicial, macrovisão da demanda"},
      {id:"e4",tx:"Realizar benchmark com plataformas externas"},
    ]},
    {s:"Formalização do Escopo",t:[
      {id:"e5",tx:"Revisão da US Preliminar"},
    ]},
  ],
  aguardando:[
    {s:"Estimativa de Horas",t:[
      {id:"ag1",tx:"Estabelecer quantidade de horas com a equipe de Dev"},
      {id:"ag2",tx:"Estabelecer quantidade de horas com a equipe de QA"},
      {id:"ag3",tx:"Enviar estimativa de horas para aprovação do PO e Negócios da Ágora/Bradesco"},
    ]},
    {s:"Aguardando Retorno",t:[
      {id:"ag4",tx:"Acompanhar retorno da Ágora/Bradesco sobre a aprovação da estimativa de horas"},
      {id:"ag5",tx:"Avançar para Descoberta/Refinamento com aprovação em mãos"},
    ]},
  ],
  descoberta:[
    {s:"User Stories",t:[
      {id:"d1",tx:"Marcar agenda de Descoberta/Refinamento das USs"},
      {id:"d2",tx:"Enviar USs finais para aprovação Ágora/Bradesco"},
      {id:"d3",tx:"Registrar recebimento de aprovação formal das USs"},
    ]},
    {s:"Jira e Confluence",t:[
      {id:"d4",tx:"Abrir Épico no Jira (BAPG ou BAPD)"},
      {id:"d5",tx:"Incluir as USs no Confluence e vincular à task"},
      {id:"d6",tx:"Direcionar demanda para um Dev produzir"},
      {id:"d7",tx:"Incluir estimativa de horas de PO e QA nos comentários"},
    ]},
    {s:"Encaminhamento para Dev",t:[
      {id:"d8",tx:"Alinhar cronograma e prazo de entrega com o Dev responsável"},
      {id:"d9",tx:"Registrar início do desenvolvimento no Jira"},
    ]},
  ],
  dev:[
    {s:"Acompanhamento",t:[
      {id:"v1",tx:"Acompanhar evolução dos status da task e progresso no Jira"},
      {id:"v2",tx:"Checar com o Dev se a demanda já subiu para os ambientes Alpha/TI"},
      {id:"v3",tx:"Verificar em Alpha/TI se o escopo está de acordo com as USs (testes preliminares)"},
      {id:"v4",tx:"Verificar se há bloqueadores impedindo o Dev de avançar"},
      {id:"v5",tx:"Dev sinaliza conclusão — liberar para QA"},
      {id:"v6",tx:"Atualizar status no Jira para 'Em QA' após conclusão do Dev"},
    ]},
  ],
  qa:[
    {s:"Testes",t:[
      {id:"q1",tx:"Direcionar demanda para equipe de QA realizar testes definitivos"},
      {id:"q2",tx:"Marcar reunião de alinhamento com o QA sobre os testes da demanda"},
      {id:"q3",tx:"Acompanhar diariamente evolução dos testes com o QA"},
      {id:"q4",tx:"Solicitar evidências ao QA sobre os testes realizados - colocar no comentário da task"},
      {id:"q5",tx:"Receber aprovação formal do QA — demanda disponível para RDM"},
    ]},
    {s:"Registro",t:[
      {id:"q6",tx:"Atualizar status da task no Jira após conclusão dos testes de QA"},
    ]},
  ],
  prerdm:[
    {s:"Agendamento e Alinhamento",t:[
      {id:"pr01",tx:"Solicitar inclusão da RDM no Quadro de RDMs da VM",
       info:"• Verificar concorrências com outras RDMs na mesma janela\n• Verificar se está dentro da janela de validação e envio do plano"},
      {id:"pr02",tx:"Criar Task de RDM no Jira e vincular à Task principal",
       info:"• Incluir print da demanda no Quadro de RDMs (comentário/anexo)\n• Vincular a Task que gerou a demanda\n• Para Melhorias: associar à Task Pai de RV no BAPG ou BAPD"},
      {id:"pr03",tx:"Levantar na Daily a possibilidade de RDM e confirmar viabilidade"},
    ]},
    {s:"Preparação do Pacote",t:[
      {id:"pr04",tx:"Solicitar empacotamento da demanda ao Dev responsável para TH"},
      {id:"pr05",tx:"Solicitar número da Build ao Dev responsável",
       links:[{n:"TFS / Azure DevOps (Builds)",u:TFS}]},
      {id:"pr06",tx:"Confirmar com Dev número/versão exato da Build antes do RITM"},
      {id:"pr07",tx:"Abrir RITM para enviar Build para ambiente TH",
       info:"CAMINHOS (Favoritos no RITM):\n→ Valemobi                 ← deploy de builds (PRINCIPAL)\n→ PostgreSQL              ← consultas e scripts\n→ Criar customizações     ← novos serviços (pouco utilizado)\n→ Bil                     ← Tesouro Direto\n→ Oracle                  ← consultas Sinacor/Bradesco\n\nCONSULTAR RITM DE OUTROS:\nPesquisar RITM > Tarefas de catálogo > Número (clicar)",
       links:[{n:"Abrir RITM",u:RITM},{n:"Consultar RITMs",u:RITM_C}]},
      {id:"pr08",tx:"Verificar que a Build de implantação está disponível em TH (TFS)",
       links:[{n:"TFS — Verificar TH",u:TFS}]},
      {id:"pr09",tx:"Comunicar equipe Ágora/Bradesco sobre disponibilidade em TH para Homologação (e-mail com evidências)"},
    ]},
  ],
  homolog:[
    {s:"Preparação para Homologação",t:[
      {id:"h1",tx:"Agendar data e horário de Homologação com equipe Ágora/Bradesco"},
      {id:"h2",tx:"Verificar Builds atualizadas disponíveis em TH (TFS)",
       links:[{n:"TFS Pipelines",u:TFS}]},
    ]},
    {s:"Homologar",t:[
      {id:"h3",tx:"Participar dos testes de Homologação junto com Ágora/Bradesco, garantindo cobertura completa da demanda"},
      {id:"h4",tx:"Solicitar retorno dos testes de homologação, com evidências em TH"},
    ]},
  ],
  rdm:[
    {s:"Preparação para a RDM",t:[
      {id:"r12",tx:"Abrir RITM de Rollback e quantidade de Pods (conforme modelo Ageu)",
       info:"• Incluir prints da RITM de Rollback no comentário da Task de RDM\n• Quando o Pod retornar vazio: verificar com o Dev antes de prosseguir",
       links:[{n:"Abrir RITM (Rollback)",u:RITM},{n:"Consultar RITMs",u:RITM_C}]},
      {id:"r15",tx:"Confirmar participação do Dev responsável para o dia da RDM"},
      {id:"r16",tx:"Verificar necessidade de participação do QA dependendo da demanda para o dia da RDM"},
    ]},
    {s:"Ficha e Plano de Implantação",t:[
      {id:"r13a",tx:"Confeccionar Ficha de Implantação",
       info:"Colocar no comentário da Task e solicitar validação do Dev responsável."},
      {id:"r13b",tx:"Confeccionar Plano de Implantação",
       info:"Colocar no comentário da Task e solicitar validação do Dev responsável."},
      {id:"r14a",tx:"Adicionar Ficha e Plano de Implantação no comentário da Task de RDM e solicitar aprovação do Dev responsável"},
      {id:"r14b",tx:"Enviar Ficha e Plano de Implantação para a equipe da Ágora/Bradesco",
       info:"• Itens mergeados com nosso pacote → copiar analistas internos + POs no e-mail\n• Nosso pacote mergeado com outros → enviar só a ficha ao responsável pela RDM"},
    ]},
    {s:"Confirmação da RDM",t:[
      {id:"r17",tx:"Verificar com Negócios e PO da Ágora/Bradesco se abriram a Change de RDM e se a RDM está confirmada"},
      {id:"r18",tx:"Participar da reunião diária de alinhamento de RDMs com Ágora/Bradesco até o dia da implantação"},
    ]},
    {s:"Dia da RDM",t:[
      {id:"r19",tx:"Solicitar link da Sala caso não recebido"},
      {id:"r20",tx:"Aguardar na fila para implantação da Build/Script"},
      {id:"r21",tx:"Entrar na sala de testes com Ágora/Bradesco após implantação e realizar os testes em conjunto",
       info:"• Certificar que o Analista fez todos os testes e colheu todas as evidências\n• Idem para o QA da Valemobi, quando aplicável"},
      {id:"r22",tx:"Aguardar na sala principal até envio do checklist geral"},
      {id:"r23",tx:"Enviar e-mail de Registro de Ocorrências de Implantação",
       info:"Reenviar no dia seguinte caso haja pendência em aberto."},
    ]},
  ],
  posrdm:[
    {s:"Pós-RDM",t:[
      {id:"r24",tx:"Receber e-mail do cliente com evidências dos testes bem-sucedidos"},
      {id:"r25",tx:"Inserir evidências em PROD enviadas no comentário da Task de RDM"},
      {id:"r26",tx:"Abrir RITM para envio da Build/Script para ambiente FIX",
       links:[{n:"Abrir RITM (FIX)",u:RITM}]},
      {id:"r27",tx:"Checar se Builds tiveram deploy em FIX e registrar no comentário da Task",
       links:[{n:"TFS — Verificar FIX",u:TFS}]},
    ]},
    {s:"Monitoramento",t:[
      {id:"p1",tx:"Registrar no comentário da Task: implantação concluída, data, e participantes (Negócios, Dev e QA)"},
      {id:"p2",tx:"Encerrar todos os tickets no Jira"},
    ]},
  ],
};

/* ── MENU DATA ──────────────────────────────────────── */
const SYSTEMS=[
  {name:"Jira — Valemobi",icon:"🎯",url:"https://valemobi.atlassian.net/",creds:[]},
  {name:"Confluence",icon:"📖",url:"https://valemobi.atlassian.net/wiki/",creds:[]},
  {name:"BackOffice TI",icon:"🖥️",url:"https://backoffice.apps.ti.ocp.agorasenior.corp/login",creds:[{k:"Login",v:"installer39"},{k:"Senha",v:"teste123"}]},
  {name:"TFS / Azure DevOps (Builds)",icon:"⚙️",url:"https://azuredevops.mca.corp/tfs/TeamDDSProjectCollection/Agora.DevOps/_release?_a=releases&view=mine&definitionId=1105",creds:[{k:"Login",v:"CORP\\M492878"},{k:"Senha",v:"gs56ve24"}]},
  {name:"RITM — Plataforma Bradesco",icon:"📋",url:"https://wwwcasb.itbm.bancobradescosa.myshn.net/track?id=aiops_home",creds:[{k:"Chave M",v:"M566007"},{k:"Senha",v:"jul2026"}]},
  {name:"RITM — Consultar de outros",icon:"🔍",url:"https://wwwcasb.itbm.bancobradescosa.myshn.net/now/nav/ui/classic/params/target/%24pa_dashboards_overview.do%3Fsysparm_border%3Dtrue",creds:[],info:"Pesquisar RITM > Tarefas de catálogo > Número (clicar)"},
  {name:"Portal do Assessor (TI)",icon:"👔",url:"https://novo-assessor.apps.ti.ocp.agorasenior.corp/",creds:[{k:"Login",v:"brunogranito"},{k:"Senha",v:"Teste1234@"}]},
  {name:"HB Nitro — Visão Assessor",icon:"📈",url:"https://nitro.apps.ti.ocp.agorasenior.corp/auth/assessor",creds:[{k:"Login",v:"caike"},{k:"Senha",v:"teste123"}]},
  {name:"INOA",icon:"📊",url:"https://inoaagora.hml.corretora.mca.corp/#/position-keeper/risk-simulation-req",creds:[{k:"Login",v:"etd@agorainvestimentos.com.br"},{k:"Senha",v:"Teste123!"}]},
  {name:"Monitor & Tools",icon:"🔧",url:"https://alpha-paqueta-monitor.valebroker.com.br/#login-manager",creds:[]},
  {name:"Cheetah Data Streamer",icon:"🐆",url:"https://cheetah-data-streamer.apps.ti.ocp.agorasenior.corp/console",creds:[]},
  {name:"OpenShift",icon:"🔴",url:"https://console-openshift-console.apps.agalpcostiocp.ocp.agorasenior.corp/project-details/ns/agbkg-dil-business-ti",creds:[{k:"Login",v:"CORP\\M492878"},{k:"Senha",v:"gs56ve24"}]},
];

const PEOPLE=[
  // VALEMOBI
  {name:"Leonardo Magalhães",role:"Diretor",org:"vm",color:"#4E5C40"},
  {name:"Rodrigo",role:"Diretor",org:"vm",color:"#4E5C40"},
  {name:"Nelson Massud",role:"Diretor",org:"vm",color:"#4E5C40"},
  {name:"Luana Oliveira",role:"Gerente de Negócios",org:"vm",color:"#0e7490"},
  {name:"Luana Chadi",role:"Coordenadora",org:"vm",color:"#0e7490"},
  {name:"Ageu",role:"Analista de Negócios",org:"vm",color:"#B5701F"},
  {name:"Ewerton",role:"Analista de Negócios Senior",org:"vm",color:"#B5701F"},
  {name:"Felipe",role:"Analista de Negócios",org:"vm",color:"#B5701F"},
  {name:"Alef",role:"Analista de Negócios",org:"vm",color:"#B5701F"},
  {name:"Julia",role:"Analista de Negócios — APP",org:"vm",color:"#B5701F"},
  {name:"Rodrigo Marta",role:"Analista de Negócios — APP",org:"vm",color:"#B5701F"},
  {name:"Guilherme Bacarin (BACA)",role:"Tech Lead",org:"vm",color:"#7c3aed"},
  {name:"Rony Sobral",role:"Dev Backoffice",org:"vm",color:"#6d28d9"},
  {name:"Gabriel Prisco",role:"Dev",org:"vm",color:"#6d28d9"},
  {name:"Ridineu Moraes",role:"Dev Core",org:"vm",color:"#6d28d9"},
  {name:"Leonardo Brandão",role:"Dev Core",org:"vm",color:"#6d28d9"},
  {name:"Wanderson Santos",role:"Dev Front HB",org:"vm",color:"#6d28d9"},
  {name:"Alexandre Carmo",role:"TechLead Front APP",org:"vm",color:"#7c3aed"},
  {name:"Pedro Almeida",role:"Equipe Front APP",org:"vm",color:"#6d28d9"},
  {name:"Lucas Cabelinho",role:"Dev Serviços",org:"vm",color:"#6d28d9"},
  {name:"Wesley Alves",role:"Analista Senior / Coordenador QA",org:"vm",color:"#4E5C40"},
  {name:"Antonio Assunção",role:"QA",org:"vm",color:"#4E5C40"},
  {name:"Daniel Benevenuto",role:"QA / Dev",org:"vm",color:"#4E5C40"},
  // ÁGORA
  {name:"Gabriel Magalhães",role:"BA Time de Renda Variável",org:"ag",color:"#7c3aed"},
  {name:"Bispo",role:"TechLead de Renda Variável",org:"ag",color:"#7c3aed"},
  {name:"Yan Correia",role:"PO de RV",org:"ag",color:"#7c3aed"},
  {name:"Rafael Pontes",role:"BA de RV",org:"ag",color:"#7c3aed"},
  {name:"Diego dos Santos",role:"Risco",org:"ag",color:"#6d28d9"},
  {name:"Caroline Oliveira",role:"Cadastro e Custódia",org:"ag",color:"#6d28d9"},
  {name:"Guilherme Guimarães",role:"Protótipo / Time BE",org:"ag",color:"#6d28d9"},
  {name:"Heverton de Moraes",role:"Chefe de Negócios",org:"ag",color:"#b45309"},
  {name:"Morabto",role:"Chefe de Negócios",org:"ag",color:"#b45309"},
  {name:"Ubirajara",role:"Chefe de Tudo",org:"ag",color:"#b45309"},
  {name:"Rui",role:"Diretor",org:"ag",color:"#4E5C40"},
  {name:"Alcides",role:"Taxas e Impostos",org:"ag",color:"#6d28d9"},
  {name:"Everton / Pinelli",role:"Aprovação RDMs",org:"ag",color:"#b45309"},
  {name:"Murilo",role:"Agendamento de Deploys (RDM)",org:"ag",color:"#6d28d9"},
  {name:"Maga",role:"Homologação",org:"ag",color:"#6d28d9"},
  {name:"Rafa",role:"Homologação RV — Cliente",org:"ag",color:"#6d28d9"},
  {name:"Denis",role:"Assessor / Trade System",org:"ag",color:"#6d28d9"},
  {name:"Rodolfo",role:"Produtos",org:"ag",color:"#6d28d9"},
  {name:"Eduardo / Tainara",role:"B3 / Certificação",org:"ag",color:"#4E5C40"},
  // BRADESCO
  {name:"Patrícia Maria",role:"Protótipo — redação / textos",org:"br",color:"#dc2626"},
  {name:"Bruno Guerra",role:"Chefe do BE do protótipo",org:"br",color:"#dc2626"},
  {name:"Yami Couto",role:"Time do BE",org:"br",color:"#dc2626"},
  {name:"Lucas Santos (cabelim)",role:"Time do BE",org:"br",color:"#dc2626"},
  {name:"Marcela Trovo",role:"Chefe do Risco",org:"br",color:"#b45309"},
  {name:"Fabio Macieira",role:"TechLead de Produtos",org:"br",color:"#7c3aed"},
  {name:"Luana DS",role:"TechLead de Aplicativo",org:"br",color:"#7c3aed"},
  {name:"Marcelo Silva",role:"Chefe de DS",org:"br",color:"#b45309"},
  {name:"Rafael Lopes",role:"Chefe de DS",org:"br",color:"#b45309"},
];

const TEMPLATES=[
  {name:"E-mail — Aviso Build em TH",desc:"Para DS: Bispo, Gabriel, Pontes",
   body:`Assunto: [CÓDIGO] [Nome Demanda] — Build disponível em TH para ensaio\n\nOi pessoal,\n\nInformo que a build do projeto [Nome] ([Código]) já está disponível no ambiente TH e liberada para ensaio.\n\nBuilds implantadas em TH:\n- [serviço 1] — Build [número]\n- [serviço 2] — Build [número]\n\nTask de RDM no Jira: [link]\n\nPor favor, realizem os testes no ambiente TH e retornem com as evidências (prints/logs).\n\nAtt,\nBruno Granito — QA / Valemobi`},
  {name:"E-mail — Ficha e Plano para Ágora/Bradesco",desc:"Envio pré-RDM com a documentação",
   body:`Assunto: [CÓDIGO] [Nome] — Ficha e Plano de Implantação | RDM [data]\n\nOi [nome],\n\nSegue em anexo a Ficha e o Plano de Implantação referentes ao projeto [Nome] ([Código]), para a RDM prevista para [data/horário].\n\nResumo:\n- Escopo: [breve descrição]\n- Builds: [listar]\n- RITM de Rollback: [número]\n\nSolicito a validação conforme o processo.\n\nAtt,\nBruno Granito — QA / Valemobi`},
  {name:"E-mail — Registro de Ocorrências (Pós-RDM)",desc:"Enviar após implantação, reenviar se houver pendência",
   body:`Assunto: [CÓDIGO] [Nome] — Registro de Ocorrências de Implantação | [data]\n\nOi pessoal,\n\nSegue o registro de ocorrências da implantação realizada em [data/horário].\n\nSTATUS: ✅ CONCLUÍDA / ⚠️ COM RESSALVAS / ❌ REVERTIDA\n\nItens implantados:\n- [serviço 1]: Build [número] — ✅ OK\n\nTestes realizados:\n- [descrever testes realizados]\n\nOcorrências:\n- [listar ou "Nenhuma ocorrência registrada."]\n\nAtt,\nBruno Granito — QA / Valemobi`},
  {name:"Mensagem — Solicitação QA ao Wesley",desc:"Pedir indicação de responsável pelo QA",
   body:`Oi Wesley,\n\nPrecisaria que um QA ficasse responsável pelos testes da build de [Nome] ([Código]) no ambiente TH.\n\nEscopo dos testes:\n- [descrever cenários principais]\n\nBuild em TH:\n- [serviço]: Build [número]\n\nTask de RDM: [link Jira]\n\nObrigado!\nBruno Granito`},
  {name:"Descrição Task — RDM no Jira",desc:"Template padrão para criação de task de RDM",
   body:`[CÓDIGO] [Nome] — Task de RDM\n\nEscopo:\n[descrição do que será implantado]\n\nBuilds a serem implantadas:\n- [listar serviços e builds]\n\nAmbiente: TH → PRD\nData prevista: [data]\nDev responsável: [nome]\nQA responsável: [nome]\nRITM de Rollback: [número]\n\nPrint do Quadro de RDMs: [anexar]\nVincular à: [código ticket pai]`},
  {name:"Descrição Task — Jira (Descoberta concluída)",desc:"Após specs aprovadas, orientar o Dev",
   body:`[CÓDIGO] [Nome] — Desenvolvimento\n\nUSs aprovadas. Seguem as histórias:\n[link Confluence]\n\nEscopo resumido:\n[1-2 parágrafos]\n\nDependências identificadas:\n- [listar]\n\nEstimativa de horas: [X horas de DS + Y horas de QA]\n\nProtótipos: [link FIGMA se houver]`},
  {name:"RITM — Caminhos dos Favoritos",desc:"Referência de navegação no RITM Bradesco",
   body:`CAMINHOS NO RITM (Favoritos):\n→ Valemobi                 ← deploy de builds (PRINCIPAL)\n→ PostgreSQL              ← consultas e scripts  \n→ Criar customizações     ← novos serviços (pouco utilizado)\n→ Bil                     ← Tesouro Direto\n→ Oracle                  ← consultas Sinacor/Bradesco\n\nCONSULTAR RITM DE OUTROS:\nPesquisar RITM > Tarefas de catálogo > Número (clicar)`},
];

let menuTab="sistemas";

/* ── CARD REMINDER ──────────────────────────────────── */
function toggleCardReminder(id){
  const p=getP(id);if(!p)return;
  if(p.cardReminder){
    setP(id,{cardReminder:null});
    showToast("Lembrete removido","");
  } else {
    const dt=prompt("Data e hora do lembrete\nFormato: AAAA-MM-DDTHH:MM\nExemplo: 2026-08-01T10:00");
    if(!dt)return;
    if(isNaN(new Date(dt).getTime())){showToast("Data inválida","Use o formato AAAA-MM-DDTHH:MM");return;}
    setP(id,{cardReminder:dt});
    showToast("🔔 Lembrete definido",new Date(dt).toLocaleString("pt-BR"));
    checkReminders();
  }
  renderBoard();renderStats();
  if(selId===id)renderModal();
}

/* ── @ MENTION SYSTEM ───────────────────────────────── */
let atActive=false,atStart=-1,atTarget=null;

document.addEventListener("input",e=>{
  const el=e.target;
  if(!el.matches("textarea,input[type=text]"))return;
  const val=el.value,pos=el.selectionStart;
  const before=val.substring(0,pos);
  const atIdx=before.lastIndexOf("@");
  if(atIdx<0){hideAt();return;}
  // must be at start or after whitespace
  if(atIdx>0&&!/[\s\n]/.test(before[atIdx-1])){hideAt();return;}
  const query=before.substring(atIdx+1);
  if(/[\s\n]/.test(query)){hideAt();return;}
  showAt(el,atIdx,query);
});
document.addEventListener("keydown",e=>{
  if(!atActive)return;
  if(e.key==="Escape"){hideAt();return;}
  if(e.key==="ArrowDown"){
    const items=document.querySelectorAll(".at-item");
    const idx=Array.from(items).findIndex(i=>i===document.activeElement);
    items[(idx+1)%items.length]?.focus();e.preventDefault();
  }
  if(e.key==="ArrowUp"){
    const items=document.querySelectorAll(".at-item");
    const idx=Array.from(items).findIndex(i=>i===document.activeElement);
    items[(idx-1+items.length)%items.length]?.focus();e.preventDefault();
  }
});
document.addEventListener("click",e=>{if(atActive&&!e.target.closest("#atDropdown"))hideAt();});

function showAt(el,atIdx,q){
  atActive=true;atStart=atIdx;atTarget=el;
  const filtered=PEOPLE.filter(p=>!q||p.name.toLowerCase().includes(q.toLowerCase())).slice(0,7);
  const dd=document.getElementById("atDropdown");
  if(!filtered.length){hideAt();return;}
  const orgs={vm:"Valemobi",ag:"Ágora",br:"Bradesco"};
  dd.innerHTML=filtered.map(p=>{
    const ini=p.name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
    const hi=q?p.name.replace(new RegExp(`(${q})`,"i"),'<span class="at-highlight">$1</span>'):p.name;
    return `<div class="at-item" tabindex="0" onclick="selectAt('${escOnclick(p.name)}',event)" onkeydown="if(event.key==='Enter')selectAt('${escOnclick(p.name)}',event)">
      <div class="at-av" style="background:${p.color}">${ini}</div>
      <div class="at-info"><div class="at-nm">${hi}</div><div class="at-rl">${p.role} · ${orgs[p.org]||""}</div></div>
    </div>`;
  }).join("");
  // Position near textarea
  const rect=el.getBoundingClientRect();
  const ddEl=dd;
  ddEl.style.display="block";
  const ddH=Math.min(220,filtered.length*46);
  const spaceBelow=window.innerHeight-rect.bottom-8;
  ddEl.style.top=(spaceBelow>ddH?rect.bottom+4:rect.top-ddH-4)+"px";
  ddEl.style.left=Math.min(rect.left,window.innerWidth-230)+"px";
}
function selectAt(name,e){
  e?.stopPropagation?.();
  if(!atTarget)return;
  const val=atTarget.value,pos=atTarget.selectionStart;
  const after=val.substring(pos);
  const insert="@"+name+(after.startsWith(" ")?"":"");
  atTarget.value=val.substring(0,atStart)+insert+val.substring(pos);
  atTarget.selectionStart=atTarget.selectionEnd=atStart+insert.length;
  atTarget.focus();
  hideAt();
}
function hideAt(){
  atActive=false;atStart=-1;atTarget=null;
  const dd=document.getElementById("atDropdown");
  if(dd)dd.style.display="none";
}

/* ── JIRA INTEGRATION ───────────────────────────────── */
let jiraConfig = lsGet('jira') || {email:'',token:'',domain:'valemobi.atlassian.net',useProxy:true};
let jiraTab = 'importar';

const JIRA_MAP = {
  'backlog':'escopo','to do':'escopo','a fazer':'escopo',
  'selected for development':'descoberta','refinamento':'descoberta','em refinamento':'descoberta',
  'in progress':'dev','em andamento':'dev','em desenvolvimento':'dev','desenvolvimento':'dev',
  'code review':'qa','in review':'prerdm','em revisão':'prerdm','in homolog':'homolog','em homologação':'homolog',
  'homologação vm':'homolog','homologação':'homolog','uat':'homolog',
  'testing':'qa','em teste':'qa','qa':'qa','testes':'qa',
  'ready for deploy':'rdm','aguardando implantação':'rdm','rdm':'rdm',
  'aguardando cliente':'qa',
  'done':'posrdm','concluído':'posrdm','resolved':'posrdm','closed':'posrdm','done/closed':'posrdm',
};

function jiraStage(s){ return JIRA_MAP[(s||'').toLowerCase().trim()]||null; }
function jiraStatusColor(cat){
  const c={TODO:'rgba(139,141,155,.7)',IN_PROGRESS:'rgba(251,191,36,.8)',DONE:'rgba(122,155,107,.8)'};
  return c[cat]||'rgba(139,141,155,.7)';
}

async function jiraFetch(path, opts={}){
  if(!jiraConfig.email||!jiraConfig.token){
    showToast('Jira não configurado','Configure email e token na aba Configurar.');
    return null;
  }
  const auth=btoa(jiraConfig.email+':'+jiraConfig.token);
  const isGet=!opts.method||opts.method.toUpperCase()==='GET';
  const jiraUrl=`https://${jiraConfig.domain}/rest/api/3/${path}`;
  // Proxy CORS elimina o bloqueio do Atlassian a chamadas externas do browser
  const finalUrl=jiraConfig.useProxy
    ?`https://corsproxy.io/?${encodeURIComponent(jiraUrl)}`
    :jiraUrl;
  try{
    const r=await fetch(finalUrl,{
      ...opts,
      headers:{
        'Authorization':'Basic '+auth,
        'Accept':'application/json',
        ...(!isGet?{'Content-Type':'application/json'}:{}),
        ...(opts.headers||{}),
      }
    });
    if(r.status===401){showToast('Jira: Não autorizado (401)','Verifique e-mail e token.');return null;}
    if(r.status===403){showToast('Jira: Sem permissão (403)','Token sem acesso a este recurso.');return null;}
    if(r.status===404){showToast('Jira: Não encontrado (404)','Verifique o código do ticket.');return null;}
    if(!r.ok){const t=await r.text();showToast('Erro Jira '+r.status,t.substring(0,150));return null;}
    return await r.json();
  }catch(e){
    const isNet=e.message.includes('Failed to fetch')||e.message.includes('NetworkError')||e.message.includes('CORS');
    if(isNet&&!jiraConfig.useProxy){
      showToast('Bloqueio CORS','Ative "Usar proxy CORS" na aba Configurar do Jira.');
    } else if(isNet){
      showToast('Erro de rede','Verifique sua conexão com a internet.');
    } else {
      showToast('Erro Jira',e.message.substring(0,150));
    }
    return null;
  }
}

function extractJiraCodes(str){
  return [...((str||'').matchAll(/[A-Z]{2,6}-\d+/g))].map(m=>m[0]);
}

function jiraIssueToCard(issue){
  const f=issue.fields;
  const statusName=f?.status?.name||'';
  const stage=jiraStage(statusName)||'escopo';
  const prio=(f?.priority?.name||'').toLowerCase();
  const priority=prio.includes('highest')||prio.includes('blocker')?'urgent':
                 prio.includes('high')?'high':
                 prio.includes('low')?'low':'normal';
  return {
    id:'jira_'+issue.key.toLowerCase().replace('-','_')+'_'+Date.now(),
    name:f?.summary||issue.key,
    code:issue.key,
    stage,priority,
    owner:'Bruno Granito',
    desc:f?.description?.content?.[0]?.content?.[0]?.text||'',
    notes:`Importado do Jira em ${new Date().toLocaleDateString('pt-BR')}.\nStatus Jira: ${statusName}`,
    blockers:[],
    links:[{n:issue.key,u:`https://${jiraConfig.domain}/browse/${issue.key}`}],
    rmdDate:null,progress:0,checks:{},dis:{},
  };
}

/* ── JIRA PANEL ─────────────────────────────────────── */
function openJiraPanel(){document.getElementById('jiraOverlay').classList.add('open');renderJiraPanel();}
function closeJiraPanel(){document.getElementById('jiraOverlay').classList.remove('open');}
function setJiraTab(t){jiraTab=t;renderJiraPanel();}

function renderJiraPanel(){
  const tabs=['importar','sincronizar','configurar'];
  const labels=['📥 Importar','🔄 Sincronizar','⚙ Configurar'];
  document.getElementById('jiraTabs').innerHTML=tabs.map((t,i)=>
    `<button class="panel-tab${jiraTab===t?' active':''}" onclick="setJiraTab('${t}')">${labels[i]}</button>`).join('');
  const body=document.getElementById('jiraBody');
  if(jiraTab==='importar') renderJiraImport(body);
  else if(jiraTab==='sincronizar') renderJiraSync(body);
  else renderJiraCfg(body);
}

function renderJiraCfg(body){
  const cfgd=!!(jiraConfig.email&&jiraConfig.token);
  const tokenMask=jiraConfig.token?'••••••••'+jiraConfig.token.slice(-6):'';
  body.innerHTML=`
    <div style="font-size:11px;margin-bottom:14px;padding:10px 12px;background:rgba(217,142,63,.08);border-radius:7px;border-left:2px solid #D98E3F;line-height:1.6">
      ${cfgd
        ?`<span style="color:#7A9B6B">✅ Jira configurado</span> — e-mail: <strong style="color:#EDEDF0">${jiraConfig.email}</strong>`
        :'<span style="color:#fbbf24">⚠️ Não configurado</span> — preencha os campos abaixo'}
    </div>

    <div style="margin-bottom:16px;padding:12px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);border-radius:7px">
      <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:12px;color:#EDEDF0;font-weight:600;margin-bottom:5px">
        <input type="checkbox" id="jUseProxy" ${jiraConfig.useProxy!==false?'checked':''} style="accent-color:#D98E3F;width:14px;height:14px">
        Usar proxy CORS (recomendado para GitHub Pages)
      </label>
      <div style="font-size:10px;color:#A5A7B8;line-height:1.5">
        Necessário quando acessado via GitHub Pages — sem isso ocorre bloqueio CORS.
      </div>
    </div>

    <div class="jira-cfg-row"><span class="jira-cfg-lbl">Seu e-mail Atlassian</span>
      <input class="jira-inp" id="jEmail" value="${jiraConfig.email||''}" placeholder="usuario@valemobi.com.br"></div>

    <div class="jira-cfg-row"><span class="jira-cfg-lbl">API Token
      ${cfgd?`<span style="color:#7A9B6B;font-weight:600;margin-left:8px">✅ Token salvo</span>`:''}
    </span>
      <div style="position:relative">
        <input class="jira-inp" id="jToken" autocomplete="off" spellcheck="false"
          placeholder="${cfgd?'Deixe em branco para manter o token atual':'Cole o novo token aqui (ATATT3…)'}"
          style="padding-right:70px">
        <button onclick="toggleTokenVis()" id="jTokenVisBtn"
          style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#8B8D9B;cursor:pointer;font-size:11px">
          👁 Ver
        </button>
      </div>
      ${cfgd?`<div style="font-size:10px;color:#55566A;margin-top:3px">Token atual: <code style="color:#D98E3F">${tokenMask}</code> — só preencha para alterar</div>`:''}
      <div style="font-size:10px;color:#55566A;margin-top:3px">Gerar em: <a href="https://id.atlassian.com/manage-api-tokens" target="_blank" style="color:#E2A968">id.atlassian.com/manage-api-tokens</a></div>
    </div>

    <div class="jira-cfg-row"><span class="jira-cfg-lbl">Domínio Jira</span>
      <input class="jira-inp" id="jDomain" value="${jiraConfig.domain||'valemobi.atlassian.net'}" placeholder="valemobi.atlassian.net"></div>

    <button class="jira-btn" onclick="saveJiraCfg()">💾 Salvar configuração</button>
    ${cfgd?`<button class="jira-btn-sec" id="jTestBtn" style="margin-top:8px;width:100%" onclick="testJira()">🔌 Testar conexão</button>`:''}
    <div id="jSaveConfirm" style="display:none;margin-top:10px;padding:9px 12px;background:rgba(122,155,107,.12);border:1px solid rgba(122,155,107,.3);border-radius:6px;font-size:11px;color:#7A9B6B"></div>
  `;
}

let tokenVisible=false;
function toggleTokenVis(){
  const inp=document.getElementById('jToken');
  const btn=document.getElementById('jTokenVisBtn');
  if(!inp)return;
  tokenVisible=!tokenVisible;
  inp.type=tokenVisible?'text':'password';
  if(btn)btn.textContent=tokenVisible?'🙈 Ocultar':'👁 Ver';
}

function saveJiraCfg(){
  const email=(document.getElementById('jEmail')?.value||'').trim();
  const newToken=(document.getElementById('jToken')?.value||'').trim();
  const domain=(document.getElementById('jDomain')?.value||'').trim()||'valemobi.atlassian.net';
  const useProxy=document.getElementById('jUseProxy')?.checked!==false;

  // CRÍTICO: preservar token existente se campo vazio
  const token=newToken||jiraConfig.token||'';

  if(!email){showToast('⚠️ E-mail obrigatório','Preencha o e-mail Atlassian.');return;}
  if(!token){showToast('⚠️ Token obrigatório','Cole o API Token do Atlassian.');return;}

  jiraConfig={email,token,domain,useProxy};

  // Salva na localStorage (inclui token)
  lsSet('jira',jiraConfig);

  // Salva config sem token no Supabase (para persistir entre dispositivos)
  sbSet('jira_cfg',{email,domain,useProxy}).catch(()=>{});

  // Feedback visual claro
  const confirm=document.getElementById('jSaveConfirm');
  if(confirm){
    confirm.style.display='block';
    confirm.innerHTML=`✅ Salvo com sucesso!<br>
      <span style="color:#A5A7B8">E-mail: ${email} · Domínio: ${domain} · Proxy: ${useProxy?'Ativo':'Inativo'}</span>`;
  }
  showToast('✅ Jira salvo!',`${email} · ${domain}`);
  logActivity('Jira configurado',`${email} · proxy=${useProxy}`);

  // Re-render após 1.5s para mostrar status atualizado
  setTimeout(()=>renderJiraPanel(),1500);
}

async function testJira(){
  const btn=document.getElementById('jTestBtn');
  if(btn){btn.textContent='Testando…';btn.disabled=true;}
  const me=await jiraFetch('myself');
  if(me){
    const name=me.displayName||me.emailAddress||'Conectado!';
    showToast('✅ Conexão OK!',`Autenticado como: ${name}`);
    if(btn){btn.textContent=`✅ OK — ${name}`;btn.style.color='#7A9B6B';btn.disabled=false;}
  } else {
    if(btn){btn.textContent='❌ Falhou — verifique credenciais';btn.disabled=false;btn.style.color='#f87171';}
  }
}

function renderJiraImport(body){
  body.innerHTML=`
    <div style="font-size:11px;color:#8B8D9B;margin-bottom:14px;padding:10px;background:rgba(251,191,36,.07);border-radius:6px;border-left:2px solid #fbbf24">
      ⚠️ O Jira da Valemobi tem milhares de tasks. Aqui você importa <strong>apenas o ticket que digitar</strong> — nada é importado automaticamente.
    </div>
    <span class="jira-cfg-lbl" style="display:block;margin-bottom:6px">Código do ticket</span>
    <div class="jira-import-row">
      <input class="jira-import-inp" id="jImportKey" placeholder="Ex: BAPG-1669" maxlength="20"
        onkeydown="if(event.key==='Enter')fetchJiraPreview()">
      <button class="jira-btn-sec" onclick="fetchJiraPreview()" id="jImportBtn">Buscar</button>
    </div>
    <div style="font-size:10px;color:#55566A;margin:6px 0 14px">Digite o código exato (ex: BAPG-1501, BAPD-2246, AMTS-1176)</div>
    <div id="jPreview" class="jira-preview"></div>
  `;
  document.getElementById('jImportKey').focus();
}

let _lastJiraPreview=null;
async function fetchJiraPreview(){
  const key=(document.getElementById('jImportKey')?.value||'').trim().toUpperCase();
  if(!key){showToast('Informe o código','Ex: BAPG-1669');return;}
  const btn=document.getElementById('jImportBtn');
  const prev=document.getElementById('jPreview');
  if(btn){btn.textContent='Buscando…';btn.disabled=true;}
  prev.innerHTML=`<div class="jira-loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div> Buscando ${key}…</div>`;
  prev.classList.add('show');

  const issue=await jiraFetch(`issue/${key}?fields=summary,status,priority,assignee,description,issuetype,updated,comment`);
  if(btn){btn.textContent='Buscar';btn.disabled=false;}

  if(!issue){prev.classList.remove('show');return;}

  // Cache do issue para o doImportJira (evita segunda chamada)
  _lastJiraPreview=issue;

  const f=issue.fields;
  const statusName=f?.status?.name||'?';
  const statusCat=f?.status?.statusCategory?.key||'TODO';
  const suggestedStage=jiraStage(statusName);
  const assignee=f?.assignee?.displayName||'Não atribuído';
  const updated=f?.updated?new Date(f.updated).toLocaleDateString('pt-BR'):'?';
  const desc=f?.description?.content?.[0]?.content?.[0]?.text||'(sem descrição)';
  const alreadyImported=projects.some(p=>extractJiraCodes(p.code).includes(key));

  let stageOptions=STAGES.map(s=>`<option value="${s.id}"${s.id===suggestedStage?' selected':''}>${s.icon} ${s.label}</option>`).join('');

  prev.innerHTML=`
    <div class="jira-ticket-header">
      <span class="jira-ticket-key">${issue.key}</span>
      <span class="jira-ticket-status" style="background:${jiraStatusColor(statusCat)}20;color:${jiraStatusColor(statusCat)}">${statusName}</span>
    </div>
    <div class="jira-ticket-name">${f?.summary||'?'}</div>
    <div class="jira-ticket-meta">
      <span>👤 ${assignee}</span>
      <span>🕒 Atualizado: ${updated}</span>
      <span>📋 ${f?.issuetype?.name||'Task'}</span>
    </div>
    ${desc!=='(sem descrição)'?`<div style="font-size:10px;color:#8B8D9B;margin-top:8px;border-top:1px solid rgba(85,86,106,.2);padding-top:8px">${desc.substring(0,200)}${desc.length>200?'…':''}</div>`:''}
    ${suggestedStage?`<div class="jira-stage-suggest">📍 Stage sugerido: <strong>${STAGES.find(s=>s.id===suggestedStage)?.label||suggestedStage}</strong></div>`:''}
    <div style="margin-top:10px;display:flex;align-items:center;gap:8px">
      <span style="font-size:10px;color:#8B8D9B">Importar para stage:</span>
      <select class="stage-select" id="jImportStage">${stageOptions}</select>
    </div>
    ${alreadyImported
      ?`<div style="font-size:11px;color:#fbbf24;margin-top:10px">⚠️ Este ticket já existe na esteira (código: ${key})</div>
         <button class="jira-btn" style="margin-top:8px;width:100%" onclick="doImportJira()">Importar mesmo assim</button>`
      :`<button class="jira-btn" style="margin-top:10px;width:100%" onclick="doImportJira()">📥 Importar como card</button>`
    }
  `;
}

async function doImportJira(){
  if(!_lastJiraPreview){showToast('⚠️ Preview expirado','Busque o ticket novamente.');return;}
  const issue=_lastJiraPreview;
  const stage=document.getElementById('jImportStage')?.value||'escopo';
  const btn=document.querySelector('#jPreview .jira-btn');
  if(btn){btn.textContent='⏳ Importando…';btn.disabled=true;}
  const card=jiraIssueToCard(issue);
  card.stage=stage;
  card.jiraStatus=issue.fields?.status?.name||'';
  card.jiraStatusCat=issue.fields?.status?.statusCategory?.key||'';
  projects.push(card);
  saveProjects();
  refreshProgress(card.id);
  renderBoard();renderStats();
  logActivity('Card importado do Jira',`${issue.key} — ${card.name}`,card.id,card.name);
  showToast('✅ Importado!',`"${card.name}" → ${STAGES.find(s=>s.id===stage)?.label||stage}`);
  _lastJiraPreview=null;
  closeJiraPanel();
}

function renderJiraSync(body){
  const withCodes=projects.filter(p=>!p.archived&&extractJiraCodes(p.code).length>0);
  if(!withCodes.length){
    body.innerHTML=`<div style="font-size:11px;color:#55566A;padding:20px 0;text-align:center">Nenhum card tem código de ticket Jira.<br>Adicione tickets na aba Importar ou no campo Código do card.</div>`;
    return;
  }
  body.innerHTML=`
    <div style="font-size:11px;color:#8B8D9B;margin-bottom:14px">
      ${withCodes.length} card${withCodes.length>1?'s':''} com tickets Jira vinculados. Clique em um card para sincronizar individualmente.
    </div>
    <button class="jira-btn" onclick="syncAllJira()" style="margin-bottom:16px">🔄 Sincronizar todos agora</button>
    <div id="jSyncResults"></div>
    ${withCodes.map(p=>`
      <div class="jira-ticket" id="jsync-${p.id}">
        <div class="jira-ticket-header">
          <div>
            <div class="jira-ticket-name" style="margin-bottom:3px">${p.name}</div>
            <span class="jira-ticket-key">${extractJiraCodes(p.code).join(' · ')}</span>
          </div>
          <button class="jira-btn-sec" onclick="syncOneCard('${p.id}')">🔄 Sync</button>
        </div>
        <div id="jsync-result-${p.id}" style="font-size:10px;color:#55566A;margin-top:6px"></div>
      </div>`).join('')}
  `;
}

async function syncOneCard(pid){
  const p=getP(pid);if(!p)return;
  const codes=extractJiraCodes(p.code);
  const el=document.getElementById(`jsync-result-${pid}`);
  if(el)el.innerHTML=`<span style="color:#8B8D9B">Buscando…</span>`;
  const results=[];
  for(const code of codes){
    const issue=await jiraFetch(`issue/${code}?fields=summary,status,assignee,updated`);
    if(!issue)continue;
    const f=issue.fields;
    const statusName=f?.status?.name||'?';
    const sugStage=jiraStage(statusName);
    const assignee=f?.assignee?.displayName||'?';
    const updated=f?.updated?new Date(f.updated).toLocaleDateString('pt-BR'):'?';
    results.push({code,statusName,sugStage,assignee,updated,statusCat:f?.status?.statusCategory?.key||'TODO'});
    // Atualiza jiraStatus no card
    if(statusName&&statusName!=='?') setP(pid,{jiraStatus:statusName,jiraStatusCat:f?.status?.statusCategory?.key||''});
  }
  if(!results.length){if(el)el.innerHTML=`<span class="jira-err">Não foi possível buscar.</span>`;return;}
  const r=results[0];
  const curStageName=STAGES.find(s=>s.id===p.stage)?.label||p.stage;
  const sugStageName=r.sugStage?STAGES.find(s=>s.id===r.sugStage)?.label||r.sugStage:null;
  const diff=r.sugStage&&r.sugStage!==p.stage;
  if(el)el.innerHTML=`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
      <span>Status Jira: <strong style="color:${jiraStatusColor(r.statusCat)}">${r.statusName}</strong></span>
      <span>Atualizado: ${r.updated}</span>
      <span>Assignee: ${r.assignee}</span>
    </div>
    ${diff?`<div class="jira-stage-suggest" style="margin-top:6px">
      Sugestão: mover de <em>${curStageName}</em> → <strong>${sugStageName}</strong>
      <button class="jira-btn-sec" style="font-size:10px;padding:3px 10px" onclick="applyJiraStage('${pid}','${r.sugStage}')">Aplicar</button>
    </div>`:`<div style="color:#7A9B6B;margin-top:5px">✅ Stage OK (${curStageName})</div>`}
  `;
}

async function syncAllJira(){
  const withCodes=projects.filter(p=>!p.archived&&extractJiraCodes(p.code).length>0);
  const el=document.getElementById('jSyncResults');
  if(el)el.innerHTML=`<div class="jira-loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div> Sincronizando ${withCodes.length} cards…</div>`;
  let ok=0,changed=0;
  for(const p of withCodes){
    await syncOneCard(p.id);
    ok++;
  }
  if(el)el.innerHTML=`<div style="font-size:11px;color:#7A9B6B;margin-bottom:12px">✅ ${ok} card${ok!==1?'s':''} verificado${ok!==1?'s':''}.</div>`;
}

function applyJiraStage(pid,stage){
  const p=getP(pid);if(!p||p.stage===stage)return;
  removeFromOrder(p.stage,pid);
  addToOrder(stage,pid);
  setP(pid,{stage});
  refreshProgress(pid);
  renderBoard();renderStats();
  showToast('Stage atualizado',`${p.name} → ${STAGES.find(s=>s.id===stage)?.label||stage}`);
  renderJiraPanel();
  if(selId===pid)renderModal();
}

/* ── JIRA TAB NO MODAL ──────────────────────────────── */
function renderJiraModal(){
  const p=getP(selId);if(!p)return;
  const codes=extractJiraCodes(p.code);
  if(!jiraConfig.email||!jiraConfig.token){
    document.getElementById('tJira').innerHTML=`
      <div class="ai-nokey">🔗 Jira não configurado.<br>
        <button onclick="closeModal();openJiraPanel();setJiraTab('configurar')" style="margin-top:8px;background:rgba(251,191,36,.2);border:1px solid rgba(251,191,36,.4);color:#fbbf24;padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer">Configurar Jira</button>
      </div>`;
    return;
  }
  if(!codes.length){
    document.getElementById('tJira').innerHTML=`
      <div style="font-size:11px;color:#55566A;padding:20px 0;text-align:center">
        Este card não tem um código Jira válido no campo "Código".<br>
        <span style="color:#8B8D9B">Ex: BAPG-1501 ou BAPD-2246</span>
      </div>`;
    return;
  }
  document.getElementById('tJira').innerHTML=`
    <div style="margin-bottom:14px">
      <span style="font-size:11px;color:#8B8D9B">Tickets vinculados: </span>
      ${codes.map(c=>`<a href="https://${jiraConfig.domain}/browse/${c}" target="_blank" style="font-size:11px;font-family:monospace;color:#E2A968;margin-right:8px">↗ ${c}</a>`).join('')}
    </div>
    <div id="jModal-results">
      <button class="jira-btn-sec" onclick="syncModalCard()">🔄 Sincronizar status com Jira</button>
    </div>
    <div style="margin-top:16px;border-top:1px solid rgba(85,86,106,.2);padding-top:14px">
      <span class="slbl" style="display:block;margin-bottom:6px">Adicionar comentário nos tickets</span>
      <textarea class="jira-comment-area" id="jModalComment" placeholder="Escreva um comentário para publicar no Jira…"></textarea>
      <button class="jira-btn-sec" style="margin-top:7px;width:100%" onclick="postJiraComment()">📝 Publicar no Jira</button>
    </div>
  `;
}

async function syncModalCard(){
  const p=getP(selId);if(!p)return;
  const codes=extractJiraCodes(p.code);
  const el=document.getElementById('jModal-results');
  el.innerHTML=`<div class="jira-loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div> Buscando…</div>`;
  let html='';
  for(const code of codes){
    const issue=await jiraFetch(`issue/${code}?fields=summary,status,assignee,updated,comment`);
    if(!issue){html+=`<div class="jira-err" style="font-size:11px">❌ Não foi possível buscar ${code}</div>`;continue;}
    const f=issue.fields;
    const statusName=f?.status?.name||'?';
    const statusCat=f?.status?.statusCategory?.key||'TODO';
    const sugStage=jiraStage(statusName);
    const assignee=f?.assignee?.displayName||'Não atribuído';
    const updated=f?.updated?new Date(f.updated).toLocaleString('pt-BR'):'?';
    const comments=(f?.comment?.comments||[]).slice(-2).reverse();
    const curStageName=STAGES.find(s=>s.id===p.stage)?.label||p.stage;
    const sugStageName=sugStage?STAGES.find(s=>s.id===sugStage)?.label||sugStage:null;
    const diff=sugStage&&sugStage!==p.stage;
    html+=`<div class="jira-ticket" style="margin-bottom:12px">
      <div class="jira-ticket-header">
        <span class="jira-ticket-key">${code}</span>
        <span class="jira-ticket-status" style="background:${jiraStatusColor(statusCat)}20;color:${jiraStatusColor(statusCat)}">${statusName}</span>
      </div>
      <div class="jira-ticket-meta"><span>👤 ${assignee}</span><span>🕒 ${updated}</span></div>
      ${diff?`<div class="jira-stage-suggest">
        Sugestão: mover para <strong>${sugStageName}</strong>
        <button class="jira-btn-sec" style="font-size:10px;padding:3px 10px" onclick="applyJiraStage('${p.id}','${sugStage}')">Aplicar</button>
      </div>`:`<div style="font-size:10px;color:#7A9B6B;margin-top:6px">✅ Stage OK (${curStageName})</div>`}
      ${comments.length?`<div style="margin-top:10px;border-top:1px solid rgba(85,86,106,.15);padding-top:8px">
        <div style="font-size:10px;font-weight:600;color:#8B8D9B;margin-bottom:6px">Últimos comentários</div>
        ${comments.map(c=>`<div style="font-size:10px;color:#A5A7B8;margin-bottom:6px;padding-left:8px;border-left:2px solid rgba(85,86,106,.3)">
          <strong style="color:#8B8D9B">${c.author?.displayName||'?'}</strong> · ${new Date(c.created).toLocaleDateString('pt-BR')}<br>
          ${(c.body?.content?.[0]?.content?.[0]?.text||'').substring(0,150)}
        </div>`).join('')}
      </div>`:''}
    </div>`;
  }
  el.innerHTML=html||`<div class="jira-err" style="font-size:11px">Nenhum resultado.</div>`;
}

async function postJiraComment(){
  const p=getP(selId);if(!p)return;
  const txt=(document.getElementById('jModalComment')?.value||'').trim();
  if(!txt){showToast('Comentário vazio','Escreva algo antes de publicar.');return;}
  const codes=extractJiraCodes(p.code);
  if(!codes.length){showToast('Sem tickets','Este card não tem código Jira.');return;}
  let ok=0;
  for(const code of codes){
    const body=JSON.stringify({body:{type:'doc',version:1,content:[{type:'paragraph',content:[{type:'text',text:txt}]}]}});
    const r=await jiraFetch(`issue/${code}/comment`,{method:'POST',body});
    if(r)ok++;
  }
  if(ok){
    showToast('✅ Comentário publicado!',`Publicado em ${ok} ticket${ok>1?'s':''}.`);
    document.getElementById('jModalComment').value='';
    syncModalCard();
  }
}

/* ── v1.4 FEATURES ──────────────────────────────────── */

// ── THEME TOGGLE ──────────────────────────────────────
function toggleTheme(){
  const isLight=document.body.classList.toggle('light');
  lsSet('theme',isLight?'light':'dark');
  const ti=document.getElementById('sbThemeIcon');if(ti)ti.textContent=isLight?'☀️':'🌙';
}
(()=>{if(lsGet('theme')==='light'){document.body.classList.add('light');const ti=document.getElementById('sbThemeIcon');if(ti)ti.textContent='☀️';}})();

// ── GLOBAL SEARCH ──────────────────────────────────────
function filterSearch(q){
  const lq=(q||'').toLowerCase().trim();
  document.querySelectorAll('.card').forEach(c=>{
    const txt=c.textContent.toLowerCase();
    const match=!lq||txt.includes(lq);
    c.style.opacity=match?'1':'0.12';
    c.style.pointerEvents=match?'':'none';
  });
}

// ── MULTI-SELECT ───────────────────────────────────────
let selectedCards=new Set();
function initBulkStage(){
  const sel=document.getElementById('bulkStage');
  if(!sel||sel.options.length>1)return;
  STAGES.forEach(s=>{const o=document.createElement('option');o.value=s.id;o.textContent=s.icon+' '+s.label;sel.appendChild(o);});
}
function toggleCardSelect(id,ctrlHeld){
  if(!ctrlHeld){clearSelection();return;}
  if(selectedCards.has(id)){selectedCards.delete(id);}else{selectedCards.add(id);}
  document.querySelectorAll('.card').forEach(c=>{
    const cid=c.dataset.pid;
    if(cid) c.classList.toggle('selected',selectedCards.has(cid));
  });
  updateBulkBar();
}
function updateBulkBar(){
  const bar=document.getElementById('bulkBar');
  const info=document.getElementById('bulkInfo');
  if(!bar)return;
  if(selectedCards.size>0){
    bar.classList.add('show');
    if(info) info.textContent=`${selectedCards.size} card${selectedCards.size>1?'s':''} selecionado${selectedCards.size>1?'s':''}`;
    initBulkStage();
  } else {
    bar.classList.remove('show');
  }
}
function clearSelection(){selectedCards.clear();document.querySelectorAll('.card.selected').forEach(c=>c.classList.remove('selected'));updateBulkBar();}
function bulkMove(){
  const stage=document.getElementById('bulkStage')?.value;
  if(!stage){showToast('Selecione um stage','');return;}
  selectedCards.forEach(id=>{
    const p=getP(id);if(!p||p.stage===stage)return;
    removeFromOrder(p.stage,id);addToOrder(stage,id);
    setP(id,{stage,stageHistory:[...(p.stageHistory||[]),{stage,enteredAt:new Date().toISOString()}]});
    refreshProgress(id);
  });
  clearSelection();renderBoard();renderStats();
  showToast('✅ Cards movidos',`${selectedCards.size||'Todos'} cards → ${STAGES.find(s=>s.id===stage)?.label||stage}`);
}
function bulkArchive(){
  if(!confirm(`Arquivar ${selectedCards.size} card${selectedCards.size>1?'s':''}?`))return;
  selectedCards.forEach(id=>setP(id,{archived:true}));
  clearSelection();renderBoard();renderStats();
}

// ── STAGE TIME TRACKING ────────────────────────────────
function trackStageEntry(pid,stage){
  const p=getP(pid);
  const hist=[...(p.stageHistory||[])];
  if(hist.length>0&&!hist[hist.length-1].exitedAt){
    hist[hist.length-1].exitedAt=new Date().toISOString();
  }
  hist.push({stage,enteredAt:new Date().toISOString()});
  setP(pid,{stageHistory:hist});
}
function daysInStage(p){
  if(!p.stageHistory?.length)return null;
  const cur=p.stageHistory[p.stageHistory.length-1];
  if(!cur?.enteredAt)return null;
  const ms=Date.now()-new Date(cur.enteredAt).getTime();
  return Math.floor(ms/86400000);
}
function stageTimeLabel(p){
  const d=daysInStage(p);
  if(d===null)return'';
  if(d===0)return'Hoje';
  const lbl=`${d}d neste stage`;
  return lbl;
}

// ── BRIEFING ───────────────────────────────────────────
function openBriefing(){
  document.getElementById('briefingOverlay').classList.add('open');
  const el=document.getElementById('briefingDate');
  if(el)el.textContent=new Date().toLocaleDateString('pt-BR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  generateBriefing();
}
function closeBriefing(){document.getElementById('briefingOverlay').classList.remove('open');}

async function generateBriefing(){
  const body=document.getElementById('briefingBody');
  body.innerHTML=`<div class="jira-loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div> Gerando com IA…</div>`;
  if(!apiKey){
    body.innerHTML=`<div class="ai-nokey">Configure a API Key do Claude para usar o Briefing.<button onclick="closeBriefing();openSettings()" style="margin-top:8px;background:rgba(251,191,36,.2);border:1px solid rgba(251,191,36,.4);color:#fbbf24;padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer">Configurar</button></div>`;
    return;
  }
  const active=projects.filter(p=>!p.archived);
  const today=new Date().toLocaleDateString('pt-BR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const rdmHoje=active.filter(p=>{if(!p.rmdDate)return false;const d=parseDate(p.rmdDate);return d&&(d-Date.now())<7*86400000&&d>Date.now()-86400000;});
  const urgentes=active.filter(p=>p.priority==='urgent');
  const bloqueadas=active.filter(p=>p.blockers?.length>0);
  const summary=active.map(p=>{
    const st=STAGES.find(s=>s.id===p.stage);
    const dias=daysInStage(p);
    return `• ${p.name} (${p.code}): ${st?.label||p.stage}${dias!==null?' ['+dias+'d]':''}, ${p.progress}%${p.blockers?.length?' 📌':''}`
  }).join('\n');
  const sysPrompt=`Você é o assistente de Bruno Granito, QA RV na Valemobi.
Hoje: ${today}
Projetos ativos: ${active.length}
Urgentes: ${urgentes.map(p=>p.name).join(', ')||'nenhum'}
Com status atual: ${bloqueadas.length}
RDM próximos 7 dias: ${rdmHoje.map(p=>p.name+' ('+p.rmdDate+')').join(', ')||'nenhum'}
Status completo:
${summary}`;
  const prompt=`Gere um briefing executivo conciso para hoje com 4 seções:
1. 🚨 ATENÇÃO IMEDIATA — o que precisa de ação hoje (urgentes, RDMs próximas, status atuais críticos)
2. 📊 RESUMO DO DIA — visão geral em 3 linhas
3. ✅ FOCO RECOMENDADO — top 3 ações para hoje em ordem de prioridade
4. 🔮 OLHANDO PARA A SEMANA — o que vem aí nos próximos 7 dias

Seja objetivo, prático e direto. Use linguagem de BA sênior.`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1200,system:sysPrompt,messages:[{role:'user',content:prompt}]})
    });
    const d=await res.json();
    const txt=d.content?.[0]?.text||'Não foi possível gerar o briefing.';
    const parts=txt.split('\n').reduce((acc,line)=>{if(/^[1-4]\.|^[🚨📊✅🔮]/.test(line.trim())){acc.push(line);}else if(acc.length){acc[acc.length-1]+='\n'+line;}return acc;},[]);
    body.innerHTML=`<div style="margin-bottom:12px;padding:10px 12px;background:rgba(217,142,63,.08);border-radius:7px;border-left:2px solid #D98E3F;font-size:11px;color:#8B8D9B">
      ${active.length} demandas ativas · ${urgentes.length} urgentes · ${bloqueadas.length} com status atual · ${rdmHoje.length} RDM esta semana
    </div>
    ${parts.map(s=>s.trim()?`<div class="brief-section"><div class="brief-content">${s.trim()}</div></div>`:'').join('')}
    <button class="jira-btn-sec" style="width:100%;margin-top:8px" onclick="generateBriefing()">↺ Gerar novamente</button>`;
  }catch(e){
    body.innerHTML=`<div class="jira-err">Erro: ${e.message}</div>`;
  }
}

function parseDate(str){
  if(!str)return null;
  const m=str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if(m)return new Date(+m[3],+m[2]-1,+m[1]);
  return null;
}

// ── AGENDA / CALENDÁRIO ────────────────────────────────
function openAgenda(){document.getElementById('agendaOverlay').classList.add('open');renderAgenda();}
function closeAgenda(){document.getElementById('agendaOverlay').classList.remove('open');}

function renderAgenda(){
  const body=document.getElementById('agendaBody');
  const active=projects.filter(p=>!p.archived);
  const events=[];
  const now=new Date();now.setHours(0,0,0,0);

  active.forEach(p=>{
    // RDM date
    if(p.rmdDate){const d=parseDate(p.rmdDate);if(d){events.push({date:d,type:'rdm',label:`🚀 RDM: ${p.name}`,sub:`${p.code} · ${PRIO[p.priority]?.label||''}`,color:'#8b5cf6',pid:p.id});}}
    // Card reminders
    if(p.cardReminder){const d=new Date(p.cardReminder);if(d>=now){events.push({date:d,type:'reminder',label:`🔔 ${p.name}`,sub:'Lembrete de card',color:'#fbbf24',pid:p.id});}}
    // Task reminders
    Object.entries(p.taskDates||{}).forEach(([tid,dt])=>{
      if(!dt)return;const d=new Date(dt);if(d>=now){events.push({date:d,type:'task',label:`⏰ ${p.name}`,sub:findTaskText(p,tid),color:'#D98E3F',pid:p.id});}
    });
    // Meetings
    (p.meetings||[]).forEach(m=>{
      const d=new Date(m.date);if(d>=now){events.push({date:d,type:'meeting',label:`📝 ${p.name}`,sub:m.participants||'Reunião',color:'#7A9B6B',pid:p.id});}
    });
  });

  if(!events.length){body.innerHTML=`<div class="agenda-empty">Nenhum evento agendado.<br><span style="color:#2C2D3C">Adicione datas de RDM, lembretes ou reuniões nos cards.</span></div>`;return;}

  events.sort((a,b)=>a.date-b.date);

  // Group by date
  const groups={};
  events.forEach(e=>{
    const key=e.date.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});
    if(!groups[key])groups[key]=[];
    groups[key].push(e);
  });

  body.innerHTML=Object.entries(groups).slice(0,30).map(([date,evts])=>`
    <div class="agenda-day">
      <div class="agenda-date-hd">${date}</div>
      ${evts.map(e=>`
        <div class="agenda-event" style="border-left-color:${e.color}" onclick="closeAgenda();openModal('${e.pid}')">
          <div>
            <div class="agenda-event-name">${e.label}</div>
            <div class="agenda-event-meta">${e.sub}${e.date.getHours()>0?' · '+e.date.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):''}</div>
          </div>
        </div>`).join('')}
    </div>`).join('');
}

// ── MEETING NOTES ──────────────────────────────────────
function renderMeetings(){
  const p=getP(selId);if(!p)return;
  const meetings=p.meetings||[];
  let h=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
    <span style="font-size:11px;color:#8B8D9B">${meetings.length} reunião${meetings.length!==1?'ões':''} registrada${meetings.length!==1?'s':''}</span>
    <button class="jira-btn-sec" onclick="toggleMtgForm()">+ Nova ata</button>
  </div>
  <div class="mtg-form" id="mtgForm">
    <div style="font-size:10px;font-weight:600;color:#8B8D9B;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px">Nova Ata de Reunião</div>
    <input class="mtg-inp" id="mtgDate" type="date" value="${new Date().toISOString().slice(0,10)}">
    <div class="people-ac-wrap" style="margin-bottom:7px">
      <input class="mtg-inp" id="mtgPart" placeholder="Participantes (ex: Bruno, Gabriel…)" style="margin-bottom:0">
      <div class="people-ac-drop" id="mtgPartDrop"></div>
    </div>
    <textarea class="mtg-inp" rows="3" id="mtgNotes" placeholder="Notas e discussões da reunião…"></textarea>
    <textarea class="mtg-inp" rows="2" id="mtgDecisions" placeholder="Decisões tomadas…"></textarea>
    <div class="save-row"><button class="btn-s" onclick="saveMeeting()">✓ Salvar ata</button><button class="btn-c" onclick="toggleMtgForm()">✕</button></div>
  </div>`;
  if(!meetings.length){h+=`<div class="agenda-empty" style="margin-top:16px">Nenhuma ata registrada ainda.</div>`;}
  else{
    h+=meetings.slice().reverse().map((m,ri)=>{
      const i=meetings.length-1-ri;
      return `<div class="mtg-item" id="mtg-item-${i}">
        <div class="mtg-header">
          <div>
            <span class="mtg-date">${new Date(m.date+'T12:00').toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short',year:'numeric'})}</span>
            <span class="mtg-participants" style="margin-left:8px">· ${m.participants||''}</span>
          </div>
          <div style="display:flex;gap:5px">
            <button class="mtg-del" onclick="editMeeting(${i})" title="Editar" style="color:#8B8D9B">✏</button>
            <button class="mtg-del" onclick="deleteMeeting(${i})" title="Remover">🗑</button>
          </div>
        </div>
        ${m.notes?`<div class="mtg-notes">${m.notes}</div>`:''}
        ${m.decisions?`<div class="mtg-decisions">✅ ${m.decisions}</div>`:''}
        <div style="border-top:1px solid rgba(85,86,106,.12);margin-top:8px;padding-top:7px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          ${renderAttachments(m.attachments||[],'meeting',i)}
          <button onclick="openFilePicker('meeting',${i})"
            style="background:rgba(85,86,106,.1);border:1px dashed rgba(85,86,106,.35);color:#8B8D9B;padding:4px 12px;border-radius:5px;font-size:10px;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
            📎 Anexar arquivo à ata
          </button>
        </div>
      </div>`;
    }).join('');
  }
  document.getElementById('tMtg').innerHTML=h;
  // Init people AC for participant fields
  initPeopleAC('mtgPart','mtgPartDrop');
}
function toggleMtgForm(){ const f=document.getElementById('mtgForm'); f?.classList.toggle('open'); if(f?.classList.contains('open')) initPeopleAC('mtgPart','mtgPartDrop'); }
function saveMeeting(){
  const date=document.getElementById('mtgDate')?.value;
  const participants=document.getElementById('mtgPart')?.value.trim();
  const notes=document.getElementById('mtgNotes')?.value.trim();
  const decisions=document.getElementById('mtgDecisions')?.value.trim();
  if(!date){showToast('Informe a data','');return;}
  const p=getP(selId);
  const meetings=[...(p.meetings||[]),{id:'mtg_'+Date.now(),date,participants,notes,decisions}];
  setP(selId,{meetings});
  renderMeetings();
  showToast('✅ Ata salva',`Reunião de ${new Date(date+'T12:00').toLocaleDateString('pt-BR')} registrada.`);
}
function deleteMeeting(i){
  const p=getP(selId);
  if(!confirm('Remover esta ata?'))return;
  const meetings=(p.meetings||[]).filter((_,idx)=>idx!==i);
  setP(selId,{meetings});renderMeetings();
}

// ── DEPENDENCIES ───────────────────────────────────────
function renderDeps(){
  const p=getP(selId);if(!p)return;
  const deps=p.deps||[];
  const others=projects.filter(x=>!x.archived&&x.id!==selId);
  let h=`<div class="slbl" style="display:block;margin-bottom:8px">Depende de</div>
    <div id="depList" style="margin-bottom:10px;display:flex;flex-wrap:wrap;gap:4px">
    ${deps.map(did=>{const dp=getP(did);return dp?`<span class="dep-item">${dp.name} <button class="dep-del" onclick="removeDep('${did}')">×</button></span>`:'';}).join('')}
    ${!deps.length?'<span style="font-size:11px;color:#55566A">Nenhuma dependência definida</span>':''}
    </div>
    <select class="stage-select" id="depSel" style="width:100%;margin-bottom:7px" onchange="addDep(this.value);this.value=''">
      <option value="">+ Adicionar dependência…</option>
      ${others.filter(x=>!deps.includes(x.id)).map(x=>`<option value="${x.id}">${x.name} (${x.code})</option>`).join('')}
    </select>
    <div class="slbl" style="display:block;margin-top:14px;margin-bottom:8px">Bloqueado por este card</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
    ${projects.filter(x=>!x.archived&&(x.deps||[]).includes(selId)).map(x=>`<span class="dep-item" style="border-color:rgba(239,68,68,.3);color:#f87171">${x.name}</span>`).join('')||'<span style="font-size:11px;color:#55566A">Nenhum card bloqueado por este</span>'}
    </div>`;
  document.getElementById('tDep').innerHTML=h;
}
function addDep(did){if(!did)return;const p=getP(selId);const deps=[...(p.deps||[]),did];setP(selId,{deps});renderDeps();}
function removeDep(did){const p=getP(selId);setP(selId,{deps:(p.deps||[]).filter(d=>d!==did)});renderDeps();}

/* ── @MENÇÕES E #TAGS — sistema universal (funciona em qualquer campo de texto do sistema) ── */

// Coleta todas as #tags já usadas em qualquer lugar (notas, descrição, status atual, comentários)
function getAllTags(){
  const set=new Set();
  const re=/#(\w+)/g;
  projects.forEach(p=>{
    const texts=[p.notes,p.desc,...(p.blockers||[]),...(p.comments||[]).map(c=>c.text)];
    texts.forEach(t=>{
      if(!t)return;
      let m;while((m=re.exec(t)))set.add(m[1]);
    });
  });
  return[...set].sort();
}

// Destaca @menções (ambar, com card ao passar o mouse) e #tags (azul, clicável) em texto exibido
function highlightMentionsAndTags(text){
  const esc=(text||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const escRe=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const names=getPeople().map(p=>p.name).filter(Boolean).sort((a,b)=>b.length-a.length);

  // PASSO 1: reconhece @NomeCompleto (pessoas cadastradas), usa tokens temporários pra não
  // ser reprocessado no passo 2 (senão "@Ageu Doria" viraria "@Ageu" destacado + "Doria" solto)
  const placeholders=[];
  let work=esc;
  if(names.length){
    const namePattern=names.map(escRe).join("|");
    work=work.replace(new RegExp("@("+namePattern+")","g"),(m,name)=>{
      const safe=name.replace(/'/g,"\\'");
      const html=`<span class="mention-chip" style="color:#E2A968;font-weight:600;cursor:default;border-bottom:1px dotted rgba(226,169,104,.5)" onmouseenter="showPersonCard(event,'${safe}')" onmouseleave="hidePersonCard()">@${name}</span>`;
      const token="\u0000"+placeholders.length+"\u0000";
      placeholders.push(html);
      return token;
    });
  }

  // PASSO 2: #tags e @menções que não bateram com nenhum nome cadastrado (texto livre)
  work=work.replace(/([@#])(\w+)/g,(m,sym,word)=>{
    if(sym==="#")return`<span style="color:#5FA8B0;font-weight:600;cursor:pointer" onclick="event.stopPropagation();searchByTag('${word}')">#${word}</span>`;
    return`<span style="color:#E2A968;font-weight:600">@${word}</span>`;
  });

  // Restaura os cards de menção reconhecidos
  work=work.replace(/\u0000(\d+)\u0000/g,(m,i)=>placeholders[+i]);
  return work;
}
// Alias — mantém compatibilidade com o nome usado nos comentários
function highlightMentions(text){return highlightMentionsAndTags(text);}

/* ── Card flutuante com dados da pessoa, ao passar o mouse numa @menção ── */
let _personCardTimer=null;
function showPersonCard(e,name){
  clearTimeout(_personCardTimer);
  const el=e.currentTarget;
  _personCardTimer=setTimeout(()=>{
    const p=getPeople().find(pp=>pp.name===name);
    if(!p)return;
    let card=document.getElementById("personCard");
    if(!card){
      card=document.createElement("div");
      card.id="personCard";
      card.style.cssText="position:fixed;z-index:10000;background:#1C1D28;border:1px solid rgba(85,86,106,.4);border-radius:8px;box-shadow:0 10px 28px rgba(0,0,0,.55);padding:10px 14px;font-family:'Inter',sans-serif;pointer-events:none;max-width:240px";
      document.body.appendChild(card);
    }
    const orgLabel={vm:"Valemobi",ag:"Ágora",br:"Bradesco"}[p.org]||p.org||"";
    card.innerHTML=`<div style="font-size:12px;font-weight:700;color:#EDEDF0;margin-bottom:2px">${p.name}</div>
      <div style="font-size:11px;color:#8B8D9B">${p.role||"Cargo não informado"}</div>
      ${orgLabel?`<div style="font-size:9px;color:#55566A;margin-top:5px;text-transform:uppercase;letter-spacing:.4px">${orgLabel}</div>`:""}`;
    const rect=el.getBoundingClientRect();
    card.style.left=Math.round(rect.left)+"px";
    card.style.top=Math.round(rect.bottom+6)+"px";
    card.style.display="block";
  },1200);
}
function hidePersonCard(){
  clearTimeout(_personCardTimer);
  const card=document.getElementById("personCard");
  if(card)card.style.display="none";
}

function searchByTag(tag){
  const bar=document.getElementById("searchBar");
  if(bar){bar.value="#"+tag;bar.focus();}
  globalSearch("#"+tag);
}

// Campos onde o autocomplete de @ e # NUNCA deve disparar (e-mail, senha, busca, etc.)
function _sugExcluded(el){
  if(!el)return true;
  const tag=(el.tagName||"").toLowerCase();
  if(tag!=="textarea"&&tag!=="input")return true;
  if(el.type&&["email","password","number","date","search"].includes(el.type))return true;
  if(el.id==="searchBar")return true;
  const idn=(el.id||"")+" "+(el.name||"")+" "+(el.placeholder||"");
  if(/e-?mail/i.test(idn))return true;
  if(el.classList?.contains("no-suggest"))return true;
  return false;
}

let _sugState=null; // {type,el,triggerStart,items,activeIdx}

function _sugBox(){
  let box=document.getElementById("sugBox");
  if(!box){
    box=document.createElement("div");
    box.id="sugBox";
    box.style.cssText="position:fixed;z-index:9999;background:#1C1D28;border:1px solid rgba(85,86,106,.4);border-radius:8px;box-shadow:0 10px 28px rgba(0,0,0,.55);max-height:220px;overflow-y:auto;display:none;font-family:'Inter',sans-serif";
    document.body.appendChild(box);
  }
  return box;
}
function _sugClose(){
  const box=document.getElementById("sugBox");
  if(box)box.style.display="none";
  _sugState=null;
}
function _sugHighlight(){
  const box=document.getElementById("sugBox");if(!box||!_sugState)return;
  [...box.children].forEach((c,i)=>{c.style.background=i===_sugState.activeIdx?"rgba(217,142,63,.15)":"transparent";});
}
function _sugShow(el,type,query,triggerStart){
  let items=[];
  if(type==="@"){
    const q=query.toLowerCase();
    items=getPeople().filter(p=>p.name.toLowerCase().includes(q)).slice(0,8)
      .map(p=>({label:"@"+p.name,sub:p.role||"",insert:"@"+p.name+" "}));
    if(query&&!getPeople().some(p=>p.name.toLowerCase()===q)){
      items.push({label:"@"+query,sub:"+ cadastrar pessoa",isNewPerson:true,newPersonName:query});
    }
  } else {
    const q=query.toLowerCase();
    const allTags=getAllTags();
    items=allTags.filter(t=>t.toLowerCase().includes(q)).slice(0,7).map(t=>({label:"#"+t,sub:"",insert:"#"+t+" "}));
    if(query&&!allTags.some(t=>t.toLowerCase()===q)){
      items.push({label:"#"+query,sub:"nova tag",insert:"#"+query+" "});
    }
  }
  if(!items.length){_sugClose();return;}
  const box=_sugBox();
  box.innerHTML=items.map((it,i)=>
    `<div data-idx="${i}" style="padding:7px 12px;cursor:pointer;font-size:12px;color:#EDEDF0;display:flex;justify-content:space-between;gap:10px;white-space:nowrap" onmousedown="event.preventDefault();_sugSelect(${i})">
      <span>${it.label}</span>${it.sub?`<span style="color:#55566A;font-size:10px">${it.sub}</span>`:""}
    </div>`
  ).join("");
  _sugState={type,el,triggerStart,items,activeIdx:0};
  const rect=el.getBoundingClientRect();
  box.style.left=Math.round(rect.left)+"px";
  box.style.top=Math.round(rect.bottom+4)+"px";
  box.style.minWidth=Math.min(320,Math.max(180,rect.width))+"px";
  box.style.display="block";
  _sugHighlight();
}
function _sugSelect(idx){
  if(!_sugState)return;
  const it=_sugState.items[idx];const el=_sugState.el;
  if(it.isNewPerson){
    const triggerStart=_sugState.triggerStart,caret=el.selectionStart;
    _sugClose();
    _openNewPersonModal(it.newPersonName,el,triggerStart,caret);
    return;
  }
  const val=el.value;const caret=el.selectionStart;
  const before=val.slice(0,_sugState.triggerStart);const after=val.slice(caret);
  el.value=before+it.insert+after;
  const newCaret=(before+it.insert).length;
  el.focus();el.setSelectionRange(newCaret,newCaret);
  _sugClose();
  el.dispatchEvent(new Event("input",{bubbles:true}));
}

/* ── Cadastro rápido de pessoa nova a partir de uma @menção ── */
let _pendingMention=null;
function _openNewPersonModal(name,el,triggerStart,caret){
  _pendingMention={el,triggerStart,caret};
  let modal=document.getElementById("newPersonModal");
  if(!modal){
    modal=document.createElement("div");
    modal.id="newPersonModal";
    modal.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10001;display:flex;align-items:center;justify-content:center;padding:20px";
    document.body.appendChild(modal);
  }
  const cap=name.charAt(0).toUpperCase()+name.slice(1);
  modal.innerHTML=`<div style="background:#1C1D28;border:1px solid rgba(85,86,106,.3);border-radius:12px;padding:22px;width:min(380px,100%);box-shadow:0 12px 32px rgba(0,0,0,.7)">
    <div style="font-size:14px;font-weight:700;color:#EDEDF0;margin-bottom:14px">✨ Cadastrar nova pessoa</div>
    <label style="font-size:10px;font-weight:700;color:#8B8D9B;text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:4px">Nome completo</label>
    <input id="npName" class="mef-inp" value="${cap.replace(/"/g,"&quot;")}" style="width:100%;margin-bottom:10px;box-sizing:border-box">
    <label style="font-size:10px;font-weight:700;color:#8B8D9B;text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:4px">Cargo</label>
    <input id="npRole" class="mef-inp" placeholder="Ex: Analista de Negócios" style="width:100%;margin-bottom:10px;box-sizing:border-box">
    <label style="font-size:10px;font-weight:700;color:#8B8D9B;text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:4px">Organização</label>
    <select id="npOrg" class="mef-inp" style="width:100%;margin-bottom:16px;box-sizing:border-box">
      <option value="vm">Valemobi</option><option value="ag">Ágora</option><option value="br">Bradesco</option>
    </select>
    <div style="display:flex;gap:8px">
      <button onclick="_confirmNewPerson()" style="flex:1;background:linear-gradient(90deg,#D98E3F,#B5701F);border:none;color:#fff;padding:10px;border-radius:7px;font-size:13px;font-weight:700;cursor:pointer">Cadastrar e mencionar</button>
      <button onclick="_closeNewPersonModal()" style="flex:1;background:none;border:1px solid rgba(85,86,106,.3);color:#8B8D9B;padding:10px;border-radius:7px;font-size:13px;cursor:pointer">Cancelar</button>
    </div>
  </div>`;
  modal.style.display="flex";
  setTimeout(()=>{document.getElementById("npName")?.focus();document.getElementById("npName")?.select();},50);
}
function _closeNewPersonModal(){
  const modal=document.getElementById("newPersonModal");
  if(modal)modal.style.display="none";
  _pendingMention=null;
}
async function _confirmNewPerson(){
  const name=(document.getElementById("npName")?.value||"").trim();
  const role=(document.getElementById("npRole")?.value||"").trim();
  const org=document.getElementById("npOrg")?.value||"vm";
  if(!name){showToast("Nome obrigatório","");return;}
  const list=[...getPeople(),{org,name,role,color:"#0284c7"}];
  await saveMenuData("people",list);
  if(_pendingMention){
    const{el,triggerStart,caret}=_pendingMention;
    const val=el.value;
    const before=val.slice(0,triggerStart);const after=val.slice(caret);
    const insert="@"+name+" ";
    el.value=before+insert+after;
    const newCaret=(before+insert).length;
    el.focus();el.setSelectionRange(newCaret,newCaret);
    el.dispatchEvent(new Event("input",{bubbles:true}));
  }
  _closeNewPersonModal();
  showToast("✅ Pessoa cadastrada",name);
}

document.addEventListener("input",e=>{
  const el=e.target;
  if(_sugExcluded(el)){if(_sugState)_sugClose();return;}
  const val=el.value;const caret=el.selectionStart;
  let triggerStart=-1,type=null;
  const isWordChar=c=>c!==undefined&&/[\wÀ-ÿ]/.test(c);
  for(let i=caret-1;i>=0;i--){
    const ch=val[i];
    if(ch===" "||ch==="\n"||ch==="\t")break;
    if(ch==="@"||ch==="#"){
      const prev=val[i-1];
      // Só NÃO é início válido de menção se vier logo depois de uma letra/número
      // (esse é o caso real de e-mail, ex: nome@dominio). Qualquer pontuação
      // (parênteses, vírgula, aspas, etc.) antes do @/# é um início válido.
      if(i===0||!isWordChar(prev)){triggerStart=i;type=ch;}
      break;
    }
  }
  if(triggerStart<0){_sugClose();return;}
  const query=val.slice(triggerStart+1,caret);
  if(/\s/.test(query)){_sugClose();return;}
  _sugShow(el,type,query,triggerStart);
});
document.addEventListener("keydown",e=>{
  if(!_sugState)return;
  const box=document.getElementById("sugBox");
  if(!box||box.style.display==="none")return;
  if(e.key==="ArrowDown"){e.preventDefault();e.stopPropagation();_sugState.activeIdx=(_sugState.activeIdx+1)%_sugState.items.length;_sugHighlight();}
  else if(e.key==="ArrowUp"){e.preventDefault();e.stopPropagation();_sugState.activeIdx=(_sugState.activeIdx-1+_sugState.items.length)%_sugState.items.length;_sugHighlight();}
  else if(e.key==="Enter"||e.key==="Tab"){e.preventDefault();e.stopPropagation();_sugSelect(_sugState.activeIdx);}
  else if(e.key==="Escape"){e.preventDefault();e.stopPropagation();_sugClose();}
},true);
document.addEventListener("click",e=>{
  if(!e.target.closest||!e.target.closest("#sugBox"))_sugClose();
});
document.addEventListener("scroll",()=>{if(_sugState)_sugClose();},true);
function renderComments(){
  const p=getP(selId);if(!p)return;
  const comments=[...(p.comments||[])].sort((a,b)=>a.ts-b.ts);
  const people=getPeople();
  const namesDatalist=people.map(pe=>`<option value="@${pe.name.split(' ')[0]}">`).join('');
  let h=`<div id="cmtList" style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;max-height:360px;overflow-y:auto">
    ${comments.length?comments.map(c=>{
      const isMine=currentUser&&c.author===currentUser.name;
      const fmt=new Date(c.ts).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
      return`<div style="background:rgba(255,255,255,.03);border:1px solid rgba(85,86,106,.25);border-radius:8px;padding:9px 11px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
          <span style="font-size:11px;font-weight:600;color:#EDEDF0">${c.author||'—'}</span>
          <span style="font-size:9px;color:#8B8D9B">${fmt}</span>
        </div>
        <div style="font-size:12px;color:#D6D7E0;white-space:pre-wrap;line-height:1.5">${highlightMentions(c.text)}</div>
        ${isMine?`<button onclick="deleteComment('${c.id}')" style="margin-top:5px;background:none;border:none;color:#8B8D9B;font-size:10px;cursor:pointer;padding:0">🗑 Excluir</button>`:''}
      </div>`;
    }).join(''):'<div style="font-size:11px;color:#55566A;text-align:center;padding:16px 0">Nenhum comentário ainda.</div>'}
  </div>
  <datalist id="cmtMentionList">${namesDatalist}</datalist>
  <textarea id="cmtInput" placeholder="Escreva um comentário… use @nome para mencionar alguém" style="width:100%;min-height:60px;background:rgba(20,21,31,.6);border:1px solid rgba(85,86,106,.35);color:#EDEDF0;border-radius:8px;padding:8px 10px;font-size:12px;font-family:inherit;resize:vertical"></textarea>
  <div style="display:flex;justify-content:flex-end;margin-top:6px">
    <button onclick="addComment()" style="background:rgba(217,142,63,.15);border:1px solid rgba(217,142,63,.4);color:#E2A968;padding:6px 14px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer">Comentar</button>
  </div>`;
  document.getElementById('tCmt').innerHTML=h;
  const list=document.getElementById('cmtList');if(list)list.scrollTop=list.scrollHeight;
}
function addComment(){
  const inp=document.getElementById('cmtInput');
  const text=(inp?.value||'').trim();
  if(!text)return;
  const p=getP(selId);if(!p)return;
  const comment={id:'c'+Date.now()+Math.random().toString(36).slice(2,6),author:currentUser?.name||'Anônimo',text,ts:Date.now()};
  setP(selId,{comments:[...(p.comments||[]),comment]});
  logActivity('Comentário adicionado',text.slice(0,60),selId,p.name);
  renderComments();
}
function deleteComment(cid){
  const p=getP(selId);if(!p)return;
  if(!confirm('Excluir este comentário?\n\nEle vai para a lixeira e pode ser restaurado.'))return;
  const c=(p.comments||[]).find(x=>x.id===cid);
  if(c)trashPush('comment',`"${(c.text||'').slice(0,50)}${(c.text||'').length>50?'…':''}" em ${p.name}`,{projectId:p.id,comment:JSON.parse(JSON.stringify(c))});
  setP(selId,{comments:(p.comments||[]).filter(c=>c.id!==cid)});
  renderComments();
  showToast('🗑 Movido para a lixeira','Pode ser restaurado.');
}

// ── SINCRONIZAÇÃO PERIÓDICA (30s) ─────────────────────
// Antes este bloco lia remote[0]?.updated_at — ou seja, procurava o campo
// updated_at DENTRO do primeiro projeto do array, onde ele nunca existe
// (updated_at é coluna da linha no banco, não campo do projeto). Resultado:
// a comparação sempre dava 0 e a atualização automática nunca acontecia.
// Agora consultamos o updated_at real da linha via sbGetMeta.
setInterval(async()=>{
  if(document.hidden)return;
  try{
    const serverVersion=await sbGetMeta('projects');
    if(!serverVersion)return;
    if(remoteVersions['projects']&&serverVersion===remoteVersions['projects'])return; // nada mudou
    const remote=await sbGet('projects');
    if(remote?.length){
      projects=remote;lsSet('projects',projects);
      noteRemoteVersion('projects',serverVersion);
      renderBoard();renderStats();
      const now=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      setSbBadge('synced',`☁ Atualizado às ${now} <span class="sync-dot active"></span>`);
    }
  }catch(e){vlWarn('polling de sincronização',e);}
},30000);


/* ── AUTH & USERS ────────────────────────────────────── */
let currentUser = null;

// Autenticação agora é feita pelo Supabase Auth (ver funções sbAuthRequest /
// doLogin / doRegister abaixo). As funções RPC antigas (login_user,
// register_user, update_last_login) e o hash SHA-256 caseiro foram removidos:
// o Supabase Auth cuida do armazenamento seguro da senha (bcrypt) e emite o
// token que o RLS usa para reconhecer o usuário.

function showLogin(){
  document.getElementById('loginForm').style.display='block';
  document.getElementById('registerForm').style.display='none';
  document.getElementById('loginErr').textContent='';
}
function showRegister(){
  document.getElementById('loginForm').style.display='none';
  document.getElementById('registerForm').style.display='block';
  document.getElementById('regErr').textContent='';
}

/* ── AUTENTICAÇÃO VIA SUPABASE AUTH ─────────────────────
   Antes o login era caseiro (senha verificada por função no banco,
   sessão só no navegador) — o Supabase não sabia que havia alguém
   logado, o que tornava impossível proteger os dados com RLS.
   Agora usamos o Auth nativo: o login devolve um token real, que é
   enviado em cada requisição e reconhecido pelas políticas de RLS. */

function sbAuthToken(){
  const s=lsGet('sbSession');
  if(!s?.access_token)return null;
  // Se expirou, o refresh acontece em sbRefreshIfNeeded (chamado no boot e periodicamente)
  return s.access_token;
}

async function sbAuthRequest(endpoint,body){
  const r=await fetch(`${SB_URL}/auth/v1/${endpoint}`,{
    method:'POST',
    headers:{'apikey':SB_KEY,'Content-Type':'application/json'},
    body:JSON.stringify(body),
  });
  const data=await r.json().catch(()=>({}));
  return{ok:r.ok,status:r.status,data};
}

function saveAuthSession(data){
  const sess={
    access_token:data.access_token,
    refresh_token:data.refresh_token,
    expires_at:Date.now()+((data.expires_in||3600)*1000),
    user:{
      id:data.user?.id,
      email:data.user?.email,
      name:data.user?.user_metadata?.name||data.user?.email?.split('@')[0]||'Usuário',
      role:data.user?.user_metadata?.role||'user',
    },
  };
  lsSet('sbSession',sess);
  currentUser=sess.user;
  return sess;
}

async function sbRefreshIfNeeded(){
  const s=lsGet('sbSession');
  if(!s?.refresh_token)return false;
  // Renova se falta menos de 5 minutos para expirar
  if(s.expires_at&&s.expires_at-Date.now()>5*60*1000){
    currentUser=s.user;
    return true;
  }
  const{ok,data}=await sbAuthRequest('token?grant_type=refresh_token',{refresh_token:s.refresh_token});
  if(ok&&data.access_token){saveAuthSession(data);return true;}
  vlWarn('renovar sessão',data?.error_description||data?.msg||'falha no refresh');
  lsSet('sbSession',null);
  return false;
}

async function doLogin(){
  const email=(document.getElementById('loginEmail')?.value||'').trim().toLowerCase();
  const pass=document.getElementById('loginPass')?.value||'';
  const errEl=document.getElementById('loginErr');
  if(!email||!pass){errEl.textContent='Preencha e-mail e senha.';return;}
  errEl.textContent='Verificando…';
  const{ok,data}=await sbAuthRequest('token?grant_type=password',{email,password:pass});
  if(!ok||!data.access_token){
    const msg=(data?.error_description||data?.msg||'').toLowerCase();
    errEl.textContent=msg.includes('invalid')?'E-mail ou senha incorretos.'
      :msg.includes('confirm')?'Conta ainda não confirmada. Fale com o administrador.'
      :'Não foi possível entrar. Tente novamente.';
    vlWarn('login',data?.error_description||data?.msg||'credenciais inválidas');
    return;
  }
  saveAuthSession(data);
  errEl.textContent='';
  loginSuccess();
}

async function doRegister(){
  const name=(document.getElementById('regName')?.value||'').trim();
  const email=(document.getElementById('regEmail')?.value||'').trim().toLowerCase();
  const pass=document.getElementById('regPass')?.value||'';
  const errEl=document.getElementById('regErr');
  if(!name||!email||!pass){errEl.textContent='Preencha todos os campos.';return;}
  if(pass.length<6){errEl.textContent='Senha deve ter ao menos 6 caracteres.';return;}
  errEl.textContent='Criando conta…';
  const{ok,data}=await sbAuthRequest('signup',{email,password:pass,data:{name}});
  if(!ok){
    const msg=(data?.error_description||data?.msg||data?.message||'').toLowerCase();
    errEl.textContent=msg.includes('already')?'E-mail já cadastrado.':'Erro ao criar conta: '+(data?.msg||data?.message||'tente novamente');
    vlWarn('cadastro',data?.msg||data?.message||'falha no signup');
    return;
  }
  if(!data.access_token){
    // Projeto exige confirmação por e-mail
    errEl.textContent='Conta criada. Confirme o e-mail antes de entrar.';
    return;
  }
  saveAuthSession(data);
  logActivity('Conta criada','Novo usuário registrado');
  loginSuccess();
}

function loginSuccess(){
  document.getElementById('loginScreen').style.display='none';
  const u=currentUser||{};
  const avatar=document.getElementById('sbAvatar');
  const uname=document.getElementById('sbUname');
  const urole=document.getElementById('sbUrole');
  if(avatar) avatar.textContent=(u.name||u.email||'?')[0].toUpperCase();
  if(uname) uname.textContent=u.name||u.email||'Usuário';
  if(urole) urole.textContent=u.role==='admin'?'Administrador':'Usuário · RV';
  initApp();
}

async function doLogout(){
  if(!confirm('Sair da plataforma?'))return;
  const s=lsGet('sbSession');
  if(s?.access_token){
    try{
      await fetch(`${SB_URL}/auth/v1/logout`,{method:'POST',
        headers:{'apikey':SB_KEY,'Authorization':'Bearer '+s.access_token}});
    }catch(e){vlWarn('logout no servidor',e);}
  }
  currentUser=null;
  lsSet('sbSession',null);
  lsSet('session',null);
  document.getElementById('loginScreen').style.display='flex';
  const le=document.getElementById('loginEmail');if(le)le.value='';
  const lp=document.getElementById('loginPass');if(lp)lp.value='';
  showLogin();
}

async function checkSession(){
  const ok=await sbRefreshIfNeeded();
  if(ok&&currentUser){loginSuccess();return true;}
  return false;
}

/* ── SIDEBAR ─────────────────────────────────────────── */
function openSidebar(){
  document.getElementById('leftSidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('show');
}
function closeSidebar(){
  document.getElementById('leftSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

/* ── ACTIVITY LOGS ───────────────────────────────────── */
async function logActivity(action,detail='',projectId='',projectName=''){
  if(!currentUser)return;
  try{
    await sbFetch('activity_logs',{method:'POST',
      body:JSON.stringify({
        user_id:currentUser.id||'',
        user_name:currentUser.name||currentUser.email||'',
        action,detail,project_id:projectId,project_name:projectName,
      })});
  }catch(e){vlWarn('registrar log de atividade',e);}
}

function openLogs(){document.getElementById('logsOverlay').classList.add('open');renderLogs();}
function closeLogs(){document.getElementById('logsOverlay').classList.remove('open');}

async function renderLogs(){
  const body=document.getElementById('logsBody');
  body.innerHTML='<div class="jira-loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div> Carregando logs…</div>';
  try{
    const r=await sbFetch('activity_logs?order=created_at.desc&limit=100&select=*');
    const logs=await r.json();
    if(!logs?.length){body.innerHTML='<div style="font-size:11px;color:#55566A;text-align:center;padding:24px">Nenhuma atividade registrada ainda.</div>';return;}
    const cnt=document.getElementById('sbLogCount');
    if(cnt) cnt.textContent=logs.length;
    body.innerHTML=logs.map(l=>{
      const ini=(l.user_name||'?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
      const dt=new Date(l.created_at).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
      return `<div class="log-item">
        <div class="log-avatar">${ini}</div>
        <div class="log-body">
          <div class="log-action"><strong>${l.user_name||'?'}</strong> — ${l.action}</div>
          ${l.detail?`<div class="log-meta">${l.detail}</div>`:''}
          ${l.project_name?`<div class="log-project">📌 ${l.project_name}</div>`:''}
          <div class="log-meta">${dt}</div>
        </div>
      </div>`;
    }).join('');
  }catch(e){body.innerHTML='<div class="jira-err" style="font-size:11px;padding:12px">Erro ao carregar logs: '+e.message+'</div>';}
}

/* ── MICROSOFT 365 CONFIG ────────────────────────────── */
let msConfig = lsGet('msConfig') || {tenantId:'',clientId:'',connected:false};

function openMsConfig(){document.getElementById('msOverlay').classList.add('open');renderMsConfig();}
function closeMsConfig(){document.getElementById('msOverlay').classList.remove('open');}

function renderMsConfig(){
  const body=document.getElementById('msBody');
  body.innerHTML=`
    <div style="font-size:11px;line-height:1.6;color:#8B8D9B;margin-bottom:16px;padding:10px;background:rgba(0,120,212,.08);border-radius:7px;border-left:2px solid #0078d4">
      Integração com Microsoft 365 (Outlook, Calendar, Teams). Requer um App Registration no Azure AD.
      ${msConfig.connected?'<br><strong style="color:#7A9B6B">✅ Conectado</strong>':''}
    </div>

    <div style="font-size:12px;font-weight:700;color:#EDEDF0;margin-bottom:12px">Como configurar (5 min)</div>
    <div style="font-size:11px;color:#8B8D9B;line-height:1.7;margin-bottom:16px;background:rgba(20,21,31,.5);padding:12px;border-radius:7px">
      1. Acesse <a href="https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade" target="_blank" style="color:#E2A968">portal.azure.com</a> → Azure Active Directory → App registrations<br>
      2. <strong style="color:#EDEDF0">New registration</strong> → Nome: "Esteira Valemobi"<br>
      3. Redirect URI: <code style="background:rgba(217,142,63,.1);padding:1px 6px;border-radius:3px;color:#D98E3F">https://brunogranito.github.io/esteira-valemobi/esteira_valemobi_v1.5.html</code><br>
      4. Copie <strong style="color:#EDEDF0">Application (client) ID</strong> e <strong style="color:#EDEDF0">Directory (tenant) ID</strong><br>
      5. Em <strong style="color:#EDEDF0">API permissions</strong> → Add → Microsoft Graph → Delegated:<br>
      &nbsp;&nbsp;&nbsp;• User.Read · Mail.Read · Mail.Send · Calendars.Read · Calendars.ReadWrite
    </div>

    <div class="jira-cfg-row"><span class="jira-cfg-lbl">Tenant ID (Directory ID)</span>
      <input class="jira-inp" id="msTenant" value="${msConfig.tenantId}" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></div>
    <div class="jira-cfg-row"><span class="jira-cfg-lbl">Client ID (Application ID)</span>
      <input class="jira-inp" id="msClient" value="${msConfig.clientId}" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></div>

    <div style="font-size:11px;font-weight:600;color:#EDEDF0;margin:12px 0 8px">Permissões (scopes)</div>
    ${['User.Read — Perfil do usuário','Mail.Read — Ler e-mails','Mail.Send — Enviar e-mails','Calendars.ReadWrite — Eventos e reuniões','Tasks.ReadWrite — Tarefas do Planner'].map(s=>`
      <div class="ms-scope"><input type="checkbox" checked disabled> ${s}</div>`).join('')}

    <button class="ms-btn" onclick="saveMsConfig()">💾 Salvar configuração</button>
    ${msConfig.tenantId&&msConfig.clientId?`<button class="ms-btn" style="background:#7A9B6B;margin-top:6px" onclick="connectMs()">🔐 Conectar com Microsoft</button>`:''}
    <div class="ms-status" id="msStatus"></div>

    <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(85,86,106,.2);font-size:11px;color:#55566A;line-height:1.6">
      <strong style="color:#A5A7B8">O que será possível após conectar:</strong><br>
      • Criar eventos no Outlook para datas de RDM direto do card<br>
      • Enviar e-mails de templates sem sair da plataforma<br>
      • Ver reuniões do dia na Agenda<br>
      • Sincronizar tarefas com Microsoft Planner
    </div>`;
}

function saveMsConfig(){
  msConfig={
    tenantId:(document.getElementById('msTenant')?.value||'').trim(),
    clientId:(document.getElementById('msClient')?.value||'').trim(),
    connected:msConfig.connected,
  };
  lsSet('msConfig',msConfig);
  showToast('✅ Microsoft configurado','IDs salvos. Clique em "Conectar" para autenticar.');
  renderMsConfig();
  logActivity('Microsoft 365 configurado','App Registration salvo');
}

async function connectMs(){
  if(!msConfig.tenantId||!msConfig.clientId){showToast('Configure os IDs','Salve Tenant ID e Client ID primeiro.');return;}
  const redirectUri=encodeURIComponent(window.location.href.split('?')[0]);
  const scopes=encodeURIComponent('User.Read Mail.Read Mail.Send Calendars.ReadWrite Tasks.ReadWrite offline_access');
  const url=`https://login.microsoftonline.com/${msConfig.tenantId}/oauth2/v2.0/authorize?client_id=${msConfig.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&response_mode=query`;
  const st=document.getElementById('msStatus');
  if(st){st.className='ms-status ok';st.textContent='Redirecionando para login Microsoft…';}
  setTimeout(()=>window.open(url,'_blank'),500);
}

// Check URL for MS auth callback
(()=>{
  const params=new URLSearchParams(window.location.search);
  const code=params.get('code');
  if(code){
    msConfig.connected=true;lsSet('msConfig',msConfig);
    showToast('✅ Microsoft conectado!','Autenticação concluída com sucesso.');
    window.history.replaceState({},'',window.location.pathname);
    logActivity('Microsoft 365 conectado','OAuth concluído');
  }
})();


/* ── EDITABLE MENU DATA ──────────────────────────────── */
let menuData = { systems: null, people: null, templates: null };

async function loadMenuData(){
  // Local primeiro (mostra algo na hora), depois busca a versão mais recente do Supabase em segundo plano
  menuData.systems = lsGet('menuSystems') || null;
  menuData.people  = lsGet('menuPeople')  || null;
  menuData.templates = lsGet('menuTemplates') || null;
  try{
    const [sbSystems,sbPeople,sbTemplates]=await Promise.all([
      sbGet('menu_systems'),sbGet('menu_people'),sbGet('menu_templates')
    ]);
    if(sbSystems){menuData.systems=sbSystems;lsSet('menuSystems',sbSystems);}
    if(sbPeople){menuData.people=sbPeople;lsSet('menuPeople',sbPeople);}
    if(sbTemplates){menuData.templates=sbTemplates;lsSet('menuTemplates',sbTemplates);}
    // Re-renderiza caso algum painel que dependa dessas listas já esteja aberto
    if(document.getElementById('menuOverlay')?.classList.contains('open'))renderMenuPanel();
  }catch(e){vlWarn('carregar Sistemas/Pessoas/Templates do Supabase',e);}
}
function getSystems()  { return menuData.systems   || SYSTEMS;   }
function getPeople()   { return menuData.people    || PEOPLE;    }
function getTemplates(){ return menuData.templates || TEMPLATES; }

async function saveMenuData(key, arr){
  const lsKey = {systems:'menuSystems', people:'menuPeople', templates:'menuTemplates'}[key];
  menuData[key] = arr;
  lsSet(lsKey, arr);
  try{ await sbSet('menu_'+key, arr); } catch(e){vlWarn('salvar '+key+' no Supabase',e);}
}

/* ── RENDER MENU PANEL (editable) ────────────────────── */
function openMenuPanel(tab,btnEl){
  if(tab)menuTab=tab;
  const win=document.getElementById('menuOverlay');
  win.classList.remove('minimized');
  win.classList.add('open');
  renderMenuPanel();
  positionUtilityWindow(win,btnEl);
}
function positionUtilityWindow(win,btnEl){
  const winWidth=Math.min(420,window.innerWidth-24);
  if(btnEl){
    const rect=btnEl.getBoundingClientRect();
    let left=rect.left+rect.width/2-winWidth/2;
    left=Math.max(12,Math.min(left,window.innerWidth-winWidth-12));
    win.style.left=left+'px';
    win.style.bottom=(window.innerHeight-rect.top+10)+'px';
  } else {
    win.style.left=((window.innerWidth-winWidth)/2)+'px';
    win.style.bottom='90px';
  }
}
function closeMenuPanel(){document.getElementById('menuOverlay').classList.remove('open','minimized');}
function minimizeMenuPanel(){document.getElementById('menuOverlay').classList.toggle('minimized');}
// Fecha automaticamente ao tirar o mouse de cima (da janela OU do dock que a abriu),
// com uma pequena folga pra não fechar sozinha ao passar rapidamente pela borda/vão entre os dois
let _menuAutoCloseTimer=null;
function _menuScheduleClose(){
  clearTimeout(_menuAutoCloseTimer);
  _menuAutoCloseTimer=setTimeout(()=>{closeMenuPanel();},250);
}
function _menuCancelClose(){clearTimeout(_menuAutoCloseTimer);}
function setMenuTab(t){menuTab=t;renderMenuPanel();}

function renderMenuPanel(){
  const tabs=['sistemas','pessoas','templates'];
  const labels=['🛠 Sistemas & Acessos','👥 Pessoas & Cargos','📧 Templates'];
  document.getElementById('menuTabs').innerHTML=tabs.map((t,i)=>
    `<button class="panel-tab${menuTab===t?' active':''}" onclick="setMenuTab('${t}')">${labels[i]}</button>`).join('');
  const body=document.getElementById('menuBody');
  if(menuTab==='sistemas')   renderMenuSystems(body);
  else if(menuTab==='pessoas') renderMenuPeople(body);
  else renderMenuTemplates(body);
}

// ── SISTEMAS ───────────────────────────────────────────
function renderMenuSystems(body){
  const items=getSystems();
  body.innerHTML=items.map((s,i)=>`
    <div class="sys-item menu-edit-item" id="msys-${i}">
      <div class="sys-name">${s.icon||'🔗'} ${s.name}
        <div class="menu-item-actions">
          <button class="mia-btn" onclick="editSysForm(${i})">✏ Editar</button>
          <button class="mia-btn del" onclick="deleteSys(${i})">🗑</button>
        </div>
      </div>
      <a class="sys-url" href="${s.url}" target="_blank">${s.url}</a>
      ${s.info?`<div style="font-size:10px;color:#8B8D9B;white-space:pre-wrap;margin-bottom:5px">${s.info}</div>`:''}
      <div class="sys-creds">${(s.creds||[]).map(c=>`<span class="cred-pill" onclick="copyClip('${escOnclick(c.v)}')"><span style="color:#55566A">${c.k}:</span> <strong style="color:#A5A7B8">${c.v}</strong> 📋</span>`).join('')}
      ${!(s.creds||[]).length?`<span style="font-size:10px;color:#2C2D3C">Acesso público</span>`:''}</div>
      <div class="menu-edit-form" id="sysform-${i}">
        <span class="mef-lbl">Editar sistema</span>
        <div class="mef-row">
          <input class="mef-inp" id="sf-icon-${i}" value="${s.icon||''}" placeholder="emoji ícone" style="max-width:70px">
          <input class="mef-inp" id="sf-name-${i}" value="${s.name||''}" placeholder="Nome do sistema">
        </div>
        <input class="mef-inp" id="sf-url-${i}" value="${s.url||''}" placeholder="https://..." style="width:100%;margin-bottom:8px">
        <input class="mef-inp" id="sf-info-${i}" value="${s.info||''}" placeholder="Informação adicional (opcional)" style="width:100%;margin-bottom:8px">
        <span class="mef-lbl">Credenciais (formato: Login=valor | Senha=valor)</span>
        <input class="mef-inp" id="sf-creds-${i}" value="${(s.creds||[]).map(c=>c.k+'='+c.v).join(' | ')}" placeholder="Login=usuario | Senha=123" style="width:100%;margin-bottom:8px">
        <div class="mef-actions">
          <button class="mef-save" onclick="saveSys(${i})">✓ Salvar</button>
          <button class="mef-cancel" onclick="closeSysForm(${i})">✕ Cancelar</button>
        </div>
      </div>
    </div>`).join('');
  body.innerHTML += `<div class="menu-add-btn" onclick="addNewSys()">➕ Adicionar sistema</div>
    <div class="menu-edit-form" id="sysform-new" style="margin-top:4px">
      <span class="mef-lbl">Novo sistema</span>
      <div class="mef-row">
        <input class="mef-inp" id="sf-icon-new" placeholder="🔗" style="max-width:70px">
        <input class="mef-inp" id="sf-name-new" placeholder="Nome do sistema">
      </div>
      <input class="mef-inp" id="sf-url-new" placeholder="https://..." style="width:100%;margin-bottom:8px">
      <input class="mef-inp" id="sf-info-new" placeholder="Informação adicional (opcional)" style="width:100%;margin-bottom:8px">
      <input class="mef-inp" id="sf-creds-new" placeholder="Login=usuario | Senha=123" style="width:100%;margin-bottom:8px">
      <div class="mef-actions">
        <button class="mef-save" onclick="confirmAddSys()">✓ Adicionar</button>
        <button class="mef-cancel" onclick="document.getElementById('sysform-new').classList.remove('open')">✕</button>
      </div>
    </div>`;
}
function parseCreds(str){ return str.split('|').map(p=>p.trim()).filter(Boolean).map(p=>{const[k,...v]=p.split('=');return{k:k.trim(),v:v.join('=').trim()};}).filter(c=>c.k&&c.v); }
function editSysForm(i){ document.getElementById('sysform-'+i)?.classList.add('open'); }
function closeSysForm(i){ document.getElementById('sysform-'+i)?.classList.remove('open'); }
function saveSys(i){
  const arr=[...getSystems()];
  arr[i]={icon:document.getElementById('sf-icon-'+i)?.value.trim()||'🔗',name:document.getElementById('sf-name-'+i)?.value.trim()||'',url:document.getElementById('sf-url-'+i)?.value.trim()||'',info:document.getElementById('sf-info-'+i)?.value.trim()||'',creds:parseCreds(document.getElementById('sf-creds-'+i)?.value||'')};
  saveMenuData('systems',arr).then(()=>{renderMenuPanel();showToast('✅ Sistema salvo','');});
}
function deleteSys(i){ if(!confirm('Remover este sistema?'))return; const arr=[...getSystems()]; arr.splice(i,1); saveMenuData('systems',arr).then(()=>renderMenuPanel()); }
function addNewSys(){ document.getElementById('sysform-new')?.classList.add('open'); }
function confirmAddSys(){
  const name=document.getElementById('sf-name-new')?.value.trim();
  if(!name){showToast('Informe o nome','');return;}
  const arr=[...getSystems(),{icon:document.getElementById('sf-icon-new')?.value.trim()||'🔗',name,url:document.getElementById('sf-url-new')?.value.trim()||'',info:document.getElementById('sf-info-new')?.value.trim()||'',creds:parseCreds(document.getElementById('sf-creds-new')?.value||'')}];
  saveMenuData('systems',arr).then(()=>{renderMenuPanel();showToast('✅ Sistema adicionado','');});
}

// ── PESSOAS ────────────────────────────────────────────
function renderMenuPeople(body){
  const items=getPeople();
  const orgs={vm:'Valemobi',ag:'Ágora',br:'Bradesco'};
  const orgCls={vm:'org-vm',ag:'org-ag',br:'org-br'};
  body.innerHTML=`<input class="person-search" id="pSearch" placeholder="Buscar por nome ou cargo..." oninput="filterPeople(this.value)">
    <div id="peopleList">${buildPeopleEditHTML('',items)}</div>
    <div class="menu-add-btn" onclick="toggleAddPersonForm()">➕ Adicionar pessoa</div>
    <div class="menu-edit-form" id="personform-new">
      <span class="mef-lbl">Nova pessoa</span>
      <div class="mef-row">
        <input class="mef-inp" id="pf-name-new" placeholder="Nome completo">
        <input class="mef-inp" id="pf-role-new" placeholder="Cargo / função">
      </div>
      <div class="mef-row">
        <select class="person-org-sel" id="pf-org-new">
          <option value="vm">Valemobi</option><option value="ag">Ágora</option><option value="br">Bradesco</option>
        </select>
        <input class="mef-inp" id="pf-color-new" type="color" value="#B5701F" style="max-width:50px;padding:2px">
      </div>
      <div class="mef-actions">
        <button class="mef-save" onclick="confirmAddPerson()">✓ Adicionar</button>
        <button class="mef-cancel" onclick="document.getElementById('personform-new').classList.remove('open')">✕</button>
      </div>
    </div>`;
}
function buildPeopleEditHTML(q, items){
  const orgs={vm:'Valemobi',ag:'Ágora',br:'Bradesco'};
  const cls={vm:'org-vm',ag:'org-ag',br:'org-br'};
  return items.filter(p=>!q||p.name.toLowerCase().includes(q.toLowerCase())||p.role.toLowerCase().includes(q.toLowerCase()))
    .map((p,i)=>{
      const ini=p.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
      return `<div class="person-item menu-edit-item" style="padding-right:80px">
        <div class="person-avatar" style="background:${p.color||'#B5701F'}">${ini}</div>
        <div class="person-info"><div class="name">${p.name}</div><div class="role">${p.role}</div>
        <span class="org-badge ${cls[p.org]||'org-vm'}">${orgs[p.org]||p.org}</span></div>
        <div class="menu-item-actions">
          <button class="mia-btn" onclick="editPersonInline(${i})">✏</button>
          <button class="mia-btn del" onclick="deletePerson(${i})">🗑</button>
        </div>
      </div>
      <div class="menu-edit-form" id="personform-${i}">
        <div class="mef-row">
          <input class="mef-inp" id="pf-name-${i}" value="${p.name}" placeholder="Nome">
          <input class="mef-inp" id="pf-role-${i}" value="${p.role}" placeholder="Cargo">
        </div>
        <div class="mef-row">
          <select class="person-org-sel" id="pf-org-${i}">
            <option value="vm"${p.org==='vm'?' selected':''}>Valemobi</option>
            <option value="ag"${p.org==='ag'?' selected':''}>Ágora</option>
            <option value="br"${p.org==='br'?' selected':''}>Bradesco</option>
          </select>
          <input class="mef-inp" id="pf-color-${i}" type="color" value="${p.color||'#B5701F'}" style="max-width:50px;padding:2px">
        </div>
        <div class="mef-actions">
          <button class="mef-save" onclick="savePerson(${i})">✓ Salvar</button>
          <button class="mef-cancel" onclick="document.getElementById('personform-${i}').classList.remove('open')">✕</button>
        </div>
      </div>`;
    }).join('');
}
function filterPeople(q){ const el=document.getElementById('peopleList'); if(el)el.innerHTML=buildPeopleEditHTML(q,getPeople()); }
function editPersonInline(i){ document.getElementById('personform-'+i)?.classList.add('open'); }
function savePerson(i){
  const arr=[...getPeople()];
  arr[i]={name:document.getElementById('pf-name-'+i)?.value.trim()||arr[i].name,role:document.getElementById('pf-role-'+i)?.value.trim()||arr[i].role,org:document.getElementById('pf-org-'+i)?.value||arr[i].org,color:document.getElementById('pf-color-'+i)?.value||arr[i].color};
  saveMenuData('people',arr).then(()=>{renderMenuPanel();showToast('✅ Pessoa salva','');});
}
function deletePerson(i){ if(!confirm('Remover esta pessoa?'))return; const arr=[...getPeople()]; arr.splice(i,1); saveMenuData('people',arr).then(()=>renderMenuPanel()); }
function toggleAddPersonForm(){ document.getElementById('personform-new')?.classList.toggle('open'); }
function confirmAddPerson(){
  const name=document.getElementById('pf-name-new')?.value.trim();
  if(!name){showToast('Informe o nome','');return;}
  const arr=[...getPeople(),{name,role:document.getElementById('pf-role-new')?.value.trim()||'',org:document.getElementById('pf-org-new')?.value||'vm',color:document.getElementById('pf-color-new')?.value||'#B5701F'}];
  saveMenuData('people',arr).then(()=>{renderMenuPanel();showToast('✅ Pessoa adicionada','');});
}

// ── TEMPLATES ──────────────────────────────────────────
function renderMenuTemplates(body){
  const items=getTemplates();
  body.innerHTML=items.map((t,i)=>`
    <div class="tpl-item menu-edit-item" id="mtpl-${i}" style="cursor:default;padding-right:80px">
      <div class="tpl-name" onclick="openTplModalIdx(${i})" style="cursor:pointer">📄 ${t.name}</div>
      <div class="tpl-desc">${t.desc}</div>
      <div class="menu-item-actions">
        <button class="mia-btn" onclick="editTplForm(${i})">✏ Editar</button>
        <button class="mia-btn del" onclick="deleteTpl(${i})">🗑</button>
      </div>
      <div class="menu-edit-form" id="tplform-${i}">
        <span class="mef-lbl">Editar template</span>
        <input class="mef-inp" id="tf-name-${i}" value="${t.name.replace(/"/g,'&quot;')}" placeholder="Nome do template" style="width:100%;margin-bottom:8px">
        <input class="mef-inp" id="tf-desc-${i}" value="${(t.desc||'').replace(/"/g,'&quot;')}" placeholder="Descrição curta" style="width:100%;margin-bottom:8px">
        <span class="mef-lbl">Corpo do template</span>
        <textarea class="mef-area" id="tf-body-${i}">${t.body||''}</textarea>
        <div class="mef-actions">
          <button class="mef-save" onclick="saveTpl(${i})">✓ Salvar</button>
          <button class="mef-cancel" onclick="document.getElementById('tplform-${i}').classList.remove('open')">✕</button>
        </div>
      </div>
    </div>`).join('');
  body.innerHTML+=`<div class="menu-add-btn" onclick="toggleAddTplForm()">➕ Adicionar template</div>
    <div class="menu-edit-form" id="tplform-new">
      <span class="mef-lbl">Novo template</span>
      <input class="mef-inp" id="tf-name-new" placeholder="Nome do template" style="width:100%;margin-bottom:8px">
      <input class="mef-inp" id="tf-desc-new" placeholder="Descrição curta" style="width:100%;margin-bottom:8px">
      <span class="mef-lbl">Corpo do template</span>
      <textarea class="mef-area" id="tf-body-new"></textarea>
      <div class="mef-actions">
        <button class="mef-save" onclick="confirmAddTpl()">✓ Adicionar</button>
        <button class="mef-cancel" onclick="document.getElementById('tplform-new').classList.remove('open')">✕</button>
      </div>
    </div>`;
}
function openTplModalIdx(i){ openTplModal(i); } // proxy to existing
function editTplForm(i){ document.getElementById('tplform-'+i)?.classList.add('open'); }
function saveTpl(i){
  const arr=[...getTemplates()];
  arr[i]={name:document.getElementById('tf-name-'+i)?.value.trim()||arr[i].name,desc:document.getElementById('tf-desc-'+i)?.value.trim()||'',body:document.getElementById('tf-body-'+i)?.value||''};
  saveMenuData('templates',arr).then(()=>{renderMenuPanel();showToast('✅ Template salvo','');});
}
function deleteTpl(i){ if(!confirm('Remover este template?'))return; const arr=[...getTemplates()]; arr.splice(i,1); saveMenuData('templates',arr).then(()=>renderMenuPanel()); }
function toggleAddTplForm(){ document.getElementById('tplform-new')?.classList.toggle('open'); }
function confirmAddTpl(){
  const name=document.getElementById('tf-name-new')?.value.trim();
  if(!name){showToast('Informe o nome','');return;}
  const arr=[...getTemplates(),{name,desc:document.getElementById('tf-desc-new')?.value.trim()||'',body:document.getElementById('tf-body-new')?.value||''}];
  saveMenuData('templates',arr).then(()=>{renderMenuPanel();showToast('✅ Template adicionado','');});
}
// Fix openTplModal to use getTemplates()
function openTplModal(i){
  _menuCancelClose(); // abrir este modal por cima não deve fechar a janela de Referências por trás
  const items=getTemplates();
  const t=items[i];if(!t)return;
  const bg=document.createElement('div');bg.className='modal-bg open';bg.style.zIndex='4100';
  bg.innerHTML=`<div class="modal" style="max-width:560px">
    <div class="mhd"><div class="mhd-top">
      <div><div class="mname" style="font-size:14px">${t.name}</div><div style="font-size:11px;color:#8B8D9B">${t.desc}</div></div>
      <button class="close-btn" onclick="this.closest('.modal-bg').remove()">×</button>
    </div></div>
    <div class="mbody">
      <textarea class="ea" rows="18" id="tplTa" style="font-family:monospace;font-size:11px;border-radius:6px;border:1px solid rgba(85,86,106,.3)">${t.body}</textarea>
      <button class="btn-s" style="margin-top:8px;width:100%" onclick="copyClip(document.getElementById('tplTa').value);this.textContent='✅ Copiado!';setTimeout(()=>this.textContent='📋 Copiar',2000)">📋 Copiar</button>
    </div></div>`;
  bg.addEventListener('click',e=>{if(e.target===bg)bg.remove();});
  document.body.appendChild(bg);
  _menuCancelClose(); // o appendChild acima pode gerar um mouseleave sintético na janela por trás; cancela de novo, agora que já aconteceu
  setTimeout(_menuCancelClose,0);
}

/* ── GLOBAL SEARCH ───────────────────────────────────── */
let searchTimeout=null;
let reportFilters={geral:"",stage:"",andamento:"",status:"",checklist:"",semanal:""};
// Checagem de match usada tanto pelos relatórios em tela quanto no PDF exportado —
// cobre palavra livre, @pessoa e #tag, já que essas aparecem como texto normal
function matchesReportFilter(p,q){
  if(!q)return true;
  const lq=q.toLowerCase();
  const st=STAGES.find(s=>s.id===p.stage);
  const prio=PRIO[p.priority];
  const hay=[
    p.name,p.code,p.notes,p.desc,p.owner,p.dev,p.qa,
    st?.label,prio?.label,
    ...(p.blockers||[]),
    ...(p.comments||[]).map(c=>c.text),
  ].filter(Boolean).join(" ").toLowerCase();
  return hay.includes(lq);
}
function setReportFilter(type,v){
  reportFilters[type]=v;
  renderReports();
}
function filterBoxHtml(type,label){
  const val=reportFilters[type]||"";
  return`<div style="margin:2px 0 12px">
    <input id="rptFilterInp-${type}" class="mef-inp no-suggest" placeholder="🔎 Filtrar ${label} — palavra, @pessoa ou #tag…"
      value="${val.replace(/"/g,"&quot;")}" oninput="setReportFilter('${type}',this.value)" style="width:100%;box-sizing:border-box;font-size:11px;padding:6px 10px">
    ${val?`<div style="font-size:9px;color:#8B8D9B;margin-top:4px">Filtro: <strong style="color:#E2A968">"${val}"</strong> · aplica-se também ao PDF <button onclick="setReportFilter('${type}','')" style="background:none;border:none;color:#8B8D9B;text-decoration:underline;cursor:pointer;font-size:9px;margin-left:4px">limpar</button></div>`:""}
  </div>`;
}
function globalSearch(q){
  q=(q||'').trim();
  if(searchTimeout) clearTimeout(searchTimeout);
  if(!q||q.length<2){closeSearch();return;}
  searchTimeout=setTimeout(()=>runSearch(q),250);
}
function closeSearch(){
  const el=document.getElementById('searchResults');
  if(el){el.classList.remove('show');el.innerHTML='';}
}
function highlight(str,q){
  if(!str||!q)return str||'';
  const re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
  return String(str).replace(re,'<mark style="background:rgba(217,142,63,.3);color:#D98E3F;border-radius:2px">$1</mark>');
}

function runSearch(q){
  const lq=q.toLowerCase();
  const results={cards:[],tasks:[],meetings:[],systems:[],people:[],templates:[]};

  // CARDS — name, code, notes, desc, blockers, comments
  projects.filter(p=>!p.archived).forEach(p=>{
    const hits=[p.name,p.code,p.notes,p.desc,...(p.blockers||[]),...(p.comments||[]).map(c=>c.text)].some(f=>f&&f.toLowerCase().includes(lq));
    if(hits) results.cards.push({id:p.id,title:p.name,sub:p.code+' · '+(p.notes||'').substring(0,60),stage:p.stage});
  });

  // TASKS — checklist items
  projects.filter(p=>!p.archived).forEach(p=>{
    const allSecs=Object.values(CL).flat();
    allSecs.forEach(sec=>(sec.t||[]).forEach(t=>{
      const txt=(p.taskText||{})[t.id]||t.tx||'';
      if(txt.toLowerCase().includes(lq)) results.tasks.push({pid:p.id,pname:p.name,text:txt});
    }));
    Object.values(p.customTasks||{}).flat().forEach(ct=>{
      if((ct.tx||'').toLowerCase().includes(lq)) results.tasks.push({pid:p.id,pname:p.name,text:ct.tx});
    });
  });

  // REUNIÕES
  projects.filter(p=>!p.archived).forEach(p=>{
    (p.meetings||[]).forEach(m=>{
      if([m.notes,m.decisions,m.participants].some(f=>f&&f.toLowerCase().includes(lq))){
        results.meetings.push({pid:p.id,pname:p.name,date:m.date,notes:(m.notes||'').substring(0,80)});
      }
    });
  });

  // SISTEMAS
  getSystems().forEach((s,i)=>{
    if([s.name,s.url,s.info,...(s.creds||[]).map(c=>c.k+' '+c.v)].some(f=>f&&f.toLowerCase().includes(lq))){
      results.systems.push({i,name:s.name,url:s.url});
    }
  });

  // PESSOAS
  getPeople().forEach((p,i)=>{
    if([p.name,p.role].some(f=>f&&f.toLowerCase().includes(lq))){
      results.people.push({i,name:p.name,role:p.role,org:p.org});
    }
  });

  // TEMPLATES
  getTemplates().forEach((t,i)=>{
    if([t.name,t.desc,t.body].some(f=>f&&f.toLowerCase().includes(lq))){
      results.templates.push({i,name:t.name,desc:t.desc});
    }
  });

  renderSearchResults(q, results);
}

function renderSearchResults(q, r){
  const el=document.getElementById('searchResults');
  if(!el)return;

  const total=Object.values(r).reduce((s,a)=>s+a.length,0);
  if(!total){
    el.innerHTML=`<div class="sr-empty">Nenhum resultado para "<strong>${q}</strong>"</div>`;
    positionSearchResults();
    el.classList.add('show');
    return;
  }

  let h='';

  if(r.cards.length){
    h+=`<div class="sr-section">🃏 Cards (${r.cards.length})</div>`;
    r.cards.slice(0,5).forEach(c=>{
      const st=STAGES.find(s=>s.id===c.stage);
      h+=`<div class="sr-item" onclick="closeSearch();document.getElementById('searchBar').value='';openModal('${c.id}')">
        <span class="sr-icon">🃏</span>
        <div><div class="sr-title">${highlight(c.title,q)} <span class="sr-badge" style="background:${st?.color||'#55566A'}20;color:${st?.color||'#A5A7B8'}">${st?.icon||''} ${st?.label||''}</span></div>
        <div class="sr-sub">${highlight(c.sub,q)}</div></div>
      </div>`;
    });
  }

  if(r.tasks.length){
    h+=`<div class="sr-section">✅ Tarefas (${r.tasks.length})</div>`;
    r.tasks.slice(0,4).forEach(t=>{
      h+=`<div class="sr-item" onclick="closeSearch();document.getElementById('searchBar').value='';openModal('${t.pid}');setTimeout(()=>sw('check'),200)">
        <span class="sr-icon">✅</span>
        <div><div class="sr-title">${t.pname}</div><div class="sr-sub">${highlight(t.text,q)}</div></div>
      </div>`;
    });
  }

  if(r.meetings.length){
    h+=`<div class="sr-section">📝 Reuniões (${r.meetings.length})</div>`;
    r.meetings.slice(0,3).forEach(m=>{
      h+=`<div class="sr-item" onclick="closeSearch();document.getElementById('searchBar').value='';openModal('${m.pid}');setTimeout(()=>sw('mtg'),200)">
        <span class="sr-icon">📝</span>
        <div><div class="sr-title">${m.pname} <span style="font-size:10px;color:#8B8D9B">${m.date||''}</span></div><div class="sr-sub">${highlight(m.notes,q)}</div></div>
      </div>`;
    });
  }

  if(r.systems.length){
    h+=`<div class="sr-section">🛠 Sistemas (${r.systems.length})</div>`;
    r.systems.slice(0,3).forEach(s=>{
      h+=`<div class="sr-item" onclick="closeSearch();document.getElementById('searchBar').value='';openMenuPanel();setMenuTab('sistemas')">
        <span class="sr-icon">🔗</span>
        <div><div class="sr-title">${highlight(s.name,q)}</div><div class="sr-sub">${highlight(s.url,q)}</div></div>
      </div>`;
    });
  }

  if(r.people.length){
    h+=`<div class="sr-section">👥 Pessoas (${r.people.length})</div>`;
    r.people.slice(0,3).forEach(p=>{
      const orgs={vm:'Valemobi',ag:'Ágora',br:'Bradesco'};
      h+=`<div class="sr-item" onclick="closeSearch();document.getElementById('searchBar').value='';openMenuPanel();setMenuTab('pessoas')">
        <span class="sr-icon">👤</span>
        <div><div class="sr-title">${highlight(p.name,q)}</div><div class="sr-sub">${highlight(p.role,q)} · ${orgs[p.org]||p.org}</div></div>
      </div>`;
    });
  }

  if(r.templates.length){
    h+=`<div class="sr-section">📧 Templates (${r.templates.length})</div>`;
    r.templates.slice(0,3).forEach(t=>{
      h+=`<div class="sr-item" onclick="closeSearch();document.getElementById('searchBar').value='';openMenuPanel();setMenuTab('templates');setTimeout(()=>openTplModalIdx(${t.i}),300)">
        <span class="sr-icon">📄</span>
        <div><div class="sr-title">${highlight(t.name,q)}</div><div class="sr-sub">${highlight(t.desc,q)}</div></div>
      </div>`;
    });
  }

  h+=`<div class="sr-count">${total} resultado${total!==1?'s':''} encontrado${total!==1?'s':''}</div>`;
  el.innerHTML=h;
  positionSearchResults();
  el.classList.add('show');
}

function positionSearchResults(){
  const bar=document.getElementById('searchBar');
  const el=document.getElementById('searchResults');
  if(!bar||!el)return;
  const rect=bar.getBoundingClientRect();
  el.style.top=(rect.bottom+6)+'px';
  el.style.left=Math.max(8,rect.left)+'px';
  el.style.minWidth=Math.max(320,rect.width)+'px';
}

// Close search on outside click
document.addEventListener('click',e=>{
  if(!e.target.closest('#searchResults')&&!e.target.closest('#searchBar')) closeSearch();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeSearch();
});


/* ── 1. LINK SUGGESTIONS ─────────────────────────────── */
function buildLinkSuggestions(){
  const suggs=[];
  // Systems from menu
  getSystems().forEach(s=>{
    if(s.url) suggs.push({group:'📚 Sistemas & Acessos',name:s.name,url:s.url,icon:s.icon||'🔗'});
  });
  // Links from all projects (deduplicated)
  const seen=new Set();
  projects.filter(p=>!p.archived).forEach(p=>{
    (p.links||[]).forEach(l=>{
      if(l.u&&!seen.has(l.u)){seen.add(l.u);suggs.push({group:'🔗 Links de outros cards',name:l.n||l.u,url:l.u,icon:'🔗',card:p.name});}
    });
    // Auto-suggest Jira links from card codes
    const codes=[...(p.code?.matchAll(/[A-Z]{2,6}-\d+/g)||[])].map(m=>m[0]);
    codes.forEach(code=>{
      const url=`https://valemobi.atlassian.net/browse/${code}`;
      if(!seen.has(url)){seen.add(url);suggs.push({group:'🎯 Tickets Jira',name:code,url,icon:'🎯',card:p.name});}
    });
  });
  return suggs;
}

let _allLinkSuggs=[];
function openLinkModal(){
  document.getElementById('linkName').value='';
  document.getElementById('linkUrl').value='';
  document.getElementById('linkModal').classList.add('open');
  _allLinkSuggs=buildLinkSuggestions();
  renderLinkSuggList('');
  setTimeout(()=>document.getElementById('linkName').focus(),50);
}
function renderLinkSuggList(q){
  const filtered=q?_allLinkSuggs.filter(s=>
    s.name.toLowerCase().includes(q.toLowerCase())||
    s.url.toLowerCase().includes(q.toLowerCase())||
    (s.card||'').toLowerCase().includes(q.toLowerCase())
  ):_allLinkSuggs;
  const groupMap={};
  filtered.forEach(s=>{ if(!groupMap[s.group])groupMap[s.group]=[]; groupMap[s.group].push(s); });
  let h='';
  if(!filtered.length){h='<div style="font-size:11px;color:#55566A;padding:10px">Nenhuma sugestão encontrada.</div>';}
  Object.entries(groupMap).forEach(([grp,items])=>{
    h+=`<div class="link-sugg-sec">${grp}</div>`;
    items.forEach(s=>{
      const safeN=(s.name||'').split("'").join("&#39;");
      const safeU=(s.url||'').split("'").join("&#39;");
      h+=`<div class="link-sugg-item" onclick="fillLinkSugg('${safeN}','${safeU}')">
        <div class="link-sugg-name">${s.icon} ${s.name}${s.card?` <span style="color:#55566A;font-size:9px">· ${s.card}</span>`:''}</div>
        <div class="link-sugg-url">${s.url}</div>
      </div>`;
    });
  });
  const list=document.getElementById('linkSuggList');
  if(list) list.innerHTML=h;
}
function filterLinkSugg(q){ renderLinkSuggList(q); }
function toggleLinkSugg(){
  const body=document.getElementById('linkSuggBody');
  body?.classList.toggle('open');
  const hd=document.getElementById('linkSuggHd');
  if(hd) hd.querySelector('span').textContent=body?.classList.contains('open')?'▲':'▼';
}
function fillLinkSugg(name,url){
  document.getElementById('linkName').value=name;
  document.getElementById('linkUrl').value=url;
  document.getElementById('linkSuggBody').classList.remove('open');
}

/* ── 2. PEOPLE AUTOCOMPLETE ──────────────────────────── */
let acTarget=null, acField=null;

function initPeopleAC(inputId, dropId){
  const inp=document.getElementById(inputId);
  const drop=document.getElementById(dropId);
  if(!inp||!drop)return;
  inp.addEventListener('input',()=>showPeopleAC(inp,drop));
  inp.addEventListener('focus',()=>showPeopleAC(inp,drop));
  inp.addEventListener('keydown',e=>{if(e.key==='Escape')drop.classList.remove('show');});
  document.addEventListener('click',e=>{
    if(!e.target.closest('#'+inputId)&&!e.target.closest('#'+dropId)) drop.classList.remove('show');
  },{capture:false});
}

function showPeopleAC(inp,drop){
  // Get current segment (after last comma)
  const val=inp.value;
  const parts=val.split(',');
  const current=(parts[parts.length-1]||'').trim().toLowerCase();
  const already=parts.slice(0,-1).map(p=>p.trim().toLowerCase());
  const filtered=getPeople().filter(p=>
    (!current||p.name.toLowerCase().includes(current)||p.role.toLowerCase().includes(current))
    &&!already.includes(p.name.toLowerCase())
  ).slice(0,6);
  const orgs={vm:'Valemobi',ag:'Ágora',br:'Bradesco'};
  let h=filtered.map(p=>{
    const ini=p.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    return `<div class="people-ac-item" onmousedown="selectPersonAC(event,'${inp.id}','${drop.id}','${escOnclick(p.name)}')">
      <div class="paci-avatar" style="background:${p.color||'#B5701F'}">${ini}</div>
      <div><div class="paci-name">${p.name}</div><div class="paci-role">${p.role} · ${orgs[p.org]||''}</div></div>
    </div>`;
  }).join('');
  // Add "register new" if current text doesn't match anyone
  if(current&&!getPeople().some(p=>p.name.toLowerCase()===current)){
    const escaped=escOnclick(current);
    h+=`<div class="paci-new" onmousedown="addPersonFromAC(event,'${inp.id}','${escaped}')">➕ Cadastrar "<strong>${current}</strong>" como nova pessoa</div>`;
  }
  if(!h&&!current){drop.classList.remove('show');return;}
  drop.innerHTML=h||`<div class="paci-new" style="color:#55566A">Digite para buscar pessoas…</div>`;
  drop.classList.add('show');
}

function selectPersonAC(e,inpId,dropId,name){
  e.preventDefault();
  const inp=document.getElementById(inpId);
  if(!inp)return;
  const parts=inp.value.split(',').map(p=>p.trim()).filter(Boolean);
  // Replace last segment with selected name
  if(parts.length===0||inp.value.endsWith(',')){
    parts.push(name);
  } else {
    parts[parts.length-1]=name;
  }
  inp.value=parts.join(', ')+', ';
  inp.focus();
  document.getElementById(dropId)?.classList.remove('show');
}

function addPersonFromAC(e,inpId,name){
  e.preventDefault();
  // Add as new person in People list
  const arr=[...getPeople(),{name:name.charAt(0).toUpperCase()+name.slice(1),role:'',org:'vm',color:'#B5701F'}];
  saveMenuData('people',arr).then(()=>{
    showToast('✅ Pessoa adicionada',`"${name}" cadastrada em Pessoas & Cargos.`);
    // Also insert into field
    const inp=document.getElementById(inpId);
    if(inp){
      const parts=inp.value.split(',').map(p=>p.trim()).filter(Boolean);
      if(parts.length===0){parts.push(name);}else{parts[parts.length-1]=name;}
      inp.value=parts.join(', ')+', ';
    }
  });
}

/* ── 3. EDIT MEETING ─────────────────────────────────── */
function editMeeting(i){
  const p=getP(selId);if(!p)return;
  const m=p.meetings?.[i];if(!m)return;
  const wrap=document.getElementById('mtg-item-'+i);
  if(!wrap)return;
  // Replace view with edit form
  wrap.innerHTML=`
    <div style="font-size:10px;font-weight:700;color:#D98E3F;margin-bottom:8px">✏ Editar ata</div>
    <input class="mtg-inp" id="mtg-edit-date-${i}" type="date" value="${m.date||''}">
    <div class="people-ac-wrap" style="margin-bottom:7px">
      <input class="mtg-inp" id="mtg-edit-part-${i}" value="${m.participants||''}" placeholder="Participantes…" style="margin-bottom:0">
      <div class="people-ac-drop" id="mtg-edit-part-drop-${i}"></div>
    </div>
    <textarea class="mtg-inp" rows="3" id="mtg-edit-notes-${i}" placeholder="Notas…" style="resize:vertical">${m.notes||''}</textarea>
    <textarea class="mtg-inp" rows="2" id="mtg-edit-dec-${i}" placeholder="Decisões…" style="resize:vertical">${m.decisions||''}</textarea>
    <div class="save-row">
      <button class="btn-s" onclick="saveEditMeeting(${i})">✓ Salvar</button>
      <button class="btn-c" onclick="renderMeetings()">✕ Cancelar</button>
    </div>`;
  initPeopleAC('mtg-edit-part-'+i, 'mtg-edit-part-drop-'+i);
}

function saveEditMeeting(i){
  const p=getP(selId);if(!p)return;
  const meetings=[...(p.meetings||[])];
  meetings[i]={
    ...meetings[i],
    date:document.getElementById('mtg-edit-date-'+i)?.value||meetings[i].date,
    participants:(document.getElementById('mtg-edit-part-'+i)?.value||'').replace(/,\s*$/,'').trim(),
    notes:document.getElementById('mtg-edit-notes-'+i)?.value||'',
    decisions:document.getElementById('mtg-edit-dec-'+i)?.value||'',
  };
  setP(selId,{meetings});
  renderMeetings();
  showToast('✅ Ata atualizada','');
}

/* ── 4 & 5. REMINDER BADGE FIX + ALERT MODAL ─────────── */
let pendingReminderAlert=null;

function showReminderAlert(project, text, pid, tid){
  const el=document.getElementById('reminderAlert');
  const proj=document.getElementById('reminderAlertProject');
  const txt=document.getElementById('reminderAlertText');
  const btn=document.getElementById('reminderAlertOpen');
  if(!el)return;
  if(proj) proj.textContent=project;
  if(txt) txt.textContent=text;
  if(btn) btn.onclick=()=>{
    dismissReminderAlert();
    openModal(pid);
    setTimeout(()=>{
      sw('check');
      setTimeout(()=>{
        const el=document.getElementById('clt-'+tid);
        if(el){
          el.scrollIntoView({behavior:'smooth',block:'center'});
          el.style.transition='background .3s';
          el.style.background='rgba(251,191,36,.2)';
          setTimeout(()=>{el.style.background='';},2500);
        }
      },200);
    },80);
  };
  pendingReminderAlert={pid,tid};
  el.classList.add('show');
  // Play a subtle sound if possible
  try{const ctx=new AudioContext();const osc=ctx.createOscillator();const g=ctx.createGain();osc.connect(g);g.connect(ctx.destination);osc.frequency.value=440;g.gain.setValueAtTime(0.1,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.5);osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.5);}catch(e){}
}

function dismissReminderAlert(){
  document.getElementById('reminderAlert')?.classList.remove('show');
  if(pendingReminderAlert){
    const {pid,tid}=pendingReminderAlert;
    const p=getP(pid);if(p){
      const notified={...(p.taskNotified||{})};
      notified[tid]='dismissed';
      setP(pid,{taskNotified:notified});
    }
    pendingReminderAlert=null;
    checkReminders(); // recalc bell
  }
}

// Override checkReminders to fix badge logic
function checkReminders(){
  const now=new Date();
  let overdueCount=0; // reminders PAST due — show red badge
  
  projects.filter(p=>!p.archived).forEach(p=>{
    const notified=p.taskNotified||{};
    
    // Card reminder
    if(p.cardReminder){
      const d=new Date(p.cardReminder);
      if(d<=now){
        if(!notified['__card__']||notified['__card__']==='fired'){
          if(!notified['__card__']){
            const newN={...notified,__card__:'fired'};
            setP(p.id,{taskNotified:newN});
            showReminderAlert(p.name,'Lembrete geral do card',p.id,'__card__');
            fireBrowserNotif('Lembrete — '+p.name,'Lembrete geral do card');
          }
          overdueCount++;
        }
      }
      // Future: don't count
    }

    // Task reminders
    const clS=CL[p.stage]||[];
    const allT=clS.flatMap(s=>s.t);
    [...allT,...((p.customTasks||{})[p.stage]||[])].forEach(t=>{
      const tid=t.id||t.tid;
      const due=(p.taskDates||{})[tid];
      if(!due)return;
      const d=new Date(due);
      if(d<=now){
        const st=notified[tid];
        if(!st||st==='fired'){
          if(!st){
            const txt=findTaskText(p,tid)||t.tx||'Tarefa';
            const newN={...notified,[tid]:'fired'};
            setP(p.id,{taskNotified:newN});
            showReminderAlert(p.name,txt,p.id,tid);
            fireBrowserNotif('Lembrete — '+p.name,txt);
          }
          overdueCount++;
        }
      }
      // Future reminders: do NOT count in overdueCount
    });
  });

  updateBell(overdueCount+getPendingMentions().length);
}

/* ── RESUMO DE LEMBRETES PERDIDOS ───────────────────────
   Os lembretes só disparam com o site aberto (limitação de rodar
   100% no navegador). Este resumo cobre a lacuna: ao entrar, mostra
   o que venceu enquanto você estava fora, para nada passar batido. */
function collectOverdueReminders(){
  const now=new Date();
  const out=[];
  projects.filter(p=>!p.archived).forEach(p=>{
    if(p.cardReminder){
      const d=new Date(p.cardReminder);
      if(d<=now)out.push({kind:'card',pid:p.id,pname:p.name,text:'Lembrete geral do card',when:d});
    }
    const clS=CL[p.stage]||[];
    const allT=clS.flatMap(s=>s.t);
    [...allT,...((p.customTasks||{})[p.stage]||[])].forEach(t=>{
      const tid=t.id||t.tid;
      const due=(p.taskDates||{})[tid];
      if(!due)return;
      const d=new Date(due);
      if(d<=now)out.push({kind:'task',pid:p.id,pname:p.name,text:findTaskText(p,tid)||t.tx||'Tarefa',when:d});
    });
  });
  getStandaloneTasks().forEach(t=>{
    if(t.done||!t.dueDate)return;
    const d=new Date(t.dueDate);
    if(d<=now)out.push({kind:'standalone',pid:'__standalone__',pname:'Tarefa avulsa',text:t.tx,when:d});
  });
  return out.sort((a,b)=>b.when-a.when);
}

let _digestItems=[];   // itens do resumo atual, com estado de "visto"

function showWelcomeDigest(){
  const overdue=collectOverdueReminders();
  const mentions=getPendingMentions();
  if(!overdue.length&&!mentions.length)return;

  // Não repete o resumo se já foi confirmado nas últimas 4 horas
  const lastShown=lsGet('digestShownTs')||0;
  if(Date.now()-lastShown<4*60*60*1000)return;

  // Monta a lista com um id próprio por item, para marcar "visto" individualmente
  _digestItems=[
    ...overdue.map((o,i)=>({...o,_id:'ov'+i,_type:'overdue',seen:false})),
    ...mentions.map((m,i)=>({...m,_id:'mn'+i,_type:'mention',seen:false})),
  ];
  renderWelcomeDigest();
}

function renderWelcomeDigest(){
  const fmt=d=>{
    const diffDays=Math.floor((Date.now()-d.getTime())/86400000);
    const hora=d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    if(diffDays===0)return`hoje às ${hora}`;
    if(diffDays===1)return`ontem às ${hora}`;
    return`${d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})} às ${hora}`;
  };

  let overlay=document.getElementById('digestOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='digestOverlay';
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:6000;display:flex;align-items:center;justify-content:center;padding:20px';
    // Clicar fora NÃO fecha: o resumo só sai quando o usuário confirma,
    // para não perder itens de vista ao abrir um card no meio da lista
    document.body.appendChild(overlay);
  }

  const pending=_digestItems.filter(i=>!i.seen);
  const seenCount=_digestItems.length-pending.length;
  const overdueItems=_digestItems.filter(i=>i._type==='overdue');
  const mentionItems=_digestItems.filter(i=>i._type==='mention');

  const itemHtml=(it)=>{
    const isMention=it._type==='mention';
    const action=isMention
      ? `openModal('${it.pid}');setTimeout(()=>sw('cmt'),150)`
      : (it.pid==='__standalone__'?`openTasksPanel()`:`openModal('${it.pid}')`);
    const border=isMention?'rgba(128,103,176,.25)':'rgba(85,86,106,.22)';
    const bg=isMention?'rgba(128,103,176,.08)':'rgba(255,255,255,.03)';
    const leftBar=isMention?'':'border-left:3px solid #D98E3F;';
    return`<div style="display:flex;align-items:flex-start;gap:9px;background:${bg};border:1px solid ${border};${leftBar}border-radius:7px;padding:9px 11px;margin-bottom:6px;${it.seen?'opacity:.45;':''}transition:opacity .2s">
      <button onclick="toggleDigestSeen('${it._id}')" title="${it.seen?'Desmarcar':'Marcar como visto'}"
        style="flex-shrink:0;width:18px;height:18px;margin-top:1px;border-radius:4px;cursor:pointer;border:1.5px solid ${it.seen?'#7A9B6B':'rgba(139,141,155,.5)'};background:${it.seen?'#7A9B6B':'transparent'};color:#14151F;font-size:11px;font-weight:700;line-height:1;display:flex;align-items:center;justify-content:center;padding:0">${it.seen?'✓':''}</button>
      <div style="flex:1;min-width:0;cursor:pointer" onclick="openFromDigest('${it._id}')">
        <div style="font-size:11px;font-weight:600;color:#EDEDF0;margin-bottom:2px;${it.seen?'text-decoration:line-through':''}">${it.pname}</div>
        ${isMention
          ? `<div style="font-size:10px;color:#8B8D9B">${it.author}: "${(it.text||'').slice(0,70)}${(it.text||'').length>70?'…':''}"</div>`
          : `<div style="font-size:11px;color:#A5A7B8;line-height:1.35">${it.text}</div>
             <div style="font-size:9px;color:#55566A;margin-top:3px">venceu ${fmt(it.when)}</div>`}
      </div>
    </div>`;
  };

  overlay.innerHTML=`<div style="background:#1C1D28;border:1px solid rgba(85,86,106,.35);border-radius:14px;width:min(520px,100%);max-height:80vh;display:flex;flex-direction:column;box-shadow:0 20px 56px rgba(0,0,0,.6);overflow:hidden">
    <div style="padding:18px 22px 14px;border-bottom:1px solid rgba(85,86,106,.25)">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:#EDEDF0;margin-bottom:3px">👋 Enquanto você esteve fora</div>
      <div style="font-size:11px;color:#8B8D9B">
        ${pending.length?`${pending.length} ${pending.length===1?'item pendente':'itens pendentes'}`:'Tudo revisado!'}
        ${seenCount?` · <span style="color:#7A9B6B">${seenCount} visto${seenCount>1?'s':''}</span>`:''}
      </div>
    </div>
    <div id="digestList" style="flex:1;overflow-y:auto;padding:14px 22px">
      ${overdueItems.length?`<div style="font-size:9px;font-weight:700;color:#E2A968;text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">🔔 Lembretes que venceram (${overdueItems.filter(i=>!i.seen).length}/${overdueItems.length})</div>
      ${overdueItems.map(itemHtml).join('')}`:''}
      ${mentionItems.length?`<div style="font-size:9px;font-weight:700;color:#B9A6D9;text-transform:uppercase;letter-spacing:.6px;margin:${overdueItems.length?'14px':'0'} 0 8px">💬 Menções para você (${mentionItems.filter(i=>!i.seen).length}/${mentionItems.length})</div>
      ${mentionItems.map(itemHtml).join('')}`:''}
    </div>
    <div style="padding:14px 22px;border-top:1px solid rgba(85,86,106,.25);display:flex;gap:8px;align-items:center">
      <button onclick="markAllDigestSeen()" style="background:none;border:1px solid rgba(85,86,106,.4);color:#8B8D9B;padding:10px 14px;border-radius:8px;font-size:11px;cursor:pointer;white-space:nowrap">Marcar todos</button>
      <button onclick="confirmWelcomeDigest()" style="flex:1;background:linear-gradient(90deg,#D98E3F,#B5701F);border:none;color:#fff;padding:10px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">
        ${pending.length?`Fechar (${pending.length} pendente${pending.length>1?'s':''})`:'Concluir'}
      </button>
    </div>
  </div>`;
  overlay.style.display='flex';
}

function toggleDigestSeen(id){
  const it=_digestItems.find(x=>x._id===id);
  if(!it)return;
  it.seen=!it.seen;
  renderWelcomeDigest();
}
function markAllDigestSeen(){
  _digestItems.forEach(i=>{i.seen=true;});
  renderWelcomeDigest();
}
// Abre o card/tarefa do item, marca como visto, e ESCONDE o resumo
// temporariamente — ele volta sozinho quando o card for fechado
function openFromDigest(id){
  const it=_digestItems.find(x=>x._id===id);
  if(!it)return;
  it.seen=true;
  const overlay=document.getElementById('digestOverlay');
  if(overlay)overlay.style.display='none';
  if(it._type==='mention'){openModal(it.pid);setTimeout(()=>sw('cmt'),150);}
  else if(it.pid==='__standalone__'){openTasksPanel();}
  else {openModal(it.pid);}
  _digestWaitingReturn=true;
}
let _digestWaitingReturn=false;
// Traz o resumo de volta quando o usuário fecha o card/painel que abriu a partir dele
function maybeReopenDigest(){
  if(!_digestWaitingReturn)return;
  _digestWaitingReturn=false;
  if(_digestItems.some(i=>!i.seen))renderWelcomeDigest();
  else lsSet('digestShownTs',Date.now());
}
function confirmWelcomeDigest(){
  lsSet('digestShownTs',Date.now());
  _digestWaitingReturn=false;
  const o=document.getElementById('digestOverlay');
  if(o)o.style.display='none';
}
function closeWelcomeDigest(){confirmWelcomeDigest();}

/* ── MENÇÕES (@nome nos comentários) ─────────────────── */
function isMentioned(text){
  if(!currentUser||!text)return false;
  const firstName=(currentUser.name||'').trim().split(' ')[0].toLowerCase();
  if(!firstName)return false;
  return new RegExp('@'+firstName,'i').test(text);
}
function getPendingMentions(){
  if(!currentUser)return[];
  const seenTs=lsGet('mentionsSeenTs_'+currentUser.id)||0;
  const out=[];
  projects.filter(p=>!p.archived).forEach(p=>{
    (p.comments||[]).forEach(c=>{
      if(c.ts>seenTs&&isMentioned(c.text)&&c.author!==currentUser.name){
        out.push({pid:p.id,pname:p.name,author:c.author,text:c.text,ts:c.ts});
      }
    });
  });
  return out.sort((a,b)=>b.ts-a.ts);
}
function markMentionsSeen(){
  if(!currentUser)return;
  lsSet('mentionsSeenTs_'+currentUser.id,Date.now());
}


/* ── NOTIFICATION SIDEBAR ────────────────────────────── */
function openNotifSidebar(){
  document.getElementById('notifSidebar').style.right='0';
  document.getElementById('notifSidebarOverlay').style.display='block';
  renderNotifSidebar();
  markMentionsSeen();
  // Mark all as seen → clear bell count
  updateBell(0);
}
function closeNotifSidebar(){
  document.getElementById('notifSidebar').style.right='-340px';
  document.getElementById('notifSidebarOverlay').style.display='none';
}

function renderNotifSidebar(){
  const body=document.getElementById('notifSidebarBody');
  const now=new Date();
  const items=[];

  projects.filter(p=>!p.archived).forEach(p=>{
    // Card reminder
    if(p.cardReminder){
      const d=new Date(p.cardReminder);
      items.push({pid:p.id,pname:p.name,tid:'__card__',text:'Lembrete do card',date:d,past:d<now,type:'card'});
    }
    // Task reminders
    Object.entries(p.taskDates||{}).forEach(([tid,dt])=>{
      if(!dt)return;
      const d=new Date(dt);
      items.push({pid:p.id,pname:p.name,tid,text:findTaskText(p,tid)||'Tarefa',date:d,past:d<now,type:'task'});
    });
  });

  if(!items.length&&!getPendingMentions().length){
    body.innerHTML=`<div style="font-size:11px;color:#55566A;text-align:center;padding:28px 0">Nenhum lembrete cadastrado.</div>`;
    return;
  }

  // Sort: future first (ascending), then past
  const future=items.filter(i=>!i.past).sort((a,b)=>a.date-b.date);
  const past=items.filter(i=>i.past).sort((a,b)=>b.date-a.date);

  function renderGroup(list,title,col){
    if(!list.length)return'';
    return`<div style="font-size:9px;font-weight:700;color:${col};text-transform:uppercase;letter-spacing:.6px;margin:12px 0 6px">${title}</div>`+
    list.map(it=>{
      const fmt=it.date.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
      const dtVal=it.date.toISOString().slice(0,16);
      return`<div style="background:rgba(20,21,31,.5);border:1px solid rgba(85,86,106,.2);border-radius:8px;padding:10px 12px;margin-bottom:7px">
        <div style="font-size:11px;font-weight:600;color:#EDEDF0;margin-bottom:2px">${it.pname}</div>
        <div style="font-size:10px;color:#8B8D9B;margin-bottom:6px">${it.text}</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <input type="datetime-local" value="${dtVal}"
            style="flex:1;min-width:0;background:rgba(20,21,31,.8);border:1px solid rgba(85,86,106,.3);color:#EDEDF0;padding:4px 8px;border-radius:5px;font-size:10px;outline:none"
            onchange="updateNotifDate('${it.pid}','${it.tid}','${it.type}',this.value)">
          <button onclick="deleteNotif('${it.pid}','${it.tid}','${it.type}')"
            style="background:none;border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:5px;padding:4px 8px;font-size:10px;cursor:pointer">🗑</button>
        </div>
        <div style="font-size:9px;color:${it.past?'#f87171':'#8B8D9B'};margin-top:4px">${it.past?'⚠ Vencido: ':'📅 '}${fmt}</div>
      </div>`;
    }).join('');
  }

  body.innerHTML=renderGroup(future,'🔔 Próximos','#D98E3F')+renderGroup(past,'⚠ Vencidos','#f87171')+renderMentionsGroup();
}

function renderMentionsGroup(){
  const mentions=getPendingMentions();
  if(!mentions.length)return'';
  return`<div style="font-size:9px;font-weight:700;color:#8067B0;text-transform:uppercase;letter-spacing:.6px;margin:12px 0 6px">💬 Menções</div>`+
    mentions.map(m=>{
      const fmt=new Date(m.ts).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
      return`<div class="notif-item" onclick="closeNotifSidebar();openModal('${m.pid}');sw('cmt')"
        style="background:rgba(128,103,176,.08);border:1px solid rgba(128,103,176,.25);border-radius:8px;padding:10px 12px;margin-bottom:7px;cursor:pointer">
        <div style="font-size:11px;font-weight:600;color:#EDEDF0;margin-bottom:2px">${m.pname}</div>
        <div style="font-size:10px;color:#8B8D9B;margin-bottom:4px">${m.author} mencionou você: "${(m.text||'').slice(0,80)}${m.text.length>80?'…':''}"</div>
        <div style="font-size:9px;color:#8B8D9B">${fmt}</div>
      </div>`;
    }).join('');
}

function updateNotifDate(pid,tid,type,val){
  const p=getP(pid);if(!p)return;
  if(type==='card'){
    setP(pid,{cardReminder:val});
  } else {
    setP(pid,{taskDates:{...(p.taskDates||{}),[tid]:val}});
  }
  renderNotifSidebar();
  showToast('✅ Lembrete atualizado','');
}
function deleteNotif(pid,tid,type){
  const p=getP(pid);if(!p)return;
  if(type==='card'){
    setP(pid,{cardReminder:null});
  } else {
    const td={...(p.taskDates||{})};delete td[tid];
    const tn={...(p.taskNotified||{})};delete tn[tid];
    setP(pid,{taskDates:td,taskNotified:tn});
  }
  renderNotifSidebar();
  checkReminders();
  showToast('🗑 Lembrete removido','');
}

/* ── BUILD INFO (Projeto/Pod/Build) ─────────────────────── */
function renderBuildInfo(){
  const p=getP(selId);if(!p)return;
  const stageIdx=STAGES.findIndex(s=>s.id===p.stage);
  const homologIdx=STAGES.findIndex(s=>s.id==='homolog');
  const prerdmIdx=STAGES.findIndex(s=>s.id==='prerdm');
  if(stageIdx<Math.min(homologIdx,prerdmIdx))return''; // mostra a partir de Pré-RDM

  const builds=p.builds||[{projeto:'',pod:'',build:''}];
  let h=`<div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(85,86,106,.2)">
    <div style="font-size:10px;font-weight:700;color:#8B8D9B;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
      🏗 Build Info
      <button onclick="addBuildRow()" style="background:rgba(217,142,63,.12);border:1px solid rgba(217,142,63,.3);color:#E2A968;padding:2px 10px;border-radius:4px;font-size:10px;cursor:pointer">+ Add</button>
    </div>
    <div style="font-size:9px;color:#55566A;display:grid;grid-template-columns:1fr 1fr 1fr 24px;gap:4px;margin-bottom:4px;padding:0 2px">
      <span>Projeto</span><span>Pod</span><span>Build</span><span></span>
    </div>`;
  builds.forEach((b,i)=>{
    h+=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr 24px;gap:4px;margin-bottom:5px" id="build-row-${i}">
      <input class="mef-inp" style="padding:5px 7px;font-size:11px" value="${b.projeto||''}" placeholder="Projeto" onchange="updateBuild(${i},'projeto',this.value)">
      <input class="mef-inp" style="padding:5px 7px;font-size:11px" value="${b.pod||''}" placeholder="Pod" onchange="updateBuild(${i},'pod',this.value)">
      <input class="mef-inp" style="padding:5px 7px;font-size:11px" value="${b.build||''}" placeholder="Build #" onchange="updateBuild(${i},'build',this.value)">
      <button onclick="removeBuildRow(${i})" style="background:none;border:none;color:#55566A;cursor:pointer;font-size:14px;padding:0">×</button>
    </div>`;
  });
  h+=`</div>`;
  return h;
}
function addBuildRow(){
  const p=getP(selId);if(!p)return;
  const builds=[...(p.builds||[{projeto:'',pod:'',build:''}]),{projeto:'',pod:'',build:''}];
  setP(selId,{builds});renderInfo();
}
function removeBuildRow(i){
  const p=getP(selId);if(!p)return;
  const builds=(p.builds||[]).filter((_,idx)=>idx!==i);
  setP(selId,{builds:builds.length?builds:[{projeto:'',pod:'',build:''}]});renderInfo();
}
function updateBuild(i,field,val){
  const p=getP(selId);if(!p)return;
  const builds=[...(p.builds||[{projeto:'',pod:'',build:''}])];
  if(!builds[i])builds[i]={projeto:'',pod:'',build:''};
  builds[i][field]=val;
  setP(selId,{builds});
}

/* ── RECURRING TASKS ────────────────────────────────────── */
const RECUR_LABELS={daily:'Diária',weekly:'Semanal',monthly:'Mensal'};

function setTaskRecurrence(tid,recur){
  const p=getP(selId);if(!p)return;
  const taskRecurrence={...(p.taskRecurrence||{})};
  if(recur){taskRecurrence[tid]=recur;}else{delete taskRecurrence[tid];}
  setP(selId,{taskRecurrence});renderCheck();
}

function getNextOccurrence(lastDate,recur){
  const d=new Date(lastDate);
  if(recur==='daily')d.setDate(d.getDate()+1);
  else if(recur==='weekly')d.setDate(d.getDate()+7);
  else if(recur==='monthly')d.setMonth(d.getMonth()+1);
  return d;
}

/* ── FILE ATTACHMENTS ───────────────────────────────────── */
const MAX_ATTACH_KB=500;

function openFilePicker(target,targetId){
  const inp=document.createElement('input');
  inp.type='file';
  inp.accept='image/*,.pdf,.doc,.docx,.xlsx,.txt';
  inp.onchange=async e=>{
    const file=e.target.files[0];
    if(!file)return;
    if(file.size>MAX_ATTACH_KB*1024){showToast('Arquivo grande',`Limite: ${MAX_ATTACH_KB}KB. Use um link externo para arquivos maiores.`);return;}
    const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});
    const attach={name:file.name,type:file.type,data:b64,size:file.size,addedAt:new Date().toISOString()};
    if(target==='desc'){
      const p=getP(selId);
      setP(selId,{descAttachments:[...(p.descAttachments||[]),attach]});
      renderInfo();
    } else if(target==='meeting'){
      const p=getP(selId);
      const meetings=[...(p.meetings||[])];
      if(!meetings[targetId])return;
      meetings[targetId].attachments=[...(meetings[targetId].attachments||[]),attach];
      setP(selId,{meetings});renderMeetings();
    }
    showToast('✅ Anexo adicionado',file.name);
  };
  inp.click();
}

function removeAttachment(target,targetId,attachIdx){
  const p=getP(selId);if(!p)return;
  if(target==='desc'){
    const arr=(p.descAttachments||[]).filter((_,i)=>i!==attachIdx);
    setP(selId,{descAttachments:arr});renderInfo();
  } else if(target==='meeting'){
    const meetings=[...(p.meetings||[])];
    if(meetings[targetId]){
      meetings[targetId].attachments=(meetings[targetId].attachments||[]).filter((_,i)=>i!==attachIdx);
      setP(selId,{meetings});renderMeetings();
    }
  }
}

function renderAttachments(attachments,target,targetId){
  if(!attachments?.length)return'';
  return`<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:5px">`+
    attachments.map((a,i)=>`<a href="${a.data}" download="${a.name}"
      style="display:inline-flex;align-items:center;gap:4px;background:rgba(217,142,63,.08);border:1px solid rgba(217,142,63,.2);color:#E2A968;font-size:10px;padding:3px 8px;border-radius:5px;text-decoration:none">
      📎 ${a.name}
      <span onclick="event.preventDefault();removeAttachment('${target}',${targetId},${i})"
        style="color:#55566A;cursor:pointer;margin-left:2px">×</span>
    </a>`).join('')+`</div>`;
}

/* ── SECTION EDITING IN CHECKLIST ───────────────────────── */
let editingSection={stage:null,secIdx:null};

function startEditSection(stage,secIdx,currentLabel){
  editingSection={stage,secIdx};
  const el=document.getElementById(`sec-label-${stage}-${secIdx}`);
  if(!el)return;
  el.innerHTML=`<input id="sec-edit-inp" value="${currentLabel}"
    style="background:rgba(20,21,31,.8);border:1px solid #D98E3F;color:#EDEDF0;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;outline:none;width:160px"
    onkeydown="if(event.key==='Enter')saveSectionEdit();if(event.key==='Escape')cancelSectionEdit()"
    onblur="saveSectionEdit()">`;
  document.getElementById('sec-edit-inp')?.focus();
}
function saveSectionEdit(){
  const inp=document.getElementById('sec-edit-inp');
  const val=(inp?.value||'').trim();
  if(!val||!editingSection.stage)return;
  const p=getP(selId);if(!p)return;
  const cs={...(p.customSections||{})};
  if(!cs[editingSection.stage])cs[editingSection.stage]={};
  cs[editingSection.stage][editingSection.secIdx]=val;
  setP(selId,{customSections:cs});
  editingSection={stage:null,secIdx:null};
  renderCheck();
}
function cancelSectionEdit(){editingSection={stage:null,secIdx:null};renderCheck();}

/* ── TASK REORDERING (global store) ─────────────────────── */
let _dragSectionKey=null; // "stageId|||sectionS"
const _sectionTaskIds={}; // key → [tid,...]

function startDragTask(e,tid,stage){
  dragTaskId=tid;dragTaskStage=stage;
  e.dataTransfer.effectAllowed='move';
  e.currentTarget.style.opacity='0.4';
}
function endDragTask(e){
  e.currentTarget.style.opacity='1';
  dragTaskId=null;dragTaskStage=null;
}
function dragOverTask(e,tid,stage){
  if(!dragTaskId||dragTaskId===tid)return;
  e.preventDefault();
  e.dataTransfer.dropEffect='move';
}
// Resolve texto e seção original de uma tarefa NATIVA (definida em CL) ou PERMANENTE,
// necessário para poder movê-la de seção (elas não vivem em customTasks/injectedTasks)
function resolveTaskInfo(stage,tid){
  const clSections=CL[stage]||[];
  for(const sec of clSections){
    const found=(sec.t||[]).find(t=>t.id===tid);
    if(found)return{tx:found.tx,section:sec.s};
  }
  const perm=(getPermanentTasks()[stage]||[]).find(t=>t.tid===tid);
  if(perm)return{tx:perm.tx,section:perm.sectionS};
  return{tx:tid,section:null};
}
function dropOnAnyTask(e,toTid,stageId,sectionKey){
  e.preventDefault();e.stopPropagation();
  if(!dragTaskId||dragTaskId===toTid)return;
  const p=getP(selId);if(!p)return;
  const [sId,secS]=sectionKey.split('|||');

  // Localiza a posição REAL da tarefa arrastada nos dados (nunca confia em cache de render,
  // que fica desatualizado assim que a tarefa muda de lugar — causa da 1ª trava relatada)
  const customArr=(p.customTasks||{})[dragTaskStage]||[];
  const isFromCustom=customArr.some(t=>t.tid===dragTaskId);
  let fromSection=null; // nome da seção onde a tarefa está atualmente (injetada, nativa ou permanente)
  if(!isFromCustom){
    const stageInj=(p.injectedTasks||{})[dragTaskStage]||{};
    Object.keys(stageInj).forEach(sec=>{
      if((stageInj[sec]||[]).some(t=>t.tid===dragTaskId))fromSection=sec;
    });
  }
  const isFromInjected=fromSection!==null;
  // Se não é custom nem já injetada, é uma tarefa NATIVA (CL) ou PERMANENTE — resolve onde ela
  // "mora" originalmente, pra também poder movê-la de seção (isso faltava e travava o 2º cenário relatado)
  let nativeInfo=null;
  if(!isFromCustom&&!isFromInjected){
    nativeInfo=resolveTaskInfo(dragTaskStage,dragTaskId);
    fromSection=nativeInfo.section;
  }

  // ── Voltar para a área "Tarefas adicionadas" (custom) ──────
  if(secS==='__custom__'){
    if(isFromInjected){
      const injected=JSON.parse(JSON.stringify(p.injectedTasks||{}));
      const arr=(injected[dragTaskStage]||{})[fromSection]||[];
      const idx=arr.findIndex(t=>t.tid===dragTaskId);
      let taskTx='';
      if(idx>=0){taskTx=arr[idx].tx;arr.splice(idx,1);}
      const stageCT=[...((p.customTasks||{})[sId]||[])];
      if(!stageCT.find(t=>t.tid===dragTaskId)){
        stageCT.push({tid:dragTaskId,tx:taskTx});
      }
      // Ajusta a ordem visual do pool combinado (pode ter tarefas de vários stages)
      const poolOrder=[...(p.customPoolOrder||_sectionTaskIds[sectionKey]||[])];
      const cleaned=poolOrder.filter(id=>id!==dragTaskId);
      const toIdx=cleaned.indexOf(toTid);
      cleaned.splice(toIdx<0?cleaned.length:toIdx,0,dragTaskId);
      setP(selId,{injectedTasks:injected,customTasks:{...(p.customTasks||{}),[sId]:stageCT},customPoolOrder:cleaned});
      renderCheck();return;
    }
    if(isFromCustom){
      // A área "Tarefas adicionadas" mistura tarefas guardadas em stages DIFERENTES
      // (ex: uma customTasks.qa e outra customTasks.dev, exibidas juntas). Por isso a
      // ordem NÃO pode vir do array de um único stage — usa uma ordem própria do pool,
      // combinando tarefas de todos os stages (era aqui que a reordenação travava
      // silenciosamente quando origem e destino estavam em stages diferentes).
      const poolOrder=[...(p.customPoolOrder||_sectionTaskIds[sectionKey]||[])];
      const fi=poolOrder.indexOf(dragTaskId);
      const ti=poolOrder.indexOf(toTid);
      if(fi<0||ti<0)return;
      poolOrder.splice(ti,0,poolOrder.splice(fi,1)[0]);
      setP(selId,{customPoolOrder:poolOrder});
      renderCheck();return;
    }
    return; // tarefa padrão/permanente não pode ir pra área custom
  }

  // ── Movendo PARA uma seção padrão diferente: 1ª injeção (custom→padrão), tarefa já
  //    injetada mudando de seção, OU tarefa nativa/permanente mudando de seção ──
  if(fromSection!==secS){
    const newCT=JSON.parse(JSON.stringify(p.customTasks||{}));
    const injected=JSON.parse(JSON.stringify(p.injectedTasks||{}));
    const hidden={...(p.taskHidden||{})};
    let taskTx=null;
    if(isFromCustom){
      const idx=(newCT[dragTaskStage]||[]).findIndex(t=>t.tid===dragTaskId);
      if(idx>=0){taskTx=newCT[dragTaskStage][idx].tx;newCT[dragTaskStage].splice(idx,1);}
    } else if(isFromInjected){
      const arr=(injected[dragTaskStage]||{})[fromSection]||[];
      const idx=arr.findIndex(t=>t.tid===dragTaskId);
      if(idx>=0){taskTx=arr[idx].tx;arr.splice(idx,1);}
    } else if(nativeInfo){
      // Tarefa nativa ou permanente: oculta da seção original (só neste card) e injeta cópia na seção destino
      taskTx=nativeInfo.tx;
      hidden[dragTaskId]=true;
    }
    if(taskTx===null)return;
    if(!injected[sId])injected[sId]={};
    const secList=[...(injected[sId][secS]||[])];
    const toIds=_sectionTaskIds[sectionKey]||[];
    const toIdx=toIds.indexOf(toTid);
    secList.splice(toIdx<0?secList.length:toIdx,0,{tid:dragTaskId,tx:taskTx});
    injected[sId][secS]=secList;
    setP(selId,{customTasks:newCT,injectedTasks:injected,taskHidden:hidden});
    renderCheck();return;
  }

  // ── Reordenar dentro da MESMA seção (nativa, permanente, ou já injetada ali) ──
  const ids=_sectionTaskIds[sectionKey];
  if(!ids||!ids.length)return;
  const order=[...ids];
  const fromIdx=order.indexOf(dragTaskId);
  const toIdx=order.indexOf(toTid);
  if(fromIdx<0||toIdx<0)return;
  order.splice(toIdx,0,order.splice(fromIdx,1)[0]);
  const to={...(p.taskOrder||{})};
  if(!to[sId])to[sId]={};
  to[sId][secS]=order;
  setP(selId,{taskOrder:to});
  // Salva também globalmente (reflete em todos os cards da esteira)
  setGlobalTaskOrder(sId,secS,order);
  renderCheck();
}


/* ── TASK LINKS & REFERENCES ─────────────────────────────── */
function toggleTaskRef(tid){
  const el=document.getElementById('task-ref-'+tid);
  if(el)el.style.display=el.style.display==='none'?'block':'none';
}
function addTaskLink(tid){
  const nameEl=document.getElementById('trl-name-'+tid);
  const urlEl=document.getElementById('trl-url-'+tid);
  const name=(nameEl?.value||'').trim();
  const url=(urlEl?.value||'').trim();
  if(!name&&!url){showToast('Preencha ao menos o nome','');return;}
  const p=getP(selId);if(!p)return;
  const taskLinks={...(p.taskLinks||{})};
  taskLinks[tid]=[...(taskLinks[tid]||[]),{name:name||url,url:url||''}];
  setP(selId,{taskLinks});
  if(nameEl)nameEl.value='';if(urlEl)urlEl.value='';
  renderCheck();
}
function addTaskLinkFromSystem(tid,name,url){
  const p=getP(selId);if(!p)return;
  const taskLinks={...(p.taskLinks||{})};
  taskLinks[tid]=[...(taskLinks[tid]||[]),{name,url}];
  setP(selId,{taskLinks});renderCheck();
}
function removeTaskLink(tid,idx){
  const p=getP(selId);if(!p)return;
  const taskLinks={...(p.taskLinks||{})};
  taskLinks[tid]=(taskLinks[tid]||[]).filter((_,i)=>i!==idx);
  setP(selId,{taskLinks});renderCheck();
}
function renderTaskRef(p,tid,task){
  const userLinks=(p.taskLinks||{})[tid]||[];
  const userAttach=(p.taskAttachments||{})[tid]||[];
  const defaultLinks=(task?.links||[]).map((l,i)=>{
    const edit=(p.taskLinkEdits||{})[tid]?.[i];
    return {name:edit?.name||l.n, url:edit?.url||l.u, isDefault:true, dIdx:i};
  });
  const allLinks=[...defaultLinks,...userLinks.map((l,i)=>({...l,isDefault:false,uIdx:i}))];
  const systems=getSystems().slice(0,8);
  const totalAll=allLinks.length+userAttach.length;

  return `<div id="task-ref-${tid}" style="display:none;margin:5px 0 4px 22px;padding:8px 10px;background:rgba(217,142,63,.05);border:1px solid rgba(217,142,63,.15);border-radius:6px;font-size:10px">
    ${totalAll===0?'':`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">`+
      allLinks.map(l=>`<span style="display:inline-flex;align-items:center;gap:3px;background:rgba(217,142,63,.1);border:1px solid rgba(217,142,63,.2);padding:2px 8px;border-radius:4px;font-size:10px">
        ${l.url?`<a href="${l.url}" target="_blank" style="color:#E2A968;text-decoration:none">🔗 ${l.name}</a>`:`<span style="color:#A5A7B8">📎 ${l.name}</span>`}
        <button onclick="editTaskLink('${tid}',${l.isDefault?l.dIdx:-1},${l.isDefault?1:0},${l.isDefault?l.dIdx:(l.uIdx||0)})" title="Editar"
          style="background:none;border:none;color:#55566A;cursor:pointer;font-size:10px;padding:0 1px">✏</button>
        ${l.isDefault?'':'<button onclick="removeTaskLink(\''+tid+'\',' +(l.uIdx||0) +')" style="background:none;border:none;color:#55566A;cursor:pointer;font-size:11px;padding:0 1px">×</button>'}
      </span>`).join('')+
      userAttach.map((a,i)=>`<a href="${a.data}" download="${a.name}"
        style="display:inline-flex;align-items:center;gap:3px;color:#E2A968;background:rgba(217,142,63,.08);border:1px solid rgba(217,142,63,.2);padding:2px 8px;border-radius:4px;text-decoration:none;font-size:10px">
        📎 ${a.name}
        <span onclick="event.preventDefault();removeTaskAttach('${tid}',${i})" style="color:#55566A;cursor:pointer">×</span>
      </a>`).join('')+`</div>`
    }
    <div style="font-size:9px;font-weight:700;color:#8B8D9B;text-transform:uppercase;letter-spacing:.4px;margin-bottom:5px">Adicionar referência</div>
    <div style="display:flex;gap:4px;margin-bottom:5px;flex-wrap:wrap">
      <div style="position:relative;flex:2;min-width:120px">
        <input id="trl-name-${tid}" data-tid="${tid}" placeholder="Nome ou buscar sistema…"
          style="width:100%;background:rgba(20,21,31,.8);border:1px solid rgba(85,86,106,.3);color:#EDEDF0;padding:4px 8px;border-radius:4px;font-size:10px;outline:none;box-sizing:border-box"
          oninput="filterTaskRefAC(this.dataset.tid,this.value)" onblur="setTimeout(()=>closeTaskRefAC(this.dataset.tid),200)">
        <div id="trl-ac-${tid}" style="display:none;position:absolute;left:0;right:0;top:calc(100% + 2px);background:#1C1D28;border:1px solid rgba(85,86,106,.4);border-radius:5px;z-index:1000;max-height:130px;overflow-y:auto;box-shadow:0 4px 12px rgba(0,0,0,.5)"></div>
      </div>
      <input id="trl-url-${tid}" placeholder="URL" style="flex:3;min-width:120px;background:rgba(20,21,31,.8);border:1px solid rgba(85,86,106,.3);color:#EDEDF0;padding:4px 8px;border-radius:4px;font-size:10px;outline:none"
        onkeydown="if(event.key==='Enter')addTaskLink(this.closest('[id^=task-ref]').id.replace('task-ref-',''))">
      <button onclick="addTaskLink('${tid}')" style="background:rgba(217,142,63,.2);border:1px solid rgba(217,142,63,.3);color:#E2A968;padding:4px 9px;border-radius:4px;font-size:10px;cursor:pointer;flex-shrink:0">+ Link</button>
    </div>
    ${systems.length?`<div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px">${systems.map(s=>`<button
        onclick="taskRefPickSys('${tid}','${escOnclick(s.name||'')}','${escOnclick(s.url||'')}')"
        style="background:rgba(85,86,106,.1);border:1px solid rgba(85,86,106,.2);color:#8B8D9B;padding:2px 7px;border-radius:3px;font-size:9px;cursor:pointer">${s.icon||'🔗'} ${s.name}</button>`).join('')}</div>`:''}
    <button onclick="openFilePicker('task','${tid}')"
      style="background:none;border:1px dashed rgba(85,86,106,.25);color:#8B8D9B;padding:3px 10px;border-radius:4px;font-size:9px;cursor:pointer;width:100%;box-sizing:border-box">
      📁 Anexar arquivo (máx 500KB)
    </button>
  </div>`;
}

function renderTaskAttachments(p,tid){
  const attaches=(p.taskAttachments||{})[tid]||[];
  if(!attaches.length)return'';
  return`<div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px">`+
    attaches.map((a,i)=>`<a href="${a.data}" download="${a.name}"
      style="font-size:9px;color:#E2A968;background:rgba(217,142,63,.08);border:1px solid rgba(217,142,63,.2);padding:2px 7px;border-radius:3px;text-decoration:none;display:inline-flex;align-items:center;gap:3px">
      📎 ${a.name} <span onclick="event.preventDefault();removeTaskAttach('${tid}',${i})" style="color:#55566A;cursor:pointer">×</span>
    </a>`).join('')+`</div>`;
}

function removeTaskAttach(tid,idx){
  const p=getP(selId);if(!p)return;
  const ta={...(p.taskAttachments||{})};
  ta[tid]=(ta[tid]||[]).filter((_,i)=>i!==idx);
  setP(selId,{taskAttachments:ta});renderCheck();
}

// Override openFilePicker to handle task target
const _origOpenFilePicker=openFilePicker;
function openFilePicker(target,targetId){
  if(target==='task'){
    const inp=document.createElement('input');
    inp.type='file'; inp.accept='image/*,.pdf,.doc,.docx,.xlsx,.txt';
    inp.onchange=async e=>{
      const file=e.target.files[0]; if(!file)return;
      if(file.size>500*1024){showToast('Arquivo grande','Limite: 500KB');return;}
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});
      const p=getP(selId);if(!p)return;
      const ta={...(p.taskAttachments||{})};
      ta[targetId]=[...(ta[targetId]||[]),{name:file.name,type:file.type,data:b64}];
      setP(selId,{taskAttachments:ta}); renderCheck();
      showToast('✅ Arquivo anexado',file.name);
    };
    inp.click(); return;
  }
  _origOpenFilePicker(target,targetId);
}

/* ── DEFAULT TASK REORDERING ────────────────────────────── */
function getTaskOrder(p,stageId,sectionS){
  return (p.taskOrder||{})[stageId]?.[sectionS]||null;
}
function applyTaskOrder(tasks,order){
  if(!order||!order.length)return tasks;
  const byId=Object.fromEntries(tasks.map(t=>[t.id,t]));
  const ordered=order.map(id=>byId[id]).filter(Boolean);
  const rest=tasks.filter(t=>!order.includes(t.id));
  return [...ordered,...rest];
}
// dropOnDefaultTask: merged into dropOnAnyTask


/* ── BUILD INFO HISTORY (Projeto/Pod autocomplete) ──────── */
function getBuildHistory(){ return lsGet('buildHistory')||{projetos:[],pods:[]}; }
function recordBuildValue(tipo,val){
  if(!val||!val.trim())return;
  val=val.trim();
  const h=getBuildHistory();
  if(!h[tipo])h[tipo]=[];
  h[tipo]=[val,...h[tipo].filter(v=>v!==val)].slice(0,25);
  lsSet('buildHistory',h);
  sbSet('buildHistory',h).catch(()=>{});
}

// renderBuildInfo: defined above

function filterTaskRefAC(tid,q){
  const drop=document.getElementById('trl-ac-'+tid);
  if(!drop)return;
  if(!q||q.length<1){drop.style.display='none';return;}
  // Combine Sistemas AND Templates
  const _tpls=(getTemplates()||[]).map(t=>({name:t.name,url:'',icon:'📋',isTemplate:true}));
  const _allItems=[...getSystems(),..._tpls];
  const matches=_allItems.filter(s=>
    s.name.toLowerCase().includes(q.toLowerCase())||
    (s.url||'').toLowerCase().includes(q.toLowerCase())
  ).slice(0,8);
  if(!matches.length){drop.style.display='none';return;}
  drop.innerHTML=matches.map(s=>
    `<div onmousedown="taskRefPickSys('${tid}','${escOnclick(s.name)}','${escOnclick(s.url||'')}')"
      style="padding:6px 10px;cursor:pointer;display:flex;align-items:center;gap:6px;font-size:10px;color:#EDEDF0;border-bottom:1px solid rgba(85,86,106,.1)"
      onmouseover="this.style.background='rgba(217,142,63,.1)'" onmouseout="this.style.background=''">
      <span>${s.icon||'🔗'}</span><span>${s.name}</span>
      <span style="color:#55566A;margin-left:auto;font-size:9px">${(s.url||'').substring(0,25)+'…'}</span>
    </div>`
  ).join('');
  drop.style.display='block';
}
function closeTaskRefAC(tid){
  const drop=document.getElementById('trl-ac-'+tid);
  if(drop)drop.style.display='none';
}
function taskRefPickSys(tid,name,url){
  const ni=document.getElementById('trl-name-'+tid);
  const ui=document.getElementById('trl-url-'+tid);
  if(ni)ni.value=name;
  if(ui)ui.value=url;
  closeTaskRefAC(tid);
}

// Edit task link (default or user)
function editTaskLink(tid,allIdx,isDefault,srcIdx){
  const p=getP(selId);if(!p)return;
  if(isDefault){
    const task=findTaskInCL(tid);
    const orig=task?.links?.[srcIdx]||{n:'',u:''};
    const newName=prompt('Nome do link:',orig.n)||orig.n;
    const newUrl=prompt('URL:',orig.u)||orig.u;
    const edits={...(p.taskLinkEdits||{})};
    if(!edits[tid])edits[tid]={};
    edits[tid][srcIdx]={name:newName,url:newUrl};
    setP(selId,{taskLinkEdits:edits});
  } else {
    const links=[...(p.taskLinks||{})[tid]||[]];
    const orig=links[srcIdx]||{name:'',url:''};
    const newName=prompt('Nome do link:',orig.name)||orig.name;
    const newUrl=prompt('URL:',orig.url)||orig.url;
    links[srcIdx]={name:newName,url:newUrl};
    setP(selId,{taskLinks:{...(p.taskLinks||{}),[tid]:links}});
  }
  renderCheck();
}

function findTaskInCL(tid){
  for(const stageId of Object.keys(CL)){
    for(const sec of CL[stageId]){
      const t=sec.t?.find(t=>t.id===tid);
      if(t)return t;
    }
  }
  return null;
}

/* ── TEMPLATES WITH ATTACHMENTS ─────────────────────────── */
// openTplModal: defined above

function openTplFilePicker(tplIdx){
  const inp=document.createElement('input');
  inp.type='file';inp.accept='image/*,.pdf,.doc,.docx,.xlsx,.txt';
  inp.onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    if(file.size>500*1024){showToast('Arquivo grande','Limite: 500KB');return;}
    const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});
    const arr=[...getTemplates()];
    arr[tplIdx].attachments=[...(arr[tplIdx].attachments||[]),{name:file.name,type:file.type,data:b64}];
    saveMenuData('templates',arr).then(()=>{
      showToast('✅ Anexo adicionado',file.name);
      // Update display in open modal
      const container=document.getElementById('tpl-attach-'+tplIdx);
      if(container){
        const a=arr[tplIdx].attachments;
        const last=a[a.length-1];
        const ai=a.length-1;
        const el=document.createElement('span');
        el.innerHTML=`<a href="${last.data}" download="${last.name}"
          style="display:inline-flex;align-items:center;gap:4px;color:#E2A968;background:rgba(217,142,63,.08);border:1px solid rgba(217,142,63,.2);padding:3px 10px;border-radius:5px;text-decoration:none;font-size:10px;margin:2px">
          📎 ${last.name}
          <span onclick="event.preventDefault();removeTplAttach(${tplIdx},${ai},this)" style="color:#55566A;cursor:pointer">×</span>
        </a>`;
        container.appendChild(el.firstChild);
      }
    });
  };
  inp.click();
}

function removeTplAttach(tplIdx,ai,el){
  const arr=[...getTemplates()];
  arr[tplIdx].attachments=(arr[tplIdx].attachments||[]).filter((_,i)=>i!==ai);
  saveMenuData('templates',arr);
  el?.closest('a')?.remove();
  showToast('🗑 Anexo removido','');
}


/* ── PERMANENT TASKS (persist across all cards in a stage) ─ */
function getPermanentTasks(){ return lsGet('permanentTasks')||{}; }
function savePermanentTasks(data){ lsSet('permanentTasks',data); sbSet('permanentTasks',data).catch(()=>{}); }

function promoteTaskToDefault(tid,stageId,sectionS){
  const p=getP(selId);if(!p)return;
  // Busca em TODOS os stages de customTasks (tarefas persistem entre stages)
  let ct=null;
  Object.values(p.customTasks||{}).flat().forEach(t=>{if(t.tid===tid)ct=t;});
  // Se não encontrou, busca em injectedTasks (tarefa foi arrastada para seção padrão)
  if(!ct){
    Object.values(p.injectedTasks||{}).forEach(stageInj=>{
      Object.values(stageInj||{}).flat().forEach(t=>{if(t.tid===tid)ct=t;});
    });
  }
  if(!ct){showToast('Erro','Apenas tarefas adicionadas por você podem ser promovidas a padrão.');return;}
  if(!confirm(`Tornar "${ct.tx}" uma tarefa padrão em todos os cards do stage "${STAGES.find(s=>s.id===stageId)?.label||stageId}"?\n\nEla aparecerá em todos os novos cards desta esteira.`))return;
  const data=getPermanentTasks();
  if(!data[stageId])data[stageId]=[];
  // avoid duplicate
  if(!data[stageId].find(t=>t.tid===tid)){
    data[stageId].push({tid,tx:ct.tx,sectionS:sectionS||'Tarefas Adicionadas'});
    savePermanentTasks(data);
    // Remove do card atual (evita duplicação)
    const _p=getP(selId);
    if(_p){
      const _nCT=JSON.parse(JSON.stringify(_p.customTasks||{}));
      Object.keys(_nCT).forEach(s=>{const idx=(_nCT[s]||[]).findIndex(t=>t.tid===tid);if(idx>=0)_nCT[s].splice(idx,1);});
      const _nInj=JSON.parse(JSON.stringify(_p.injectedTasks||{}));
      Object.keys(_nInj).forEach(s=>{Object.keys(_nInj[s]||{}).forEach(sec=>{_nInj[s][sec]=(_nInj[s][sec]||[]).filter(t=>t.tid!==tid);});});
      setP(selId,{customTasks:_nCT,injectedTasks:_nInj});
    }
    showToast('🌟 Tarefa promovida',`"${ct.tx}" agora aparece em todos os cards de ${STAGES.find(s=>s.id===stageId)?.label||stageId}.`);
    renderCheck();
  }
}

// ── Cross-section drag e reordenamento: tratado em dropOnAnyTask acima ──




/* ── MODAL CLOSE FIX: só fecha se mousedown foi no overlay ──── */
let _modalOverlayMD=false;
document.addEventListener('mousedown',e=>{
  _modalOverlayMD=!!(e.target&&e.target.id==='modalBg');
});
document.addEventListener('click',e=>{
  if(e.target&&e.target.id==='modalBg'&&_modalOverlayMD){closeModal();}
  _modalOverlayMD=false;
});

/* ── PULL JIRA ASSIGNEE ─────────────────────────────────── */
function pullJiraAssignee(){
  const p=getP(selId);if(!p||!p.code||p.code==='—')return;
  const codes=extractJiraCodes(p.code);
  if(!codes.length){showToast('Sem código Jira','');return;}
  const inp=document.getElementById('devInpInfo');
  if(inp)inp.value='Buscando…';
  jiraFetch(`issue/${codes[0]}?fields=assignee`).then(issue=>{
    const name=issue?.fields?.assignee?.displayName||'';
    if(name){setP(selId,{dev:name});renderInfo();showToast('💻 Dev atualizado',name);}
    else{if(inp)inp.value=p.dev||'';showToast('Sem assignee','Nenhum assignee no Jira.');}
  }).catch(()=>{if(inp)inp.value=p.dev||'';showToast('Erro Jira','');});
}

/* ── @ MENTIONS EM TAREFAS ─────────────────────────────── */
let _taskAtDropdown=null;
document.addEventListener('input',e=>{
  const el=e.target;
  if(!el.id||!el.id.startsWith('editInp-'))return;
  const val=el.value,pos=el.selectionStart;
  const before=val.substring(0,pos);
  const atIdx=before.lastIndexOf('@');
  if(atIdx<0){removeTaskAtDropdown();return;}
  if(atIdx>0&&!/[\s,]/.test(before[atIdx-1])){removeTaskAtDropdown();return;}
  const query=before.substring(atIdx+1);
  if(/\s/.test(query)){removeTaskAtDropdown();return;}
  showTaskAtDropdown(el,atIdx,query);
});
function showTaskAtDropdown(el,atIdx,query){
  removeTaskAtDropdown();
  const people=getPeople().filter(p=>!query||p.name.toLowerCase().includes(query.toLowerCase())).slice(0,6);
  if(!people.length)return;
  const rect=el.getBoundingClientRect();
  const dd=document.createElement('div');
  dd.id='taskAtDrop';
  dd.style.cssText=`position:fixed;left:${rect.left}px;top:${rect.bottom+4}px;min-width:180px;
    background:#1C1D28;border:1px solid rgba(85,86,106,.4);border-radius:8px;z-index:3000;
    box-shadow:0 6px 20px rgba(0,0,0,.6);overflow:hidden`;
  dd.innerHTML=people.map(p=>{
    const ini=p.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    return `<div onmousedown="event.preventDefault();selectTaskAt('${el.id}',${atIdx},'${escOnclick(p.name)}')"
      style="display:flex;align-items:center;gap:8px;padding:7px 11px;cursor:pointer"
      onmouseover="this.style.background='rgba(217,142,63,.1)'" onmouseout="this.style.background=''">
      <div style="width:24px;height:24px;border-radius:50%;background:${p.color||'#B5701F'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">${ini}</div>
      <div><div style="font-size:11px;font-weight:600;color:#EDEDF0">${p.name}</div><div style="font-size:9px;color:#8B8D9B">${p.role||''}</div></div>
    </div>`;
  }).join('');
  document.body.appendChild(dd);_taskAtDropdown=dd;
}
function selectTaskAt(inpId,atIdx,name){
  const inp=document.getElementById(inpId);if(!inp)return;
  const before=inp.value.substring(0,atIdx);
  const after=inp.value.substring(inp.selectionStart);
  inp.value=before+'@'+name+' '+after;
  inp.focus();const np=atIdx+1+name.length+1;inp.setSelectionRange(np,np);
  removeTaskAtDropdown();
}
function removeTaskAtDropdown(){
  document.getElementById('taskAtDrop')?.remove();_taskAtDropdown=null;
}

/* ── ADD CARD MANUAL ────────────────────────────────────── */
function openAddCardModal(){
  const m=document.getElementById('addCardModal');
  if(m){
    m.style.display='flex';
    const dl=document.getElementById('pplListNc');
    if(dl)dl.innerHTML=getPeople().map(p=>`<option value="${p.name}">`).join('');
    ['ncName','ncCode','ncOwner','ncDev','ncRmd','ncAiInput'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    const aiBox=document.getElementById('ncAiBox');if(aiBox)aiBox.style.display='none';
    const aiStatus=document.getElementById('ncAiStatus');if(aiStatus)aiStatus.textContent='';
    setTimeout(()=>document.getElementById('ncName')?.focus(),50);
  }
}
function closeAddCardModal(){
  const m=document.getElementById('addCardModal');if(m)m.style.display='none';
}
function confirmAddCard(){
  const name=(document.getElementById('ncName')?.value||'').trim();
  if(!name){showToast('Nome obrigatório','');return;}
  const code=(document.getElementById('ncCode')?.value||'').trim();
  const stage=document.getElementById('ncStage')?.value||'escopo';
  const priority=document.getElementById('ncPrio')?.value||'normal';
  const owner=(document.getElementById('ncOwner')?.value||'').trim()||currentUser?.name||'';
  const dev=(document.getElementById('ncDev')?.value||'').trim();
  const rmdDate=(document.getElementById('ncRmd')?.value||'').trim();
  const newCard={
    id:'card_'+Date.now(),name,code:code||'—',stage,priority,
    owner,qa:'',dev,progress:0,notes:'',desc:'',
    blockers:[],links:[],checks:{},dis:{},customTasks:{},taskText:{},
    taskDates:{},taskNotified:{},meetings:[],deps:[],comments:[],
    stageHistory:[{stage,enteredAt:new Date().toISOString()}],
    rmdDate,jiraStatus:'',archived:false,
  };
  projects.push(newCard);addToOrder(stage,newCard.id);
  saveProjects();saveOrders();
  renderBoard();renderStats();closeAddCardModal();
  openModal(newCard.id);showToast('✅ Card criado',name);
}

/* ── CRIAÇÃO DE CARD POR LINGUAGEM NATURAL (IA) ──────── */
function toggleAiCreate(){
  const box=document.getElementById('ncAiBox');
  if(!box)return;
  box.style.display=box.style.display==='none'?'block':'none';
  if(box.style.display==='block')setTimeout(()=>document.getElementById('ncAiInput')?.focus(),50);
}

async function interpretCardAI(){
  const input=(document.getElementById('ncAiInput')?.value||'').trim();
  const status=document.getElementById('ncAiStatus');
  if(!input){if(status)status.textContent='Descreva o card primeiro.';return;}
  if(!apiKey){if(status)status.textContent='⚠️ Configure a API Key da Anthropic (⚙ no cabeçalho) antes de usar a IA.';return;}
  if(status)status.textContent='Interpretando…';

  const stageIds=STAGES.map(s=>s.id).join(', ');
  const system=`Você extrai dados estruturados de uma descrição em texto livre de uma demanda de projeto (equipe de RV — Renda Variável, Valemobi).
Responda SOMENTE com um objeto JSON válido, sem markdown, sem texto antes ou depois, com exatamente estas chaves:
{"name": string (nome curto da demanda), "code": string ou "" (código Jira tipo BAPD-1234 ou BAPG-1234, se mencionado), "stage": um destes valores exatos [${stageIds}] (o mais provável dado o contexto; se não houver pista, use "escopo"), "priority": um de ["urgent","high","normal","low"], "owner": string ou "" (responsável/owner, se mencionado), "dev": string ou "" (desenvolvedor, se mencionado), "rmdDate": string ou "" (data no formato dd/mm/aaaa, se mencionada)}
Não invente informação que não esteja no texto — deixe campo vazio ("") quando não for possível inferir.`;

  try{
    const raw=await callClaude(system,[{role:'user',content:input}]);
    const clean=raw.replace(/```json|```/g,'').trim();
    const data=JSON.parse(clean);

    if(data.name)document.getElementById('ncName').value=data.name;
    if(data.code)document.getElementById('ncCode').value=data.code;
    if(data.stage&&STAGES.some(s=>s.id===data.stage))document.getElementById('ncStage').value=data.stage;
    if(data.priority&&PRIO[data.priority])document.getElementById('ncPrio').value=data.priority;
    if(data.owner)document.getElementById('ncOwner').value=data.owner;
    if(data.dev)document.getElementById('ncDev').value=data.dev;
    if(data.rmdDate)document.getElementById('ncRmd').value=data.rmdDate;

    if(status)status.textContent='✅ Preenchido — revise antes de criar.';
  }catch(e){
    if(status)status.textContent='⚠️ Não consegui interpretar. Preencha manualmente ou tente reformular.';
  }
}

/* ── TASKS PANEL (sidebar 📋) ───────────────────────────── */
let _tpExpanded={sec1:false,sec2:false};
const _tpCards={};

function openTasksPanel(){
  document.getElementById('tasksPanelOverlay').classList.add('open');renderTasksPanel();
}
function closeTasksPanel(){document.getElementById('tasksPanelOverlay').classList.remove('open');maybeReopenDigest();}
function toggleTpSection(sec){_tpExpanded[sec]=!_tpExpanded[sec];renderTasksPanel();}
function toggleTpCard(pid){_tpCards[pid]=!(_tpCards[pid]??false);renderTasksPanel();}

function getCardStageTasks(p){
  const clS=CL[p.stage]||[];
  const defs=clS.flatMap(s=>s.t||[]).filter(t=>!(p.dis||{})[t.id]);
  const _s=new Set();
  const custom=Object.values(p.customTasks||{}).flat().filter(t=>{if(_s.has(t.tid))return false;_s.add(t.tid);return true;});
  const perma=(getPermanentTasks()[p.stage]||[]);
  return [...defs,...custom.map(ct=>({id:ct.tid,tx:ct.tx})),...perma.map(pt=>({id:pt.tid,tx:pt.tx}))];
}
function toggleCardTaskInPanel(pid,tid,val){
  const p=getP(pid);if(!p)return;
  setP(pid,{checks:{...(p.checks||{}),[tid]:val}});
  refreshProgress(pid);renderTasksPanel();renderBoard();renderStats();
}
function openCardAtTask(pid,tid){
  closeTasksPanel();openModal(pid);
  setTimeout(()=>{sw('check');setTimeout(()=>{
    const el=document.getElementById('clt-'+tid);
    if(el){el.scrollIntoView({behavior:'smooth',block:'center'});
      el.style.transition='background .3s';el.style.background='rgba(217,142,63,.15)';
      setTimeout(()=>{el.style.background='';},2000);}
  },200);},80);
}

/* ── STANDALONE TASKS ───────────────────────────────────── */
function getStandaloneTasks(){return lsGet('standaloneTasks')||[];}
function saveStandaloneTasks(arr){lsSet('standaloneTasks',arr);sbSet('standaloneTasks',arr).catch(()=>{});}

function addStandaloneTask(){
  const inp=document.getElementById('tpStandaloneInp');
  const txt=(inp?.value||'').trim();if(!txt)return;
  const tasks=[...getStandaloneTasks(),{id:'st_'+Date.now(),tx:txt,done:false,createdAt:new Date().toISOString()}];
  saveStandaloneTasks(tasks);if(inp)inp.value='';renderTasksPanel();
}
function toggleStandaloneTask(id,val){
  const tasks=getStandaloneTasks();const t=tasks.find(t=>t.id===id);if(!t)return;
  if(val&&t.recurrence){
    const next=getNextOccurrence(new Date(),t.recurrence);
    showToast(`🔁 ${RECUR_LABELS[t.recurrence]||''}`,`Próxima: ${next.toLocaleDateString('pt-BR')}`);
    saveStandaloneTasks(tasks.map(st=>st.id===id?{...st,done:true}:st));
    const ms={daily:86400000,weekly:604800000,monthly:2592000000}[t.recurrence]||86400000;
    setTimeout(()=>{saveStandaloneTasks(getStandaloneTasks().map(st=>st.id===id?{...st,done:false}:st));renderTasksPanel();},ms);
  } else {
    saveStandaloneTasks(tasks.map(st=>st.id===id?{...st,done:val}:st));
  }
  renderTasksPanel();
}
function deleteStandaloneTask(id){
  const t=getStandaloneTasks().find(x=>x.id===id);
  if(t)trashPush('standalone',t.tx||'(tarefa sem texto)',JSON.parse(JSON.stringify(t)));
  saveStandaloneTasks(getStandaloneTasks().filter(x=>x.id!==id));
  renderTasksPanel();
  if(t)showToast('🗑 Movido para a lixeira','Pode ser restaurado.');
}
function startEditStandalone(id){
  const row=document.getElementById('st-row-'+id);if(!row)return;
  const t=getStandaloneTasks().find(t=>t.id===id);if(!t)return;
  const span=row.querySelector('.tp-task-txt');if(!span)return;
  const inp=document.createElement('input');inp.value=t.tx;
  inp.style.cssText='flex:1;background:rgba(20,21,31,.8);border:1px solid #D98E3F;color:#EDEDF0;padding:3px 8px;border-radius:4px;font-size:11px;outline:none';
  inp.onkeydown=e=>{if(e.key==='Enter')saveStandaloneEdit(id,inp.value);if(e.key==='Escape')renderTasksPanel();};
  inp.onblur=()=>saveStandaloneEdit(id,inp.value);
  span.replaceWith(inp);inp.focus();inp.select();
}
function saveStandaloneEdit(id,newTx){
  const txt=(newTx||'').trim();if(!txt)return;
  saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,tx:txt}:t));renderTasksPanel();
}
function setStandaloneRecurrence(id,val){
  saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,recurrence:val||null}:t));renderTasksPanel();
}
function setStandaloneReminder(id,val){
  saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,dueDate:val||null,notified:false}:t));
  renderTasksPanel();if(val)checkReminders();
}
function toggleStandaloneRemind(id){const el=document.getElementById('st-remind-'+id);if(el)el.style.display=el.style.display==='none'?'block':'none';}
function toggleStandaloneRef(id){const el=document.getElementById('st-ref-'+id);if(el)el.style.display=el.style.display==='none'?'block':'none';}
function addStandaloneLink(id){
  const name=(document.getElementById('st-ln-'+id)?.value||'').trim();
  const url=(document.getElementById('st-lu-'+id)?.value||'').trim();if(!url)return;
  saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,links:[...(t.links||[]),{name:name||url,url}]}:t));
  renderTasksPanel();
}
function removeStandaloneLink(id,i){
  saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,links:(t.links||[]).filter((_,j)=>j!==i)}:t));renderTasksPanel();
}
function openStandaloneFilePicker(id){
  const inp=document.createElement('input');inp.type='file';inp.accept='image/*,.pdf,.doc,.docx,.xlsx,.txt';
  inp.onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    if(file.size>500*1024){showToast('Arquivo grande','Limite: 500KB');return;}
    const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});
    saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,attachments:[...(t.attachments||[]),{name:file.name,data:b64}]}:t));
    renderTasksPanel();showToast('📎 Anexo adicionado',file.name);
  };inp.click();
}

function renderStandaloneRefs(t){
  const links=t.links||[];const attaches=t.attachments||[];const sys=getSystems().slice(0,6);
  let h='';
  if(links.length) h+=`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:5px">`+
    links.map((l,i)=>`<span style="display:inline-flex;align-items:center;gap:3px;background:rgba(217,142,63,.1);border:1px solid rgba(217,142,63,.2);padding:2px 8px;border-radius:4px;font-size:10px">
      <a href="${l.url}" target="_blank" style="color:#E2A968;text-decoration:none">🔗 ${l.name}</a>
      <button onclick="removeStandaloneLink('${t.id}',${i})" style="background:none;border:none;color:#55566A;cursor:pointer">×</button>
    </span>`).join('')+`</div>`;
  if(attaches.length) h+=`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:5px">`+
    attaches.map((a,i)=>`<a href="${a.data}" download="${a.name}"
      style="display:inline-flex;align-items:center;gap:3px;color:#E2A968;background:rgba(217,142,63,.08);border:1px solid rgba(217,142,63,.2);padding:2px 8px;border-radius:4px;text-decoration:none;font-size:10px">
      📎 ${a.name}<span onclick="event.preventDefault();getStandaloneTasks();removeStandaloneAttach('${t.id}',${i})" style="color:#55566A;cursor:pointer">×</span></a>`).join('')+`</div>`;
  h+=`<div style="display:flex;gap:4px;margin-bottom:5px;flex-wrap:wrap">
    <input id="st-ln-${t.id}" placeholder="Nome" style="flex:1;min-width:80px;background:rgba(20,21,31,.8);border:1px solid rgba(85,86,106,.3);color:#EDEDF0;padding:4px 7px;border-radius:4px;font-size:10px;outline:none">
    <input id="st-lu-${t.id}" placeholder="URL" style="flex:2;min-width:110px;background:rgba(20,21,31,.8);border:1px solid rgba(85,86,106,.3);color:#EDEDF0;padding:4px 7px;border-radius:4px;font-size:10px;outline:none"
      onkeydown="if(event.key==='Enter')addStandaloneLink('${t.id}')">
    <button onclick="addStandaloneLink('${t.id}')" style="background:rgba(217,142,63,.2);border:1px solid rgba(217,142,63,.3);color:#E2A968;padding:4px 8px;border-radius:4px;font-size:10px;cursor:pointer">+ Link</button>
  </div>
  ${sys.length?`<div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px">${sys.map(s=>`<button
    onclick="(function(){var ni=document.getElementById('st-ln-${t.id}');var ui=document.getElementById('st-lu-${t.id}');if(ni)ni.value='${escOnclick(s.name)}';if(ui)ui.value='${escOnclick(s.url||'')}'})()"
    style="background:rgba(85,86,106,.1);border:1px solid rgba(85,86,106,.2);color:#8B8D9B;padding:2px 7px;border-radius:3px;font-size:9px;cursor:pointer">${s.icon||'🔗'} ${s.name}</button>`).join('')}</div>`:''}
  <button onclick="openStandaloneFilePicker('${t.id}')"
    style="background:none;border:1px dashed rgba(85,86,106,.25);color:#8B8D9B;padding:3px 10px;border-radius:4px;font-size:9px;cursor:pointer;width:100%;box-sizing:border-box">
    📁 Anexar arquivo (máx 500KB)</button>`;
  return h;
}
function removeStandaloneAttach(id,i){
  saveStandaloneTasks(getStandaloneTasks().map(t=>t.id===id?{...t,attachments:(t.attachments||[]).filter((_,j)=>j!==i)}:t));renderTasksPanel();
}

/* ── DRAG-AND-DROP: reordenar Tarefas Avulsas ─────────── */
let dragStandaloneId=null;
function startDragStandalone(e,id){
  dragStandaloneId=id;
  e.dataTransfer.effectAllowed='move';
  setTimeout(()=>{const row=document.getElementById('st-row-'+id);if(row)row.style.opacity='.4';},0);
}
function endDragStandalone(e){
  e.currentTarget.style.opacity='1';
  document.querySelectorAll('[id^="st-row-"]').forEach(r=>r.style.borderTopColor='');
  dragStandaloneId=null;
}
function dropStandaloneTask(e,toId){
  e.preventDefault();
  e.currentTarget.style.borderTopColor='';
  if(!dragStandaloneId||dragStandaloneId===toId)return;
  const arr=[...getStandaloneTasks()];
  const fromIdx=arr.findIndex(t=>t.id===dragStandaloneId);
  const toIdx=arr.findIndex(t=>t.id===toId);
  if(fromIdx<0||toIdx<0)return;
  arr.splice(toIdx,0,arr.splice(fromIdx,1)[0]);
  saveStandaloneTasks(arr);
  renderTasksPanel();
}
function renderStandaloneTaskRow(t){
  const isRecur=t.recurrence;const hasDue=!!t.dueDate;
  const isPastDue=hasDue&&new Date(t.dueDate)<=new Date();
  const hasRef=!!(t.links?.length||t.attachments?.length);
  const totalRef=(t.links?.length||0)+(t.attachments?.length||0);
  const dueStr=hasDue?new Date(t.dueDate+'T00:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit'}):' ';
  return `<div id="st-row-${t.id}" draggable="true"
      ondragstart="startDragStandalone(event,'${t.id}')" ondragend="endDragStandalone(event)"
      ondragover="event.preventDefault();this.style.borderTopColor='#D98E3F'"
      ondragleave="this.style.borderTopColor=''"
      ondrop="dropStandaloneTask(event,'${t.id}')"
      style="background:rgba(20,21,31,.4);border:1px solid rgba(85,86,106,.2);border-top-width:2px;border-radius:7px;margin-bottom:6px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:7px;padding:8px 10px">
      <span style="cursor:grab;color:#55566A;font-size:12px;flex-shrink:0;user-select:none" title="Arrastar para reordenar">⠿</span>
      <input type="checkbox" class="tp-task-cb" ${t.done?'checked':''} onchange="toggleStandaloneTask('${t.id}',this.checked)">
      <span class="tp-task-txt${t.done?' done':''}" style="flex:1;font-size:11px;cursor:pointer" onclick="startEditStandalone('${t.id}')">${t.tx}${isRecur?' <span style="color:#818cf8;font-size:9px">🔁</span>':''}${hasDue?' <span style="color:#fbbf24;font-size:9px">📅 '+dueStr+'</span>':''}</span>
      <div style="display:flex;align-items:center;gap:3px;flex-shrink:0">
        <button onclick="startEditStandalone('${t.id}')" title="Editar" style="background:none;border:none;color:#55566A;cursor:pointer;font-size:12px;padding:2px 3px">✏</button>
        <select onchange="setStandaloneRecurrence('${t.id}',this.value)" style="font-size:9px;background:#15161F;border:1px solid rgba(85,86,106,.2);color:${isRecur?'#818cf8':'#2C2D3C'};border-radius:3px;padding:1px 3px;cursor:pointer;max-width:52px">
          <option value="" ${!isRecur?'selected':''}>1x</option>
          <option value="daily" ${isRecur==='daily'?'selected':''}>🔁 D</option>
          <option value="weekly" ${isRecur==='weekly'?'selected':''}>🔁 S</option>
          <option value="monthly" ${isRecur==='monthly'?'selected':''}>🔁 M</option>
        </select>
        <button onclick="toggleStandaloneRemind('${t.id}')" title="${!hasDue?'Sem lembrete':isPastDue?'Lembrete já disparado':'Lembrete agendado'}" style="background:none;border:none;color:${!hasDue?'#2C2D3C':isPastDue?'#7A9B6B':'#fbbf24'};cursor:pointer;font-size:13px;padding:2px">${!hasDue?'🔕':isPastDue?'🔔<span style="font-size:8px;margin-left:-3px;vertical-align:top">✓</span>':'🔔'}</button>
        <button onclick="toggleStandaloneRef('${t.id}')" style="background:none;border:none;color:${hasRef?'#E2A968':'#2C2D3C'};cursor:pointer;font-size:13px;padding:2px">📎${totalRef>0?'<sup style="font-size:8px">'+totalRef+'</sup>':''}</button>
        <button onclick="deleteStandaloneTask('${t.id}')" style="background:none;border:none;color:#2C2D3C;cursor:pointer;font-size:13px;padding:2px" title="Remover">🗑</button>
      </div>
    </div>
    <div id="st-remind-${t.id}" style="display:none;padding:6px 10px 8px 34px;background:rgba(0,0,0,.15);border-top:1px solid rgba(85,86,106,.15)">
      <input type="datetime-local" value="${t.dueDate||''}"
        style="background:rgba(20,21,31,.8);border:1px solid rgba(85,86,106,.3);color:#EDEDF0;padding:4px 8px;border-radius:4px;font-size:10px;outline:none"
        onchange="setStandaloneReminder('${t.id}',this.value)">
      ${hasDue?'<button onclick="setStandaloneReminder(\''+t.id+'\',\'\')" style="background:none;border:none;color:#55566A;cursor:pointer;font-size:10px;margin-left:4px">✕ Remover</button>':''}
    </div>
    <div id="st-ref-${t.id}" style="display:none;padding:8px 10px;background:rgba(0,0,0,.15);border-top:1px solid rgba(85,86,106,.15)">
      ${renderStandaloneRefs(t)}
    </div>
  </div>`;
}

function renderTasksPanel(){
  const body=document.getElementById('tasksPanelBody');if(!body)return;
  const active=projects.filter(p=>!p.archived);
  const standalone=getStandaloneTasks();
  const s1open=_tpExpanded.sec1!==false;
  let totalPend=0;
  active.forEach(p=>{const tasks=getCardStageTasks(p);totalPend+=tasks.filter(t=>!(p.checks||{})[t.id]).length;});
  let h=`<div class="tp-section">
    <div class="tp-sec-hd" onclick="toggleTpSection('sec1')">
      <div class="tp-sec-title">${s1open?'▼':'▶'} 📌 Tarefas dos Cards</div>
      <span class="tp-sec-badge">${totalPend} pendentes</span>
    </div>`;
  if(s1open){
    active.forEach(p=>{
      const tasks=getCardStageTasks(p);if(!tasks.length)return;
      const done=tasks.filter(t=>(p.checks||{})[t.id]).length;
      const pend=tasks.length-done;
      const cardOpen=_tpCards[p.id]===true;
      const stI=STAGES.find(s=>s.id===p.stage);
      h+=`<div class="tp-card-hd" onclick="toggleTpCard('${p.id}')">
        <div class="tp-card-name">${cardOpen?'▼':'▶'} <span style="font-size:10px">${stI?.icon||''}</span> ${p.name} <span style="color:#55566A;font-size:9px">${p.code}</span></div>
        <span class="tp-card-badge" style="color:${pend>0?'#fbbf24':'#7A9B6B'}">${done}/${tasks.length} ✓</span>
      </div>`;
      if(cardOpen){
        h+=`<div class="tp-tasks">`;
        tasks.forEach(t=>{
          const tid=t.id||t.tid;const isDone=!!(p.checks||{})[tid];const isR=!!(p.taskRecurrence||{})[tid];
          h+=`<div class="tp-task-row">
            <input type="checkbox" class="tp-task-cb" ${isDone?'checked':''} onchange="toggleCardTaskInPanel('${p.id}','${tid}',this.checked)">
            <span class="tp-task-txt${isDone?' done':''}" style="flex:1" onclick="openCardAtTask('${p.id}','${tid}')">${t.tx||tid}${isR?' 🔁':''}</span>
            <button class="tp-open-card" onclick="openCardAtTask('${p.id}','${tid}')" title="Abrir no card">↗</button>
          </div>`;
        });
        h+=`</div>`;
      }
    });
    if(!active.length) h+=`<div style="font-size:11px;color:#2C2D3C;padding:14px;text-align:center">Nenhuma demanda ativa.</div>`;
  }
  h+=`</div>`;
  const s2open=_tpExpanded.sec2!==false;
  const stPend=standalone.filter(t=>!t.done).length;
  h+=`<div class="tp-section">
    <div class="tp-sec-hd" onclick="toggleTpSection('sec2')">
      <div class="tp-sec-title">${s2open?'▼':'▶'} 🗒 Tarefas Avulsas</div>
      <span class="tp-sec-badge">${stPend} pendentes</span>
    </div>`;
  if(s2open){
    h+=`<div class="tp-tasks" style="padding-top:10px">
      <div style="display:flex;gap:7px;margin-bottom:12px">
        <input id="tpStandaloneInp" class="tp-standalone-inp" placeholder="Nova tarefa avulsa…" onkeydown="if(event.key==='Enter')addStandaloneTask()">
        <button class="tp-add-btn" onclick="addStandaloneTask()">+ Add</button>
      </div>`;
    if(!standalone.length) h+=`<div style="font-size:11px;color:#2C2D3C;padding:8px;text-align:center">Nenhuma tarefa avulsa cadastrada.</div>`;
    else standalone.forEach(t=>{h+=renderStandaloneTaskRow(t);});
    h+=`</div>`;
  }
  h+=`</div>`;
  body.innerHTML=h;
}

// Integrate standalone reminders into checkReminders
const _origCR=window.checkReminders;
if(typeof _origCR==='function') window.checkReminders=(function(orig){
  return function(){
    orig();
    const now=new Date();
    getStandaloneTasks().filter(t=>!t.done&&t.dueDate&&!t.notified).forEach(t=>{
      if(new Date(t.dueDate)<=now){
        saveStandaloneTasks(getStandaloneTasks().map(s=>s.id===t.id?{...s,notified:true}:s));
        showReminderAlert&&showReminderAlert('Tarefa Avulsa',t.tx,'__standalone__',t.id);
        try{fireBrowserNotif&&fireBrowserNotif('Tarefa Avulsa',t.tx);}catch(e){}
      }
    });
  };
}(_origCR));


/* ── GLOBAL TASK TEXT (edição de tarefa padrão reflete em todos cards) ── */
function getGlobalTaskText(){ return lsGet('globalTaskText')||{}; }
function setGlobalTaskText(tid,tx){
  const g={...getGlobalTaskText(),[tid]:tx};
  lsSet('globalTaskText',g); sbSet('globalTaskText',g).catch(()=>{});
}

/* ── GLOBAL TASK ORDER (ordem de tarefa padrão reflete em todos cards) ── */
function getGlobalTaskOrder(){ return lsGet('globalTaskOrder')||{}; }
function setGlobalTaskOrder(stageId,sectionS,order){
  const g=JSON.parse(JSON.stringify(getGlobalTaskOrder()));
  if(!g[stageId])g[stageId]={};
  g[stageId][sectionS]=order;
  lsSet('globalTaskOrder',g); sbSet('globalTaskOrder',g).catch(()=>{});
}

/* ── HIDDEN TASKS PER CARD ── */
function hideTaskForCard(pid,tid){
  const p=getP(pid);if(!p)return;
  setP(pid,{taskHidden:{...(p.taskHidden||{}),[tid]:true}});
}

/* ── GLOBALLY REMOVED TASKS ── */
function getGlobalRemovedTasks(){ return lsGet('globalRemovedTasks')||{}; }
function removeTaskGlobally(stageId,tid){
  const g={...getGlobalRemovedTasks()};
  if(!g[stageId])g[stageId]=[];
  if(!g[stageId].includes(tid)){g[stageId].push(tid);}
  lsSet('globalRemovedTasks',g); sbSet('globalRemovedTasks',g).catch(()=>{});
}
function restoreGlobalTask(stageId,tid){
  const g={...getGlobalRemovedTasks()};
  if(g[stageId])g[stageId]=g[stageId].filter(t=>t!==tid);
  lsSet('globalRemovedTasks',g); sbSet('globalRemovedTasks',g).catch(()=>{});
}

/* ── REMOVE DEFAULT/PERMANENT TASK (pergunta opção) ── */
function removeDefaultTask(tid,stageId,taskLabel,isPermanent){
  const choice=confirm(
    `"${taskLabel}"\n\nComo deseja remover esta tarefa?\n\n`+
    `• OK = Remover deste card apenas\n`+
    `• Cancelar = Remover de TODOS os cards desta esteira${isPermanent?' (deixa de ser padrão)':''}`
  );
  if(choice){
    // Só este card: oculta (taskHidden)
    hideTaskForCard(selId,tid);
    if(isPermanent){
      // Também marca N/A neste card pra não contar no progresso
      const p=getP(selId);
      setP(selId,{taskHidden:{...(p?.taskHidden||{}),[tid]:true}});
    }
  } else {
    // Todos os cards: remove globalmente
    if(isPermanent){
      // Remove de permanentTasks
      const data=getPermanentTasks();
      if(data[stageId])data[stageId]=data[stageId].filter(t=>t.tid!==tid);
      savePermanentTasks(data);
    } else {
      // Adiciona à lista de removidos globalmente
      removeTaskGlobally(stageId,tid);
    }
    // Remove deste card também
    const p=getP(selId);
    setP(selId,{taskHidden:{...(p?.taskHidden||{}),[tid]:true}});
  }
  renderCheck();
}


const INIT=[
  {id:"vi",name:"Valor Investido",code:"BAPD-2246/2723",stage:"qa",priority:"urgent",owner:"Bruno Granito",qa:"Bruno Granito",rmdDate:"28/07/2026",progress:65,
   desc:"Feature de exibição do Valor Investido (preço médio) para ativos de RV em custódia. Cobre 3 cenários: (1) Ativo de IPO — preço de custo via CRCA, preço de mercado via backoffice; (2) Ativo Lockup sem cotação — preço manual do backoffice; (3) Ativo já negociado B3 — liquidadas usam accepted booking, não-liquidadas usam bucket. Inclui reprocessamento diário de posições.",
   blockers:["BINC11: Divergência CRCA vs Mercado","VLMB4: Zero-value display bug","Homolog: apenas 3 dias (20-22/07)"],
   notes:"Reunião crítica 17/07. Gabriel: não deixar cair. RDM agendada 28/07.",
   links:[{n:"BAPD-2246",u:"https://valemobi.atlassian.net/browse/BAPD-2246"},{n:"BAPD-2723",u:"https://valemobi.atlassian.net/browse/BAPD-2723"},{n:"TFS",u:TFS}],checks:{},dis:{}},
  {id:"ca",name:"Carteiras Automatizadas",code:"BAPG-1450/1501",stage:"qa",priority:"high",owner:"Bruno Granito",qa:"Bruno Granito",rmdDate:null,progress:55,
   desc:"Novo produto que permite ao cliente aderir a carteiras de investimento com rebalanceamento automático por periodicidade (diário, semanal, etc.) ou por eventos (volatilidade, eventos corporativos). Inclui: prateleira de carteiras no Backoffice (US-01), monitor de boletas (US-02), mesa/basket (US-03), custódia segregada em conta XPTO (US-04), contratação via Novo HB e App (US-05), parâmetros de comissão e Conta Erro 9999300 (US-06). Suitability é informativo, não bloqueante.",
   blockers:["Sinacor: acesso negado (Leo)","Conta Erro 9999300: comportamento indefinido"],
   notes:"US-01 a US-06 completas. Testes com mocks avançando. Modelo distribuição recebido do Pontes.",
   links:[{n:"BAPG-1501",u:"https://valemobi.atlassian.net/browse/BAPG-1501"}],checks:{},dis:{}},
  {id:"pe",name:"Produtos Estruturados",code:"BAPG-1503",stage:"dev",priority:"high",owner:"Bruno Granito",rmdDate:null,progress:40,
   desc:"Integração Valemobi/Ágora com Bradesco para oferta de Produtos Estruturados. Envolve: visões de Backoffice, Cliente e Assessor; fluxo de aceite com SSO Bradesco; suitability como possível bloqueante (High Criticality); reprecificação D+0 intraday; notificações via Firebase/APNs; Messages API; SLA monitoring. USs v1.1/v1.2 e protótipos v2 entregues. Nomenclatura: 'Produtos Estruturados' (não 'Operações Estruturadas').",
   blockers:["Aguardando agenda com Ágora/Bradesco"],
   notes:"USs e protótipos v2 entregues. Gaps de escopo macro pendentes. Pedido de agenda feito 21/07.",
   links:[{n:"BAPG-1503",u:"https://valemobi.atlassian.net/browse/BAPG-1503"}],checks:{},dis:{}},
  {id:"cr",name:"Custódia Remunerada",code:"BAPG-???",stage:"descoberta",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:30,
   desc:"Funcionalidade de Custódia Remunerada para clientes de RV. Permite que ativos em custódia gerem remuneração automática. Inclui visões de Backoffice, Cliente e Assessor. US e protótipos em processo de revisão com ajustes de RNs e mocks.",
   blockers:[],notes:"US e protótipos em revisão. Ajustes de RNs e mocks pendentes.",links:[],checks:{},dis:{}},
  {id:"rap",name:"RAP — Reinvestimento Automático",code:"BAPG-???",stage:"descoberta",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:25,
   desc:"Reinvestimento Automático de Proventos: automatiza o reinvestimento de dividendos e JCP recebidos em RV. Suporta periodicidades Diária, Bimestral, Trimestral, Semestral e Dinâmica (configurável em dias). Estratégias de execução incluem TWAP. Sem notificações transacionais por evento (padrão Ágora).",
   blockers:[],notes:"US em revisão. Periodicidades e TWAP a definir.",links:[],checks:{},dis:{}},
  {id:"mp",name:"Margem Complementar Venda de Put",code:"BAPG-1544",stage:"descoberta",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:20,
   desc:"Funcionalidade para uso de ativos de RV como margem complementar em operações de Venda de Put descoberta. Integração com TradeSystem e INOA para verificação de elegibilidade, bloqueio e liberação de garantias. USs enviadas para Ágora/Bradesco sem retorno.",
   blockers:["US enviadas sem retorno da Ágora/Bradesco"],notes:"Descoberta/Refinamento. Aguardando retorno.",
   links:[{n:"BAPG-1544",u:"https://valemobi.atlassian.net/browse/BAPG-1544"}],checks:{},dis:{}},
  {id:"gg",name:"Gestão de Garantias RF — Depósito",code:"BAPD-1327",stage:"homolog",priority:"high",owner:"Ageu/Bruno",rmdDate:"13/08/2026",progress:60,
   desc:"Gestão de Garantias para Renda Fixa no Novo HB e App. Fase 1 (Depósito): permite depositar títulos privados (CDB, LCI, LCA) como garantia em operações via INOA. Integração B3/CETIP com validação de elegibilidade (casamento de campos backoffice x custódia) e atualização em tempo real. Depósito homologado, RDM 13/08. Retirada separada (BAPD-2791).",
   blockers:["Retirada RF: novo time sem prazo","Credencial SINACOR: erro 400 em TI"],
   notes:"Depósito homologado (13/08). Retirada bloqueada — possível problema Synacore. Passagem de conhecimento 16/07.",
   links:[{n:"BAPD-1327",u:"https://valemobi.atlassian.net/browse/BAPD-1327"}],checks:{},dis:{}},
  {id:"prv",name:"Push de Renda Variável",code:"BAPD-2512",stage:"escopo",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:15,
   desc:"Funcionalidade para assessores enviarem propostas de operações de RV diretamente ao cliente via push (App e/ou HB). Cliente recebe proposta, visualiza detalhes e aceita ou recusa. Proposta expira automaticamente no fechamento do pregão (sem timer manual). Aguardando 'de acordo' do DS/Ágora — estimativa enviada sem retorno.",
   blockers:["Aguardando 'de acordo' DS/Ágora"],notes:"Estimativa enviada sem retorno. Timer de Expiração descartado.",
   links:[{n:"BAPD-2512",u:"https://valemobi.atlassian.net/browse/BAPD-2512"}],checks:{},dis:{}},
  {id:"pd",name:"Push de Documentos",code:"BAPD-2511",stage:"escopo",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:15,
   desc:"Funcionalidade para envio de documentos com aceite formal do cliente. O assessor seleciona canal (App, HB ou ambos), faz upload do documento, define se é obrigatório (cliente precisa scrollar até o final) e envia. Log regulatório no Backoffice registra IP, timestamp, identificador do aceite e hash do arquivo. Fluxo validado em 02/06.",
   blockers:["Aguardando 'de acordo' DS/Ágora"],notes:"Fluxo validado 02/06. Pendências técnicas mapeadas.",
   links:[{n:"BAPD-2511",u:"https://valemobi.atlassian.net/browse/BAPD-2511"}],checks:{},dis:{}},
  {id:"as",name:"Alerta Direito de Subscrição",code:"BAPG-1669",stage:"escopo",priority:"normal",owner:"Ewerton/Bruno",rmdDate:null,progress:10,
   desc:"Alertas automáticos nas boletas de Compra e Venda quando o ativo possui Direito de Subscrição vigente. Escopo confirmado: boleta de Compra mantém alerta existente sem alteração; boleta de Venda adiciona texto informando a quantidade de direitos de subscrição disponíveis. Estimativa de 400+ horas — Gabriel surpreso. Aguardando 'de acordo' DS/Ágora.",
   blockers:["Aguardando 'de acordo' DS/Ágora (400+ horas estimadas)"],
   notes:"Entendimento confirmado. Boleta venda: adicionar texto alerta de subscrição.",
   links:[{n:"BAPG-1669",u:"https://valemobi.atlassian.net/browse/BAPG-1669"}],checks:{},dis:{}},
  {id:"hb",name:"Horário BM&F",code:"BAPD-???",stage:"qa",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:45,
   desc:"Correção na exibição do horário de negociação de contratos BMF (Futuros) no Novo HB. Problema identificado: horário travado / offset incorreto. Correção via Cheetah Data Streamer — Rony/Yago precisam atualizar o componente no ambiente Alpha para validação.",
   blockers:["Aguardando Rony/Yago atualizar cheetah em Alpha"],notes:"Programado 17:30h. Rony deixou TI funcional.",links:[],checks:{},dis:{}},
  {id:"nb",name:"Notícias B3",code:"BAPD-2300",stage:"rdm",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:80,
   desc:"Correção na exibição de notícias da B3 no Novo HB. Script de atualização enviado ao Cabelinho para aplicação. Build trusted-kws implantada com sucesso na RDM de 16/07. Aguardando abertura de RITM para envio ao ambiente FIX (produção).",
   notes:"Script enviado ao Cabelinho. RDM trusted-kws 16/07 ok.",
   links:[{n:"BAPD-2300",u:"https://valemobi.atlassian.net/browse/BAPD-2300"}],checks:{},dis:{}},
  {id:"cp",name:"Compra Programada de Ações",code:"BAPG-???",stage:"descoberta",priority:"low",owner:"Bruno Granito",rmdDate:null,progress:20,
   desc:"Funcionalidade para programar compras periódicas automáticas de ações com aporte definido. Suporta periodicidades: Diária, Bimestral, Trimestral, Semestral e Dinâmica (configurável em dias). Estratégia de execução TWAP disponível. USs em revisão com ajustes de periodicidades, adição de TWAP e remoção de seções desnecessárias.",
   blockers:[],notes:"US em revisão. Periodicidades e TWAP.",links:[],checks:{},dis:{}},
  {id:"qp",name:"Qualificado/Profissional no Gráfico",code:"AMTS-1176",stage:"rdm",priority:"high",owner:"Bruno Granito",rmdDate:"28/07/2026",progress:85,
   desc:"Ao abrir o papel de um ativo no gráfico do Novo HB, exibir aviso de 'Investidor Qualificado' ou 'Profissional' conforme perfil do cliente. Integração com validação de perfil cadastrado. Ficha e Plano de Implantação prontos. RDM agendada para 28/07 — Dev responsável: identificado com Wesley. Léo precisa participar para testar.",
   notes:"Ficha e Plano prontos. RDM 28/07 precisa do Léo para testar.",
   links:[{n:"AMTS-1176",u:"https://valemobi.atlassian.net/browse/AMTS-1176"}],checks:{},dis:{}},
  {id:"nm",name:"Novos Módulos HB — Paridade",code:"Novo HB",stage:"homolog",priority:"high",owner:"Bruno Granito",rmdDate:null,progress:35,
   desc:"Homologação dos novos módulos do Novo HB para alcançar paridade funcional com o HB antigo. Módulos: Venda Descoberta, Tesouro Direto, Produtos, One Click Journey. Responsáveis por área: Denis (visão Assessor / Trade System), Maga e Rafa (visão Cliente RV), Rodolfo (Produtos). Reuniões recorrentes terça e quinta 15min. Alvo: 12/08. Pacote extra de melhorias layout/front 04/08 → deploy 18/08.",
   notes:"Kickoff 16/07. Denis/Maga/Rafa/Rodolfo. Alvo: 12/08. Pacote extra 04/08.",links:[],checks:{},dis:{}},
  {id:"gg2",name:"Gestão de Garantias — Retirada Título Privado",code:"BAPD-2791",stage:"homolog",priority:"high",owner:"Bruno/Ageu",rmdDate:null,progress:0,
   desc:"Fase 2 da Gestão de Garantias RF. Retirada de títulos privados (CDB/LCI/LCA) depositados como garantia em operações. Bloqueada por erro de credencial SINACOR (400 Bad Request) ao autenticar no ambiente TI. Investigação indica diferença no Client Secret entre TI e TH. Possível problema nos módulos Synacore que aparecem como fechados. Novo time recebeu passagem de conhecimento em 16/07 — sem prazo definido.",
   blockers:["Credencial SINACOR: erro 400 Bad Request em TI","Novo time responsável pela retirada sem prazo definido"],
   notes:"Criado 16/07/26. Retirada de título privado com erro. Aguardando cliente/homologação. Separado do BAPD-1327 (depósito).",
   links:[{n:"BAPD-2791",u:"https://valemobi.atlassian.net/browse/BAPD-2791"},{n:"BAPD-1327",u:"https://valemobi.atlassian.net/browse/BAPD-1327"}],checks:{},dis:{}},
  {id:"vale3",name:"VALE3 — Preço Médio de Aquisição",code:"BAPD-2835",stage:"qa",priority:"normal",owner:"Bruno Granito",rmdDate:null,progress:0,
   desc:"Bug reportado pelo cliente: preço médio de aquisição de VALE3 exibido incorretamente. Criado em 24/07/26. Relacionado ao épico BAPD-2652 (RV Melhorias). Status Jira: Aguardando cliente — aguardando validação do comportamento correto pelo time Ágora/Bradesco. Pode ter relação com o cálculo de preço médio em cenários de custódia virtual ou IPO.",
   blockers:["Aguardando cliente: validação do comportamento do preço médio"],
   notes:"Criado 24/07/26. Issue em VALE3 — preço médio de aquisição com comportamento incorreto. Parent: BAPD-2652 (RV Melhorias).",
   links:[{n:"BAPD-2835",u:"https://valemobi.atlassian.net/browse/BAPD-2835"},{n:"BAPD-2652",u:"https://valemobi.atlassian.net/browse/BAPD-2652"}],checks:{},dis:{}},
];

/* ── STATE ──────────────────────────────────────────── */
let projects=[...INIT];
let dragId=null,selId=null,curTab="info",curClStage=null,aiMsgs=[],aiLoading=false,expanded={};
let stageOrders={};
let showArchived=false;
let taskEditing=null; // id of task being edited inline

/* ── STORAGE ────────────────────────────────────────── */
const PFX="vl_";
/* ── LOG DISCRETO DE FALHAS ─────────────────────────────
   Antes vários catch(e){} engoliam erros sem deixar rastro, o que
   escondeu bugs reais no passado. Este logger não interrompe o fluxo
   nem incomoda o usuário — só registra no console (F12) e guarda os
   últimos 30 no localStorage, pra diagnóstico posterior.
   Use vlErrors() no console pra listar. */
function vlWarn(context,e){
  try{
    const msg=(e&&e.message)||String(e||'erro desconhecido');
    console.warn(`[Esteira] ${context}:`,msg);
    const log=lsGet('errorLog')||[];
    log.push({ts:new Date().toISOString(),context,msg});
    lsSet('errorLog',log.slice(-30));
  }catch(_){/* logger nunca deve quebrar o app */}
}
function vlErrors(){const l=lsGet('errorLog')||[];console.table(l);return l;}

/* ── LIXEIRA / DESFAZER ────────────────────────────────
   Guarda os últimos 20 itens excluídos por 30 dias, permitindo
   restaurar. Cobre cards, tarefas avulsas e comentários. */
const TRASH_MAX=20, TRASH_DAYS=30;
function getTrash(){
  const t=lsGet('trash')||[];
  const cutoff=Date.now()-TRASH_DAYS*86400000;
  return t.filter(x=>x.ts>cutoff);
}
function saveTrash(arr){
  const trimmed=arr.slice(-TRASH_MAX);
  lsSet('trash',trimmed);
  sbSet('trash',trimmed).catch(()=>{});
}
function trashPush(type,label,payload){
  const t=getTrash();
  t.push({id:'tr'+Date.now()+Math.random().toString(36).slice(2,6),ts:Date.now(),type,label,payload,by:currentUser?.name||''});
  saveTrash(t);
  updateTrashBadge();
}
function updateTrashBadge(){
  const el=document.getElementById('trashCount');
  if(el){const n=getTrash().length;el.textContent=n;el.style.display=n?'inline-block':'none';}
}
function restoreFromTrash(trashId){
  const t=getTrash();
  const item=t.find(x=>x.id===trashId);
  if(!item)return;
  try{
    if(item.type==='card'){
      if(projects.some(p=>p.id===item.payload.id)){showToast('Já existe','Esse card já está no board.');return;}
      projects.push(item.payload);
      addToOrder(item.payload.stage,item.payload.id);
      saveProjects();saveOrders();renderBoard();renderStats();
    } else if(item.type==='standalone'){
      const arr=getStandaloneTasks();
      if(arr.some(x=>x.id===item.payload.id)){showToast('Já existe','Essa tarefa já está na lista.');return;}
      arr.push(item.payload);saveStandaloneTasks(arr);renderTasksPanel();
    } else if(item.type==='comment'){
      const p=getP(item.payload.projectId);
      if(!p){showToast('Card não encontrado','O card desse comentário não existe mais.');return;}
      setP(p.id,{comments:[...(p.comments||[]),item.payload.comment]});
      if(selId===p.id&&curTab==='cmt')renderComments();
    }
    saveTrash(t.filter(x=>x.id!==trashId));
    updateTrashBadge();renderTrashPanel();
    showToast('♻ Restaurado',item.label);
  }catch(e){vlWarn('restaurar da lixeira',e);showToast('Erro ao restaurar','Veja o console (F12) para detalhes.');}
}
function purgeTrashItem(trashId){
  if(!confirm('Remover definitivamente este item da lixeira?\n\nDepois disso não será mais possível restaurar.'))return;
  saveTrash(getTrash().filter(x=>x.id!==trashId));
  updateTrashBadge();renderTrashPanel();
}
function emptyTrash(){
  const n=getTrash().length;
  if(!n)return;
  if(!confirm(`Esvaziar a lixeira (${n} ${n===1?'item':'itens'})?\n\nDepois disso não será mais possível restaurar.`))return;
  saveTrash([]);updateTrashBadge();renderTrashPanel();
  showToast('Lixeira esvaziada','');
}
function openTrashPanel(){document.getElementById('trashOverlay').classList.add('open');renderTrashPanel();}
function closeTrashPanel(){document.getElementById('trashOverlay').classList.remove('open');}
function renderTrashPanel(){
  const body=document.getElementById('trashBody');if(!body)return;
  const t=[...getTrash()].reverse();
  const icons={card:'📋',standalone:'🗒',comment:'💬'};
  const names={card:'Card',standalone:'Tarefa avulsa',comment:'Comentário'};
  body.innerHTML=t.length?`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <span style="font-size:11px;color:#8B8D9B">${t.length} ${t.length===1?'item':'itens'} · itens são removidos automaticamente após ${TRASH_DAYS} dias</span>
      <button onclick="emptyTrash()" style="background:none;border:1px solid rgba(239,68,68,.3);color:#f87171;padding:4px 10px;border-radius:6px;font-size:10px;cursor:pointer">Esvaziar lixeira</button>
    </div>
    ${t.map(item=>{
      const when=new Date(item.ts).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
      return`<div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.03);border:1px solid rgba(85,86,106,.25);border-radius:8px;padding:10px 12px;margin-bottom:7px">
        <span style="font-size:16px;flex-shrink:0">${icons[item.type]||'🗑'}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:#EDEDF0;overflow-wrap:break-word">${item.label}</div>
          <div style="font-size:9px;color:#55566A">${names[item.type]||item.type} · excluído em ${when}${item.by?' por '+item.by:''}</div>
        </div>
        <button onclick="restoreFromTrash('${item.id}')" style="flex-shrink:0;background:rgba(122,155,107,.15);border:1px solid rgba(122,155,107,.4);color:#7A9B6B;padding:5px 11px;border-radius:6px;font-size:10px;font-weight:600;cursor:pointer">♻ Restaurar</button>
        <button onclick="purgeTrashItem('${item.id}')" title="Remover definitivamente" style="flex-shrink:0;background:none;border:none;color:#55566A;cursor:pointer;font-size:13px;padding:2px">✕</button>
      </div>`;
    }).join('')}`
  :'<div style="text-align:center;color:#55566A;padding:40px 20px;font-size:12px">Lixeira vazia.<br><span style="font-size:10px">Cards, tarefas avulsas e comentários excluídos aparecem aqui por '+TRASH_DAYS+' dias.</span></div>';
}
// Timestamp seguro para nome de arquivo (sem caracteres inválidos): AAAA-MM-DD_HH-mm
function fileTimestamp(){
  const d=new Date();
  const pad=n=>String(n).padStart(2,"0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}`;
}
function lsGet(k){try{const v=localStorage.getItem(PFX+k);return v?JSON.parse(v):null;}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(PFX+k,JSON.stringify(v));}catch(e){console.warn('[Esteira] falha ao salvar localmente ('+k+'):',e&&e.message);}}

/* ── SUPABASE (banco de dados na nuvem) ─────────────── */
const SB_URL='https://lomoavrvrwgyjbhgjqrd.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvbW9hdnJ2cndneWpiaGdqcXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDE4NzcsImV4cCI6MjEwMDgxNzg3N30.N6bhNkJH6cxmsh7LTGM2duxN5MnBRhEeuLy7ABe7skA';

// Chaves que ficam APENAS no localStorage (dados sensíveis)
const LS_ONLY=['apikey','jira'];

function setSbBadge(status,msg){
  const badge=document.getElementById('sbBadge');
  const lbl=document.getElementById('sbLabel');
  const dot=badge?.querySelector('.sb-dot');
  if(!badge||!lbl)return;
  badge.className='sb-badge '+status;
  lbl.textContent=msg;
  if(dot) dot.className='sb-dot'+(status==='syncing'?' pulse':'');
}

async function sbFetch(path,opts={}){
  // Usa o token da sessão autenticada quando existir (necessário para o RLS
  // reconhecer o usuário); cai na chave pública apenas para as rotas de auth
  const token=(typeof sbAuthToken==='function'&&sbAuthToken())||SB_KEY;
  return fetch(`${SB_URL}/rest/v1/${path}`,{
    ...opts,
    headers:{
      'apikey':SB_KEY,
      'Authorization':'Bearer '+token,
      'Content-Type':'application/json',
      ...(opts.headers||{}),
    }
  });
}

async function sbGet(id){
  try{
    const r=await sbFetch(`esteira_data?id=eq.${encodeURIComponent(id)}&select=value`);
    if(!r.ok){vlWarn(`ler '${id}' do Supabase`,`HTTP ${r.status}`);return null;}
    const d=await r.json();
    return d?.[0]?.value??null;
  }catch(e){vlWarn(`ler '${id}' do Supabase`,e);return null;}
}

async function sbSet(id,value){
  try{
    const r=await sbFetch('esteira_data',{
      method:'POST',
      headers:{'Prefer':'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify({id,value,updated_at:new Date().toISOString()})
    });
    if(!r.ok)vlWarn(`salvar '${id}' no Supabase`,`HTTP ${r.status}`);
    return r.ok;
  }catch(e){vlWarn(`salvar '${id}' no Supabase`,e);return false;}
}

// Dual write: localStorage (imediato) + Supabase (background)
/* ── DETECÇÃO DE CONFLITO DE ESCRITA ────────────────────
   O sistema salva o conjunto inteiro (ex: todos os projetos) de uma vez.
   Se duas pessoas editam ao mesmo tempo, quem salva depois sobrescreve
   o trabalho de quem salvou antes — silenciosamente, sem erro.
   Para evitar isso, guardamos o 'updated_at' de cada chave no momento
   em que a carregamos. Antes de salvar, conferimos se o servidor ainda
   está nessa versão. Se mudou, avisamos em vez de sobrescrever. */
const remoteVersions={}; // { chave: updated_at visto por último }

async function sbGetMeta(id){
  try{
    const r=await sbFetch(`esteira_data?id=eq.${encodeURIComponent(id)}&select=updated_at`);
    if(!r.ok)return null;
    const d=await r.json();
    return d?.[0]?.updated_at??null;
  }catch(e){return null;}
}

function noteRemoteVersion(key,updatedAt){
  if(updatedAt)remoteVersions[key]=updatedAt;
}

function showConflictAlert(key){
  const labels={projects:'os cards do board',orders:'a ordem dos cards',standaloneTasks:'as tarefas avulsas',
    menu_people:'o cadastro de pessoas',menu_systems:'os sistemas e acessos',menu_templates:'os templates'};
  const what=labels[key]||`os dados (${key})`;
  let el=document.getElementById('conflictAlert');
  if(!el){
    el=document.createElement('div');
    el.id='conflictAlert';
    el.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:7000;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(el);
  }
  el.innerHTML=`<div style="background:#1C1D28;border:1px solid rgba(251,191,36,.45);border-radius:14px;padding:24px;width:min(460px,100%);box-shadow:0 20px 56px rgba(0,0,0,.65)">
    <div style="font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:#fbbf24;margin-bottom:10px">⚠ Alguém editou ao mesmo tempo</div>
    <div style="font-size:12px;color:#D6D7E0;line-height:1.6;margin-bottom:8px">
      Outra pessoa alterou <strong>${what}</strong> depois que esta página carregou.
    </div>
    <div style="font-size:12px;color:#A5A7B8;line-height:1.6;margin-bottom:18px">
      Sua alteração <strong>não foi salva na nuvem</strong> para não apagar o trabalho da outra pessoa.
      Ela continua guardada aqui neste navegador. Recarregue para ver a versão atualizada e refaça a mudança.
    </div>
    <div style="display:flex;gap:8px">
      <button onclick="location.reload()" style="flex:1;background:linear-gradient(90deg,#D98E3F,#B5701F);border:none;color:#fff;padding:11px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">Recarregar agora</button>
      <button onclick="document.getElementById('conflictAlert').remove()" style="flex:1;background:none;border:1px solid rgba(85,86,106,.4);color:#8B8D9B;padding:11px;border-radius:8px;font-size:13px;cursor:pointer">Depois</button>
    </div>
  </div>`;
  el.style.display='flex';
}

async function cloudSave(key,value){
  lsSet(key,value);
  if(LS_ONLY.includes(key))return; // sensível: só localStorage
  setSbBadge('syncing','Salvando…');

  // Confere se o servidor mudou desde a última vez que vimos esta chave
  const known=remoteVersions[key];
  if(known){
    const current=await sbGetMeta(key);
    if(current&&current!==known){
      setSbBadge('offline','⚠ Conflito — salvo local');
      vlWarn(`conflito de escrita em '${key}'`,`local viu ${known}, servidor está em ${current}`);
      showConflictAlert(key);
      return; // não sobrescreve o trabalho do outro
    }
  }

  const ok=await sbSet(key,value);
  const now=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  setSbBadge(ok?'synced':'offline', ok?`☁ Salvo às ${now}`:'⚠ Salvo local');
  if(ok){
    // Atualiza a versão conhecida para o próximo salvamento
    const fresh=await sbGetMeta(key);
    noteRemoteVersion(key,fresh);
  }
}

/* ── API KEY ────────────────────────────────────────── */
let apiKey=lsGet("apikey")||"";

function checkApiKeyOnLoad(){} // desabilitado — use o botão ⚙ API Key no cabeçalho
function saveApiKey(){
  const k=document.getElementById("apiKeyInput").value.trim();
  const errEl=document.getElementById("setupErr");
  if(!k.startsWith("sk-ant-")){ errEl.style.display="block"; return; }
  errEl.style.display="none";
  apiKey=k;
  lsSet("apikey",k);
  document.getElementById("apiSetup").style.display="none";
}
function skipApiKey(){document.getElementById("apiSetup").style.display="none";}
function openSettings(){
  document.getElementById("apiKeyInput").value="";
  document.getElementById("apiKeyInput").placeholder=apiKey?"✓ Chave configurada — digite nova para substituir":"Cole sua chave aqui (sk-ant-...)";
  document.getElementById("setupErr").style.display="none";
  document.getElementById("apiSetup").style.display="flex";
}

/* ── CLAUDE API ─────────────────────────────────────── */
async function callClaude(system,messages){
  if(!apiKey) return "⚠️ Configure sua API key da Anthropic clicando em '⚙ API Key' no canto superior direito.";
  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key":apiKey,
        "anthropic-version":"2023-06-01",
        "anthropic-dangerous-direct-browser-access":"true"
      },
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system,messages})
    });
    const d=await res.json();
    if(d.error) return "Erro da API: "+d.error.message;
    return d.content?.[0]?.text||"Sem resposta.";
  }catch(e){
    return "Erro de conexão: "+e.message+"\n\nVerifique se sua API key está correta e se há conexão com a internet.";
  }
}

/* ── SAVE / LOAD ────────────────────────────────────── */
function saveProjects(){cloudSave("projects",projects);}
function saveOrders(){cloudSave("orders",stageOrders);}
function loadProjectsLocal(){const s=lsGet("projects");if(s&&s.length)projects=s;}
function loadOrdersLocal(){const s=lsGet("orders");if(s)stageOrders=s;}
function getP(id){return projects.find(p=>p.id===id);}
function setP(id,ch){projects=projects.map(p=>p.id===id?{...p,...ch}:p);saveProjects();}

/* ── STAGE ORDER (reordenação por coluna) ───────────── */
function loadOrders(){const s=lsGet("orders");if(s)stageOrders=s;}
function getOrder(sid){
  if(!stageOrders[sid]){
    stageOrders[sid]=projects.filter(p=>p.stage===sid).map(p=>p.id);
  }
  // garante que novos projetos aparecem mesmo sem estar no order salvo
  const extra=projects.filter(p=>p.stage===sid&&!stageOrders[sid].includes(p.id)).map(p=>p.id);
  if(extra.length){stageOrders[sid]=[...stageOrders[sid],...extra];saveOrders();}
  return stageOrders[sid];
}
function removeFromOrder(sid,id){
  if(stageOrders[sid])stageOrders[sid]=stageOrders[sid].filter(x=>x!==id);
  saveOrders();
}
function addToOrder(sid,id,beforeId=null){
  if(!stageOrders[sid])stageOrders[sid]=getOrder(sid);
  stageOrders[sid]=stageOrders[sid].filter(x=>x!==id);
  if(beforeId){
    const ti=stageOrders[sid].indexOf(beforeId);
    ti>=0?stageOrders[sid].splice(ti,0,id):stageOrders[sid].push(id);
  } else {
    stageOrders[sid].push(id);
  }
  saveOrders();
}

/* ── BOARD ──────────────────────────────────────────── */
/* ── VIEW TOGGLE (Kanban / Tabela) ───────────────────── */
let boardView=lsGet('boardView')||'kanban';
let tblSort={col:'stage',dir:1};

function setBoardView(v){
  boardView=v;lsSet('boardView',v);
  document.getElementById('vtKanban').classList.toggle('active',v==='kanban');
  document.getElementById('vtTable').classList.toggle('active',v==='table');
  document.getElementById('board').style.display=v==='kanban'?'':'none';
  document.getElementById('tableView').style.display=v==='table'?'':'none';
  if(v==='table')renderTableView();
}

function sortTable(col){
  if(tblSort.col===col){tblSort.dir*=-1;}else{tblSort.col=col;tblSort.dir=1;}
  renderTableView();
}

function renderTableView(){
  const wrap=document.getElementById('tableView');if(!wrap)return;
  const stageIdx=Object.fromEntries(STAGES.map((s,i)=>[s.id,i]));
  const prioOrder={urgent:0,high:1,normal:2,low:3};
  let rows=projects.filter(p=>!p.archived);

  const sorters={
    name:(p)=>(p.name||'').toLowerCase(),
    stage:(p)=>stageIdx[p.stage]??99,
    priority:(p)=>prioOrder[p.priority]??9,
    owner:(p)=>(p.owner||'').toLowerCase(),
    dev:(p)=>(p.dev||'').toLowerCase(),
    days:(p)=>daysInStage(p)??-1,
    rmd:(p)=>p.rmdDate?parseDate(p.rmdDate)?.getTime()||0:0,
    progress:(p)=>p.progress||0,
  };
  const sf=sorters[tblSort.col]||sorters.stage;
  rows=[...rows].sort((a,b)=>{
    const av=sf(a),bv=sf(b);
    if(av<bv)return -1*tblSort.dir;if(av>bv)return 1*tblSort.dir;return 0;
  });

  const arrow=(col)=>tblSort.col===col?`<span class="sort-arrow">${tblSort.dir===1?"▲":"▼"}</span>`:"";
  const cols=[
    ["name","Demanda"],["stage","Estágio"],["priority","Prioridade"],
    ["owner","Owner"],["dev","Dev"],["days","Dias no estágio"],["rmd","RDM"],["progress","Progresso"]
  ];

  wrap.innerHTML=`
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr>${cols.map(([k,l])=>`<th onclick="sortTable('${k}')">${l}${arrow(k)}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.map(p=>{
          const s=STAGES.find(x=>x.id===p.stage)||{};
          const pr=PRIO[p.priority]||PRIO.normal;
          const days=daysInStage(p);
          const daysCls=days==null?"":days>10?"danger":days>5?"warn":"";
          return `<tr class="tbl-row" onclick="setBoardView('kanban');openModal('${p.id}')">
            <td><div class="tbl-name">${p.name||"(sem nome)"}</div><div class="tbl-code">${p.code||""}</div></td>
            <td><span class="tbl-stage-pill" style="background:${s.color}20;color:${s.color}">${s.icon||""} ${s.label||p.stage}</span></td>
            <td class="tbl-prio">${pr.icon} ${pr.label}</td>
            <td>${p.owner||"—"}</td>
            <td>${p.dev||"—"}</td>
            <td class="tbl-days ${daysCls}">${days==null?"—":days+"d"}</td>
            <td>${p.rmdDate||"—"}</td>
            <td>${p.progress||0}%</td>
          </tr>`;
        }).join("")||`<tr><td colspan="8" style="text-align:center;color:#8B8D9B;padding:24px">Nenhuma demanda ativa</td></tr>`}
      </tbody>
    </table></div>`;
}

/* ── MODO TV / APRESENTAÇÃO ──────────────────────────── */
let tvMode=false;
let tvClockInterval=null;

function enterTvMode(){
  tvMode=true;
  clearSelection();
  document.body.classList.add('tv-mode');
  const el=document.documentElement;
  if(el.requestFullscreen)el.requestFullscreen().catch(()=>{});
  updateTvClock();
  tvClockInterval=setInterval(updateTvClock,1000);
}
function exitTvMode(){
  tvMode=false;
  document.body.classList.remove('tv-mode');
  if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});
  if(tvClockInterval){clearInterval(tvClockInterval);tvClockInterval=null;}
}
function updateTvClock(){
  const el=document.getElementById('tvClock');if(!el)return;
  const now=new Date();
  el.textContent=now.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit'})+' · '+now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
}
// Sair do modo TV automaticamente se o usuário apertar Esc (sai do fullscreen nativo)
document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement&&tvMode)exitTvMode();
});

/* ── EXPORT / IMPORT CSV ──────────────────────────────── */
function exportCSV(){
  const rows=projects.map(p=>({
    codigo:p.code||"",
    nome:p.name||"",
    estagio:p.stage||"",
    prioridade:p.priority||"",
    owner:p.owner||"",
    dev:p.dev||"",
    qa:p.qa||"",
    rdm:p.rmdDate||"",
    progresso:p.progress||0,
    descricao:(p.desc||"").replace(/\r?\n/g," "),
    notas:(p.notes||"").replace(/\r?\n/g," "),
    arquivado:p.archived?"sim":"nao",
  }));
  const csv=Papa.unparse(rows);
  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=`esteira-valemobi-export-${fileTimestamp()}.csv`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("⬇ CSV exportado",`${rows.length} demandas`);
}

let csvPreviewData=[];
function handleCsvFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=(e)=>{
    const result=Papa.parse(e.target.result,{header:true,skipEmptyLines:true});
    if(result.errors?.length){
      showToast("⚠️ Erro ao ler CSV",result.errors[0].message);
      return;
    }
    csvPreviewData=result.data.map(row=>{
      const code=(row.codigo||row.code||"").trim();
      const existing=code?projects.find(p=>(p.code||"").trim().toLowerCase()===code.toLowerCase()):null;
      return{
        raw:row,
        action:existing?"update":"create",
        existingId:existing?.id||null,
        name:(row.nome||row.name||"").trim(),
        code,
      };
    }).filter(r=>r.name); // exige pelo menos um nome
    openCsvImportModal();
  };
  reader.readAsText(file,"UTF-8");
  document.getElementById("csvFileInput").value="";
}

function openCsvImportModal(){
  const m=document.getElementById("csvImportModal");
  const creates=csvPreviewData.filter(r=>r.action==="create").length;
  const updates=csvPreviewData.filter(r=>r.action==="update").length;
  document.getElementById("csvImportSummary").textContent=
    `${csvPreviewData.length} linha(s) lida(s) — ${creates} nova(s) demanda(s) serão criadas, ${updates} existente(s) serão atualizadas (por código Jira).`;
  document.getElementById("csvImportList").innerHTML=csvPreviewData.map(r=>
    `<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.03);border:1px solid rgba(85,86,106,.2);border-radius:6px;padding:6px 10px;font-size:11px">
      <span style="color:#EDEDF0">${r.name}${r.code?` <span style="color:#8B8D9B">(${r.code})</span>`:""}</span>
      <span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:8px;${r.action==="create"?"background:rgba(122,155,107,.15);color:#7A9B6B":"background:rgba(217,142,63,.15);color:#E2A968"}">${r.action==="create"?"NOVO":"ATUALIZAR"}</span>
    </div>`
  ).join("")||'<div style="text-align:center;color:#55566A;padding:16px 0;font-size:11px">Nenhuma linha válida encontrada.</div>';
  if(m)m.style.display="flex";
}
function closeCsvImportModal(){
  const m=document.getElementById("csvImportModal");if(m)m.style.display="none";
  csvPreviewData=[];
}

function confirmCsvImport(){
  if(!csvPreviewData.length){closeCsvImportModal();return;}
  const validStages=new Set(STAGES.map(s=>s.id));
  const validPrio=new Set(Object.keys(PRIO));
  let created=0,updated=0;

  csvPreviewData.forEach(r=>{
    const row=r.raw;
    const stageRaw=(row.estagio||row.stage||"").trim().toLowerCase();
    const stage=validStages.has(stageRaw)?stageRaw:(r.action==="update"?null:"escopo");
    const prioRaw=(row.prioridade||row.priority||"").trim().toLowerCase();
    const priority=validPrio.has(prioRaw)?prioRaw:(r.action==="update"?null:"normal");
    const fields={
      name:r.name,
      code:r.code||"—",
      owner:(row.owner||"").trim(),
      dev:(row.dev||"").trim(),
      qa:(row.qa||"").trim(),
      rmdDate:(row.rdm||row.rmdDate||"").trim(),
      desc:(row.descricao||row.desc||"").trim(),
      notes:(row.notas||row.notes||"").trim(),
    };
    if(stage)fields.stage=stage;
    if(priority)fields.priority=priority;
    if(row.progresso!==undefined&&row.progresso!==""){
      const pct=parseInt(row.progresso,10);
      if(!isNaN(pct))fields.progress=Math.max(0,Math.min(100,pct));
    }

    if(r.action==="update"&&r.existingId){
      setP(r.existingId,fields);
      updated++;
    } else {
      const newStage=fields.stage||"escopo";
      const newCard={
        id:"card_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),
        ...fields,stage:newStage,priority:fields.priority||"normal",
        progress:fields.progress||0,
        blockers:[],links:[],checks:{},dis:{},customTasks:{},taskText:{},
        taskDates:{},taskNotified:{},meetings:[],deps:[],comments:[],
        stageHistory:[{stage:newStage,enteredAt:new Date().toISOString()}],
        jiraStatus:"",archived:false,
      };
      projects.push(newCard);addToOrder(newStage,newCard.id);
      created++;
    }
  });

  saveProjects();saveOrders();
  renderBoard();renderStats();
  closeCsvImportModal();
  showToast("✅ Importação concluída",`${created} criada(s), ${updated} atualizada(s)`);
}

function renderBoard(){
  if(boardView==='table')renderTableView();
  const board=document.getElementById("board");board.innerHTML="";
  STAGES.forEach(s=>{
    const col=document.createElement("div");col.className="col";
    // só exibe projetos não arquivados (ou todos se showArchived)
    const rawPs=projects.filter(p=>p.stage===s.id&&!p.archived);
    const order=getOrder(s.id);
    const ps=[...order.map(id=>rawPs.find(p=>p.id===id)).filter(Boolean),
              ...rawPs.filter(p=>!order.includes(p.id))];

    col.innerHTML=`<div class="col-hd"><div class="col-hd-inner" style="border-bottom-color:${s.color}60"><span class="col-icon">${s.icon}</span><span class="col-title">${s.label}</span><span class="col-count" style="background:${s.color}20;color:${s.color}">${ps.length}</span></div></div>`;

    // drop na coluna (área vazia) → move para este stage, adiciona ao fim
    col.addEventListener("dragover",e=>{e.preventDefault();col.classList.add("drop-active");});
    col.addEventListener("dragleave",e=>{if(!col.contains(e.relatedTarget))col.classList.remove("drop-active");});
    col.addEventListener("drop",e=>{
      e.preventDefault();col.classList.remove("drop-active");
      if(!dragId)return;
      const dp=getP(dragId);
      if(dp&&dp.stage!==s.id){
        removeFromOrder(dp.stage,dragId);
        addToOrder(s.id,dragId);
        trackStageEntry(dragId,s.id);
        setP(dragId,{stage:s.id});
        refreshProgress(dragId);
        renderBoard();renderStats();
      }
      dragId=null;
    });

    if(!ps.length){const em=document.createElement("div");em.className="no-items";em.textContent="Sem demandas";col.appendChild(em);}

    ps.forEach(p=>{
      const c=document.createElement("div");c.className="card";c.style.setProperty("--kc",s.color);
      c.setAttribute("draggable","true");

      c.addEventListener("dragstart",e=>{dragId=p.id;c.classList.add("dragging");e.dataTransfer.effectAllowed="move";});
      c.addEventListener("dragend",()=>{c.classList.remove("dragging");document.querySelectorAll(".card.drag-over").forEach(el=>el.classList.remove("drag-over"));dragId=null;});

      // drag sobre outro card — highlight do alvo
      c.addEventListener("dragover",e=>{
        e.preventDefault();e.stopPropagation();
        if(dragId===p.id)return;
        document.querySelectorAll(".card.drag-over").forEach(el=>el.classList.remove("drag-over"));
        c.classList.add("drag-over");
      });
      c.addEventListener("dragleave",()=>c.classList.remove("drag-over"));

      // drop sobre card: reordena se mesma coluna, ou move se coluna diferente
      c.addEventListener("drop",e=>{
        e.preventDefault();e.stopPropagation();
        c.classList.remove("drag-over");
        col.classList.remove("drop-active");
        if(!dragId||dragId===p.id){dragId=null;return;}
        const dp=getP(dragId);
        if(!dp)return;
        if(dp.stage===s.id){
          // mesma coluna → reordenar
          const ord=[...getOrder(s.id)];
          const fi=ord.indexOf(dragId),ti=ord.indexOf(p.id);
          if(fi>=0&&ti>=0){ord.splice(fi,1);ord.splice(ti,0,dragId);stageOrders[s.id]=ord;saveOrders();}
        } else {
          // coluna diferente → mover e inserir antes do card alvo
          removeFromOrder(dp.stage,dragId);
          addToOrder(s.id,dragId,p.id);
          trackStageEntry(dragId,s.id);
          setP(dragId,{stage:s.id});
          refreshProgress(dragId);
          renderStats();
        }
        renderBoard();
        dragId=null;
      });

      c.dataset.pid=p.id;
      c.addEventListener("click",e=>{
        if(e.ctrlKey||e.metaKey){e.preventDefault();toggleCardSelect(p.id,true);}
        else if(selectedCards.size>0){toggleCardSelect(p.id,true);}
        else{openModal(p.id);}
      });
      const prioK=p.priority;
      const prioBadge=(prioK&&prioK!=="normal")?`<span class="prio-badge ${prioK}">${PRIO[prioK]?.label||prioK}</span>`:"";
      const blk=p.blockers?.length?`<span class="pill" style="background:rgba(217,142,63,.13);color:rgba(217,142,63,.85)" title="Status atual registrado">📌 ${p.blockers.length}</span>`:"";
      const rdm=p.rmdDate?`<span class="pill" style="background:rgba(139,92,246,.12);color:rgba(139,92,246,.75)">🗓 ${p.rmdDate}</span>`:"";
      const hasCR=!!(p.cardReminder);
      const isCRPast=hasCR&&new Date(p.cardReminder)<=new Date();
      const dias=daysInStage(p);
      const diasTag=dias!==null&&dias>=0?`<span class="stage-time${dias>14?' warn':''}${dias>30?' alert':''}">${dias===0?'Hoje':dias+'d aqui'}</span>`:'' ;
      c.innerHTML=`<button class="card-bell-btn${hasCR?(isCRPast?" past":" set"):""}" onclick="event.stopPropagation();toggleCardReminder('${p.id}')" title="${!hasCR?"Adicionar lembrete ao card":isCRPast?"Lembrete já disparado: "+new Date(p.cardReminder).toLocaleString("pt-BR"):"Lembrete: "+new Date(p.cardReminder).toLocaleString("pt-BR")}">${!hasCR?"🔕":isCRPast?'🔔<span style="font-size:8px;margin-left:-3px;vertical-align:top">✓</span>':"🔔"}</button>
        <div class="card-name" style="padding-right:20px">${p.name}</div>
        <div class="card-code">${p.code}</div>
        <div class="card-row">${prioBadge}${blk}${rdm}${diasTag}</div>
        <div class="pb"><div class="pb-f" style="width:${p.progress}%"></div></div>`;
      col.appendChild(c);
    });
    board.appendChild(col);
  });
}
function renderStats(){
  const active=projects.filter(p=>!p.archived);
  const arch=projects.filter(p=>p.archived).length;
  document.getElementById("stats").innerHTML=`
    <div class="stat" style="border-color:rgba(217,142,63,.3);background:rgba(217,142,63,.08)">
      <div class="stat-n" style="color:#D98E3F">${active.length}</div>
      <div class="stat-l" style="color:#A5A7B8">demandas</div>
    </div>`;
  const badge=document.getElementById("archBadge");
  if(badge){badge.textContent=`📦 ${arch} arquivado${arch!==1?"s":""}`;badge.classList.toggle("active",showArchived);}
  renderArchPanel();
}

/* ── ARCHIVE ────────────────────────────────────────── */
function toggleArchived(){
  showArchived=!showArchived;
  document.getElementById("archPanel").style.display=showArchived?"block":"none";
  document.getElementById("archBadge").classList.toggle("active",showArchived);
  renderArchPanel();
}
function renderArchPanel(){
  const list=document.getElementById("archList");if(!list)return;
  const arch=projects.filter(p=>p.archived);
  if(!arch.length){list.innerHTML=`<div style="font-size:11px;color:#55566A;text-align:center;padding:12px 0">Nenhuma demanda arquivada ainda.</div>`;return;}
  list.innerHTML=arch.map(p=>{
    const st=STAGES.find(s=>s.id===p.stage);
    return `<div class="arch-item">
      <div class="arch-item-info">
        <div class="arch-item-name">${PRIO[p.priority]?.icon||"⚪"} ${p.name}</div>
        <div class="arch-item-meta">${p.code} · ${st?.icon||""} ${st?.label||p.stage} · ${p.progress}%</div>
      </div>
      <button class="restore-btn" onclick="restoreProject('${p.id}')">↩ Restaurar</button>
    </div>`;
  }).join("");
}
function archiveProject(id){
  setP(id,{archived:true});
  closeModal();
  renderBoard();
  renderStats();
}
function restoreProject(id){
  setP(id,{archived:false});
  renderBoard();
  renderStats();
}

/* ── AUTO PROGRESS ──────────────────────────────────── */
function autoProgress(p){
  const idx=STAGES.findIndex(s=>s.id===p.stage);
  if(idx<0)return 0;
  const n=STAGES.length;
  const stageBase=(idx/n)*100;
  // checklist fraction for current stage
  const tmpl=(CL[p.stage]||[]).flatMap(s=>s.t);
  const custom=((p.customTasks||{})[p.stage])||[];
  const all=[...tmpl,...custom];
  const enabled=all.filter(t=>!(p.dis||{})[t.id||t.tid]);
  let checkFrac=0;
  if(enabled.length>0){
    const done=enabled.filter(t=>(p.checks||{})[t.id||t.tid]).length;
    checkFrac=done/enabled.length;
  }
  return Math.round(stageBase+(1/n)*checkFrac*100);
}
function refreshProgress(id){
  const p=getP(id);if(!p)return;
  const pct=autoProgress(p);
  if(pct!==p.progress) setP(id,{progress:pct});
  // update modal if open
  const mPct=document.getElementById("mPct");
  const mBar=document.getElementById("mBar");
  if(mPct) mPct.textContent=pct;
  if(mBar) mBar.style.width=pct+"%";
  renderBoard();
}

/* ── RDM DATE ───────────────────────────────────────── */
function setRmdDate(v){
  setP(selId,{rmdDate:v||null});
  renderInfo();renderModal();renderBoard();
}

/* ── NOTIFICATIONS ──────────────────────────────────── */
function requestNotifPerm(){
  if(typeof Notification!=="undefined"&&Notification.permission==="default"){
    Notification.requestPermission();
  }
}
function showToast(title,body,onClick){
  const wrap=document.getElementById("toastWrap");if(!wrap)return;
  const t=document.createElement("div");t.className="toast";
  t.innerHTML=`<button class="toast-close" onclick="this.parentElement.remove()">×</button><div class="toast-title">🔔 ${title}</div><div class="toast-body">${body}</div>`;
  if(onClick) t.style.cursor="pointer", t.addEventListener("click",e=>{if(e.target.className!=="toast-close")onClick();});
  wrap.appendChild(t);
  setTimeout(()=>t.remove(),10000);
}
function fireBrowserNotif(title,body){
  if(typeof Notification!=="undefined"&&Notification.permission==="granted"){
    new Notification(title,{body,icon:"⚡"});
  }
}
// checkReminders: v1.7 version defined earlier

function findTaskText(p,tid){
  for(const stage of Object.keys(CL)){
    for(const sec of CL[stage]){
      const t=sec.t.find(t=>t.id===tid);
      if(t)return (p.taskText||{})[tid]||t.tx;
    }
  }
  for(const sid of Object.keys(p.customTasks||{})){
    const ct=(p.customTasks[sid]||[]).find(c=>c.tid===tid);
    if(ct)return ct.tx;
  }
  return "Tarefa";
}
function updateBell(pending){
  const btn=document.getElementById("bellBtn");
  const cnt=document.getElementById("bellCount");
  if(!btn||!cnt)return;
  if(pending>0){
    btn.classList.add("has-notif");
    cnt.style.display="block";
    cnt.textContent=pending;
  } else {
    btn.classList.remove("has-notif");
    cnt.style.display="none";
  }
}
function toggleNotifPanel(){
  // Simple: trigger a manual check and show a toast summary
  checkReminders();
  const now=new Date();
  const upcoming=[];
  projects.filter(p=>!p.archived).forEach(p=>{
    Object.entries(p.taskDates||{}).forEach(([tid,dt])=>{
      if(dt&&new Date(dt)>now&&!(p.taskNotified||{})[tid]){
        upcoming.push({pname:p.name,text:findTaskText(p,tid),dt});
      }
    });
  });
  if(!upcoming.length){showToast("Sem lembretes pendentes","Nenhum lembrete agendado para o futuro.");}
  else{
    upcoming.slice(0,3).forEach(u=>{
      const d=new Date(u.dt);
      showToast(u.pname,`${u.text}<br><span style="color:#8B8D9B">${d.toLocaleString("pt-BR")}</span>`);
    });
  }
}

/* ── MODAL ──────────────────────────────────────────── */
function openModal(id){
  selId=id;curTab="info";curClStage=null;aiMsgs=[];expanded={};
  document.getElementById("modalBg").classList.add("open");
  renderModal();
}
function closeModal(){document.getElementById("modalBg").classList.remove("open");selId=null;maybeReopenDigest();}

function renderModal(){
  const p=getP(selId);if(!p)return;
  // Fix 4: sempre resetar visual das abas para Informações ao abrir
  const tabs=["info","check","cmt","ia","jira","mtg","dep"];
  document.querySelectorAll(".tab").forEach((el,i)=>el.classList.toggle("active",tabs[i]===curTab));
  const st=STAGES.find(s=>s.id===p.stage);
  document.getElementById("mCode").innerHTML=`<span onclick="startEditCode()" title="Clique para editar" style="cursor:text;border-bottom:1px dashed rgba(217,142,63,.4)">${p.code}</span>`;
  document.getElementById("mName").innerHTML=`<span onclick="startEditName()" title="Clique para editar o nome" style="cursor:text">${p.name}</span>`;
  const tags=[
    st?`<span class="tag" style="border-color:${st.color}60;color:${st.color}">${st.icon} ${st.label}</span>`:"",
    PRIO[p.priority]?`<span class="tag">${PRIO[p.priority].icon} ${PRIO[p.priority].label}</span>`:"",
    p.owner?`<span class="tag" style="cursor:pointer" onclick="sw('info')" title="Ver em Informações">👤 ${p.owner}</span>`:"",
    p.qa?`<span class="tag" style="cursor:pointer" onclick="sw('info')" title="Ver em Informações">✅ ${p.qa}</span>`:"",
    p.dev?`<span class="tag" style="border-color:rgba(99,102,241,.4);color:#818cf8">💻 ${p.dev}</span>`:"",
    p.rmdDate?`<span class="tag" style="border-color:rgba(139,92,246,.5);color:#c084fc">🗓 ${p.rmdDate}</span>`:"",
    p.jiraStatus?`<span class="tag" style="border-color:rgba(217,142,63,.35);color:#E2A968" title="Status no Jira">🎯 Jira: ${p.jiraStatus}</span>`:"",
  ].filter(Boolean).join("");
  document.getElementById("mMeta").innerHTML=tags;
  // sync modal bell
  const mb=document.getElementById("modalBell");
  if(mb){
    const hasCR=!!(p.cardReminder);
    const isCRPast=hasCR&&new Date(p.cardReminder)<=new Date();
    mb.textContent=!hasCR?"🔕":isCRPast?"🔔✓":"🔔";
    mb.style.opacity=hasCR?"1":".55";
    mb.style.color=isCRPast?"#7A9B6B":hasCR?"#fbbf24":"";
    mb.style.borderColor=isCRPast?"rgba(122,155,107,.4)":hasCR?"rgba(251,191,36,.4)":"rgba(85,86,106,.3)";
    mb.title=!hasCR?"Adicionar lembrete ao card":isCRPast?"Lembrete já disparado: "+new Date(p.cardReminder).toLocaleString("pt-BR")+" (clique para remover)":"Lembrete ativo: "+new Date(p.cardReminder).toLocaleString("pt-BR")+" (clique para remover)";
  }
  document.getElementById("mPct").textContent=p.progress;
  document.getElementById("mBar").style.width=p.progress+"%";
  document.getElementById("mStages").innerHTML=STAGES.map(s=>`<button class="sp${p.stage===s.id?" active":""}" style="${p.stage===s.id?`border-color:${s.color};color:${s.color};background:${s.color}18`:""}" onclick="moveStage('${s.id}')">${s.icon} ${s.label}</button>`).join("");
  renderTab();
}
function moveStage(sid){
  const p=getP(selId);if(!p||p.stage===sid)return;
  removeFromOrder(p.stage,selId);
  addToOrder(sid,selId);
  trackStageEntry(selId,sid);
  setP(selId,{stage:sid});
  refreshProgress(selId);
  const _ps=getP(selId);logActivity('Stage alterado',`${STAGES.find(s=>s.id===sid)?.label||sid}`,selId,_ps?.name||'');
  renderBoard();renderStats();renderModal();
}

function sw(t){
  curTab=t;
  const tabs=["info","check","cmt","ia","jira","mtg","dep"];
  document.querySelectorAll(".tab").forEach((el,i)=>el.classList.toggle("active",tabs[i]===t));
  renderTab();
}
function renderTab(){
  ["tInfo","tCmt","tCheck","tIa","tJira","tMtg","tDep"].forEach(id=>document.getElementById(id).style.display="none");
  const map={info:"tInfo",cmt:"tCmt",check:"tCheck",ia:"tIa",jira:"tJira",mtg:"tMtg",dep:"tDep"};
  document.getElementById(map[curTab]||"tInfo").style.display="block";
  if(curTab==="info")renderInfo();
  if(curTab==="cmt")renderComments();
  if(curTab==="check")renderCheck();
  if(curTab==="ia")renderAI();
  if(curTab==="jira")renderJiraModal();
  if(curTab==="mtg")renderMeetings();
  if(curTab==="dep")renderDeps();
}

/* ── INFO TAB ───────────────────────────────────────── */
function renderInfo(){
  const p=getP(selId);if(!p)return;
  const pct=autoProgress(p);
  if(pct!==p.progress) setP(selId,{progress:pct});
  const stageIdx=STAGES.findIndex(s=>s.id===p.stage);
  const stageBase=Math.round((stageIdx/STAGES.length)*100);
  const checkContrib=pct-stageBase;
  let h=`<span class="slbl">Progresso automático</span>`;
  h+=`<div class="prog-auto-bar"><div class="prog-auto-fill" style="width:${pct}%"></div></div>`;
  h+=`<div class="prog-breakdown"><span>📍 Esteira: ${stageBase}%</span><span>✅ Checklist: +${checkContrib}%</span><span style="color:#D98E3F;font-weight:700">Total: ${pct}%</span></div>`;
  h+=`<span class="slbl">Status Atual</span>`;
  h+=p.blockers?.length?p.blockers.map(b=>`<div class="blk-item">📌 ${highlightMentionsAndTags(b)}</div>`).join(""):`<div style="font-size:11px;color:#55566A;margin-bottom:8px">Nenhuma atualização de status registrada</div>`;
  h+=`<button class="btn-s" onclick="editBlk()" style="margin-bottom:16px">Editar status atual</button>`;
  h+=`<span class="slbl">Notas / Contexto</span><div class="nbox" onclick="editNotes()">${p.notes?highlightMentionsAndTags(p.notes):"Sem notas — clique para editar"}</div>`;
  h+=`<span class="slbl" style="display:block;margin:16px 0 6px">Descrição da Demanda</span>`;
  h+=`<div class="nbox" onclick="editDesc()" style="min-height:60px">${p.desc?highlightMentionsAndTags(p.desc).replace(/\n/g,"<br>"):"<span style='color:#2C2D3C'>Sem descrição — clique para adicionar</span>"}</div>`;
  h+=`<span class="slbl" style="display:block;margin:16px 0 6px">Data da RDM</span>`;
  h+=`<div style="display:flex;gap:8px;align-items:center;margin-bottom:16px">
    <input class="rdm-date-inp" type="text" id="rmdInp" value="${p.rmdDate||''}" placeholder="ex: 28/07/2026" onchange="setRmdDate(this.value.trim())">
    <button class="btn-c" onclick="setRmdDate('')">✕</button>
  </div>`;
  h+=`<span class="slbl" style="display:block;margin-bottom:7px">Prioridade</span><div class="prio-row" style="margin-bottom:16px">${Object.entries(PRIO).map(([k,v])=>`<button class="prio-btn${p.priority===k?" active":""}" onclick="setPrio('${k}')">${v.icon} ${v.label}</button>`).join("")}</div>`;
  // Links — always show section with add button
  // Owner / QA / Dev editáveis com autocomplete de Pessoas
  const _pplOpts=getPeople().map(per=>`<option value="${per.name}">`).join('');
  h+=`<datalist id="pplListInf">${_pplOpts}</datalist>`;
  h+=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
    <div>
      <span class="slbl" style="display:block;margin-bottom:5px">👤 Owner</span>
      <input class="rdm-date-inp" list="pplListInf" value="${p.owner||''}" placeholder="Responsável"
        onchange="setP(selId,{owner:this.value.trim()});renderModal();renderBoard()"
        style="width:100%;box-sizing:border-box">
    </div>
    <div>
      <span class="slbl" style="display:block;margin-bottom:5px">✅ QA</span>
      <input class="rdm-date-inp" list="pplListInf" value="${p.qa||''}" placeholder="QA"
        onchange="setP(selId,{qa:this.value.trim()});renderModal();renderBoard()"
        style="width:100%;box-sizing:border-box">
    </div>
    <div>
      <span class="slbl" style="display:block;margin-bottom:5px">💻 Dev</span>
      <input class="rdm-date-inp" list="pplListInf" id="devInpInfo" value="${p.dev||''}" placeholder="Dev responsável"
        onchange="setP(selId,{dev:this.value.trim()});renderModal();renderBoard()"
        style="width:100%;box-sizing:border-box">
      ${p.code&&p.code!=='—'?`<button onclick="pullJiraAssignee()" style="background:none;border:none;color:#55566A;font-size:9px;cursor:pointer;margin-top:2px;padding:0">↓ Puxar do Jira</button>`:''}
    </div>
  </div>`;
  h+=`<span class="slbl" style="display:block;margin-bottom:7px">Links</span>`;
  h+=`<div class="links-manage-row">`;
  if(p.links?.length){
    h+=p.links.map((l,i)=>`<span style="display:inline-flex;align-items:center;background:rgba(217,142,63,.08);border:1px solid rgba(217,142,63,.25);border-radius:5px;padding:3px 8px;font-size:10px">
      <a href="${l.u}" target="_blank" style="color:#E2A968;text-decoration:none">↗ ${l.n}</a>
      <button class="link-del" onclick="deleteLink(${i})" title="Remover">✕</button>
    </span>`).join("");
  }
  h+=`<button class="link-add-btn" onclick="openLinkModal()">+ Adicionar</button></div>`;
  // Build info (Homologação+)
  const buildHtml=renderBuildInfo();
  if(buildHtml)h+=buildHtml;

  // Attachments section for description
  const descAttach=renderAttachments(p.descAttachments,'desc',0);
  if(descAttach||true){
    h+=`<div style="margin-top:10px">
      <button onclick="openFilePicker('desc',0)"
        style="background:none;border:1px dashed rgba(85,86,106,.3);color:#8B8D9B;padding:5px 12px;border-radius:5px;font-size:10px;cursor:pointer;width:100%">
        📎 Anexar arquivo à descrição (máx 500KB)
      </button>
      ${descAttach}
    </div>`;
  }

  h+=`<div style="display:flex;gap:8px;margin-top:14px">
    <button class="arch-btn" style="margin-top:0;flex:1" onclick="confirmArchive('${p.id}')">📦 Arquivar</button>
    <button class="arch-btn" style="margin-top:0;flex:1;color:#f87171;border-color:rgba(239,68,68,.3)" onclick="confirmDelete('${p.id}')">🗑 Excluir</button>
  </div>`;
  document.getElementById("tInfo").innerHTML=h;
}
function editBlk(){
  const p=getP(selId);
  document.getElementById("tInfo").innerHTML=`<span class="slbl" style="display:block;margin-bottom:4px">Status Atual (um por linha)</span>${richToolbar("bedit")}<textarea class="ea rt-area" rows="5" id="bedit">${p.blockers?.join("\n")||""}</textarea><div class="save-row" style="margin-top:6px"><button class="btn-s" onclick="saveBlk()">✓ Salvar</button><button class="btn-c" onclick="renderInfo()">✕ Cancelar</button></div>`;
  document.getElementById("bedit").focus();
}
function saveBlk(){const v=document.getElementById("bedit").value;setP(selId,{blockers:v.split("\n").filter(b=>b.trim())});renderInfo();renderBoard();renderStats();}
function editNotes(){
  const p=getP(selId);
  document.getElementById("tInfo").innerHTML=`<span class="slbl" style="display:block;margin-bottom:4px">Notas</span>${richToolbar("nedit")}<textarea class="ea rt-area" rows="7" id="nedit">${p.notes||""}</textarea><div class="save-row" style="margin-top:6px"><button class="btn-s" onclick="saveNotes()">✓ Salvar</button><button class="btn-c" onclick="renderInfo()">✕ Cancelar</button></div>`;
  document.getElementById("nedit").focus();
}
function saveNotes(){const _v=document.getElementById('nedit').value;setP(selId,{notes:_v});const _np=getP(selId);logActivity('Notas editadas','',selId,_np?.name||'');renderInfo();}
function editDesc(){
  const p=getP(selId);
  document.getElementById("tInfo").innerHTML=`<span class="slbl" style="display:block;margin-bottom:4px">Descrição da Demanda</span>${richToolbar("dedit")}<textarea class="ea rt-area" rows="10" id="dedit">${p.desc||""}</textarea><div class="save-row" style="margin-top:6px"><button class="btn-s" onclick="saveDesc()">✓ Salvar</button><button class="btn-c" onclick="renderInfo()">✕ Cancelar</button></div>`;
  document.getElementById("dedit").focus();
}
function saveDesc(){setP(selId,{desc:document.getElementById("dedit").value});renderInfo();}
function confirmArchive(id){
  const p=getP(id);if(!p)return;
  if(confirm(`Arquivar "${p.name}"?\n\nEla sairá do board mas pode ser restaurada a qualquer momento pelo botão 📦 no topo.`)){
    archiveProject(id);
  }
}
function confirmDelete(id){
  const p=getP(id);if(!p)return;
  if(confirm(`Excluir "${p.name}"?\n\nO card vai para a lixeira e pode ser restaurado por ${TRASH_DAYS} dias.`)){
    trashPush('card',p.name+(p.code&&p.code!=='—'?' ('+p.code+')':''),JSON.parse(JSON.stringify(p)));
    projects=projects.filter(x=>x.id!==id);
    removeFromOrder(p.stage,id);
    saveProjects();
    closeModal();
    renderBoard();renderStats();
    showToast('🗑 Movido para a lixeira',`"${p.name}" pode ser restaurado.`);
  }
}

/* ── LINK MANAGEMENT ────────────────────────────────── */
// openLinkModal: v1.7 version defined earlier

function closeLinkModal(){document.getElementById("linkModal").classList.remove("open");}
function saveLinkModal(){
  const name=document.getElementById("linkName").value.trim();
  const url=document.getElementById("linkUrl").value.trim();
  if(!name||!url){showToast("Atenção","Preencha nome e URL.");return;}
  const u=url.startsWith("http")?url:"https://"+url;
  const p=getP(selId);
  setP(selId,{links:[...(p.links||[]),{n:name,u}]});
  closeLinkModal();renderInfo();
}
function deleteLink(idx){
  const p=getP(selId);
  setP(selId,{links:(p.links||[]).filter((_,i)=>i!==idx)});
  renderInfo();
}
function setPrio(k){setP(selId,{priority:k});renderInfo();renderModal();renderBoard();renderStats();}

/* ── CHECKLIST TAB ──────────────────────────────────── */
function clStage(){return curClStage||(getP(selId)?.stage)||"escopo";}
function renderCheck(){
  const p=getP(selId);if(!p)return;
  const active=clStage();
  const sections=CL[active]||[];
  // Custom tasks: show from ALL stages so they persist when moving card
  const _seenTids=new Set();
  const customByStage=Object.values(p.customTasks||{}).flat().filter(t=>{
    if(_seenTids.has(t.tid))return false;_seenTids.add(t.tid);return true;
  });
  let h=`<div class="cls-stage-nav">${STAGES.map(s=>`<button class="cnav-pill${s.id===active?" active":""}" onclick="setClStage('${s.id}')">${s.icon} ${s.label}</button>`).join("")}</div>`;
  if(active==="rdm") h+=`<div class="ritm-banner">⚠️ Links RITM nas seções 5 (Build/TH), 8 (Rollback) e 11 (FIX)</div>`;
  if(!sections.length&&!customByStage.length){
    h+=`<div class="no-items">Sem checklist. <button class="add-sec-btn" onclick="showAddTask('__free__','${active}')">+ Nova tarefa</button></div>`;
    document.getElementById("tCheck").innerHTML=h;return;
  }

  sections.forEach((sec,sIdx)=>{
    const tasks=sec.t||[];
    const secLabel=(p.customSections||{})[active]?.[sIdx]||sec.s;
    // Aplica ordem a TODOS os tasks da seção (padrão + injected + permanentes)
    const taskOrder=getTaskOrder(p,active,sec.s);
    const _globalRemoved=(getGlobalRemovedTasks()||{})[active]||[];
    const _filteredTasks=tasks.filter(t=>!_globalRemoved.includes(t.id)&&!(p.taskHidden||{})[t.id]);
    // Apply global order first, then per-card order
    const _globalOrder=(getGlobalTaskOrder()||{})[active]?.[sec.s];
    const _orderToApply=taskOrder||_globalOrder;
    const orderedDefault=applyTaskOrder(_filteredTasks,_orderToApply);
    const permanentInSec=(getPermanentTasks()[active]||[]).filter(t=>t.sectionS===sec.s);
    const injectedInSec=((p.injectedTasks||{})[active]?.[sec.s]||[]);
    const allSecTasksUnordered=[
      ...orderedDefault,
      ...permanentInSec.map(t=>({id:t.tid,tx:t.tx,isPermanent:true})),
      ...injectedInSec.map(t=>({id:t.tid,tx:t.tx,isInjected:true}))
    ];
    // Aplica ordem (global ou per-card), depois deduplica por TID
    const _orderedAll=_orderToApply?applyTaskOrder(allSecTasksUnordered,_orderToApply):allSecTasksUnordered;
    const _seenSecTids=new Set();
    const allSecTasks=_orderedAll.filter(t=>{
      if(_seenSecTids.has(t.id))return false;_seenSecTids.add(t.id);return true;
    });
    const taskIds=allSecTasks.map(t=>t.id);
    // Store for drag-drop
    _sectionTaskIds[active+'|||'+sec.s]=taskIds;
    // Contagem considera TODAS as tarefas visíveis nesta seção (nativas + permanentes + injetadas),
    // não só nativas — senão o contador ficava errado ao mover/injetar tarefas entre seções
    const _visibleSecTasks=allSecTasks.filter(t=>t.isInjected||!(p.taskHidden||{})[t.id]);
    const _visibleNotDis=_visibleSecTasks.filter(t=>!(p.dis||{})[t.id]);
    const _visibleDone=_visibleNotDis.filter(t=>(p.checks||{})[t.id]).length;
    h+=`<div class="cl-sec"><div class="cl-sec-hd">
      <span id="sec-label-${active}-${sIdx}">${secLabel}</span>
      <button onclick="startEditSection('${active}',${sIdx},'${escOnclick(secLabel)}')"
        style="background:none;border:none;color:#2C2D3C;cursor:pointer;font-size:11px;margin-left:4px;opacity:0;transition:opacity .15s"
        onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0" title="Editar nome da seção">✏</button>
      <div style="display:flex;align-items:center;gap:7px;margin-left:auto">
        <span class="cl-sec-pct">${_visibleDone}/${_visibleNotDis.length}</span>
        <button class="add-sec-btn" onclick="showAddTask('${sec.s}','${active}')">+</button>
      </div>
    </div>`;
    allSecTasks.forEach((task,_taskIdx)=>{
      const isExtra=!!task.isInjected; // tarefas permanentes usam o fluxo de removeDefaultTask, não deleteCustomTask
      const _gTxt=(getGlobalTaskText()||{})[task.id];
      const fullTask=isExtra?{id:task.id,tx:task.tx,info:null,links:[]}:
                              {...task,tx:_gTxt||(p.taskText||{})[task.id]||task.tx};
      // Esconde a ORIGEM nativa/permanente oculta (taskHidden), mas nunca uma cópia injetada —
      // senão mover uma tarefa nativa pra outra seção também some com a cópia no destino
      if(!task.isInjected&&(p.taskHidden||{})[task.id])return;
      h+=renderTaskRow(p,task.id,fullTask,isExtra,active,sec.s,taskIds,_taskIdx);
    });
    h+=`</div>`;
  });

  // custom tasks for this stage
  // Tarefas permanentes que foram promovidas da seção customizada (sectionS='__custom__' ou sem match no CL)
  const _clSectionNames=new Set((CL[active]||[]).map(s=>s.s));
  const permanentCustom=(getPermanentTasks()[active]||[]).filter(t=>
    t.sectionS==='__custom__'||t.sectionS===''||!_clSectionNames.has(t.sectionS)
  );

  if(customByStage.length||permanentCustom.length){
    let allCustom=[...customByStage,...permanentCustom.map(t=>({tid:t.tid,tx:t.tx,isPermanent:true}))];
    if(p.customPoolOrder?.length){
      const orderIdx=new Map(p.customPoolOrder.map((tid,i)=>[tid,i]));
      allCustom=[...allCustom].sort((a,b)=>{
        const ai=orderIdx.has(a.tid)?orderIdx.get(a.tid):Infinity;
        const bi=orderIdx.has(b.tid)?orderIdx.get(b.tid):Infinity;
        return ai-bi;
      });
    }
    const notDisC=allCustom.filter(t=>!(p.dis||{})[t.tid||t.id]);
    const doneC=notDisC.filter(t=>(p.checks||{})[(t.tid||t.id)]).length;
    h+=`<div class="cl-sec"><div class="cl-sec-hd"><span>➕ Tarefas adicionadas</span><div style="display:flex;align-items:center;gap:7px"><span class="cl-sec-pct">${doneC}/${notDisC.length}</span></div></div>`;
    allCustom.forEach(ct=>{
      const _isPerm=!!ct.isPermanent;
      h+=renderTaskRow(p,ct.tid||ct.id,{id:ct.tid||ct.id,tx:ct.tx,info:null,links:[],isPermanent:_isPerm},!_isPerm,active,'__custom__',[]);
    });
    // Store custom task IDs for drag-drop
    _sectionTaskIds[active+'|||__custom__']=allCustom.map(ct=>ct.tid||ct.id);
    h+=`</div>`;
  }

  // add task button at bottom
  h+=`<div style="margin-top:8px"><button class="add-sec-btn" style="width:100%;padding:6px" onclick="showAddTask('','${active}')">+ Adicionar nova tarefa</button></div>`;
  h+=`<div id="addTaskArea" style="display:none;margin-top:8px">
    <div class="add-task-row">
      <input class="add-task-inp" id="addTaskInp" placeholder="Texto da nova tarefa…"
        onkeydown="if(event.key==='Enter')confirmAddTask('${active}');if(event.key==='Escape')hideAddTask()">
      <button class="add-task-ok" onclick="confirmAddTask('${active}')">✓</button>
      <button class="add-task-x" onclick="hideAddTask()">✕</button>
    </div>
    <input type="hidden" id="addTaskSection" value="">
  </div>`;

  document.getElementById("tCheck").innerHTML=h;
}

// Escapa texto para uso seguro dentro de onclick='...' embutido em atributo HTML "...":
// aspas simples viram \' (não quebra o literal JS) e aspas duplas viram &quot; (não quebra o atributo HTML)
function escOnclick(s){
  return String(s||"").replace(/'/g,"\\'").replace(/"/g,"&quot;");
}
function renderTaskRow(p,tid,task,isCustom,activeStage,sectionS,taskIds,_taskNum){
  const chk=(p.checks||{})[tid]||false;
  const dis=(p.dis||{})[tid]||false;
  const exp=expanded[tid]||false;
  const hasDetail=!!(task.info); // links moved to ref panel
  const isEditing=taskEditing===tid;
  const due=(p.taskDates||{})[tid]||"";
  const hasDue=!!due;
  const hasRef=!!((p.taskLinks||{})[tid]?.length||(p.taskAttachments||{})[tid]?.length);
  const isRecur=(p.taskRecurrence||{})[tid];
  const defaultLinks=task?.links||[];
  const totalRefs=((p.taskLinks||{})[tid]?.length||0)+((p.taskAttachments||{})[tid]?.length||0)+defaultLinks.length;
  const sectionKey=activeStage+'|||'+(sectionS||'__custom__');

  let h=`<div class="clt${dis?" dis":""}" id="clt-${tid}"
    data-tid="${tid}" data-stage="${activeStage}" data-skey="${sectionKey}"
    draggable="${isEditing?'false':'true'}"
    ondragstart="if('${isEditing}'==='true')return false;startDragTask(event,'${tid}','${activeStage}')"
    ondragend="endDragTask(event)"
    ondragover="dragOverTask(event,'${tid}','${activeStage}')"
    ondrop="dropOnAnyTask(event,'${tid}','${activeStage}','${sectionKey}')">
    <div class="clt-main">
      <span style="cursor:${isEditing?'default':'grab'};color:#283548;font-size:12px;flex-shrink:0;user-select:none" title="${isEditing?'':'Arrastar'}">⠿</span>
      ${typeof _taskNum!=='undefined'&&_taskNum>=0?`<span style="font-size:9px;color:#2C2D3C;min-width:14px;text-align:right;flex-shrink:0;font-weight:600">${_taskNum+1}</span>`:''}
      <input type="checkbox" class="clt-chk" id="ck-${tid}" ${chk?"checked":""} ${dis?"disabled":""}
             onchange="toggleCk('${tid}',this.checked,'${activeStage}')">`;
  if(isEditing){
    h+=`<input class="task-edit-inp" id="editInp-${tid}" value="${(task.tx||'').replace(/"/g,'&quot;')}"
          onkeydown="if(event.key==='Enter')saveTaskText('${tid}','${activeStage}',${isCustom});if(event.key==='Escape')cancelEditTask()"
          onblur="cancelEditTask()">`;
  } else {
    // Use global override → per-card override → task default text
    const _globalTxt=(typeof getGlobalTaskText==='function'?getGlobalTaskText():{})[tid];
    const _displayTxt=_globalTxt||(p.taskText||{})[tid]||task.tx||tid;
    h+=`<span class="clt-txt editable${chk?" completed":""}" onclick="startEditTask('${tid}')">${_displayTxt}</span>`;
  }
  h+=`<div class="clt-btns">`;
  if(!isEditing){
    if(hasDetail) h+=`<button class="expand-btn" onclick="toggleExp('${tid}')">${exp?"▴":"▾"}</button>`;
    // Recorrência — disponível para TODAS as tarefas
    h+=`<select onchange="setTaskRecurrence('${tid}',this.value)"
      style="font-size:9px;background:#15161F;border:1px solid rgba(85,86,106,.2);color:${isRecur?'#818cf8':'#2C2D3C'};border-radius:3px;padding:1px 3px;cursor:pointer;max-width:52px" title="Recorrência">
      <option value="" ${!isRecur?'selected':''}>1x</option>
      <option value="daily" ${isRecur==='daily'?'selected':''}>🔁 D</option>
      <option value="weekly" ${isRecur==='weekly'?'selected':''}>🔁 S</option>
      <option value="monthly" ${isRecur==='monthly'?'selected':''}>🔁 M</option>
    </select>`;
    if(isCustom){
      h+=`<button class="del-task-btn" onclick="deleteCustomTask('${tid}','${activeStage}')" title="Remover">✕</button>
      <button onclick="promoteTaskToDefault('${tid}','${activeStage}','${escOnclick(sectionS||'')}')"
        style="background:none;border:none;color:#55566A;cursor:pointer;font-size:11px;padding:1px 3px" title="Tornar padrão neste stage">🌟</button>`;
    } else {
      // Tarefa padrão ou permanente: X que pergunta escopo de remoção
      const _safeLabel=escOnclick((task.tx||tid).substring(0,35));
      const _isPerm=!!(task.isPermanent);
      h+=`<button class="del-task-btn" onclick="removeDefaultTask('${tid}','${activeStage}','${_safeLabel}',${_isPerm})"
        title="Remover (este card ou todos os cards)">✕</button>`;
    }
    h+=`<button class="na-btn${dis?" is-off":""}" onclick="toggleDis('${tid}','${activeStage}')">${dis?"✕ N/A":"N/A"}</button>`;
    const isPastDueTask=hasDue&&new Date(due)<=new Date();
    h+=`<button class="remind-btn${hasDue?(isPastDueTask?" past":" set"):""}" onclick="toggleReminderRow('${tid}')" title="${!hasDue?'Adicionar lembrete':isPastDueTask?'Lembrete já disparado: '+new Date(due).toLocaleString("pt-BR"):'Lembrete: '+new Date(due).toLocaleString("pt-BR")}">${!hasDue?"🔕":isPastDueTask?'🔔<span style="font-size:8px;margin-left:-3px;vertical-align:top">✓</span>':"🔔"}</button>`;
    h+=`<button onclick="toggleTaskRef('${tid}')" title="Referências e anexos"
      style="background:none;border:none;color:${hasRef?'#E2A968':'#2C2D3C'};cursor:pointer;font-size:12px;padding:2px 3px;position:relative">
      📎${totalRefs>0?`<span style="font-size:8px;color:${hasRef?'#E2A968':'#55566A'};vertical-align:super;margin-left:1px">${totalRefs}</span>`:''}
    </button>`;
  } else {
    h+=`<button class="add-task-ok" style="font-size:10px;padding:2px 7px" onclick="saveTaskText('${tid}','${activeStage}',${isCustom})">✓</button>`;
    h+=`<button class="add-task-x" style="font-size:10px;padding:2px 6px" onclick="cancelEditTask()">✕</button>`;
  }
  h+=`</div></div>`;
  h+=`<div class="task-remind-expand" id="remind-${tid}">
    <input class="task-due-inp" type="datetime-local" value="${due}" onchange="setTaskDue('${tid}','${activeStage}',this.value)">
    ${hasDue?`<button onclick="setTaskDue('${tid}','${activeStage}','')" style="background:none;border:none;color:#55566A;cursor:pointer;font-size:10px;margin-top:3px">✕ Remover lembrete</button>`:""}
  </div>`;
  h+=renderTaskRef(p,tid,task);
  // expanded detail
  if(exp&&hasDetail){
    h+=`<div class="clt-detail">`;
    if(task.info) h+=`<div class="clt-info">${task.info}</div>`;
    // default links now shown in ref panel (📎)
    h+=`</div>`;
  }
  return h+`</div>`;
}

function setClStage(s){curClStage=s;taskEditing=null;renderCheck();}

function toggleCk(id,v,stage){
  const p=getP(selId);if(!p)return;
  const recur=(p.taskRecurrence||{})[id];
  if(v&&recur){
    // Tarefa recorrente: marcar concluída e programar reset
    setP(selId,{checks:{...(p.checks||{}),[id]:true}});
    const next=getNextOccurrence(new Date(),recur);
    showToast(`🔁 ${RECUR_LABELS[recur]}`,`Próxima: ${next.toLocaleDateString('pt-BR')}`);
    const ms={daily:86400000,weekly:604800000,monthly:2592000000}[recur]||86400000;
    setTimeout(()=>{
      const p2=getP(selId);if(!p2)return;
      setP(selId,{checks:{...(p2.checks||{}),[id]:false}});
      renderCheck();
    },ms);
  } else {
    setP(selId,{checks:{...(p.checks||{}),[id]:v}});
  }
  refreshProgress(selId);
  setTimeout(()=>renderCheck(),0);
}
function toggleDis(id,stage){
  const p=getP(selId);
  const wasDis=(p.dis||{})[id];
  const dis={...(p.dis||{}),[id]:!wasDis};
  const checks={...(p.checks||{})};
  if(!wasDis)checks[id]=false;
  setP(selId,{dis,checks});
  refreshProgress(selId);
  setTimeout(()=>renderCheck(),0);
}
function toggleExp(id){expanded[id]=!expanded[id];renderCheck();}

// Task text editing
function startEditTask(tid){taskEditing=tid;renderCheck();setTimeout(()=>{const i=document.getElementById("editInp-"+tid);if(i){i.focus();i.select();}},30);}
function cancelEditTask(){taskEditing=null;renderCheck();}
function saveTaskText(tid,stage,isCustom){
  const inp=document.getElementById("editInp-"+tid);
  const newText=(inp?.value||"").trim();
  if(!newText){cancelEditTask();return;}
  const p=getP(selId);
  if(isCustom){
    // Busca em TODOS os stages de customTasks
    const newCT=JSON.parse(JSON.stringify(p.customTasks||{}));
    let found=false;
    Object.keys(newCT).forEach(s=>{
      const idx=(newCT[s]||[]).findIndex(c=>c.tid===tid);
      if(idx>=0){newCT[s][idx]={...newCT[s][idx],tx:newText};found=true;}
    });
    if(found){
      setP(selId,{customTasks:newCT});
    } else {
      // Busca em injectedTasks
      const newInj=JSON.parse(JSON.stringify(p.injectedTasks||{}));
      let foundInj=false;
      Object.keys(newInj).forEach(s=>{
        Object.keys(newInj[s]||{}).forEach(sec=>{
          const idx=(newInj[s][sec]||[]).findIndex(t=>t.tid===tid);
          if(idx>=0){newInj[s][sec][idx]={...newInj[s][sec][idx],tx:newText};foundInj=true;}
        });
      });
      if(foundInj) setP(selId,{injectedTasks:newInj});
      else setP(selId,{taskText:{...(p.taskText||{}),[tid]:newText}});
    }
  } else {
    // Tarefa padrão: pergunta o escopo da alteração
    const choice=confirm(
      `Como deseja salvar esta alteração?\n\n`+
      `• OK = Alterar somente neste card\n`+
      `• Cancelar = Alterar em TODOS os cards desta esteira (Tarefa Padrão)`
    );
    if(choice){
      // Só este card: override local, não mexe na tarefa padrão global
      setP(selId,{taskText:{...(p.taskText||{}),[tid]:newText}});
    } else {
      // Todos os cards: atualiza a Tarefa Padrão globalmente
      setGlobalTaskText(tid,newText);
    }
  }
  taskEditing=null;renderCheck();
}

// Add custom task
function showAddTask(section,stage){
  const area=document.getElementById("addTaskArea");
  const secInp=document.getElementById("addTaskSection");
  if(area){area.style.display="block";}
  if(secInp) secInp.value=section;
  setTimeout(()=>document.getElementById("addTaskInp")?.focus(),30);
}
function hideAddTask(){
  const area=document.getElementById("addTaskArea");
  if(area)area.style.display="none";
}
function confirmAddTask(stage){
  const inp=document.getElementById("addTaskInp");
  const text=(inp?.value||"").trim();
  if(!text)return;
  const p=getP(selId);
  const tid="ct_"+Date.now();
  const existing=(p.customTasks||{})[stage]||[];
  setP(selId,{customTasks:{...(p.customTasks||{}),[stage]:[...existing,{tid,tx:text}]}});
  refreshProgress(selId);
  taskEditing=null;
  renderCheck();
}
function deleteCustomTask(tid,stage){
  const p=getP(selId);if(!p)return;
  // Busca em todos os stages (tarefas persistem entre stages)
  const newCT={};
  Object.entries(p.customTasks||{}).forEach(([s,tasks])=>{
    newCT[s]=(tasks||[]).filter(c=>c.tid!==tid);
  });
  // Remove também de injectedTasks
  const newInj=JSON.parse(JSON.stringify(p.injectedTasks||{}));
  Object.keys(newInj).forEach(s=>{
    Object.keys(newInj[s]||{}).forEach(sec=>{
      newInj[s][sec]=(newInj[s][sec]||[]).filter(t=>t.tid!==tid);
    });
  });
  setP(selId,{customTasks:newCT,injectedTasks:newInj});
  renderCheck();
}

// Task due dates / reminders
function setTaskDue(tid,stage,val){
  const p=getP(selId);
  const newNotified={...(p.taskNotified||{})};
  if(!val) delete newNotified[tid];
  setP(selId,{taskDates:{...(p.taskDates||{}),[tid]:val||null},taskNotified:newNotified});
  checkReminders();
  renderCheck();
}
function toggleReminderRow(tid){
  const el=document.getElementById("remind-"+tid);
  if(el) el.classList.toggle("open");
}

/* ── MENU PANEL ─────────────────────────────────────── */
// openMenuPanel: defined earlier (v1.6)

// closeMenuPanel: defined earlier (v1.6)

// setMenuTab: defined earlier (v1.6)

// openTplModal: defined earlier (v1.6)

function copyClip(txt){navigator.clipboard?.writeText(txt).then(()=>showToast("Copiado!","Texto copiado para área de transferência.")).catch(()=>{});}

/* ── REPORTS PANEL ──────────────────────────────────── */
function openReportsPanel(){document.getElementById("rptOverlay").classList.add("open");renderReports();}
function closeReportsPanel(){document.getElementById("rptOverlay").classList.remove("open");}

function renderReports(){
  // Preserva foco/cursor do campo de filtro que estava sendo usado, entre as várias seções
  const activeEl=document.activeElement;
  const hadFocusId=activeEl&&activeEl.id&&activeEl.id.startsWith("rptFilterInp-")?activeEl.id:null;
  const caretPos=hadFocusId?activeEl.selectionStart:null;

  const body=document.getElementById("rptBody");
  const allActive=projects.filter(p=>!p.archived);
  const byPrio={urgent:0,high:0,normal:0,low:0};
  allActive.forEach(p=>{if(byPrio[p.priority]!==undefined)byPrio[p.priority]++;});
  const concluidos=projects.filter(p=>p.progress>=100).length; // inclui arquivados

  // helper: sort by stage index then progress desc
  const byStage=(arr)=>[...arr].sort((a,b)=>{
    const si=i=>STAGES.findIndex(s=>s.id===i);
    return si(b.stage)-si(a.stage)||b.progress-a.progress;
  });

  // ── Resumo Geral ──
  const activeGeral=reportFilters.geral?allActive.filter(p=>matchesReportFilter(p,reportFilters.geral)):allActive;
  const byPrioG={urgent:0,high:0,normal:0,low:0};
  activeGeral.forEach(p=>{if(byPrioG[p.priority]!==undefined)byPrioG[p.priority]++;});
  let h=`<div class="rpt-section-title">📊 Resumo Geral
    <button class="rpt-btn" style="float:right;font-size:10px" onclick="exportPDF('geral')">⬇ PDF</button>
  </div>
  ${filterBoxHtml("geral","o resumo geral")}
  <div class="rpt-cards">
    <div class="rpt-card"><div class="rpt-num" style="color:#D98E3F">${activeGeral.length}</div><div class="rpt-lbl">Demandas ativas</div></div>
    <div class="rpt-card"><div class="rpt-num" style="color:#7A9B6B">${reportFilters.geral?activeGeral.filter(p=>p.progress>=100).length:concluidos}</div><div class="rpt-lbl">✅ Concluídas</div></div>
    <div class="rpt-card"><div class="rpt-num" style="color:#f87171">${byPrioG.urgent}</div><div class="rpt-lbl">🔴 Urgentes</div></div>
    <div class="rpt-card"><div class="rpt-num" style="color:#fb923c">${byPrioG.high}</div><div class="rpt-lbl">🟠 Alta</div></div>
    <div class="rpt-card"><div class="rpt-num" style="color:#fbbf24">${activeGeral.filter(p=>p.blockers?.length>0).length}</div><div class="rpt-lbl">📌 Com Status Atual</div></div>
    <div class="rpt-card"><div class="rpt-num" style="color:#8b5cf6">${activeGeral.filter(p=>p.stage==="rdm").length}</div><div class="rpt-lbl">🚀 Em RDM</div></div>
  </div>`;

  // ── Por Stage ──
  const activeStageF=reportFilters.stage?allActive.filter(p=>matchesReportFilter(p,reportFilters.stage)):allActive;
  h+=`<div class="rpt-section-title" style="margin-top:8px">📍 Por Stage
    <button class="rpt-btn" style="float:right;font-size:10px" onclick="exportPDF('stage')">⬇ PDF</button>
  </div>
  ${filterBoxHtml("stage","por stage")}`;
  STAGES.forEach(s=>{
    const ps=activeStageF.filter(p=>p.stage===s.id);
    if(!ps.length)return;
    h+=`<div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:${s.color};margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">${s.icon} ${s.label} <span style="background:${s.color}20;padding:1px 7px;border-radius:10px;font-size:10px">${ps.length}</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:5px">
        ${ps.map(p=>`<span class="stage-pill-rpt" style="background:${s.color}14;color:${s.color}CC;border-color:${s.color}35" onclick="closeReportsPanel();openModal('${p.id}')" title="${p.desc||p.notes||''}" style="cursor:pointer">${p.name}</span>`).join("")}
      </div>
    </div>`;
  });
  if(!activeStageF.length)h+=`<div style="font-size:11px;color:#55566A;text-align:center;padding:14px 0">Nenhuma demanda encontrada.</div>`;

  // ── Andamento por Demanda ──
  const activeAnd=reportFilters.andamento?allActive.filter(p=>matchesReportFilter(p,reportFilters.andamento)):allActive;
  h+=`<div class="rpt-section-title">📈 Andamento por Demanda
    <button class="rpt-btn" style="float:right;font-size:10px" onclick="exportPDF('andamento')">⬇ PDF</button>
  </div>
  ${filterBoxHtml("andamento","o andamento")}
  <table class="rpt-tbl"><thead><tr><th>Demanda</th><th>Stage</th><th>Prioridade</th><th>Progresso</th><th>Status Atual</th></tr></thead><tbody>`;
  byStage(activeAnd).forEach(p=>{
    const st=STAGES.find(s=>s.id===p.stage);
    const prioK=p.priority;
    const prioHtml=prioK&&prioK!=="normal"?`<span class="prio-badge ${prioK}">${PRIO[prioK]?.label}</span>`:`<span style="font-size:10px;color:#2C2D3C">—</span>`;
    const done=p.progress>=100;
    const statusTxt=p.blockers?.length?p.blockers.join(" · "):"—";
    h+=`<tr style="cursor:pointer${done?";opacity:.65":""}" onclick="closeReportsPanel();openModal('${p.id}')">
      <td><strong>${p.name}</strong><br><span style="font-size:9px;color:#55566A;font-family:monospace">${p.code}</span></td>
      <td style="font-size:10px;white-space:nowrap">${st?.icon||""} <span style="color:${st?.color||"#A5A7B8"}">${st?.label||""}</span></td>
      <td>${prioHtml}</td>
      <td style="min-width:110px"><div class="pbar-sm"><div class="pbar-sm-f" style="width:${p.progress}%"></div></div> <span style="font-size:10px;color:${done?"#7A9B6B":"#D98E3F"};margin-left:4px;font-weight:600">${p.progress}%${done?" ✅":""}</span></td>
      <td style="font-size:10px;color:${p.blockers?.length?"#D6D7E0":"#2C2D3C"};max-width:220px">${statusTxt}</td>
    </tr>`;
  });
  h+=`</tbody></table>`;

  // ── Status Atual — visão dedicada, card por card ──
  const activeStatusF=reportFilters.status?allActive.filter(p=>matchesReportFilter(p,reportFilters.status)):allActive;
  const withStatus=byStage(activeStatusF).filter(p=>p.blockers?.length>0);
  h+=`<div class="rpt-section-title">📌 Status Atual — Card por Card
    <button class="rpt-btn" style="float:right;font-size:10px" onclick="exportPDF('status')">⬇ PDF</button>
  </div>
  ${filterBoxHtml("status","o status atual")}
  <div style="font-size:11px;color:#8B8D9B;margin-bottom:10px">${withStatus.length} de ${activeStatusF.length} demandas ativas com status atual registrado</div>
  <div style="border:1px solid rgba(85,86,106,.25);border-radius:8px;overflow:hidden;margin-bottom:8px">
    ${withStatus.map(p=>{
      const st=STAGES.find(s=>s.id===p.stage);
      return`<div style="padding:7px 12px;border-left:3px solid ${st?.color||"#D98E3F"};border-bottom:1px solid rgba(85,86,106,.15);cursor:pointer" onclick="closeReportsPanel();openModal('${p.id}')">
        <div style="display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-bottom:3px">
          <span style="flex-shrink:0;font-size:9px;font-weight:700;padding:2px 7px;border-radius:9px;white-space:nowrap;background:${st?.color||"#8B8D9B"}20;color:${st?.color||"#8B8D9B"}">${st?.icon||""} ${st?.label||""}</span>
          <span style="font-size:12px;font-weight:600;color:#EDEDF0">${p.name}</span>
          <span style="font-size:9px;color:#55566A;font-family:monospace">${p.code}</span>
        </div>
        ${p.blockers.map(b=>`<div style="font-size:11px;color:#A5A7B8;line-height:1.4;padding-left:1px">📌 ${b}</div>`).join("")}
      </div>`;
    }).join("")||'<div style="text-align:center;color:#55566A;padding:20px;font-size:11px">Nenhuma demanda com status atual registrado no momento.</div>'}
  </div>`;

  // ── Checklist por Demanda ──
  const activeChk=reportFilters.checklist?allActive.filter(p=>matchesReportFilter(p,reportFilters.checklist)):allActive;
  h+=`<div class="rpt-section-title">☑️ Checklist por Demanda
    <button class="rpt-btn" style="float:right;font-size:10px" onclick="exportPDF('checklist')">⬇ PDF</button>
  </div>
  ${filterBoxHtml("checklist","o checklist")}
  <table class="rpt-tbl"><thead><tr><th>Demanda</th><th>Stage</th><th>Concluídas</th><th>Pendentes</th><th>%</th></tr></thead><tbody>`;
  byStage(activeChk).forEach(p=>{
    const clS=CL[p.stage]||[];
    const all=[...clS.flatMap(s=>s.t),...((p.customTasks||{})[p.stage]||[])];
    const enabled=all.filter(t=>!(p.dis||{})[t.id||t.tid]);
    const done=enabled.filter(t=>(p.checks||{})[t.id||t.tid]).length;
    const pend=enabled.length-done;
    const pct=enabled.length?Math.round(done/enabled.length*100):0;
    if(!enabled.length)return;
    h+=`<tr style="cursor:pointer" onclick="closeReportsPanel();openModal('${p.id}');setTimeout(()=>sw('check'),150)">
      <td><strong>${p.name}</strong></td>
      <td style="font-size:10px">${STAGES.find(s=>s.id===p.stage)?.icon||""} ${p.stage}</td>
      <td style="color:rgba(122,155,107,.85)">${done}/${enabled.length}</td>
      <td style="color:${pend>0?"rgba(251,191,36,.9)":"rgba(122,155,107,.85)"}">${pend>0?pend+" pend.":"✅ ok"}</td>
      <td><div class="pbar-sm"><div class="pbar-sm-f" style="width:${pct}%"></div></div> <span style="font-size:10px;color:#D98E3F">${pct}%</span></td>
    </tr>`;
  });
  h+=`</tbody></table>`;

  const rem=[];const now=new Date();
  allActive.forEach(p=>{Object.entries(p.taskDates||{}).forEach(([tid,dt])=>{if(!dt)return;const d=new Date(dt);rem.push({pname:p.name,pid:p.id,text:findTaskText(p,tid),d,past:d<=now});});
    if(p.cardReminder){const d=new Date(p.cardReminder);rem.push({pname:p.name+" (card)",pid:p.id,text:"Lembrete geral do card",d,past:d<=now});}
  });
  // ── RELATÓRIO SEMANAL — sempre exibido ──
  const activeSem=reportFilters.semanal?allActive.filter(p=>matchesReportFilter(p,reportFilters.semanal)):allActive;
  const weekAgo=new Date(Date.now()-7*86400000);
  const changedThisWeek=activeSem.filter(p=>(p.stageHistory||[]).some(h=>new Date(h.enteredAt)>=weekAgo));
  h+=`<div class="rpt-section-title">📅 Movimentações desta semana
    <button class="rpt-btn" style="float:right;font-size:10px" onclick="exportPDF('semanal')">⬇ PDF Semanal</button>
  </div>
  ${filterBoxHtml("semanal","as movimentações")}`;
  if(!changedThisWeek.length){
    h+=`<div style="font-size:11px;color:#55566A;padding:12px 0;text-align:center">
      Nenhuma movimentação registrada esta semana.<br>
      <span style="font-size:10px;color:#2C2D3C">Mova um card de stage para começar a registrar o histórico.</span>
    </div>`;
  } else {
    h+=`<table class="rpt-tbl"><thead><tr><th>Demanda</th><th>Movimentação</th><th>Stage atual</th></tr></thead><tbody>`;
    changedThisWeek.forEach(p=>{
      const recent=(p.stageHistory||[]).filter(h=>new Date(h.enteredAt)>=weekAgo);
      const st=STAGES.find(s=>s.id===p.stage);
      h+=`<tr onclick="closeReportsPanel();openModal('${p.id}')" style="cursor:pointer">
        <td><strong>${p.name}</strong></td>
        <td style="font-size:10px;color:#8B8D9B">${recent.map(h=>STAGES.find(s=>s.id===h.stage)?.label||h.stage).join(' → ')}</td>
        <td>${st?.icon||''} <span style="color:${st?.color||'#A5A7B8'}">${st?.label||p.stage}</span></td>
      </tr>`;
    });
    h+=`</tbody></table>`;
  }

  if(rem.length){
    h+=`<div class="rpt-section-title">🔔 Lembretes</div>
    <table class="rpt-tbl"><thead><tr><th>Demanda</th><th>Tipo</th><th>Data/Hora</th><th>Status</th></tr></thead><tbody>`;
    rem.sort((a,b)=>a.d-b.d).forEach(r=>{
      h+=`<tr style="cursor:pointer" onclick="closeReportsPanel();openModal('${r.pid}')">
        <td>${r.pname}</td><td style="font-size:10px">${r.text}</td>
        <td style="font-size:10px;white-space:nowrap">${r.d.toLocaleString("pt-BR")}</td>
        <td>${r.past?`<span style="color:rgba(239,68,68,.8)">Vencido</span>`:`<span style="color:rgba(122,155,107,.85)">Futuro</span>`}</td>
      </tr>`;
    });
    h+=`</tbody></table>`;
  }
  body.innerHTML=h;
  if(hadFocusId){
    const newInput=document.getElementById(hadFocusId);
    if(newInput){newInput.focus();newInput.setSelectionRange(caretPos,caretPos);}
  }
}

/* ── PDF EXPORT ─────────────────────────────────────── */
function exportPDF(type){
  let active=projects.filter(p=>!p.archived);
  const activeFilter=reportFilters[type]||"";
  if(activeFilter)active=active.filter(p=>matchesReportFilter(p,activeFilter));
  const byStage=(arr)=>[...arr].sort((a,b)=>{const si=i=>STAGES.findIndex(s=>s.id===i);return si(b.stage)-si(a.stage)||b.progress-a.progress;});
  const now=new Date().toLocaleString("pt-BR");
  const issuerName=currentUser?.name||"Usuário não identificado";
  const issuerRole=getPeople().find(pp=>pp.name===issuerName)?.role||"";
  const titles={geral:"Resumo Geral",stage:"Demandas por Stage",andamento:"Andamento por Demanda",checklist:"Checklist por Demanda",status:"Status Atual — Card por Card",semanal:"Relatório Semanal"};
  let content="";

  if(type==="geral"){
    const byPrio={urgent:0,high:0,normal:0,low:0};
    active.forEach(p=>{if(byPrio[p.priority]!==undefined)byPrio[p.priority]++;});
    const concl=active.filter(p=>p.progress>=100).length;
    const blk=active.filter(p=>p.blockers?.length>0).length;
    content=`<div class="summary-grid">
      <div class="s-card"><div class="s-num">${active.length}</div><div class="s-lbl">Demandas Ativas</div></div>
      <div class="s-card green"><div class="s-num">${concl}</div><div class="s-lbl">✅ Concluídas</div></div>
      <div class="s-card red"><div class="s-num">${byPrio.urgent}</div><div class="s-lbl">Urgentes</div></div>
      <div class="s-card orange"><div class="s-num">${byPrio.high}</div><div class="s-lbl">Prioridade Alta</div></div>
      <div class="s-card yellow"><div class="s-num">${blk}</div><div class="s-lbl">Com Status Atual</div></div>
      <div class="s-card purple"><div class="s-num">${active.filter(p=>p.stage==="rdm").length}</div><div class="s-lbl">Em RDM</div></div>
    </div>
    <table><thead><tr><th>Demanda</th><th>Código</th><th>Stage</th><th>Prioridade</th><th>Progresso</th><th>Status Atual</th></tr></thead><tbody>
    ${byStage(active).map(p=>{const st=STAGES.find(s=>s.id===p.stage);return`<tr class="${p.progress>=100?"done":""}"><td><strong>${p.name}</strong></td><td class="mono">${p.code}</td><td>${st?.label||""}</td><td>${PRIO[p.priority]?.label||""}</td><td><div class="bar"><div class="bar-fill" style="width:${p.progress}%"></div></div> ${p.progress}%</td><td class="${p.blockers?.length?"blk":""}">${p.blockers?.length?p.blockers.join("; "):"—"}</td></tr>`;}).join("")}
    </tbody></table>`;
  } else if(type==="stage"){
    content=STAGES.map(s=>{
      const ps=active.filter(p=>p.stage===s.id);if(!ps.length)return"";
      return `<div class="stage-block"><h3 style="color:${s.color};border-color:${s.color}40">${s.icon} ${s.label} (${ps.length})</h3>
        <table><thead><tr><th>Demanda</th><th>Código</th><th>Prioridade</th><th>Progresso</th><th>Status Atual</th></tr></thead><tbody>
        ${ps.map(p=>`<tr><td><strong>${p.name}</strong></td><td class="mono">${p.code}</td><td>${PRIO[p.priority]?.label||""}</td><td>${p.progress}%</td><td class="${p.blockers?.length?"blk":""}">${p.blockers?.[0]||"—"}</td></tr>`).join("")}
        </tbody></table></div>`;
    }).join("");
  } else if(type==="andamento"){
    content=`<table><thead><tr><th>Demanda</th><th>Código</th><th>Stage</th><th>Prioridade</th><th>Progresso</th><th>Owner</th><th>Status Atual</th></tr></thead><tbody>
    ${byStage(active).map(p=>{const st=STAGES.find(s=>s.id===p.stage);return`<tr class="${p.progress>=100?"done":""}"><td><strong>${p.name}</strong></td><td class="mono">${p.code}</td><td>${st?.label||""}</td><td>${PRIO[p.priority]?.label||""}</td><td><div class="bar"><div class="bar-fill" style="width:${p.progress}%"></div></div> ${p.progress}%</td><td>${p.owner||"—"}</td><td class="${p.blockers?.length?"blk":""}">${p.blockers?.length?p.blockers.join("; "):"—"}</td></tr>`;}).join("")}
    </tbody></table>`;
  } else if(type==="status"){
    const withStatus=byStage(active).filter(p=>p.blockers?.length>0);
    content=`<p style="font-size:11px;color:#8B8D9B;margin-bottom:10px">${withStatus.length} de ${active.length} demandas ativas com status atual registrado</p>
    <div class="status-list">
    ${withStatus.map(p=>{
      const st=STAGES.find(s=>s.id===p.stage);
      return`<div class="status-row" style="border-left-color:${st?.color||"#D98E3F"}">
        <div class="status-row-hd">
          <span class="status-chip" style="background:${st?.color||"#8B8D9B"}20;color:${st?.color||"#8B8D9B"}">${st?.icon||""} ${st?.label||""}</span>
          <span class="status-name">${p.name}</span>
          <span class="status-code">${p.code}</span>
        </div>
        ${p.blockers.map(b=>`<div class="status-txt">📌 ${b}</div>`).join("")}
      </div>`;
    }).join("")}
    </div>`;
  } else if(type==="checklist"){
    content=`<table><thead><tr><th>Demanda</th><th>Stage</th><th>Tarefas Concl.</th><th>Pendentes</th><th>Checklist %</th><th>Progresso Geral</th></tr></thead><tbody>`;
    byStage(active).forEach(p=>{
      const clS=CL[p.stage]||[];
      const all=[...clS.flatMap(s=>s.t),...((p.customTasks||{})[p.stage]||[])];
      const enabled=all.filter(t=>!(p.dis||{})[t.id||t.tid]);
      const done=enabled.filter(t=>(p.checks||{})[t.id||t.tid]).length;
      const pct=enabled.length?Math.round(done/enabled.length*100):0;
      content+=`<tr class="${p.progress>=100?"done":""}"><td><strong>${p.name}</strong></td><td>${STAGES.find(s=>s.id===p.stage)?.label||""}</td><td>${done}/${enabled.length}</td><td class="${(enabled.length-done)>0?"blk":""}">${(enabled.length-done)||"—"}</td><td><div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div> ${pct}%</td><td>${p.progress}%</td></tr>`;
    });
    content+=`</tbody></table>`;
  } else if(type==="semanal"){
    const weekAgo=new Date(Date.now()-7*86400000);
    const changed=active.filter(p=>(p.stageHistory||[]).some(h=>new Date(h.enteredAt)>=weekAgo));
    const mtgs=active.flatMap(p=>(p.meetings||[]).filter(m=>new Date(m.date+'T12:00')>=weekAgo).map(m=>({...m,pname:p.name})));
    content=`<h3 style="color:#B5701F;border-color:#B5701F">📅 Semana de ${weekAgo.toLocaleDateString('pt-BR')} a ${new Date().toLocaleDateString('pt-BR')}</h3>
      <div class="summary-grid">
        <div class="s-card"><div class="s-num">${active.length}</div><div class="s-lbl">Demandas ativas</div></div>
        <div class="s-card green"><div class="s-num">${changed.length}</div><div class="s-lbl">Movimentadas</div></div>
        <div class="s-card blue" style="border-color:#bfdbfe;background:#eff6ff"><div class="s-num" style="color:#1d4ed8">${mtgs.length}</div><div class="s-lbl">Reuniões</div></div>
      </div>
      <h3 style="color:#B5701F;border-color:#B5701F">Movimentações</h3>
      <table><thead><tr><th>Demanda</th><th>Código</th><th>Stage atual</th><th>Progresso</th></tr></thead><tbody>
      ${changed.map(p=>{const st=STAGES.find(s=>s.id===p.stage);return`<tr><td><strong>${p.name}</strong></td><td class="mono">${p.code}</td><td>${st?.label||p.stage}</td><td>${p.progress}%</td></tr>`;}).join('')}
      </tbody></table>
      ${mtgs.length?`<h3 style="color:#B5701F;border-color:#B5701F">Reuniões da Semana</h3>
      <table><thead><tr><th>Data</th><th>Demanda</th><th>Participantes</th><th>Decisões</th></tr></thead><tbody>
      ${mtgs.map(m=>`<tr><td>${new Date(m.date+'T12:00').toLocaleDateString('pt-BR')}</td><td>${m.pname}</td><td>${m.participants||'-'}</td><td>${m.decisions||'-'}</td></tr>`).join('')}
      </tbody></table>`:''}`;
  }

  const html=`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Relatório — ${titles[type]} — ${fileTimestamp()}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff;color:#1C1D28;padding:0}
    .cover{background:linear-gradient(135deg,#14151F 0%,#2A2117 60%,#2E2013 100%);color:#fff;padding:40px 48px 36px;margin-bottom:0}
    .cover-logo{font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:6px;background:linear-gradient(90deg,#D98E3F,#B5701F);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .cover-subtitle{font-size:13px;color:rgba(255,255,255,.55);margin-bottom:20px}
    .cover-title{font-size:22px;font-weight:700;color:#fff;margin-bottom:4px}
    .cover-meta{font-size:11px;color:rgba(255,255,255,.45)}
    .body{padding:32px 48px}
    h3{font-size:13px;font-weight:700;color:#14151F;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid currentColor}
    table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:20px}
    th{background:#EDEBE3;padding:7px 10px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#8B8D9B;border-bottom:1px solid #EDEDF0}
    td{padding:8px 10px;border-bottom:1px solid #EDEBE3;color:#2C2D3C;vertical-align:middle}
    tr:hover td{background:#F5F3EE}
    tr.done td{color:#A5A7B8}
    .mono{font-family:monospace;font-size:10px;color:#A5A7B8}
    .blk{color:#B5701F;font-weight:600}
    .status-list{border:1px solid #EDEBE3;border-radius:8px;overflow:hidden;margin-bottom:20px}
    .status-row{padding:6px 12px;border-left:3px solid #D98E3F;border-bottom:1px solid #EDEBE3;break-inside:avoid;page-break-inside:avoid}
    .status-row:last-child{border-bottom:none}
    .status-row-hd{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-bottom:3px}
    .status-chip{flex-shrink:0;font-size:8px;font-weight:700;padding:2px 7px;border-radius:9px;white-space:nowrap}
    .status-name{font-size:11px;font-weight:700;color:#14151F}
    .status-code{font-size:8px;color:#A5A7B8;font-family:monospace}
    .status-txt{font-size:10px;color:#5A5744;line-height:1.4}
    .bar{display:inline-block;width:70px;height:5px;background:#EDEDF0;border-radius:3px;vertical-align:middle;overflow:hidden}
    .bar-fill{height:100%;background:linear-gradient(90deg,#D98E3F,#B5701F);border-radius:3px}
    .summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
    .s-card{background:#F5F3EE;border:1px solid #EDEDF0;border-radius:10px;padding:16px;text-align:center;break-inside:avoid;page-break-inside:avoid}
    .s-card.green{border-color:#bbf7d0;background:#f0fdf4}
    .s-card.red{border-color:#fecaca;background:#fff5f5}
    .s-card.orange{border-color:#fed7aa;background:#fff7ed}
    .s-card.yellow{border-color:#fef08a;background:#fefce8}
    .s-card.purple{border-color:#ddd6fe;background:#faf5ff}
    .s-num{font-size:28px;font-weight:800;color:#14151F;margin-bottom:4px}
    .s-card.green .s-num{color:#16a34a}
    .s-card.red .s-num{color:#dc2626}
    .s-card.orange .s-num{color:#ea580c}
    .s-card.yellow .s-num{color:#ca8a04}
    .s-card.purple .s-num{color:#7c3aed}
    .s-lbl{font-size:10px;color:#8B8D9B;font-weight:500}
    .stage-block{margin-bottom:28px;break-inside:avoid}
    .footer{margin-top:40px;padding:16px 48px;border-top:1px solid #EDEDF0;font-size:10px;color:#A5A7B8;display:flex;justify-content:space-between}
    @media print{
      body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .cover{padding:32px 36px 28px}
      .body{padding:24px 36px}
      .footer{padding:12px 36px}
      table{page-break-inside:auto}
      tr{page-break-inside:avoid;break-inside:avoid}
      .status-row{page-break-inside:avoid;break-inside:avoid}
      .s-card{page-break-inside:avoid;break-inside:avoid}
      .stage-block{page-break-inside:avoid;break-inside:avoid}
    }
  
/* ── LIGHT THEME ────────────────────────────────── */
body.light{background:#EFEDE6;color:#1C1D28}
body.light .col{background:rgba(255,255,255,.85);border-color:rgba(0,0,0,.1)}
body.light .card{background:#fff;border-color:rgba(0,0,0,.1);color:#1C1D28}
body.light .card-name{color:#14151F}
body.light .card-code{color:#8B8D9B}
body.light .modal{background:#F5F3EE;border-color:rgba(0,0,0,.15)}
body.light .mhd{background:linear-gradient(90deg,#2A2117,#4A3B22)}
body.light .mbody{background:#F5F3EE}
body.light .tabs{background:#fff;border-color:rgba(0,0,0,.1)}
body.light .tab{color:#8B8D9B}
body.light .tab.active{color:#B5701F}
body.light .ea,.light .jira-inp,.light .link-inp,.light .add-task-inp{background:#fff;border-color:rgba(0,0,0,.2);color:#1C1D28}
body.light .nbox{background:#fff;border-color:rgba(0,0,0,.12);color:#2C2D3C}
body.light .blk-item{background:rgba(217,142,63,.08);color:#8A5A1E}
body.light .side-panel{background:#F5F3EE;border-color:rgba(0,0,0,.12)}
body.light .panel-hd{background:linear-gradient(90deg,#2A2117,#4A3B22)}
body.light .sys-item{background:#fff;border-color:rgba(0,0,0,.1)}
body.light .person-item{background:#fff;border-color:rgba(0,0,0,.08)}
body.light .rpt-tbl th{background:#EDEDF0;color:#55566A}
body.light .rpt-tbl td{color:#2C2D3C;border-color:rgba(0,0,0,.07)}
body.light .app-hd-inner{background:transparent}

/* ── MOBILE RESPONSIVE ──────────────────────────── */
@media(max-width:768px){
  .app{padding:12px 10px}
  .app-hd{flex-direction:column;align-items:flex-start;gap:10px}
  .hd-right{flex-wrap:wrap;gap:6px;width:100%}
  .hd-right .menu-btn,.hd-right .arch-badge,.hd-right .settings-btn{font-size:11px;padding:5px 9px}
  .sb-badge{font-size:10px;padding:4px 8px}
  .kb{gap:8px}
  .col{min-width:160px;flex:0 0 160px;padding:9px}
  .card{padding:8px 9px}
  .card-name{font-size:10px}
  .modal{max-height:98vh;border-radius:10px}
  .mhd{padding:12px 14px}
  .mname{font-family:'Space Grotesk',sans-serif;font-size:14px}
  .mbody{padding:12px 14px}
  .search-bar{width:140px}
  .search-bar:focus{width:200px}
  .side-panel{width:100%}
}

/* ── GLOBAL SEARCH ──────────────────────────────── */
</style></head><body>
  <div class="cover">
    <div class="cover-logo">⚡ Esteira Valemobi — RV</div>
    <div class="cover-subtitle">Sistema de Gestão de Demandas • Emitido por ${issuerName}${issuerRole?" — "+issuerRole:""}</div>
    <div class="cover-title">${titles[type]}</div>
    <div class="cover-meta">Gerado em ${now} • ${active.length} demandas ativas${activeFilter?` • Filtro: "${activeFilter}"`:""}</div>
  </div>
  <div class="body">${content}</div>
  <div class="footer"><span>Esteira Valemobi RV — Confidencial · Emitido por ${issuerName}</span><span>${now}</span></div>
  <script>window.onload=()=>{window.print();}<\/script>
  </body></html>`;

  const w=window.open("","_blank","width=900,height=700");
  if(w){w.document.write(html);w.document.close();}
  else showToast("Bloqueio de pop-up","Permita pop-ups neste site para exportar PDF.");
}

/* ── RICH TEXT HELPERS ──────────────────────────────── */
function richToolbar(tid){
  return `<div class="rt-toolbar">
    <button class="rt-btn" onclick="rtCmd('bold','${tid}')" title="Negrito"><b>B</b></button>
    <button class="rt-btn" onclick="rtCmd('italic','${tid}')" title="Itálico"><i>I</i></button>
    <div class="rt-sep"></div>
    <button class="rt-btn" onclick="rtIns('• ','${tid}')" title="Bullet">•</button>
    <button class="rt-btn" onclick="rtIns('🔴 ','${tid}')" title="Bloqueador">🔴</button>
    <button class="rt-btn" onclick="rtIns('✅ ','${tid}')" title="Feito">✅</button>
    <button class="rt-btn" onclick="rtIns('⚠️ ','${tid}')" title="Atenção">⚠️</button>
    <button class="rt-btn" onclick="rtIns('📌 ','${tid}')" title="Ponto">📌</button>
  </div>`;
}
function rtCmd(cmd,id){
  const el=document.getElementById(id);if(!el)return;el.focus();
  const s=el.selectionStart,e=el.selectionEnd,sel=el.value.substring(s,e);
  const wrap=cmd==="bold"?`**${sel}**`:`_${sel}_`;
  el.value=el.value.substring(0,s)+wrap+el.value.substring(e);
  el.selectionStart=s;el.selectionEnd=s+wrap.length;
}
function rtIns(txt,id){
  const el=document.getElementById(id);if(!el)return;
  const p=el.selectionStart;
  el.value=el.value.substring(0,p)+txt+el.value.substring(p);
  el.selectionStart=el.selectionEnd=p+txt.length;el.focus();
}

/* ── EDITABLE CARD NAME / CODE ──────────────────────── */
function startEditName(){
  const p=getP(selId);if(!p)return;
  const el=document.getElementById("mName");
  el.innerHTML=`<input id="nameInp" value="${p.name.replace(/"/g,'&quot;')}" style="background:rgba(20,21,31,.8);border:1px solid #D98E3F;color:#EDEDF0;padding:4px 8px;border-radius:5px;font-size:16px;font-weight:700;width:100%;outline:none"
    onkeydown="if(event.key==='Enter')saveName();if(event.key==='Escape')renderModal()"
    onblur="saveName()">`;
  document.getElementById("nameInp").focus();
}
function saveName(){
  const inp=document.getElementById("nameInp");
  const v=(inp?.value||"").trim();
  if(v&&v!==getP(selId)?.name){setP(selId,{name:v});renderBoard();renderStats();}
  renderModal();
}
function startEditCode(){
  const p=getP(selId);if(!p)return;
  const el=document.getElementById("mCode");
  el.innerHTML=`<input id="codeInp" value="${p.code}" style="background:rgba(20,21,31,.8);border:1px solid #D98E3F;color:#D98E3F;padding:2px 6px;border-radius:4px;font-size:10px;font-family:monospace;outline:none"
    onkeydown="if(event.key==='Enter')saveCode();if(event.key==='Escape')renderModal()"
    onblur="saveCode()">`;
  document.getElementById("codeInp").focus();
}
function saveCode(){
  const inp=document.getElementById("codeInp");
  const v=(inp?.value||"").trim();
  if(v)setP(selId,{code:v});
  renderModal();
}

/* ── JS SECTION FOR AI TAB ──────────────────────────── */
function buildCtx(p){
  const st=STAGES.find(s=>s.id===p.stage);
  const clS=clStage();
  const allTasks=(CL[clS]||[]).flatMap(s=>s.t);
  const enabled=allTasks.filter(t=>!(p.dis||{})[t.id]);
  const done=enabled.filter(t=>(p.checks||{})[t.id]).length;
  return `Você é o assistente interno de Bruno Granito, QA de Renda Variável na Valemobi.

DEMANDA ATUAL:
Nome: ${p.name}
Código: ${p.code}
Stage: ${st?.label||p.stage}
Prioridade: ${PRIO[p.priority]?.label||p.priority}
Owner: ${p.owner||"-"}${p.qa?"\nQA: "+p.qa:""}${p.rmdDate?"\nRDM: "+p.rmdDate:""}
Progresso geral: ${p.progress}%
Checklist (${st?.label}): ${done}/${enabled.length} tarefas concluídas

BLOQUEADORES ATIVOS:
${p.blockers?.length?p.blockers.map(b=>"• "+b).join("\n"):"Nenhum."}

CONTEXTO/NOTAS:
${p.notes||"Sem notas."}

Responda sempre em português brasileiro. Seja objetivo e prático. Ajude Bruno Granito a desbloquear e avançar a demanda.`;
}
function renderAI(){
  const p=getP(selId);if(!p)return;
  let h="";
  if(!apiKey){
    h+=`<div class="ai-nokey">⚠️ Assistente IA não configurado.<br>Clique em <strong>⚙ API Key</strong> no canto superior direito para configurar sua chave Anthropic.<br><button onclick="openSettings()">Configurar agora</button></div>`;
  }
  const QS=["Próximos passos urgentes?","Gere texto para task de RDM no Jira","E-mail de aviso build em TH","Resumo de status para o Gabriel","Como resolver o status atual pendente?"];
  h+=`<div class="ai-qs">${QS.map(q=>`<button class="ai-q" onclick="fillQ('${escOnclick(q)}')">  ${q}</button>`).join("")}</div>`;
  h+=`<div class="msgs" id="msgs">${aiMsgs.map(m=>`<div class="msg ${m.r==="u"?"me":"ai"}"><div class="msg-who">${m.r==="u"?"Você":"✦ Claude"}</div>${m.t}</div>`).join("")}</div>`;
  if(aiLoading)h+=`<div class="thinking"><div class="dot"></div><div class="dot"></div><div class="dot"></div><span style="font-size:11px;color:#55566A">Claude pensando…</span></div>`;
  h+=`<div class="ai-inp-row"><input class="ai-inp" id="aiInp" placeholder="Pergunte sobre esta demanda… (Enter para enviar)" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAI();}"><button class="send-btn" onclick="sendAI()" ${aiLoading||!apiKey?"disabled":""}>Enviar</button></div>`;
  document.getElementById("tIa").innerHTML=h;
  const m=document.getElementById("msgs");if(m)m.scrollTop=m.scrollHeight;
}
function fillQ(q){sw("ia");setTimeout(()=>{const i=document.getElementById("aiInp");if(i){i.value=q;i.focus();}},50);}
async function sendAI(){
  const inp=document.getElementById("aiInp");
  const q=(inp?.value||"").trim();
  if(!q||aiLoading)return;
  const p=getP(selId);
  aiMsgs.push({r:"u",t:q});
  if(inp)inp.value="";
  aiLoading=true;renderAI();
  const history=aiMsgs.map(m=>({role:m.r==="u"?"user":"assistant",content:m.t}));
  const ans=await callClaude(buildCtx(p),history);
  aiMsgs.push({r:"a",t:ans});
  aiLoading=false;renderAI();
}

/* ── INIT (chamado após login) ───────────────────────── */
async function initApp(){
  // ── 1. RENDERIZAR IMEDIATAMENTE com dados locais ─────────
  loadProjectsLocal();
  loadOrdersLocal();
  loadMenuData();
  projects=projects.map(p=>{
    if(p.archived)return p;
    try{const pct=autoProgress(p);return pct!==p.progress?{...p,progress:pct}:p;}catch(e){return p;}
  });
  renderBoard();
  renderStats();
  if(boardView==='table')setBoardView('table');
  updateTrashBadge();
  // Sincroniza a lixeira do Supabase em segundo plano (mesmo padrão dos outros dados)
  sbGet('trash').then(t=>{if(Array.isArray(t)){lsSet('trash',t);updateTrashBadge();}}).catch(()=>{});
  requestNotifPerm();
  checkReminders();
  setInterval(checkReminders,60000);

  // ── 2. SINCRONIZAR COM SUPABASE EM BACKGROUND (sem bloquear) ──
  setSbBadge('syncing','Sincronizando…');
  try{
    const timeout=new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),7000));
    const [sbProjects,sbOrders,sbJiraCfg]=await Promise.race([
      Promise.all([sbGet('projects'),sbGet('orders'),sbGet('jira_cfg')]),
      timeout.then(()=>{throw new Error('timeout');})
    ]);

    // Guarda a versão que acabamos de carregar — é a referência usada para
    // detectar se alguém alterou os dados antes do nosso próximo salvamento
    Promise.all([sbGetMeta('projects'),sbGetMeta('orders')]).then(([vp,vo])=>{
      noteRemoteVersion('projects',vp);
      noteRemoteVersion('orders',vo);
    }).catch(()=>{});

    let updated=false;
    if(sbProjects?.length){
      projects=sbProjects;lsSet('projects',projects);updated=true;
    } else if(projects.length){
      sbSet('projects',projects).catch(()=>{});
    }

    if(sbOrders&&Object.keys(sbOrders).length){
      stageOrders=sbOrders;lsSet('orders',stageOrders);
    } else if(Object.keys(stageOrders).length){
      sbSet('orders',stageOrders).catch(()=>{});
    }

    if(sbJiraCfg){
      const lj=lsGet('jira')||{};
      jiraConfig={email:lj.email||sbJiraCfg.email||'',token:lj.token||jiraConfig.token||'',
        domain:lj.domain||sbJiraCfg.domain||'valemobi.atlassian.net',
        useProxy:lj.useProxy!==undefined?lj.useProxy:sbJiraCfg.useProxy!==false};
      if(jiraConfig.email)lsSet('jira',jiraConfig);
    }

    if(updated){
      projects=projects.map(p=>{
        if(p.archived)return p;
        try{const pct=autoProgress(p);return pct!==p.progress?{...p,progress:pct}:p;}catch(e){return p;}
      });
      renderBoard();renderStats();
    }

    const now=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    setSbBadge('synced',`☁ Sincronizado às ${now}`);

  }catch(e){
    setSbBadge('offline','⚠ Offline — dados locais');
    console.warn('Supabase:',e.message);
  }

  // Resumo do que venceu enquanto o site estava fechado — só depois de
  // sincronizar, para não mostrar informação desatualizada
  try{setTimeout(showWelcomeDigest,700);}catch(e){vlWarn('resumo de boas-vindas',e);}
}



/* ── MIGRAÇÃO ÚNICA: corrige globalTaskOrder e globalTaskText pós-reestruturação CL ── */
(()=>{
  // Fix globalTaskOrder: renomeia "Preparação para RDM" → "Preparação para Homologação"
  const gto = lsGet('globalTaskOrder')||{};
  if(gto.homolog && gto.homolog['Preparação para RDM'] && !gto.homolog['Preparação para Homologação']){
    gto.homolog['Preparação para Homologação'] = gto.homolog['Preparação para RDM'].filter(id=>['ct_1786032963266','ct_1786032842477','ct_1785940783623','h1','h2'].includes(id));
    delete gto.homolog['Preparação para RDM'];
    lsSet('globalTaskOrder', gto);
  }
  // Fix globalTaskText: remove override de h2 (era tarefa antiga)
  const gtt = lsGet('globalTaskText')||{};
  if(gtt.h2 === 'Realizar testes preliminares em TH'){
    delete gtt.h2;
    lsSet('globalTaskText', gtt);
  }
})();

/* ── BOOTSTRAP — exige login real (Supabase Auth) ───────
   Antes havia um bypass aqui que logava todo mundo automaticamente
   como "Bruno Granito", ignorando a tela de login. Isso existia porque
   o login antigo estava quebrado (a consulta não trazia o campo da
   senha, então nenhuma senha funcionava). Aquele bug já foi corrigido
   e o login agora usa o Supabase Auth, então o bypass foi removido. */
(async()=>{
  const restored=await checkSession();
  if(!restored){
    const ls=document.getElementById('loginScreen');
    if(ls)ls.style.display='flex';
    showLogin();
  }
  // Renova o token periodicamente para a sessão não cair durante o uso
  setInterval(()=>{sbRefreshIfNeeded().catch(e=>vlWarn('refresh periódico',e));},10*60*1000);
})();
