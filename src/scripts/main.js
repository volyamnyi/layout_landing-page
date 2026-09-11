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

  let closeFocusTarget = null;

  const sync = () => {
    const isOpen = window.location.hash === '#menu';
    const active = document.activeElement;

    // Move focus out of the menu before it is hidden/aria-hidden so a
    // focused descendant never gets stranded inside an aria-hidden box.
    if (!isOpen && menu.contains(active)) {
      if (closeFocusTarget && !closeFocusTarget.contains(active)) {
        closeFocusTarget.focus();
      } else {
        active.blur();
      }
    }

    // Keep aria-hidden in sync with the CSS :target visibility so the
    // menu is hidden from assistive technology only when it is closed.
    menu.setAttribute('aria-hidden', String(!isOpen));

    closeFocusTarget = null;
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');

    if (anchor && anchor.classList.contains('menu__close')) {
      closeFocusTarget = burger;
    }

    if (
      !anchor ||
      anchor.getAttribute('href') === '#' ||
      anchor.getAttribute('href') === '#menu'
    ) {
      return;
    }

    const target = document.querySelector(anchor.getAttribute('href'));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', anchor.getAttribute('href'));
    sync();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && window.location.hash === '#menu') {
      closeFocusTarget = burger;
      window.location.hash = '';
    }
  });

  window.addEventListener('hashchange', sync);
  sync();
})();
