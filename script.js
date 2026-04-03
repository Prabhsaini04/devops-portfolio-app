// script.js - Interactive features for DevOps Portfolio
document.addEventListener('DOMContentLoaded', () => {
  // ----- Typewriter Effect -----
  const roles = [
    "DevOps Engineer",
    "Cloud Architect",
    "K8s Orchestrator",
    "IaC Specialist",
    "SRE Advocate"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  const cursorSpan = document.querySelector('.cursor');
  
  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
      return;
    }
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }
  if (typedTextSpan) typeEffect();

  // ----- Metrics Counter (animate on scroll) -----
  const metricCards = document.querySelectorAll('.metric-card');
  let counted = false;
  
  function startCounterIfVisible() {
    if (counted) return;
    metricCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        counted = true;
        metricCards.forEach(c => {
          const target = parseInt(c.getAttribute('data-target'));
          const numberSpan = c.querySelector('.count-num');
          if (!numberSpan) return;
          let current = 0;
          const increment = target / 50;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              numberSpan.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              numberSpan.textContent = target;
            }
          };
          updateCounter();
        });
      }
    });
  }
  
  window.addEventListener('scroll', startCounterIfVisible);
  startCounterIfVisible(); // initial check

  // ----- Navbar active links & scroll spy -----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
  
  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 12, 16, 0.95)';
      navbar.style.backdropFilter = 'blur(16px)';
    } else {
      navbar.style.background = 'rgba(10, 12, 16, 0.85)';
    }
  });

  // ----- Form submission mock (no backend) -----
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formFeedback.innerHTML = '<span style="color:#f87171;">❌ Please fill all fields.</span>';
    return;
  }

  if (!email.includes('@')) {
    formFeedback.innerHTML = '<span style="color:#f87171;">❌ Valid email required.</span>';
    return;
  }

  // Send email using EmailJS
  emailjs.send("service_n0oz18v", "template_cmhi83y", {
    name: name,
    email: email,
    message: message
  })
  .then(() => {
    formFeedback.innerHTML = '<span style="color:#4ade80;">✅ Message sent successfully!</span>';
    contactForm.reset();
  })
  .catch(() => {
    formFeedback.innerHTML = '<span style="color:#f87171;">❌ Failed to send message. Try again.</span>';
  });
});
  }
  
  // ----- Demo alerts for project links, resume, socials -----
  const demoButtons = document.querySelectorAll('.demo-alert, #resumeMockBtn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isResume = btn.id === 'resumeMockBtn';
      if (isResume) {
        alert("📄 Resume demo: Alex Rivera - DevOps Lead | Available for opportunities. Contact via form.");
      } else {
        alert("🔧 Live demo preview: This project architecture is available on GitHub. Connect for access.");
      }
    });
  });
  
  // Social links demo notifications
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = icon.querySelector('i')?.classList[1] || 'link';
      alert(`🌐 Connect with Alex on ${platform.replace('fa-', '')} — demo profile. Real links upon request.`);
    });
  });
  
  // Footer dynamic year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Optional: Terminal interactive hover effect (purely aesthetic)
  const terminalBody = document.querySelector('.terminal-body');
  if (terminalBody) {
    terminalBody.addEventListener('mouseenter', () => {
      terminalBody.style.opacity = '0.95';
    });
    terminalBody.addEventListener('mouseleave', () => {
      terminalBody.style.opacity = '1';
    });
  }
  
  // Additional: glitch effect for hero stats (just fun)
  console.log("DevOps Portfolio — ready to automate 🚀");
});