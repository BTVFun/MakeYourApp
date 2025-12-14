(() => {
  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function buildMorphArray(block) {
    const morphArray = [[], [], []];
    const sets = ['morph1', 'morph2', 'morph3'];

    sets.forEach((className, step) => {
      const paths = block.querySelectorAll(`path.${className}`);
      paths.forEach((path, index) => {
        const id = path.getAttribute('id');
        if (!id) return;
        morphArray[step][index] = {
          animation: step === 0 ? Snap.select(`#${id}`) : null,
          morphPoints: path.getAttribute('d'),
        };
      });
    });

    return morphArray;
  }

  function animationStep1(morphArray, iteration) {
    morphArray[0][iteration].animation.animate(
      { d: morphArray[0][iteration].morphPoints },
      800,
      mina.easeinout,
      () => setTimeout(() => animationStep2(morphArray, iteration), 1500),
    );
  }

  function animationStep2(morphArray, iteration) {
    morphArray[0][iteration].animation.animate(
      { d: morphArray[1][iteration].morphPoints },
      800,
      mina.easeinout,
      () => setTimeout(() => animationStep3(morphArray, iteration), 1500),
    );
  }

  function animationStep3(morphArray, iteration) {
    morphArray[0][iteration].animation.animate(
      { d: morphArray[2][iteration].morphPoints },
      800,
      mina.easeinout,
      () => setTimeout(() => animationStep1(morphArray, iteration), 1500),
    );
  }

  function startMorphing(block, morphArray) {
    const basePaths = block.querySelectorAll('path.morph1');
    basePaths.forEach((_, index) => {
      if (!morphArray[0][index]?.animation) return;
      animationStep1(morphArray, index);
    });
  }

  function initBlock(block) {
    const svg = block.querySelector('#bf-header-animated__svg');
    if (!svg) return;

    Snap(svg);
    const morphArray = buildMorphArray(block);

    const tl = gsap.timeline();
    const leftPanel = block.querySelector('.bf-header-animated__panel.left');
    const rightPanel = block.querySelector('.bf-header-animated__panel.right');

    if (leftPanel) {
      tl.from(leftPanel, { left: '-100px', opacity: 0, duration: 1 }, 0);
    }

    if (rightPanel) {
      tl.from(rightPanel, { right: '-100px', opacity: 0, duration: 1 }, '<0.2');
    }

    tl.from(
      svg,
      {
        rotation: 180,
        scale: 0.7,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        onComplete: () => startMorphing(block, morphArray),
      },
      '<0.3',
    );

    const animatedEls = block.querySelectorAll('.animation');
    animatedEls.forEach((el) => {
      tl.from(el, { opacity: 0, scale: 0.6, duration: 0.8, ease: 'back.out(1.8)' }, '<0.3');
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (prefersReducedMotion()) return;
    if (typeof Snap === 'undefined' || typeof gsap === 'undefined' || typeof mina === 'undefined') return;
    document.querySelectorAll('.bf-header-animated').forEach(initBlock);
  });
})();

