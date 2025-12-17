function initHeroSlideshow() {
  const slideshow = document.querySelector('.hero-slideshow');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.hero-slideshow__slide'));
  if (slides.length === 0) return;

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parseCssUrl = (value) => {
    if (!value) return null;
    const match = value.match(/url\((['"]?)(.*?)\1\)/);
    return match && match[2] ? match[2] : null;
  };

  const getSlideUrl = (slide) => {
    const inlineUrl = parseCssUrl(slide.style.backgroundImage);
    if (inlineUrl) return inlineUrl;
    return slide.getAttribute('data-hero-image');
  };

  const ensureSlideImage = (index) => {
    const slide = slides[index];
    if (!slide) return;

    const alreadySet = parseCssUrl(slide.style.backgroundImage);
    if (alreadySet) return alreadySet;

    const url = getSlideUrl(slide);
    if (!url) return null;

    slide.style.backgroundImage = `url("${url}")`;

    const img = new Image();
    img.decoding = 'async';
    img.src = url;

    return url;
  };

  let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (activeIndex < 0) activeIndex = 0;

  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === activeIndex);
  });

  ensureSlideImage(activeIndex);

  if (prefersReducedMotion || slides.length < 2) return;

  const intervalMs = 7000;
  let timerId = null;

  const showNextSlide = () => {
    const nextIndex = (activeIndex + 1) % slides.length;

    ensureSlideImage(nextIndex);
    ensureSlideImage((nextIndex + 1) % slides.length);

    slides[activeIndex].classList.remove('is-active');
    slides[nextIndex].classList.add('is-active');
    activeIndex = nextIndex;
  };

  const start = () => {
    if (timerId) return;
    timerId = window.setInterval(showNextSlide, intervalMs);
  };

  const stop = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
}

function initHeroStepper() {
  const stepper = document.querySelector('.bf-hero-stepper');
  if (!stepper) return;

  const scroller = stepper.querySelector('.bf-hero-stepper__scroller');
  const highlight = stepper.querySelector('.bf-hero-stepper__highlight');
  const items = Array.from(stepper.querySelectorAll('.bf-hero-stepper__item'));

  if (!scroller || !highlight || items.length === 0) return;

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let activeIndex = items.findIndex((item) => item.classList.contains('is-active'));
  if (activeIndex < 0) activeIndex = 0;

  const setActiveIndex = (nextIndex, { scrollIntoView } = { scrollIntoView: true }) => {
    activeIndex = ((nextIndex % items.length) + items.length) % items.length;

    items.forEach((item, index) => {
      const isActive = index === activeIndex;
      item.classList.toggle('is-active', isActive);
      if (isActive) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });

    const activeItem = items[activeIndex];

    const pillPaddingRaw = window.getComputedStyle(highlight).getPropertyValue('--hero-stepper-pill-padding');
    const pillPadding = Number.parseFloat(pillPaddingRaw) || 2;

    const scrollerRect = scroller.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const x = Math.max(0, itemRect.left - scrollerRect.left + scroller.scrollLeft - pillPadding);
    const width = Math.max(0, itemRect.width + pillPadding * 2);

    highlight.style.setProperty('--hero-stepper-pill-x', `${x}px`);
    highlight.style.setProperty('--hero-stepper-pill-width', `${width}px`);

    if (scrollIntoView && typeof activeItem.scrollIntoView === 'function') {
      activeItem.scrollIntoView({ block: 'nearest', inline: 'center', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const scheduleUpdate = () => {
    window.requestAnimationFrame(() => setActiveIndex(activeIndex, { scrollIntoView: false }));
  };

  setActiveIndex(activeIndex, { scrollIntoView: false });

  window.addEventListener('resize', scheduleUpdate);

  if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
    document.fonts.ready.then(scheduleUpdate).catch(() => {});
  }

  if (prefersReducedMotion || items.length < 2) return;

  const intervalMs = 2500;
  let timerId = null;

  const start = () => {
    if (timerId) return;
    timerId = window.setInterval(() => setActiveIndex(activeIndex + 1), intervalMs);
  };

  const stop = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  };

  stepper.addEventListener('mouseenter', stop);
  stepper.addEventListener('mouseleave', start);
  stepper.addEventListener('focusin', stop);
  stepper.addEventListener('focusout', start);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
}

window.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
  initHeroStepper();
  console.log('Make Your App site ready');
});
