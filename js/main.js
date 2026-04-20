// ===== LOAD HTML SECTIONS =====
async function loadSection(id, file) {
  const res = await fetch(`sections/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function initPortfolio() {
  await Promise.all([
    loadSection('slot-navbar',   'navbar.html'),
    loadSection('slot-hero',     'hero.html'),
    loadSection('slot-about',    'about.html'),
    loadSection('slot-skills',   'skills.html'),
    loadSection('slot-projects',      'projects.html'),
    loadSection('slot-mini-projects',  'mini-projects.html'),
    loadSection('slot-resume',         'resume.html'),
    loadSection('slot-learning', 'learning.html'),
    loadSection('slot-contact',  'contact.html'),
    loadSection('slot-footer',   'footer.html'),
  ]);

  lucide.createIcons();
  initScrollAnimations();
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initContactForm();
  initActiveNavLink();
  initTypingAnimation();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0 });

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    if (el.closest('#home')) {
      setTimeout(() => el.classList.add('visible'), i * 120);
    } else {
      observer.observe(el);
    }
  });
}

// ===== NAVBAR SHADOW ON SCROLL =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.06)'
      : 'none';
  });
}

// ===== ACTIVE NAV LINK =====
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== CONTACT FORM =====
function initContactForm() {
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = 'Message sent successfully!';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    e.target.reset();
  });
}

document.addEventListener('DOMContentLoaded', initPortfolio);

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = [
    'Data Analyst',
    'Python Developer',
    'SQL Expert',
    'Power BI Developer',
    'ML Enthusiast',
  ];
  let pi = 0, ci = 0, deleting = false;
  function tick() {
    const word = phrases[pi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length)  { deleting = true;  setTimeout(tick, 1400); return; }
    if (deleting  && ci < 0)            { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
    setTimeout(tick, deleting ? 55 : 100);
  }
  tick();
}
