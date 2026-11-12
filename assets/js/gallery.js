/**
 * Zero-Library Gallery Slideshow for onovar.github.io
 * - Keyboard navigation (Left/Right arrow) when hovered
 * - Drag/Swipe to switch slides
 * - Click without dragging opens GLightbox zoom
 * - Stable dimensions to prevent page jumping
 */
function initGalleries() {
  document.querySelectorAll('.gallery-slider').forEach(slider => {
    if (slider.dataset.initialized) return;
    slider.dataset.initialized = 'true';

    const slides = slider.querySelectorAll('.gallery-slide');
    if (!slides.length) return;

    const track = slider.querySelector('.gallery-track');
    let currentIndex = 0;
    const total = slides.length;
    const currEl = slider.querySelector('.curr-slide');
    const totalEl = slider.querySelector('.total-slides');
    const dotsContainer = slider.querySelector('.gallery-dots');
    const prevBtn = slider.querySelector('.gallery-prev');
    const nextBtn = slider.querySelector('.gallery-next');

    if (totalEl) totalEl.textContent = total;

    // 1. Calculate & lock maximum dimension to prevent page jumping
    function updateTrackHeight() {
      if (!track) return;
      let maxHeight = 0;
      const trackWidth = track.clientWidth || slider.clientWidth || 700;

      slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img && img.naturalHeight && img.naturalWidth) {
          const ratio = img.naturalHeight / img.naturalWidth;
          const calculatedHeight = Math.min(trackWidth * ratio, window.innerHeight * 0.65, 520);
          if (calculatedHeight > maxHeight) maxHeight = calculatedHeight;
        }
      });

      if (maxHeight > 100) {
        track.style.height = Math.round(maxHeight) + 'px';
      }
    }

    slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) {
        if (img.complete) updateTrackHeight();
        else img.addEventListener('load', updateTrackHeight);
      }
    });
    window.addEventListener('resize', updateTrackHeight);
    setTimeout(updateTrackHeight, 200);

    // 2. Create dot indicators
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

    // 3. Keyboard navigation (Left / Right Arrow) when hovered
    let isHovered = false;
    slider.addEventListener('mouseenter', () => { isHovered = true; });
    slider.addEventListener('mouseleave', () => { isHovered = false; });

    window.addEventListener('keydown', (e) => {
      if (!isHovered) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showSlide(currentIndex + 1);
      }
    });

    // 4. Drag to switch vs Click to zoom
    // If dragged > 20px horizontally: switch slide and prevent zoom.
    // If clicked (< 10px): allow default click so GLightbox opens.
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let dragThresholdPassed = false;

    function onPointerDown(clientX, clientY, target) {
      if (target && target.closest('.gallery-prev, .gallery-next, .gallery-dot')) return;
      startX = clientX;
      startY = clientY;
      isDragging = true;
      dragThresholdPassed = false;
    }

    function onPointerMove(clientX, clientY) {
      if (!isDragging) return;
      const diffX = clientX - startX;
      const diffY = clientY - startY;

      if (Math.abs(diffX) > 15 && Math.abs(diffX) > Math.abs(diffY)) {
        dragThresholdPassed = true;
      }
    }

    function onPointerUp(clientX) {
      if (!isDragging) return;
      isDragging = false;
      const diffX = clientX - startX;

      if (dragThresholdPassed && Math.abs(diffX) > 35) {
        // Prevent click/zoom event on drag release
        const blockClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        };
        window.addEventListener('click', blockClick, { capture: true, once: true });

        if (diffX < 0) {
          showSlide(currentIndex + 1);
        } else {
          showSlide(currentIndex - 1);
        }
      }
    }

    // Touch events (Mobile)
    slider.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      onPointerDown(t.clientX, t.clientY, e.target);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      const t = e.changedTouches[0];
      onPointerMove(t.clientX, t.clientY);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const t = e.changedTouches[0];
      onPointerUp(t.clientX);
    }, { passive: true });

    // Mouse drag events (Desktop)
    slider.addEventListener('mousedown', (e) => {
      onPointerDown(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) onPointerMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', (e) => {
      if (isDragging) onPointerUp(e.clientX);
    });
  });
}

document.addEventListener('DOMContentLoaded', initGalleries);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initGalleries();
}
