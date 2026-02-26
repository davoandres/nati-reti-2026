/**
 * NATI-RETI 2026 — Main JavaScript
 * Handles: navbar scroll behavior, mobile menu,
 *          scroll-reveal animations, smooth anchoring.
 */

(function () {
  'use strict';

  /* ── Navbar: scroll state ─────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── Mobile nav toggle ────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      // Animate hamburger to X
      navToggle.classList.toggle('active', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll Reveal ────────────────────────────────────── */
  function addRevealClasses() {
    const selectors = [
      '.section-header',
      '.about-text',
      '.about-details-card',
      '.phase-card',
      '.pillar-card',
      '.participant-block',
      '.partner-card',
      '.theme-stat-card',
      '.cta-content',
    ];

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        el.classList.add('reveal');
        // Stagger siblings within the same parent
        const siblings = el.parentElement
          ? el.parentElement.querySelectorAll(sel)
          : [];
        if (siblings.length > 1) {
          const idx = Array.from(siblings).indexOf(el);
          if (idx > 0 && idx <= 5) {
            el.classList.add('reveal-delay-' + idx);
          }
        }
      });
    });
  }

  function observeReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Active nav link highlighting ─────────────────────── */
  function setupActiveLinks() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ── Pillar card hover accent colors ─────────────────── */
  function setupPillarColors() {
    const colors = [
      '#014873', // Dark Blue
      '#c33d1c', // Terracotta
      '#036788', // Dark Teal
      '#2baebf', // Teal
      '#717918', // Olive
      '#014873', // Dark Blue
    ];

    document.querySelectorAll('.pillar-card').forEach(function (card, i) {
      const color = colors[i % colors.length];
      card.addEventListener('mouseenter', function () {
        card.style.setProperty('--pillar-accent', color);
        const bar = card.querySelector('::before');
      });
    });

    // Apply CSS variable overrides directly
    const styleEl = document.createElement('style');
    colors.forEach(function (color, i) {
      styleEl.textContent +=
        '.pillar-card:nth-child(' + (i + 1) + ')::before { background: ' + color + ' !important; }\n';
      styleEl.textContent +=
        '.pillar-card:nth-child(' + (i + 1) + '):hover .pillar-number { color: ' + color + ' !important; }\n';
    });
    document.head.appendChild(styleEl);
  }

  /* ── Countdown Timer ──────────────────────────────────── */
  function setupCountdown() {
    // NATI-RETI starts August 3, 2026
    const targetDate = new Date('2026-08-03T08:00:00');

    function tick() {
      const now  = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return; // Event has started

      const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const el = document.getElementById('countdown');
      if (el) {
        el.textContent = days + 'd ' + hours + 'h ' + minutes + 'm until NATI-RETI 2026';
      }
    }

    tick();
    setInterval(tick, 60000); // Update every minute
  }

  /* ── Smooth scroll polyfill for older browsers ─────────── */
  function smoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navH = navbar ? navbar.offsetHeight : 0;
          const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    addRevealClasses();
    observeReveal();
    setupActiveLinks();
    setupPillarColors();
    setupCountdown();
    smoothScrollLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Nav toggle hamburger animation (CSS via JS) ─────── */
  const toggleStyle = document.createElement('style');
  toggleStyle.textContent = `
    .nav-toggle.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .nav-toggle.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    .nav-toggle span {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .nav-links a.active {
      color: #2baebf !important;
    }
  `;
  document.head.appendChild(toggleStyle);

})();
