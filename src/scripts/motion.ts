const preferenceKey = 'eduardo-portfolio-effects-paused';

export function initMotion() {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector<HTMLButtonElement>(
    '[data-motion-toggle]',
  );
  const hero = document.querySelector<HTMLElement>('.hero-art');
  const progress = document.querySelector<HTMLElement>(
    '[data-reading-progress]',
  );
  const progressFill = progress?.querySelector<HTMLElement>('span');
  const cards = [
    ...document.querySelectorAll<HTMLElement>(
      '.featured-project,.secondary-project',
    ),
  ];
  const animations = new Set<Animation>();
  let paused = false;
  let enabled = false;
  let heroVisible = false;
  try {
    paused = localStorage.getItem(preferenceKey) === 'true';
  } catch {
    /* Effects work without storage. */
  }

  const resetPointer = (element: HTMLElement) => {
    element.classList.remove('has-pointer');
    for (const name of [
      '--pointer-x',
      '--pointer-y',
      '--pointer-rx',
      '--pointer-ry',
    ])
      element.style.removeProperty(name);
  };
  const applyPreference = () => {
    enabled = !paused && !reduced.matches;
    root.classList.add('effects-ready');
    root.classList.toggle('motion-enabled', enabled);
    root.dataset.effects = reduced.matches ? 'reduced' : paused ? 'off' : 'on';
    root.dataset.pageVisible = String(!document.hidden);
    if (toggle) {
      toggle.hidden = false;
      toggle.disabled = reduced.matches;
      toggle.setAttribute('aria-pressed', String(enabled));
      toggle.setAttribute(
        'aria-label',
        reduced.matches
          ? 'Efeitos desativados pela preferência de movimento reduzido'
          : enabled
            ? 'Pausar efeitos visuais'
            : 'Ativar efeitos visuais',
      );
      const label = toggle.querySelector('[data-motion-label]');
      if (label)
        label.textContent = reduced.matches
          ? 'Movimento reduzido'
          : enabled
            ? 'Efeitos ligados'
            : 'Efeitos pausados';
    }
    if (!enabled) {
      animations.forEach((animation) => animation.finish());
      if (hero) resetPointer(hero);
      cards.forEach(resetPointer);
    }
  };
  toggle?.addEventListener('click', () => {
    if (reduced.matches) return;
    paused = !paused;
    try {
      localStorage.setItem(preferenceKey, String(paused));
    } catch {
      /* Optional preference persistence. */
    }
    applyPreference();
  });
  reduced.addEventListener('change', applyPreference);
  window.addEventListener('storage', (event) => {
    if (event.key === preferenceKey || event.key === null) {
      paused = event.key !== null && event.newValue === 'true';
      applyPreference();
    }
  });
  document.addEventListener('visibilitychange', () => {
    root.dataset.pageVisible = String(!document.hidden);
    if (document.hidden) {
      if (hero) resetPointer(hero);
      cards.forEach(resetPointer);
      animations.forEach((animation) => animation.pause());
    } else if (enabled) animations.forEach((animation) => animation.play());
  });
  applyPreference();

  const enter = (element: Element, delay = 0, distance = 12) => {
    if (!enabled || document.hidden || typeof element.animate !== 'function')
      return;
    const animation = element.animate(
      [
        { opacity: 0.35, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 560,
        delay,
        easing: 'cubic-bezier(.2,.7,.2,1)',
        fill: 'backwards',
      },
    );
    animations.add(animation);
    animation.onfinish = animation.oncancel = () =>
      animations.delete(animation);
  };
  const opening = document.querySelectorAll(
    '.hero-content>.eyebrow,.hero-content>h1,.hero-description,.hero-actions,.opportunity',
  );
  // Opening motion only when the top of the page is actually in view.
  if (window.scrollY < 100 && !location.hash) {
    opening.forEach((element, index) => enter(element, index * 75, 10));
    if (hero) enter(hero, 210, 8);
  }
  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        visible.forEach((entry, index) => {
          enter(entry.target, Math.min(index * 65, 195));
          reveals.unobserve(entry.target);
        });
      },
      { threshold: 0.06 },
    );
    document
      .querySelectorAll(
        '.section-heading,.featured-project,.secondary-project,.stack-group,.case-section,.case-headline,.case-cover',
      )
      .forEach((element) => reveals.observe(element));
    if (hero) {
      new IntersectionObserver(
        (entries) => {
          heroVisible = entries[0]?.isIntersecting ?? false;
          hero.dataset.ambient = String(heroVisible);
          if (!heroVisible) resetPointer(hero);
        },
        { threshold: 0.05 },
      ).observe(hero);
    }
  }
  if (hero) {
    const sizeTracks = () => {
      const outer = hero.querySelector<HTMLElement>('.orbit-one');
      const inner = hero.querySelector<HTMLElement>('.orbit-two');
      if (outer)
        hero.style.setProperty('--outer-orbit', `${outer.offsetWidth}px`);
      if (inner)
        hero.style.setProperty('--inner-orbit', `${inner.offsetWidth}px`);
    };
    sizeTracks();
    if ('ResizeObserver' in window)
      new ResizeObserver(sizeTracks).observe(hero);
  }

  // Only write transforms once per frame, and only while a fine pointer is present.
  const trackPointer = (element: HTMLElement, isHero = false) => {
    let frame = 0;
    let x = 0;
    let y = 0;
    element.addEventListener(
      'pointermove',
      (event) => {
        if (
          !enabled ||
          document.hidden ||
          !finePointer.matches ||
          event.pointerType === 'touch' ||
          (isHero && !heroVisible)
        )
          return;
        x = event.clientX;
        y = event.clientY;
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!enabled || document.hidden || !finePointer.matches) return;
          const rect = element.getBoundingClientRect();
          const nx = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
          const ny = Math.max(0, Math.min(1, (y - rect.top) / rect.height));
          element.style.setProperty(
            '--pointer-x',
            isHero ? `${(nx - 0.5) * 12}px` : `${nx * 100}%`,
          );
          element.style.setProperty(
            '--pointer-y',
            isHero ? `${(ny - 0.5) * 10}px` : `${ny * 100}%`,
          );
          element.style.setProperty(
            '--pointer-rx',
            `${(0.5 - ny) * (isHero ? 4 : 3)}deg`,
          );
          element.style.setProperty(
            '--pointer-ry',
            `${(nx - 0.5) * (isHero ? 4 : 3)}deg`,
          );
          element.classList.add('has-pointer');
        });
      },
      { passive: true },
    );
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      resetPointer(element);
    };
    element.addEventListener('pointerleave', reset, { passive: true });
    element.addEventListener('pointercancel', reset, { passive: true });
    finePointer.addEventListener('change', reset);
    window.addEventListener('blur', reset);
  };
  if (hero) trackPointer(hero, true);
  cards.forEach((card) => trackPointer(card));

  let readingFrame = 0;
  const updateProgress = () => {
    readingFrame = 0;
    const height = root.scrollHeight - window.innerHeight;
    const value =
      height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
    if (progressFill) progressFill.style.transform = `scaleX(${value})`;
  };
  const queueProgress = () => {
    if (!readingFrame) readingFrame = requestAnimationFrame(updateProgress);
  };
  if (progress) {
    progress.hidden = false;
    updateProgress();
  }
  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress, { passive: true });
  if ('ResizeObserver' in window)
    new ResizeObserver(queueProgress).observe(document.body);

  const viewer = document.querySelector<HTMLDialogElement>('#image-viewer');
  viewer?.addEventListener('toggle', () => {
    if (viewer.open)
      enter(viewer.querySelector('.viewer-image') ?? viewer, 0, 6);
  });
  const copy = document.querySelector<HTMLButtonElement>('[data-copy-email]');
  const status = document.querySelector('#copy-status');
  if (copy && status) {
    let clearFeedback: ReturnType<typeof setTimeout>;
    new MutationObserver(() => {
      const success = status.textContent === 'E-mail copiado!';
      copy.classList.toggle('copy-success', success);
      if (success && enabled) {
        const animation = copy.animate(
          [{ scale: 1 }, { scale: 1.1 }, { scale: 1 }],
          { duration: 250 },
        );
        animations.add(animation);
        animation.onfinish = animation.oncancel = () =>
          animations.delete(animation);
      }
      clearTimeout(clearFeedback);
      clearFeedback = setTimeout(
        () => copy.classList.remove('copy-success'),
        2200,
      );
    }).observe(status, { childList: true, characterData: true, subtree: true });
  }
}
