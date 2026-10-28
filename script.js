const stories = {
  books: { label: '01 / BETWEEN PAGES', title: 'I love getting lost in a good book.', detail: 'Reading lets me slow down, explore other perspectives, and discover ideas beyond my everyday world.', symbol: '✦' },
  games: { label: '02 / PRESS START', title: 'Games keep my curiosity switched on.', detail: 'I enjoy playing games for the fun, the challenge, and the worlds waiting to be explored.', symbol: '✳' },
  music: { label: '03 / ON REPEAT', title: 'Music is part of my everyday rhythm.', detail: 'I love playing music. It gives me a creative space away from my screen and adds a little joy to the day.', symbol: '♫' }
};
const output = document.getElementById('reveal-output');
const reset = document.getElementById('reset-reveal');
const cards = [...document.querySelectorAll('[data-interest]')];
cards.forEach(card => card.addEventListener('click', () => {
  const story = stories[card.dataset.interest];
  cards.forEach(item => item.setAttribute('aria-pressed', String(item === card)));
  output.classList.remove('revealed');
  output.replaceChildren();
  const label = document.createElement('span'); label.className = 'reveal-kicker'; label.textContent = story.label;
  const heading = document.createElement('h3'); heading.textContent = story.title;
  const detail = document.createElement('p'); detail.textContent = story.detail;
  const symbol = document.createElement('span'); symbol.className = 'reveal-decoration'; symbol.setAttribute('aria-hidden', 'true'); symbol.textContent = story.symbol;
  output.append(label, heading, detail, symbol);
  requestAnimationFrame(() => output.classList.add('revealed'));
  reset.hidden = false;
}));
reset.addEventListener('click', () => {
  cards.forEach(card => card.setAttribute('aria-pressed', 'false'));
  output.classList.remove('revealed');
  output.innerHTML = '<span class="reveal-kicker">A SMALL WINDOW INTO MY WORLD</span><p>Which side of Simon will you discover first?</p><span class="reveal-decoration" aria-hidden="true">✳</span>';
  reset.hidden = true;
});
document.getElementById('year').textContent = new Date().getFullYear();

// Progressive enhancement: content is never hidden without an active observer.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealTargets = document.querySelectorAll('.section-heading, .two-col > *, .skill-card, .project-feature, .secondary-project, .next-project, .beyond-lead, .reveal-zone, .contact-content > *');
  revealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    if (element.classList.contains('skill-card')) element.style.setProperty('--delay', `${(index % 3) * 90}ms`);
  });
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
  revealTargets.forEach(element => observer.observe(element));
  const showAll = () => {
    revealTargets.forEach(element => element.classList.add('is-visible'));
    observer.disconnect();
  };
  reducedMotion.addEventListener?.('change', event => { if (event.matches) showAll(); });
  window.addEventListener('pagehide', showAll, { once: true });
}
