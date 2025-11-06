document.addEventListener('DOMContentLoaded', function () {
  // Header and dropdown elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    let navWasActive = false;
    
  // Variables for scroll accumulation
    let lastScroll = window.pageYOffset;
    let accumulatedScroll = 0;
    const threshold = 50; // The amount of scroll needed to trigger the action
  
  // Hamburger menu toggle
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  
  // Scroll event with accumulation logic
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      const delta = currentScroll - lastScroll;
  
  // If the scroll direction changes, reset the accumulation
      if ((delta > 0 && accumulatedScroll < 0) || (delta < 0 && accumulatedScroll > 0)) {
        accumulatedScroll = 0;
      }
      accumulatedScroll += delta;
  
  // If accumulated exceeds the threshold (scrolling down)
      if (accumulatedScroll > threshold) {
        if (!header.classList.contains('hidden')) {
          header.classList.add('hidden');
          // If the dropdown is active, remember its state and hide it
          if (nav.classList.contains('active')) {
            navWasActive = true;
            nav.classList.remove('active');
          }
        }
        accumulatedScroll = 0;
      }
  // If accumulated is less than -threshold (scrolling up)
      else if (accumulatedScroll < -threshold) {
        if (header.classList.contains('hidden')) {
          header.classList.remove('hidden');
          // If the dropdown was active, reactivate it
          if (navWasActive) {
            nav.classList.add('active');
            navWasActive = false;
          }
        }
        accumulatedScroll = 0;
      }
      lastScroll = currentScroll;
    });
  
  // Smooth scrolling for any in-page anchor (e.g., nav links, hero buttons)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
  // Only handle smooth scrolling for local anchors
        if (!href.startsWith('#')) {
          return; // Allow default navigation for other pages
        }
        e.preventDefault();
  // Hide mobile menu after click if the link is inside nav
        if (window.innerWidth <= 768 && this.closest('nav')) {
          nav.classList.remove('active');
        }
  // Smooth scroll to section
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50, // Offset for fixed header
            behavior: 'smooth',
          });
        }
      });
    });
  
  // Fade-in animation on scroll using IntersectionObserver (with fallback)
    const faders = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
      const appearOptions = { threshold: 0.2 };
      const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
      }, appearOptions);
      faders.forEach((fader) => {
        appearOnScroll.observe(fader);
      });
    } else {
  // Fallback: immediately show elements if IntersectionObserver is unsupported
      faders.forEach(f => f.classList.add('visible'));
    }
  // Ensure first section becomes visible quickly (prevents rare mobile issues)
    if (faders.length) {
      requestAnimationFrame(() => faders[0].classList.add('visible'));
    }
  
  // Image modal functionality
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    document.querySelectorAll('.picture-grid img').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  
  // Contact form (demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
      });
    }
  });
