// Contact Form Handling
const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('button[type="submit"]');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateMessage(message) {
  return message.length >= 10;
}

document.getElementById('email').addEventListener('input', function(e) {
  const emailInput = e.target;
  if (validateEmail(emailInput.value)) {
    emailInput.setCustomValidity('');
  } else {
    emailInput.setCustomValidity('Please enter a valid email address');
  }
});

document.getElementById('message').addEventListener('input', function(e) {
  const messageInput = e.target;
  if (validateMessage(messageInput.value)) {
    messageInput.setCustomValidity('');
  } else {
    messageInput.setCustomValidity('Message must be at least 10 characters');
  }
});

document.getElementById('message').addEventListener('input', function(e) {
  const counter = document.getElementById('message-counter');
  const currentLength = e.target.value.length;
  counter.textContent = `${currentLength}/500`;
  
  if (currentLength > 500) {
    e.target.value = e.target.value.substring(0, 500);
    counter.textContent = `500/500`;
  }
});

async function handleSubmit(e) {
  e.preventDefault();
  
  if (!grecaptcha.getResponse()) {
    showMessage('Please complete the CAPTCHA verification', 'error');
    return;
  }
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  try {
    const formData = new FormData(form);
    
    const response = await fetch('https://your-api-endpoint.com/send', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Submission failed');
    
    showMessage('Message sent successfully! 🚀', 'success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (error) {
    showMessage('Failed to send message. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message';
    form.reset();
    grecaptcha.reset();
  }
}

function showMessage(text, type) {
  const message = document.createElement('div');
  message.className = `status-message ${type}`;
  message.textContent = text;
  message.setAttribute('role', 'alert');
  message.setAttribute('aria-live', 'polite');
  
  document.body.appendChild(message);
  setTimeout(() => {
    message.setAttribute('aria-hidden', 'true');
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

form.addEventListener('submit', handleSubmit);

// Back Button Functionality
function goBack() {
  window.history.back();
}