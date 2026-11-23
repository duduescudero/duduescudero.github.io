export interface Project {
  slug: string;
  name: string;
  category: string;
  kind: string;
  team?: string;
  headline: string;
  description: string;
  repository: string;
  demo?: string;
  demoNote?: string;
  demoLabel?: string;
  captureNote?: string;
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
    slug: 'meu-onze',
    name: 'Meu Onze',
    category: 'INTERFACE INTERATIVA & FUTEBOL',
    kind: 'Projeto pessoal',
    headline: 'Seu time. Suas escolhas. Um interesse pessoal em campo.',
    description:
      'Uma prancheta de futebol com jogadores da Série A, atletas personalizados e quatro minigames. React, TypeScript e SVG conectam criação, regras e compartilhamento.',
    repository: 'https://github.com/duduescudero/meu-onze',
    demo: 'https://duduescudero.github.io/meu-onze/',
    demoLabel: 'Entrar em campo',
    demoNote:
      'Aplicação funcional, sem cadastro. Escalações e partidas ficam no navegador; elencos comunitários com datas de atualização visíveis.',
    captureNote: 'CAPTURA REAL · ESCALAÇÃO DE EXEMPLO',
    stack: ['React', 'TypeScript', 'SVG', 'Zustand', 'IndexedDB'],
    hero: 'meu-onze-editor',
    heroAlt:
      'Prancheta do Meu Onze com uma escalação de exemplo e jogadores de clubes diferentes',
    summary:
      'O Meu Onze nasceu do meu interesse por futebol. O objetivo é oferecer uma ferramenta que alguém possa experimentar imediatamente: montar seu time, imaginar uma jogada ou disputar um desafio usando o mesmo catálogo.',
    problem:
      'Um campo interativo precisa funcionar com mouse, toque e teclado, preservar alterações e manter suas regras quando o usuário muda a formação ou retoma uma partida. O desafio vai além de colocar onze camisas na tela.',
    features: [
      {
        title: 'Uma prancheta de verdade',
        text: 'Formações, jogadores personalizados, banco, capitão, movimentações, passes e áreas. Há alternativas ao arrastar e histórico de alterações.',
      },
      {
        title: 'Quatro desafios',
        text: 'Onze às Cegas, Quem é o Jogador?, De Quem é Esse Elenco? e Onze com Regras, com retomada e placar pessoal.',
      },
      {
        title: 'Criar e compartilhar',
        text: 'PNG quadrado ou vertical, arquivos JSON validados e links que abrem cópias independentes das escalações.',
      },
      {
        title: 'Dados com procedência',
        text: '644 jogadores dos vinte clubes em um snapshot comunitário, com revisões, datas e atribuição por elenco.',
      },
    ],
    architecture: [
      {
        name: 'Interface',
        text: 'React e TypeScript, campo SVG e botões HTML acessíveis, com coordenadas proporcionais.',
      },
      {
        name: 'Regras',
        text: 'Funções testáveis para formações, candidatos, pontuação e verificação de solução do desafio.',
      },
      {
        name: 'Estado local',
        text: 'Zustand, histórico de alterações e biblioteca no IndexedDB. Partidas preservam seu snapshot de jogadores.',
      },
      {
        name: 'Publicação',
        text: 'Aplicação estática no GitHub Pages. O catálogo é preparado e validado fora do navegador.',
      },
    ],
    decisions: [
      {
        title: 'Experimentar antes de cadastrar',
        text: 'O produto não exige conta. A biblioteca pertence ao navegador e pode ser exportada, sem apresentar armazenamento local como nuvem.',
      },
      {
        title: 'O jogador dentro da escalação',
        text: 'Cada escalação conserva cópias dos atletas. Atualizar um elenco ou editar um personalizado não reescreve silenciosamente um time já salvo.',
      },
      {
        title: 'Regras que permitem terminar',
        text: 'O sorteio só considera clubes com candidatos compatíveis. O catálogo também passa por uma verificação de emparelhamento entre vagas e clubes para o desafio de onze clubes.',
      },
      {
        title: 'Uma fonte que pode ser atribuída',
        text: 'Elencos adaptados da Wikipédia sob CC BY-SA 4.0, separados do código MIT. Não se incorporam fotografias, escudos ou notas fictícias de habilidade.',
      },
    ],
    challenge:
      'Uma interação visual não pode depender apenas do arrastar. O projeto combina Pointer Events com seleção por clique e controles de posição pelo teclado. As mesmas coordenadas normalizadas alimentam o campo, as marcações e a imagem exportada.',
    learning:
      'Separar apresentação, regras e dados permite reaproveitar um catálogo em experiências diferentes. Também torna explícitas as diferenças entre uma escolha ainda editável, uma decisão travada e um resultado confirmado.',
    validation: [
      '20 testes de regras e formulário com Vitest e Testing Library.',
      'Oito jornadas Playwright, incluindo partidas completas nos quatro minigames.',
      'Compartilhamento entre contextos, PNG/JSON, persistência e marcações táticas exercitados.',
      'Larguras de 320, 390, 768 e 1440 pixels e verificações automatizadas com axe.',
      'Validação dos vinte clubes e publicação pelo GitHub Actions.',
    ],
    limits: [
      'Catálogo comunitário datado; não é uma lista oficial de inscritos ou atualização ao vivo.',
      'Salvamentos pertencem ao navegador. Não há conta, sincronização, ranking global ou multiplayer.',
      'As posições são gerais: goleiro, defensor, meio-campo e atacante.',
      'Sem avaliação automática da força de um time, apostas ou animação de jogadas em etapas.',
    ],
    images: [
      {
        file: 'meu-onze-editor',
        alt: 'Campo e catálogo do Meu Onze com onze jogadores de exemplo',
        caption: 'Editor completo com uma escalação criada para apresentação.',
      },
      {
        file: 'meu-onze-arena',
        alt: 'Os quatro minigames disponíveis na Arena do Meu Onze',
        caption: 'Quatro formas de jogar usando o catálogo de elencos datado.',
      },
    ],
    docs: 'https://github.com/duduescudero/meu-onze/blob/main/docs/architecture.md',
  },
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
    slug: 'alerta-enchente',
    name: 'AlertaEnchente',
    category: 'API, MACHINE LEARNING & MOBILE',
    kind: 'Projeto acadêmico · FIAP · Global Solution 2026',
    team: 'Desenvolvimento em equipe de cinco integrantes · apoio de IA',
    headline: 'Do sensor ao celular do morador. Avisos de enchente com antecedência.',
    description:
      'Um sistema de alerta de enchentes com APIs em FastAPI e .NET, previsão de chuva intensa com dados reais do INMET e um aplicativo mobile com farol de risco. Projeto em equipe da Global Solution da FIAP.',
    repository: 'https://github.com/duduescudero/alerta-enchente-api',
    captureNote: 'CAPTURA REAL · REGIÕES E LEITURAS SIMULADAS',
    stack: [
      'Python / FastAPI',
      'C# / .NET',
      'PostgreSQL',
      'scikit-learn',
      'React Native',
    ],
    hero: 'alerta-risco',
    heroAlt:
      'Tela de risco do aplicativo AlertaEnchente com o farol vermelho de perigo e a orientação ao morador',
    summary:
      'O AlertaEnchente foi a CitizenTech da nossa equipe na Global Solution 2026.2 da FIAP. Cada disciplina construiu uma parte do mesmo sistema: a API que guarda dados e regras, o modelo que estima chuva forte, o aplicativo do morador e o sensor do córrego.',
    problem:
      'Moradores de áreas alagáveis, como o Jardim Helena, na Zona Leste de São Paulo, costumam receber o aviso de enchente tarde demais para proteger pessoas e bens. O sistema transforma o nível do córrego e a previsão de chuva em um farol simples, verde, amarelo ou vermelho, acompanhado do que fazer.',
    features: [
      {
        title: 'Farol de risco por região',
        text: 'A API classifica cada leitura do sensor pelas cotas de alerta e emergência da região. O aplicativo mostra o farol e a orientação em linguagem simples.',
      },
      {
        title: 'Ocorrências do morador',
        text: 'Registro de problemas como rua alagada ou bueiro entupido, com ciclo aberta, em atendimento e resolvida, além de busca com filtros e paginação.',
      },
      {
        title: 'Previsão de chuva intensa',
        text: 'Um Random Forest treinado com dados horários reais do INMET, de 2022 a 2025, estima se as próximas 24 horas terão 20 mm de chuva ou mais.',
      },
      {
        title: 'Aplicativo acessível',
        text: 'Fonte grande, estado do farol também em texto, botões para ligar para Defesa Civil, Bombeiros e SAMU e funcionamento com dados de demonstração quando a API não responde.',
      },
    ],
    architecture: [
      {
        name: 'API Python',
        text: 'FastAPI em camadas (API, aplicação, domínio e infraestrutura), PostgreSQL, migrações Alembic e Swagger.',
      },
      {
        name: 'API .NET',
        text: 'Versão em C# com ASP.NET Core 8, Entity Framework Core com migrações e SQLite, LINQ e testes xUnit.',
      },
      {
        name: 'Machine Learning',
        text: 'Notebook com pandas e scikit-learn, divisão pela ordem do tempo, busca de hiperparâmetros e comparação com regras simples.',
      },
      {
        name: 'Mobile',
        text: 'Expo Router, TypeScript, SQLite local e consumo da API com retorno aos dados de demonstração.',
      },
    ],
    decisions: [
      {
        title: 'Regras no domínio, não na rota',
        text: 'O cálculo do farol, a validação das cotas e o ciclo da ocorrência ficam em classes de domínio testadas sem banco e sem HTTP.',
      },
      {
        title: 'Esquema criado pelas migrações',
        text: 'O banco é criado e evoluído pelo Alembic, com downgrade em todas as versões, em vez de o ORM criar tabelas ao iniciar a aplicação.',
      },
      {
        title: 'Treinar no passado, testar no futuro',
        text: 'O modelo usa uma divisão pela ordem do tempo, com 24 horas de folga entre treino e teste, para não vazar informação e superestimar o resultado.',
      },
      {
        title: 'O app nunca fica preso no carregamento',
        text: 'Tempo limite de 6 segundos, validação do formato da resposta e retorno aos dados locais, sempre informando de onde vieram os dados.',
      },
    ],
    challenge:
      'Chuva forte é rara: só cerca de 7% das horas do conjunto são positivas. Um modelo que sempre responde "não" acerta quase tudo e não ajuda ninguém. Por isso o modelo usa peso para a classe rara, é comparado com regras simples e tem seus alarmes falsos medidos e documentados.',
    learning:
      'Uma métrica boa no papel não garante utilidade para o cidadão. Traduzir o resultado em dias avisados e alarmes falsos por mês mostrou que o modelo funciona como uma camada de "prepare-se"; a ordem de sair de casa deve vir do sensor do córrego ou da Defesa Civil.',
    validation: [
      '38 testes pytest na API Python, cobrindo domínio, endpoints e migrações a partir de um banco vazio.',
      '68 testes xUnit na API .NET, incluindo regras de risco, serviços e CRUD de regiões.',
      'Modelo no período de teste: ROC-AUC 0,83, F1 0,24 e recall 0,55, acima das regras simples comparadas (F1 0,15 e 0,13).',
      'Nos 11 dias de chuva forte do teste, o farol vermelho avisou em todos, com cerca de 7 alarmes falsos por mês.',
      'Aplicativo verificado com TypeScript estrito, exportação web e a jornada completa executada.',
    ],
    limits: [
      'Regiões, cotas e leituras são simuladas para a demonstração; não há sensor instalado em um córrego real.',
      'O modelo gera alarmes falsos com frequência e não substitui os avisos oficiais da Defesa Civil.',
      'Os testes da API Python usam SQLite em memória; o teste de migração com PostgreSQL depende de um banco descartável.',
      'O aplicativo não foi publicado nas lojas e não envia notificações.',
    ],
    images: [
      {
        file: 'alerta-risco',
        alt: 'Tela de risco do AlertaEnchente com o farol vermelho de perigo',
        caption: 'Farol da região, orientação ao morador e troca de região.',
      },
      {
        file: 'alerta-detalhes',
        alt: 'Detalhes de uma região com as cotas e os botões de ligação para emergência',
        caption:
          'Cotas de atenção e perigo e ligação direta para Defesa Civil, Bombeiros e SAMU.',
      },
      {
        file: 'alerta-integracao',
        alt: 'Três telas do aplicativo mudando de atenção para perigo após uma leitura enviada à API',
        caption: 'Integração: uma leitura enviada à API muda o farol no aplicativo.',
      },
      {
        file: 'alerta-ml',
        alt: 'Gráfico de F1 no teste comparando o Random Forest com regras simples',
        caption: 'O modelo comparado com regras simples no período de teste.',
      },
      {
        file: 'alerta-swagger',
        alt: 'Documentação Swagger dos endpoints da API AlertaEnchente',
        caption: 'Contrato REST documentado automaticamente pelo FastAPI.',
      },
    ],
    docs: 'https://github.com/duduescudero/alerta-enchente-api#arquitetura',
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
