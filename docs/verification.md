# Verificação

## Comandos

```sh
npm ci
npm run check
npm run build
npx playwright install chromium
npm test
```

O Playwright inicia a prévia quando necessário. Em um computador com Chrome instalado, `PW_CHANNEL=chrome` permite usar esse canal; sem a variável, o navegador é Chromium. `PORTFOLIO_URL` permite executar as verificações contra uma publicação existente, sem iniciar servidor local.

## O que é exercitado

1. Navegação da página inicial aos projetos, conteúdo, metadados e carregamento de imagens visíveis.
2. Galeria ampliada, setas do teclado, fechamento por Esc ou botão e retorno do foco.
3. Telas de 320, 390, 768 e 1440 pixels, com verificação de transbordamento; abertura e fechamento do menu móvel.
4. Cópia do e-mail, feedback e alternativa quando a API de clipboard recusa a operação.
5. Links internos, âncoras, sitemap, robots, imagem social e recuperação da página 404.
6. Checagens automatizadas de acessibilidade WCAG A/AA com axe nas páginas e na galeria; respeito a movimento reduzido.
7. Pausa dos efeitos, persistência entre páginas e mudança da preferência de movimento do sistema durante a visita.
8. Pausa das órbitas fora da tela, progresso de leitura, resposta ao mouse, ausência de inclinação no toque e navegação sem JavaScript.

Os testes navegam apenas no portfólio. Não alteram os outros projetos e não exercitam integrações de jogos ou dados reais.

## Limites

Axe e testes automatizados não certificam conformidade completa de acessibilidade. A inspeção visual complementa os testes em desktop e celular. Links externos podem mudar depois da entrega; suas funcionalidades são responsabilidade das aplicações de destino. O tempo de abertura da demonstração do Fluxo OS depende da hospedagem dela.

Medições de desempenho, quando registradas, são resultados de uma execução e podem variar conforme dispositivo, rede e navegador.

## Versão anterior aos efeitos · 22/10/2026

- Astro: 0 erros, 0 avisos; build estático concluído.
- Playwright: 6 testes passaram, incluindo navegação, galeria, contato e acessibilidade automática.
- Responsividade exercitada em 320, 390, 768 e 1440 pixels.
- Lighthouse 13.5.0, prévia local, perfil móvel padrão: desempenho 100, acessibilidade 100, boas práticas 100 e SEO 100; LCP de 1,5 s e CLS de 0,003.

Os números do Lighthouse descrevem uma execução local e não garantem as mesmas notas em toda rede ou dispositivo. Os relatórios completos estão em `.local/`, fora do repositório; o GitHub Actions repete as verificações funcionais antes de publicar.

## Efeitos visuais · 22/10/2026

- Astro: 0 erros, 0 avisos; build estático concluído.
- Os 12 cenários Playwright passaram: seis verificações existentes e seis para movimento, preferências e melhoria progressiva.
- Revisão visual em desktop e celular; controle de efeitos permanece acessível na tela pequena.
- Lighthouse 13.5.0, prévia local, perfil móvel padrão: desempenho 99, acessibilidade 100, boas práticas 100 e SEO 100; LCP de 1,9 s e CLS de 0,005.

As animações não adicionam bibliotecas ou serviços externos. As notas são de uma execução local, sujeitas às mesmas variações descritas acima.
