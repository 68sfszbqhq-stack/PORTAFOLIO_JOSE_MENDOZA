import './style.css';

// ── MODAL ──
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#portfolio-modal');
  const openBtn = document.querySelector('#open-portfolio-modal');
  const closeBtns = document.querySelectorAll('.close-modal');
  const pdfFrame = document.querySelector('#pdf-frame');
  const tabBtns = document.querySelectorAll('.pdf-tab-btn');

  const pdfs = {
    fichero: './FICHERO DE ACTIVIDADES Y PROPUESTA PERIODO OTOÑO 2025.pdf',
    bitacora: './BITACORA SEMANAL PAUSAS ACTIVAS VERANO 2025.pdf'
  };

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('active'));
  }
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => modal.classList.remove('active'));
  });
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.pdf;
      if (pdfs[key] && pdfFrame) pdfFrame.src = pdfs[key];
    });
  });

  // ── EDUPLAN MX SLIDER MODAL ──
  const eduplanBtn = document.querySelector('#open-eduplan-modal');
  const eduplanModal = document.querySelector('#eduplan-modal');
  const eduplanClose = document.querySelector('.close-eduplan-modal');
  const eduplanSlide = document.querySelector('#eduplan-slide');
  const eduplanPrev = document.querySelector('#eduplan-prev');
  const eduplanNext = document.querySelector('#eduplan-next');
  const eduplanDotsContainer = document.querySelector('#eduplan-dots');
  
  const eduplanImages = [
    './eduplan/0.png',
    './eduplan/1.png',
    './eduplan/2.png',
    './eduplan/3.png',
    './eduplan/4.png',
    './eduplan/5.png'
  ];
  let currentSlide = 0;

  function updateSlider() {
    if(!eduplanSlide) return;
    eduplanSlide.style.opacity = 0;
    setTimeout(() => {
      eduplanSlide.src = eduplanImages[currentSlide];
      eduplanSlide.style.opacity = 1;
      // Update dots
      document.querySelectorAll('.eduplan-dot').forEach((dot, idx) => {
        dot.style.background = idx === currentSlide ? 'var(--accent)' : '#475569';
      });
    }, 150);
  }

  if(eduplanDotsContainer) {
    eduplanImages.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = 'eduplan-dot';
      dot.style.cssText = 'width: 10px; height: 10px; border-radius: 50%; background: #475569; cursor: pointer; transition: background 0.3s ease;';
      dot.addEventListener('click', () => {
        currentSlide = idx;
        updateSlider();
      });
      eduplanDotsContainer.appendChild(dot);
    });
  }

  if(eduplanBtn && eduplanModal) {
    eduplanBtn.addEventListener('click', () => {
      currentSlide = 0;
      updateSlider();
      eduplanModal.classList.add('active');
    });
  }
  
  if(eduplanClose && eduplanModal) {
    eduplanClose.addEventListener('click', () => {
      eduplanModal.classList.remove('active');
    });
  }
  
  if(eduplanModal) {
    eduplanModal.addEventListener('click', (e) => {
      if (e.target === eduplanModal) eduplanModal.classList.remove('active');
    });
  }

  if(eduplanPrev) {
    eduplanPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : eduplanImages.length - 1;
      updateSlider();
    });
  }
  
  if(eduplanNext) {
    eduplanNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide < eduplanImages.length - 1) ? currentSlide + 1 : 0;
      updateSlider();
    });
  }

  // ── NAVBAR SCROLL EFFECT ──
  const navbar = document.querySelector('#navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(10,15,30,0.95)';
    } else {
      navbar.style.background = 'rgba(10,15,30,0.7)';
    }
  });

  // ── ANIMATED COUNTERS ──
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = (suffix === '+' ? '+' : '') + Math.floor(start) + (suffix === 'k' ? 'k' : '');
    }, step);
  }

  // Use IntersectionObserver to trigger counters when stats bar is visible
  const statsSection = document.querySelector('#stats');
  let countersRan = false;
  if (statsSection) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersRan) {
          countersRan = true;
          animateCounter(document.querySelector('#stat-medallas'), 26);
          animateCounter(document.querySelector('#stat-colaboradores'), 300);
          animateCounter(document.querySelector('#stat-anos'), 15);
          animateCounter(document.querySelector('#stat-universidades'), 2);
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(statsSection);
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.project-card, .milestone, .tl-item, .bento-card, .ref-card');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObs.observe(el);
  });

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) a.style.color = '#f1f5f9';
    });
  });
});
