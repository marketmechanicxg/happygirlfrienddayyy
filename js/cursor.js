/**
 * cursor.js
 * Creates a bioluminescent trailing cursor effect.
 */
(function (window, document) {
  'use strict';

  // Only enable custom cursor on non-touch devices
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) return;

  function initCursor() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'custom-cursor-glow';

    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursorDot);

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let glowX = dotX;
    let glowY = dotY;
    let targetX = dotX;
    let targetY = dotY;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    // Animation loop for smooth trailing
    function render() {
      // Dot follows instantly but with slight interpolation for smoothness
      dotX += (targetX - dotX) * 0.4;
      dotY += (targetY - dotY) * 0.4;
      
      // Glow trails behind
      glowX += (targetX - glowX) * 0.15;
      glowY += (targetY - glowY) * 0.15;

      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

      requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);

    // Add interactive state when hovering over clickable elements
    const clickables = document.querySelectorAll('a, button, input, .candle, .letter__bottle-stage, .gallery__item');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('is-hovering');
        cursorGlow.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('is-hovering');
        cursorGlow.classList.remove('is-hovering');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }

})(window, document);
