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
  // ----- Form submission with EmailJS -----
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
      formFeedback.innerHTML = '<span style="color:#f87171;">❌ Please fill all fields.</span>';
      return;
    }

    if (!email.includes('@')) {
      formFeedback.innerHTML = '<span style="color:#f87171;">❌ Valid email required.</span>';
      return;
    }

    // 👇 LOADING MESSAGE (NEW)
    formFeedback.innerHTML = '<span style="color:#60a5fa;">⏳ Sending...</span>';

    emailjs.send("service_n0oz18v", "template_cmhi83y", {
      name: name,
      email: email,
      message: message
    })
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      formFeedback.innerHTML = '<span style="color:#4ade80;">✅ Message sent successfully!</span>';
      contactForm.reset();
    })
    .catch(function(error) {
      console.error("FAILED...", error);
      formFeedback.innerHTML = '<span style="color:#f87171;">❌ Failed to send message. Check console.</span>';
    });
  });
}
  // ----- Footer Year -----
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});