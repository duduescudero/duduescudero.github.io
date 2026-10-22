import { test, expect } from '@playwright/test';

test('efeitos podem ser pausados e a preferência acompanha as páginas', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'on');
  const nav = await page.locator('.desktop-nav').boundingBox();
  const width = page.viewportSize()!.width;
  expect(Math.abs(nav!.x + nav!.width / 2 - width / 2)).toBeLessThan(2);
  const control = await page.locator('[data-motion-toggle]').boundingBox();
  expect(control!.width).toBeLessThanOrEqual(44);
  expect(control!.x).toBeGreaterThan(width - 70);
  await expect(page.locator('.hero-art')).toHaveAttribute(
    'data-ambient',
    'true',
  );
  await expect
    .poll(() =>
      page
        .locator('.center-logo')
        .evaluate((el) => getComputedStyle(el).animationPlayState),
    )
    .toBe('running');
  await page
    .getByRole('button', { name: 'Pausar efeitos visuais', exact: true })
    .click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'off');
  await expect
    .poll(() =>
      page
        .locator('.center-logo')
        .evaluate((el) => getComputedStyle(el).animationPlayState),
    )
    .toBe('paused');
  await page.goto('/projetos/meu-onze/');
  await expect(
    page.getByRole('button', { name: 'Ativar efeitos visuais', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false');
  await page
    .getByRole('button', { name: 'Ativar efeitos visuais', exact: true })
    .click();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'on');
});

test('preferência do sistema vale no carregamento e quando muda durante a visita', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await expect(
    page.getByRole('button', {
      name: 'Efeitos desativados pela preferência de movimento reduzido',
    }),
  ).toBeDisabled();
  expect(
    await page
      .locator('.center-logo')
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  expect(
    await page.locator('.headline-glow').evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'on');
  await expect(
    page.getByRole('button', { name: 'Pausar efeitos visuais', exact: true }),
  ).toBeEnabled();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  expect(
    await page
      .locator('.center-logo')
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
});

test('órbitas param fora da tela e barra acompanha a leitura', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.hero-art')).toHaveAttribute(
    'data-ambient',
    'true',
  );
  await page
    .locator('#inicio')
    .getByRole('link', { name: 'Explorar projetos', exact: true })
    .click();
  await expect(page.locator('.hero-art')).toHaveAttribute(
    'data-ambient',
    'false',
  );
  await expect
    .poll(() =>
      page
        .locator('.track-one')
        .evaluate((el) => getComputedStyle(el).animationPlayState),
    )
    .toBe('paused');
  await expect
    .poll(() =>
      page
        .locator('[data-reading-progress]>span')
        .evaluate((el) => el.getAttribute('style')),
    )
    .not.toBe('transform: scaleX(0);');
});

test('profundidade e brilho respondem ao mouse e ficam neutros ao pausar', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'on');
  await page.locator('.hero-art').hover({ position: { x: 100, y: 160 } });
  await expect(page.locator('.hero-art')).toHaveClass(/has-pointer/);
  await page
    .getByRole('button', { name: 'Pausar efeitos visuais', exact: true })
    .click();
  await expect(page.locator('.hero-art')).not.toHaveClass(/has-pointer/);
  await page
    .getByRole('button', { name: 'Ativar efeitos visuais', exact: true })
    .click();
  await page.locator('#orbita').hover();
  await expect(page.locator('#orbita')).toHaveClass(/has-pointer/);
  await page.mouse.move(0, 0);
  await expect(page.locator('#orbita')).not.toHaveClass(/has-pointer/);
});

test('toque não ativa inclinação e o controle cabe na tela pequena', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 820 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto(test.info().project.use.baseURL as string);
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'on');
  await page.locator('.hero-art').tap();
  await expect(page.locator('.hero-art')).not.toHaveClass(/has-pointer/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole('button', { name: 'Pausar efeitos visuais', exact: true })
    .tap();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'off');
  await context.close();
});

test('conteúdo e navegação continuam disponíveis sem JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(test.info().project.use.baseURL as string);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Ideias ganham',
  );
  await expect(page.locator('[data-motion-toggle]')).toBeHidden();
  await expect(page.locator('[data-reading-progress]')).toBeHidden();
  await page.locator('a[href="/projetos/meu-onze/"]').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Meu Onze',
  );
  await context.close();
});
