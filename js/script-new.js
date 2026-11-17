
  document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.menu');
    const nav = document.getElementById('nav');
    const dropdowns = document.querySelectorAll('.dd');

    // Mobile Navigation Toggle
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('open');
    });

    // Helper function to close all dropdowns
    function closeAllDropdowns(except = null) {
      dropdowns.forEach(dd => {
        if (dd !== except) {
          dd.classList.remove('open');
          const btn = dd.querySelector('.dd-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Dropdown Interactions
    dropdowns.forEach(dd => {
      const btn = dd.querySelector('.dd-btn');

      // Click behavior for button
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dd.classList.contains('open');
        closeAllDropdowns(dd);

        dd.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', !isOpen);
      });

      // Hover behavior for Desktop (width > 997px)
      dd.addEventListener('mouseenter', () => {
        if (window.innerWidth > 997) {
          closeAllDropdowns(dd);
          dd.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      dd.addEventListener('mouseleave', () => {
        if (window.innerWidth > 997) {
          dd.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dd')) {
        closeAllDropdowns();
      }
    });

    // Keyboard Access (Escape Key)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.focus();
        }
      }
    });
  });
