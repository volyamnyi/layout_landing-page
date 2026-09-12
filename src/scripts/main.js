'use strict';

(function () {
  const menu = document.getElementById('menu');
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.reset();
    });
  }

  if (menu) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && window.location.hash === '#menu') {
        window.location.hash = '';
      }
    });
  }
})();
