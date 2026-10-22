import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const cases = [
  { slug: 'fluxo-os', name: 'Fluxo OS' },
  { slug: 'orbita-verde', name: 'OrbitaVerde' },
  { slug: 'pokeidle-manager', name: 'PokeIdle Manager' },
];

test('projetos possuem páginas completas, imagens válidas e metadados próprios', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.locator('a[href="/projetos/fluxo-os/"]').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Fluxo OS',
  );
  for (const project of cases) {
    await page.goto(`/projetos/${project.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      project.name,
    );
    await expect(page.locator('#validacao')).toContainText(
      'Limites e evolução',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://duduescudero.github.io/projetos/${project.slug}/`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      new RegExp(project.name),
    );
    await expect(
      page.locator('meta[name="robots"][content*="noindex"]'),
    ).toHaveCount(0);
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(
        await image.evaluate((node: HTMLImageElement) => node.naturalWidth),
      ).toBeGreaterThan(0);
    }
  }
  expect(errors).toEqual([]);
});

test('galeria amplia, navega por teclado, fecha e restaura o foco', async ({
  page,
}) => {
  await page.goto('/projetos/fluxo-os/');
  const opener = page.locator('[data-gallery]').first();
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-counter]')).toHaveText('1 de 4');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-counter]')).toHaveText('2 de 4');
  await expect(dialog.locator('img')).toHaveAttribute('src', /fluxo-orders/);
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('[data-counter]')).toHaveText('1 de 4');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await dialog.getByRole('button', { name: 'Fechar galeria' }).click();
  await expect(opener).toBeFocused();
});

test('menu móvel e navegação funcionam sem transbordar', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      ...cases.map((item) => `/projetos/${item.slug}/`),
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.mobile-menu summary').click();
  await page.locator('.mobile-menu a[href="#projetos"]').click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open');
  await page.locator('.mobile-menu summary').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open');
});

test('contato copia o e-mail e mantém o endereço acessível se a cópia falhar', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Copiar endereço de e-mail' }).click();
  await expect(page.getByRole('status')).toHaveText('E-mail copiado!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'eduardoescudero911@gmail.com',
  );
  await page.reload();
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new Error('Denied')),
    }),
  );
  await page.getByRole('button', { name: 'Copiar endereço de e-mail' }).click();
  await expect(page.getByRole('status')).toContainText(
    'eduardoescudero911@gmail.com',
  );
  await expect(page.locator('.email-line a')).toHaveAttribute(
    'href',
    'mailto:eduardoescudero911@gmail.com',
  );
});

test('links internos, recursos de busca e página 404 estão conectados', async ({
  page,
  request,
}) => {
  for (const route of [
    '/',
    ...cases.map((item) => `/projetos/${item.slug}/`),
  ]) {
    await page.goto(route);
    const paths = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => [
        ...new Set(
          links.map(
            (link) => new URL((link as HTMLAnchorElement).href).pathname,
          ),
        ),
      ]);
    for (const path of paths)
      expect((await request.get(path)).ok(), path).toBe(true);
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter((link) => !document.querySelector(link.getAttribute('href')!))
          .map((link) => link.getAttribute('href')),
      );
    expect(broken).toEqual([]);
  }
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(
    'https://duduescudero.github.io/projetos/fluxo-os/',
  );
  expect((await request.get('/robots.txt')).ok()).toBe(true);
  expect((await request.get('/social-card.png')).ok()).toBe(true);
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Essa ideia',
  );
  await page
    .getByRole('link', { name: 'Explorar projetos', exact: true })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Ideias ganham',
  );
});

test('acessibilidade inicial, detalhes e galeria, incluindo movimento reduzido', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of [
    '/',
    ...cases.map((item) => `/projetos/${item.slug}/`),
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe('auto');
  }
  await page.locator('[data-gallery]').first().click();
  const openGallery = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(openGallery.violations.map((v) => v.id)).toEqual([]);
});
