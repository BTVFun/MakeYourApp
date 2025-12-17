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

window.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
  console.log('Make Your App site ready');
});
