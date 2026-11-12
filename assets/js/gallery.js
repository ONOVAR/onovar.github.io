/**
 * Lightweight Zero-Library Gallery Slideshow for onovar.github.io
 */
function initGalleries() {
  document.querySelectorAll('.gallery-slider').forEach(slider => {
    if (slider.dataset.initialized) return;
    slider.dataset.initialized = 'true';

    const slides = slider.querySelectorAll('.gallery-slide');
    if (!slides.length) return;

    let currentIndex = 0;
    const total = slides.length;
    const currEl = slider.querySelector('.curr-slide');
    const totalEl = slider.querySelector('.total-slides');
    const dotsContainer = slider.querySelector('.gallery-dots');
    const prevBtn = slider.querySelector('.gallery-prev');
    const nextBtn = slider.querySelector('.gallery-next');

    if (totalEl) totalEl.textContent = total;

    // Create dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showSlide(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function showSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;

      slides.forEach((s, i) => {
        s.classList.toggle('active', i === currentIndex);
      });

      if (currEl) currEl.textContent = currentIndex + 1;

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.gallery-dot').forEach((d, i) => {
          d.classList.toggle('active', i === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSlide(currentIndex + 1);
      });
    }

    // Touch swipe support for mobile
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) showSlide(currentIndex + 1);
        else showSlide(currentIndex - 1);
      }
    }, { passive: true });
  });
}

document.addEventListener('DOMContentLoaded', initGalleries);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initGalleries();
}
