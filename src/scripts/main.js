'use strict';

(function menuBehavior() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const menu = document.getElementById('menu');
  const burger = document.querySelector('.header__burger');

  if (!menu) {
    return;
  }

  const sync = () => {
    const isOpen = window.location.hash === '#menu';

    menu.setAttribute('aria-hidden', String(!isOpen));

    if (
      !isOpen &&
      menu.contains(document.activeElement) &&
      burger &&
      !burger.contains(document.activeElement)
    ) {
      burger.focus();
    }
  };

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || window.location.hash !== '#menu') {
      return;
    }

    window.location.hash = '';
    burger.focus();
  });

  window.addEventListener('hashchange', sync);
  sync();
})();
