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

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex--);
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      return setTimeout(typeEffect, 2000);
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  if (typedTextSpan) typeEffect();


  // ----- Contact Form (FIXED EMAILJS) -----
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formFeedback.innerHTML = "❌ Please fill all fields";
        return;
      }

      if (!email.includes("@")) {
        formFeedback.innerHTML = "❌ Enter valid email";
        return;
      }

      // 🔥 SEND EMAIL
      emailjs.send("service_n0oz18v", "template_cmhi83y", {
        from_name: name,
        from_email: email,
        message: message
      })
      .then(function() {
        formFeedback.innerHTML = "✅ Message sent successfully!";
        contactForm.reset();
      })
      .catch(function(error) {
        console.error(error);
        formFeedback.innerHTML = "❌ Failed to send message";
      });
    });
  }


  // ----- Footer Year -----
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});