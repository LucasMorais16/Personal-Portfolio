document.addEventListener('DOMContentLoaded', function () {
    // Header and Dropdown Elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    let navWasActive = false;
    
    // Variables for scroll accumulation
    let lastScroll = window.pageYOffset;
    let accumulatedScroll = 0;
    const threshold = 50; // The amount of scroll needed to trigger the action
  
    // Hamburger Menu Toggle
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  
    // Scroll event with accumulation logic
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      const delta = currentScroll - lastScroll;
  
      // Se a direção do scroll mudar, reseta a acumulação
      if ((delta > 0 && accumulatedScroll < 0) || (delta < 0 && accumulatedScroll > 0)) {
        accumulatedScroll = 0;
      }
      accumulatedScroll += delta;
  
      // Se acumulado for maior que o threshold (scroll para baixo)
      if (accumulatedScroll > threshold) {
        if (!header.classList.contains('hidden')) {
          header.classList.add('hidden');
          // Se o dropdown estiver ativo, salva seu estado e o esconde
          if (nav.classList.contains('active')) {
            navWasActive = true;
            nav.classList.remove('active');
          }
        }
        accumulatedScroll = 0;
      }
      // Se acumulado for menor que o -threshold (scroll para cima)
      else if (accumulatedScroll < -threshold) {
        if (header.classList.contains('hidden')) {
          header.classList.remove('hidden');
          // Se o dropdown estava ativo, reativa-o
          if (navWasActive) {
            nav.classList.add('active');
            navWasActive = false;
          }
        }
        accumulatedScroll = 0;
      }
      lastScroll = currentScroll;
    });
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        // Se for mobile, esconde o menu após o clique
        if (window.innerWidth <= 768) {
          nav.classList.remove('active');
        }
        // Obtém o id da seção alvo (removendo o '#' do início)
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50, // Ajusta para o header fixo
            behavior: 'smooth',
          });
        }
      });
    });
  
    // Fade-in animation on scroll using IntersectionObserver
    const faders = document.querySelectorAll('.fade-in');
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
  
    // Dummy Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message!');
      contactForm.reset();
    });
  });
