// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function handleScroll() {
    const y = window.scrollY;

    // Navbar background
    if (y > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (y > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ===== SCROLL TO TOP =====
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // Close menu when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  // Observe fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    revealObserver.observe(el);
  });

  // Observe road timeline steps
  document.querySelectorAll('.road-step').forEach(el => {
    revealObserver.observe(el);
  });

  // ===== PARALLAX FLOATING ICONS =====
  const floatingIcons = document.querySelector('.floating-icons');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        floatingIcons.style.transform = `translateY(${scrollY * 0.05}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ===== TILT EFFECT ON GLASS CARDS (DESKTOP ONLY) =====
  if (window.matchMedia('(min-width: 769px)').matches) {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ===== TYPING EFFECT ON HERO TITLE =====
  const gradientText = document.querySelector('.gradient-text');
  if (gradientText) {
    const text = gradientText.textContent;
    gradientText.textContent = '';
    gradientText.style.borderRight = '2px solid #38bdf8';

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        gradientText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
      } else {
        // Remove cursor after typing done
        setTimeout(() => {
          gradientText.style.borderRight = 'none';
        }, 800);
      }
    }

    // Start typing after hero fades in
    setTimeout(typeWriter, 900);
  }

  // ===== COUNTER ANIMATION FOR PORT NUMBERS =====
  const portNumbers = document.querySelectorAll('.port-number');
  const portObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.port);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 1200;
        const step = target / (duration / 16);

        function count() {
          current += step;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(count);
          }
        }

        count();
        portObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  portNumbers.forEach(el => portObserver.observe(el));

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
