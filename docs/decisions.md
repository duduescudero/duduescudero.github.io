# Decisões do portfólio

- **Astro estático:** conteúdo em HTML, CSS e JavaScript pequeno para as interações. Sem banco, conta de visitante ou serviço que precise ficar acordado.
- **Identidade aprovada:** fundo escuro, roxo claro nos destaques e fundos roxos nas apresentações do Fluxo OS e OrbitaVerde. As capturas preservam o visual dos projetos originais.
- **Conteúdo centralizado:** `src/content/projects.ts` reúne os casos de estudo; `images.json` registra os tamanhos reais das imagens. A rota dinâmica gera as quatro páginas no build.
- **Informações pessoais limitadas ao que foi fornecido:** nome, curso, FIAP, busca por estágio, GitHub e e-mail. Não são publicados LinkedIn, endereço, semestre, prazo de formatura ou experiência profissional não confirmada. Currículo e foto podem ser acrescentados depois, quando fornecidos.
- **Evidências e limites:** screenshots reais e descrições baseadas nos repositórios. O apoio de IA é informado nas páginas dos projetos. Não há porcentagens de domínio de tecnologias, depoimentos inventados ou resultados fictícios apresentados como medição.
- **Galeria com melhoria progressiva:** links de imagem funcionam sem JavaScript; navegadores com dialog recebem ampliação, teclas direcionais, Esc e restauração do foco.
- **Movimento opcional:** órbitas lentas, painéis flutuantes, reflexo suave no título, entradas suaves e transições discretas entre páginas. Um pequeno controle no canto inferior direito pausa os efeitos e guarda a escolha localmente, preservando a navegação centralizada; `prefers-reduced-motion` prevalece e desativa os efeitos e a rolagem suave. Conteúdo e links funcionam sem JavaScript.
- **Interação limitada ao contexto:** brilho e inclinação atuam apenas com ponteiro preciso, sobre as imagens dos projetos; os textos ficam estáveis. IntersectionObserver pausa o movimento ambiente fora da tela e revela cada bloco uma vez. A aba em segundo plano também pausa animações. Não há ciclo JavaScript contínuo: ponteiro e barra de leitura atualizam no máximo uma vez por quadro quando recebem eventos.
- **Contato simples:** links `mailto`, GitHub e cópia com feedback. Sem formulário que simule envio e sem rastreamento.
- **GitHub Pages:** hospedagem pública estática e atualização por GitHub Actions, após checagem, build e testes de navegador. O domínio canônico é `https://duduescudero.github.io/`. O manifesto do Sites identifica uma cópia privada anterior; a atualização dos efeitos usa a publicação pública pelo GitHub Pages.
- **Fontes locais:** Manrope e Space Grotesk são distribuídas pelos pacotes Fontsource; não há chamadas ao Google Fonts durante a visita.

## Alterar conteúdo

Os textos da abertura e da seção pessoal ficam em `src/pages/index.astro`. Os projetos ficam em `src/content/projects.ts`. Adicionar um caso de estudo ao array gera sua rota e o inclui no sitemap; adicione também sua apresentação na página inicial.

As fontes PNG das capturas ficam em `public/images/`. Depois de adicionar uma imagem, execute `npm run assets:prepare`: o script gera WebP e atualiza as dimensões. A imagem de compartilhamento é gerada por `scripts/social-card.mjs`.

Para mudar o endereço público, atualize `site` em `astro.config.mjs`, `public/robots.txt`, a imagem de compartilhamento e a expectativa canônica dos testes.
