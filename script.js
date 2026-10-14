/* ==========================================================================
   Dekiru — minimal vanilla JS
   Handles: scroll-reveal animation, graceful fallback when a screenshot
   placeholder image hasn't been added yet, footer year, and closing the
   mobile nav after a link is tapped.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Show a tidy placeholder in place of any screenshot that hasn't
  // been added to assets/images/ yet, instead of a broken image icon.
  document.querySelectorAll('.app-screenshot img, .feature-image img').forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.app-screenshot, .feature-image')?.classList.add('img-missing');
    }, { once: true });
  });

  // Scroll-reveal: fade + rise elements into view as they enter the viewport.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  }

  // Close the mobile nav collapse after a link is tapped.
  const navCollapseEl = document.getElementById('navMenu');
  if (navCollapseEl) {
    navCollapseEl.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapseEl.classList.contains('show') && window.bootstrap) {
          const collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
          collapse.hide();
        }
      });
    });
  }

});
