'use strict';

(function closeMenuOnEsc() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || window.location.hash !== '#menu') {
      return;
    }

    // Clear the fragment the same way a visited anchor would so that
    // .menu:target re-resolves and the overlay closes.
    window.location.hash = '';
  });
})();

(function smoothNavScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');

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
  });
})();
