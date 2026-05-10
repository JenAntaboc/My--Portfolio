// Initialize EmailJS
emailjs.init('zr5VtuPgGohhF5biH');

// Navigation active link update on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.menu a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.style.color = '#ff6b6b';
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.style.color = '#ff6b6b';
    return;
  }

  // Show sending status
  formStatus.textContent = 'Sending message...';
  formStatus.style.color = '#4db6ff';

  emailjs.send('service_2etdk2r', 'template_6cw5kvp', {
    to_email: 'ailylantaboc@gmail.com', 
    from_name: name,
    from_email: email,
    message: message
  })
  .then((response) => {
    console.log('Email sent successfully!', response);
    formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
    formStatus.style.color = '#4ade80';

    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);
  })
  .catch((error) => {
    console.error('Failed to send email:', error);
    formStatus.textContent = 'Failed to send message. Please try again.';
    formStatus.style.color = '#ff6b6b';
  });
});