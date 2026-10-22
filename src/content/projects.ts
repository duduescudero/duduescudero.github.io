export interface Project {
  slug: string;
  name: string;
  category: string;
  kind: string;
  headline: string;
  description: string;
  repository: string;
  demo?: string;
  stack: string[];
  hero: string;
  heroAlt: string;
  summary: string;
  problem: string;
  features: { title: string; text: string }[];
  architecture: { name: string; text: string }[];
  decisions: { title: string; text: string }[];
  challenge: string;
  learning: string;
  validation: string[];
  limits: string[];
  images: { file: string; alt: string; caption: string }[];
  docs: string;
}

export const projects: Project[] = [
  {
    slug: 'fluxo-os',
    name: 'Fluxo OS',
    category: 'APLICAÇÃO WEB COMPLETA',
    kind: 'Projeto pessoal',
    headline: 'Do primeiro atendimento à entrega. Cada etapa sob controle.',
    description:
      'Uma aplicação de gestão de ordens de serviço com React, C# e PostgreSQL. Orçamentos versionados, permissões e histórico conectam o atendimento do início ao fim.',
    repository: 'https://github.com/duduescudero/fluxo-os',
    demo: 'https://fluxo-os.onrender.com/',
    stack: ['React', 'TypeScript', 'C# / .NET', 'PostgreSQL', 'Docker'],
    hero: 'fluxo-dashboard',
    heroAlt: 'Dashboard do Fluxo OS com indicadores e atendimentos fictícios',
    summary:
      'O Fluxo OS foi construído para estudar o ciclo completo de uma aplicação: modelar as regras, desenvolver a API e a interface, persistir os dados, testar os caminhos e publicar uma demonstração acessível pelo navegador.',
    problem:
      'Um equipamento chega à assistência, passa por diagnóstico, recebe um orçamento e precisa ser acompanhado até a entrega. Sem um registro conectado, decisões e prazos ficam espalhados. O projeto reúne esse caminho em uma ordem de serviço, com etapas explícitas e um histórico que acompanha as mudanças.',
    features: [
      {
        title: 'Atendimento conectado',
        text: 'Clientes, equipamentos e ordens se relacionam em um fluxo que começa no recebimento e termina na entrega ou no cancelamento.',
      },
      {
        title: 'Orçamentos com memória',
        text: 'Revisões preservam as decisões anteriores. O início do reparo depende da aprovação válida do orçamento atual.',
      },
      {
        title: 'Permissões por recurso',
        text: 'Administradores acompanham a operação. Técnicos acessam os atendimentos atribuídos a eles e os recursos relacionados.',
      },
      {
        title: 'Histórico e concorrência',
        text: 'Mudanças e eventos são gravados juntos. Edições conflitantes retornam uma mensagem de atualização, evitando sobrescrita silenciosa.',
      },
    ],
    architecture: [
      {
        name: 'Interface',
        text: 'React e TypeScript; consultas com TanStack Query, formulários e rotas da aplicação.',
      },
      {
        name: 'API & aplicação',
        text: 'ASP.NET Core, Identity, autorização, contratos e casos de uso.',
      },
      {
        name: 'Domínio',
        text: 'Transições de atendimento, orçamento, valores e eventos de negócio.',
      },
      {
        name: 'Persistência',
        text: 'Entity Framework Core e PostgreSQL, com migrações e controle de concorrência.',
      },
    ],
    decisions: [
      {
        title: 'Um monólito modular',
        text: 'Quatro projetos .NET separam responsabilidades sem adicionar a operação de vários serviços. O escopo cabe em uma aplicação e um banco.',
      },
      {
        title: 'Mesma origem, sessão protegida',
        text: 'O build React é servido pela API. A autenticação usa cookie HttpOnly e proteção CSRF, sem guardar tokens em localStorage.',
      },
      {
        title: 'PostgreSQL também nos testes',
        text: 'Os testes de integração usam Testcontainers para exercitar o mesmo provedor de banco adotado pela aplicação, incluindo relacionamentos e concorrência.',
      },
      {
        title: 'Demonstração com limites claros',
        text: 'O acesso público usa dados fictícios e bloqueia alterações no servidor. A execução local permite percorrer o fluxo editável completo.',
      },
    ],
    challenge:
      'Um dos pontos de atenção foi persistir novos eventos em agregados já rastreados pelo Entity Framework. Os identificadores são gerados na aplicação; o mapeamento ValueGeneratedNever deixa explícito que os novos filhos precisam ser inseridos. Testes de integração verificam esse comportamento e a persistência do histórico.',
    learning:
      'A interface pode sugerir uma ação, mas é o domínio e o servidor que precisam garantir sua validade. O projeto conecta essa ideia a estados, permissões, transações e testes de ponta a ponta.',
    validation: [
      'Testes de domínio para transições, orçamento e valores.',
      'Integração com PostgreSQL real para persistência, autenticação, CSRF, escopo de acesso e concorrência.',
      'Testes de componentes e jornadas Playwright pela interface.',
      'Build Docker e verificações de backend, frontend e navegador no GitHub Actions.',
    ],
    limits: [
      'Uma assistência por instalação; o projeto não é um SaaS multiempresa.',
      'Sem pagamentos, emissão fiscal, estoque ou portal do cliente.',
      'A demonstração pública é somente leitura. No plano gratuito, a primeira abertura após inatividade pode demorar.',
      'Os testes documentam caminhos exercitados e não equivalem a uma auditoria independente.',
    ],
    images: [
      {
        file: 'fluxo-dashboard',
        alt: 'Indicadores e atendimentos recentes no dashboard do Fluxo OS',
        caption: 'Visão geral da assistência, com dados fictícios.',
      },
      {
        file: 'fluxo-orders',
        alt: 'Tabela de ordens de serviço do Fluxo OS',
        caption: 'Consulta e acompanhamento das ordens.',
      },
      {
        file: 'fluxo-detail',
        alt: 'Detalhe de uma ordem, com orçamento e histórico',
        caption: 'Contexto do atendimento, decisões e linha do tempo.',
      },
      {
        file: 'fluxo-mobile',
        alt: 'Dashboard do Fluxo OS em uma tela de celular',
        caption: 'A mesma aplicação adaptada para uma tela menor.',
      },
    ],
    docs: 'https://github.com/duduescudero/fluxo-os/blob/main/docs/architecture.md',
  },
  {
    slug: 'orbita-verde',
    name: 'OrbitaVerde',
    category: 'MOBILE, APIs & VISÃO COMPUTACIONAL',
    kind: 'Projeto acadêmico · FIAP',
    headline: 'Um problema ambiental. Diferentes caminhos para explorá-lo.',
    description:
      'Um protótipo acadêmico com aplicativo mobile, backends Java e C# e um detector visual em Python. Quatro módulos independentes, organizados em um único repositório.',
    repository: 'https://github.com/duduescudero/orbita-verde',
    stack: ['React Native', 'TypeScript', 'Java', 'C#', 'Python / OpenCV'],
    hero: 'orbita-mobile',
    heroAlt:
      'Aplicativo OrbitaVerde com alertas ambientais locais de demonstração',
    summary:
      'Desenvolvido no contexto acadêmico da FIAP, o OrbitaVerde usa alertas ambientais para explorar interfaces mobile, contratos de API, persistência e processamento de vídeo. Os módulos têm documentação e execução próprias.',
    problem:
      'Um alerta ambiental precisa de contexto: onde aconteceu, qual sua gravidade e como acompanhar a resolução. Esse cenário serve de ponto de partida para estudar o problema por diferentes tecnologias e formas de apresentação.',
    features: [
      {
        title: 'Aplicativo mobile',
        text: 'Cadastro e acompanhamento de alertas, filtros, resolução, localização e temas, usando dados locais com AsyncStorage.',
      },
      {
        title: 'Backend Java',
        text: 'APIs REST e SOAP, persistência com JPA, validação e relatórios por polimorfismo.',
      },
      {
        title: 'Backend C#',
        text: 'Modelagem de satélites, sensores, regiões e alertas, com regras de domínio e painel de indicadores.',
      },
      {
        title: 'Detecção visual',
        text: 'Processamento de vídeo com máscaras de cor e movimento para identificar candidatos a fogo e fumaça.',
      },
    ],
    architecture: [
      {
        name: 'Mobile',
        text: 'React Native, Expo Router e AsyncStorage; demonstração com dados locais.',
      },
      { name: 'Java', text: 'Spring Boot, JPA e H2; interfaces REST e SOAP.' },
      {
        name: 'C#',
        text: 'ASP.NET Core, Entity Framework e SQLite; contrato e modelo próprios.',
      },
      {
        name: 'Python',
        text: 'OpenCV e NumPy; vídeo, cor, morfologia e movimento.',
      },
    ],
    decisions: [
      {
        title: 'Módulos independentes, contexto comum',
        text: 'O repositório reúne os quatro módulos sem sugerir uma integração que ainda não existe. Cada parte mantém seus requisitos e comandos.',
      },
      {
        title: 'Dois backends para explorar escolhas',
        text: 'Java e C# têm contratos, persistências e modelos distintos. A organização preserva essas diferenças e permite estudar cada implementação.',
      },
      {
        title: 'Um detector interpretável',
        text: 'HSV, operações morfológicas e subtração de fundo deixam os parâmetros visíveis. O detector não depende de treinamento de um modelo de machine learning.',
      },
      {
        title: 'Demonstração fiel ao estágio do projeto',
        text: 'O aplicativo é apresentado com dados locais e o detector com o vídeo incluído. Integração entre módulos e dados de satélite permanecem como evolução.',
      },
    ],
    challenge:
      'O desafio de apresentação foi dar unidade a tecnologias diferentes sem esconder suas fronteiras. A documentação descreve o domínio comum e, ao mesmo tempo, deixa explícito o que cada módulo realmente executa e quais integrações ainda não foram implementadas.',
    learning:
      'Resolver o mesmo domínio por tecnologias diferentes ajuda a comparar contratos, persistência e responsabilidades. Também exige comunicar com precisão a diferença entre protótipo, demonstração e sistema integrado.',
    validation: [
      'Teste e empacotamento do módulo Java; consultas REST e SOAP documentadas.',
      'Build C# e exercício dos endpoints de painel e resolução de alerta.',
      'Checagem TypeScript, exportação web e abertura da demonstração mobile no navegador.',
      'Processamento do vídeo incluído pelo detector Python e verificações de cada módulo no GitHub Actions.',
    ],
    limits: [
      'Os quatro módulos ainda não formam um sistema integrado.',
      'O aplicativo usa dados locais; não consome as APIs Java ou C#.',
      'O detector depende da cena e não foi validado para uso operacional.',
      'A pontuação confidence é uma heurística; não é uma probabilidade calibrada.',
      'A verificação web do aplicativo não substitui testes em dispositivos Android e iOS.',
    ],
    images: [
      {
        file: 'orbita-mobile',
        alt: 'Dashboard do aplicativo OrbitaVerde com alertas fictícios',
        caption:
          'Aplicativo executado no navegador com os dados locais de demonstração.',
      },
      {
        file: 'orbita-vision',
        alt: 'Frame do vídeo processado pelo detector de fogo e fumaça',
        caption: 'Saída real do algoritmo no vídeo incluído no projeto.',
      },
    ],
    docs: 'https://github.com/duduescudero/orbita-verde/blob/main/docs/architecture/README.md',
  },
  {
    slug: 'pokeidle-manager',
    name: 'PokeIdle Manager',
    category: 'DESKTOP & SISTEMAS ORIENTADOS A EVENTOS',
    kind: 'Projeto pessoal',
    headline: 'Um hobby que virou um desafio de engenharia.',
    description:
      'Um gerenciador desktop que reúne sessões, eventos e métricas. Node.js e C# trabalham juntos para lidar com reconexão, estado parcial e operações que precisam de confirmação.',
    repository: 'https://github.com/duduescudero/pokeidle-manager',
    stack: [
      'Node.js',
      'JavaScript',
      'C# / Windows Forms',
      'WebSocket',
      'PowerShell',
    ],
    hero: 'pokeidle-desktop',
    heroAlt: 'Painel desktop do PokeIdle Manager com contas fictícias',
    summary:
      'O projeto nasceu de um interesse pessoal em jogos e evoluiu para um estudo de aplicações orientadas a eventos. A apresentação pública inclui uma demonstração separada das contas reais, com dados fictícios e operações conectadas bloqueadas.',
    problem:
      'Acompanhar várias contas exige lidar com mensagens incrementais, conexões interrompidas e operações cujo resultado pode demorar a chegar. Mostrar números é apenas uma parte: o estado precisa continuar confiável antes de autorizar uma nova ação.',
    features: [
      {
        title: 'Sessões independentes',
        text: 'Acompanhamento de até quatro sessões, com visão geral e detalhes por conta.',
      },
      {
        title: 'Eventos e reconexão',
        text: 'WebSocket, estado completo e incremental, heartbeat e reconexão com espera progressiva.',
      },
      {
        title: 'Confirmação de operações',
        text: 'Compras, vendas e mudanças de rota mantêm estados pendentes até a confirmação. Resultados incertos exigem revisão.',
      },
      {
        title: 'Demonstração isolada',
        text: 'Um caminho público local apresenta as telas e métricas fictícias sem carregar credenciais ou executar a integração com o jogo.',
      },
    ],
    architecture: [
      {
        name: 'Comunicação',
        text: 'Cliente Node.js e WebSocket; sessões e reconexão.',
      },
      {
        name: 'Estado & operações',
        text: 'Eventos, métricas, decisões e confirmação das ações.',
      },
      {
        name: 'API local',
        text: 'Loopback, chave por execução e validação da origem.',
      },
      {
        name: 'Desktop',
        text: 'C# e Windows Forms; telas de contas, suprimentos, Depot e hunts.',
      },
    ],
    decisions: [
      {
        title: 'Uma tentativa não confirma um resultado',
        text: 'Operações ficam pendentes até a confirmação. Se uma reconexão deixa o resultado incerto, o sistema bloqueia a repetição automática e pede revisão.',
      },
      {
        title: 'Dados antigos não autorizam ações',
        text: 'A conexão e a atualidade do estado são verificadas antes de agir. Trocas de rota aguardam a liberação do combate e têm prazo de confirmação.',
      },
      {
        title: 'Credenciais permanecem locais',
        text: 'O modo conectado usa Windows DPAPI para proteger as sessões. Esses arquivos não fazem parte da apresentação pública ou do repositório.',
      },
      {
        title: 'Um caminho próprio para demonstração',
        text: 'O servidor de demonstração não importa o cliente conectado nem o cofre de sessões. As restrições também são aplicadas no backend.',
      },
    ],
    challenge:
      'A principal questão de engenharia é preservar a diferença entre estado confirmado e estado incerto. Uma mensagem enviada pode não ter chegado; uma operação pode ter ocorrido antes da queda da conexão. Tratar esses casos explicitamente orienta os bloqueios, os testes e a interface.',
    learning:
      'Sistemas orientados a eventos exigem pensar além do caminho de sucesso. Reconexão, tempo limite e confirmação fazem parte do comportamento principal, assim como a comunicação clara dessas condições na interface.',
    validation: [
      'Testes Node.js com sockets simulados, reconexão, deltas, estado antigo e operações incertas.',
      'Testes HTTP da demonstração e dos bloqueios de operações conectadas.',
      'Testes de interface Windows com fixtures, sem iniciar o cliente real.',
      'GitHub Actions em Linux e Windows; um teste de catálogo externo é opcional e pode aparecer como ignorado.',
    ],
    limits: [
      'A demonstração usa dados fictícios e não executa a integração com o jogo.',
      'Métricas ilustrativas não representam resultados medidos no jogo.',
      'Catálogos externos opcionais não são distribuídos no repositório.',
      'Os testes simulados não comprovam compatibilidade atual com o servidor real.',
    ],
    images: [
      {
        file: 'pokeidle-desktop',
        alt: 'Contas e métricas fictícias na interface desktop do PokeIdle Manager',
        caption:
          'Visão geral da interface Windows Forms em modo de demonstração.',
      },
      {
        file: 'pokeidle-details',
        alt: 'Detalhes de uma conta fictícia no PokeIdle Manager',
        caption: 'Informações por conta, apresentadas com fixtures.',
      },
      {
        file: 'pokeidle-depot',
        alt: 'Tela de Depot da demonstração do PokeIdle Manager',
        caption:
          'Organização da interface; operações reais ficam bloqueadas na demonstração.',
      },
    ],
    docs: 'https://github.com/duduescudero/pokeidle-manager/blob/main/docs/arquitetura.md',
  },
];
