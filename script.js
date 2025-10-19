// Basic interactions & scroll reveal
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  hamburger && hamburger.addEventListener('click', () => {
    // toggle simple mobile nav by toggling class and injecting a small dropdown
    if (!mainNav.classList.contains('open')) {
      mainNav.classList.add('open');
      const clone = mainNav.cloneNode(true);
      clone.classList.add('mobile-clone');
      clone.style.cssText = "position:fixed; right:18px; top:70px; background:var(--bg); padding:12px; border-radius:10px; box-shadow: 0 14px 40px rgba(10,10,10,0.08); z-index:60;";
      clone.querySelectorAll('a, button').forEach(el => el.addEventListener('click', ()=> {
        closeMobileNav();
      }));
      clone.id = 'mobileClone';
      document.body.appendChild(clone);
    } else {
      closeMobileNav();
    }
  });

  function closeMobileNav(){
    mainNav.classList.remove('open');
    const existing = document.getElementById('mobileClone');
    if (existing) existing.remove();
  }

  // CTA interactions (open modal)
  const trialBtn = document.getElementById('trialBtn');
  const signupBtn = document.getElementById('signupBtn');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');
  const modalCancel = document.getElementById('modalCancel');

  [trialBtn, signupBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal();
    });
  });

  modalClose.addEventListener('click', hideModal);
  modalCancel.addEventListener('click', hideModal);
  modalOk.addEventListener('click', () => {
    hideModal();
    // small confirmation UX
    alert('Thanks — in a production site this would begin your trial signup flow.');
  });

  function showModal(){
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
  }
  function hideModal(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
  }

  // Close modal on backdrop click
  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) hideModal();
  });

  // Simple scroll reveal intersection observer
  const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  } else {
    // fallback
    reveals.forEach(r => r.classList.add('is-visible'));
  }

  // small accessibility: ESC closes modal and mobile nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModal();
      closeMobileNav();
    }
  });
});
