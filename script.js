// script.js - shared interactions for modal, mobile nav, form validation and navigation
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------- Sign In Modal ---------- */
  const signInLink = document.getElementById('signInLink');
  const signinModal = document.getElementById('signinModal');
  const signinClose = document.getElementById('signinClose');
  const signinSubmit = document.getElementById('signinSubmit');

  if (signInLink) signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
  if (signinClose) signinClose.addEventListener('click', closeModal);

  function openModal(){
    if (!signinModal) return;
    signinModal.classList.add('active');
    signinModal.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal(){
    if (!signinModal) return;
    signinModal.classList.remove('active');
    signinModal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
  }

  // If the modal exists, clicking outside the dialog closes it
  if (signinModal) {
    signinModal.addEventListener('click', (evt) => {
      if (evt.target === signinModal) closeModal();
    });

    // simulate login and redirect to dashboard on submit
    if (signinSubmit) {
      signinSubmit.addEventListener('click', function (ev) {
        ev.preventDefault();
        // simple validation
        const email = document.getElementById('signinEmail').value.trim();
        const pass = document.getElementById('signinPassword').value.trim();
        if (!email || !pass) {
          alert('Please enter email and password.');
          return;
        }
        // simulate successful login -> redirect to dashboard
        closeModal();
        window.location.href = 'dashboard.html';
      });
    }
  }

  /* ---------- Scroll reveal for elements with [data-reveal] ---------- */
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
    reveals.forEach(r => r.classList.add('is-visible'));
  }

  /* ---------- Signup page validation ---------- */
  const signupForm = document.getElementById('signupForm');
  const startBtn = document.getElementById('startTracking');
  if (signupForm && startBtn) {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const agree = document.getElementById('agree');

    function validateSignup() {
      const nameOk = fullName.value.trim().length > 1;
      const emailOk = email.value.trim().includes('@');
      const passOk = password.value.length >= 6;
      const match = password.value === confirmPassword.value && passOk;
      const agreed = agree.checked === true;
      const ok = nameOk && emailOk && match && agreed;
      startBtn.disabled = !ok;
      // simple visual cues (optional)
      if (!passOk && password.value.length > 0) {
        password.style.borderColor = '#e4b4b4';
      } else {
        password.style.borderColor = '#d6d8da';
      }
      if (password.value && confirmPassword.value && !match) {
        confirmPassword.style.borderColor = '#e4b4b4';
      } else {
        confirmPassword.style.borderColor = '#d6d8da';
      }
    }

    [fullName, email, password, confirmPassword, agree].forEach(el => {
      el.addEventListener('input', validateSignup);
      el.addEventListener('change', validateSignup);
    });

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // final check
      if (startBtn.disabled) {
        alert('Please complete the form correctly and accept privacy policy.');
        return;
      }
      // simulate account creation — go to dashboard
      window.location.href = 'dashboard.html';
    });
  }

  // Close mobile menu and modal with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // close modal if open
      if (signinModal && signinModal.classList.contains('active')) closeModal();
      const mobileClone = document.getElementById('mobileClone');
      if (mobileClone) mobileClone.remove();
    }
  });
});
