(() => {
  const MORPH_DURATION_MS = 800;
  const HOLD_DURATION_MS = 1500;

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function computeUnionBBox(pathStrings) {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    let found = false;

    pathStrings.forEach((pathString) => {
      if (!pathString) return;
      try {
        const bbox = Snap.path.getBBox(pathString);
        if (!bbox) return;
        found = true;
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x2);
        maxY = Math.max(maxY, bbox.y2);
      } catch {
        return;
      }
    });

    if (!found) return null;

    const width = maxX - minX;
    const height = maxY - minY;
    return {
      x: minX,
      y: minY,
      x2: maxX,
      y2: maxY,
      width,
      height,
      cx: minX + width / 2,
      cy: minY + height / 2,
    };
  }

  function scaleStepPathsToMatch(stepPaths, targetPaths, options = {}) {
    const indices =
      options.indices ??
      Array.from({ length: Math.max(stepPaths.length, targetPaths.length) }, (_, index) => index).filter(
        (index) => Boolean(stepPaths[index]?.morphPoints) && Boolean(targetPaths[index]?.morphPoints),
      );
    const targetBBox = computeUnionBBox(indices.map((i) => targetPaths[i]?.morphPoints ?? null));
    const sourceBBox = computeUnionBBox(indices.map((i) => stepPaths[i]?.morphPoints ?? null));
    if (!targetBBox || !sourceBBox) return;
    if (!Number.isFinite(targetBBox.width) || !Number.isFinite(sourceBBox.width) || sourceBBox.width <= 0) return;
    if (!Number.isFinite(targetBBox.height) || !Number.isFinite(sourceBBox.height) || sourceBBox.height <= 0) return;

    const scale = targetBBox.width / sourceBBox.width;
    if (!Number.isFinite(scale) || scale <= 0) return;

    const matrix = new Snap.Matrix();
    matrix.translate(-sourceBBox.cx, -sourceBBox.cy);
    matrix.scale(scale, scale);
    matrix.translate(targetBBox.cx, targetBBox.cy);

    indices.forEach((index) => {
      const entry = stepPaths[index];
      if (!entry?.morphPoints) return;
      try {
        entry.morphPoints = Snap.path.map(entry.morphPoints, matrix);
      } catch {
        return;
      }
    });
  }

  function buildMorphArray(block) {
    const morphArray = [[], [], []];
    const sets = ['morph1', 'morph2', 'morph3'];

    sets.forEach((className, step) => {
      const paths = block.querySelectorAll(`path.${className}`);
      paths.forEach((path, index) => {
        const id = path.getAttribute('id');
        if (!id) return;
        const visibleStep =
          step === 0 && path.dataset.visibleStep ? Number.parseInt(path.dataset.visibleStep, 10) : null;
        morphArray[step][index] = {
          animation: step === 0 ? Snap.select(`#${id}`) : null,
          morphPoints: path.getAttribute('d'),
          visibleStep: Number.isFinite(visibleStep) ? visibleStep : null,
        };
      });
    });

    return morphArray;
  }

  function applyConditionalVisibility(morphArray, stepIndex) {
    const visibleStep = stepIndex + 1;
    morphArray[0].forEach((entry) => {
      if (!entry?.animation || !entry.visibleStep) return;
      entry.animation.attr({ opacity: entry.visibleStep === visibleStep ? 1 : 0 });
    });
  }

  function getMorphPoints(morphArray, stepIndex, iteration) {
    return (
      morphArray[stepIndex]?.[iteration]?.morphPoints ??
      morphArray[0]?.[iteration]?.morphPoints ??
      null
    );
  }

  function animationStep1(morphArray, iteration) {
    applyConditionalVisibility(morphArray, 0);
    const morphPoints = getMorphPoints(morphArray, 0, iteration);
    if (!morphArray[0][iteration]?.animation || !morphPoints) return;
    morphArray[0][iteration].animation.animate(
      { d: morphPoints },
      MORPH_DURATION_MS,
      mina.easeinout,
      () => setTimeout(() => animationStep2(morphArray, iteration), HOLD_DURATION_MS),
    );
  }

  function animationStep2(morphArray, iteration) {
    applyConditionalVisibility(morphArray, 1);
    const morphPoints = getMorphPoints(morphArray, 1, iteration);
    if (!morphArray[0][iteration]?.animation || !morphPoints) return;
    morphArray[0][iteration].animation.animate(
      { d: morphPoints },
      MORPH_DURATION_MS,
      mina.easeinout,
      () => setTimeout(() => animationStep3(morphArray, iteration), HOLD_DURATION_MS),
    );
  }

  function animationStep3(morphArray, iteration) {
    applyConditionalVisibility(morphArray, 2);
    const morphPoints = getMorphPoints(morphArray, 2, iteration);
    if (!morphArray[0][iteration]?.animation || !morphPoints) return;
    morphArray[0][iteration].animation.animate(
      { d: morphPoints },
      MORPH_DURATION_MS,
      mina.easeinout,
      () => setTimeout(() => animationStep1(morphArray, iteration), HOLD_DURATION_MS),
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
    scaleStepPathsToMatch(morphArray[1], morphArray[0]);
    applyConditionalVisibility(morphArray, 0);

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

