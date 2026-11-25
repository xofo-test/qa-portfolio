const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  primaryNav.classList.toggle('is-open', open);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const fields = [
  { input: document.querySelector('#full-name'), error: document.querySelector('#name-error'), message: 'Enter your name.' },
  { input: document.querySelector('#email'), error: document.querySelector('#email-error'), message: 'Enter a valid email address.' },
  { input: document.querySelector('#subject'), error: document.querySelector('#subject-error'), message: 'Add a subject.' },
  { input: document.querySelector('#message'), error: document.querySelector('#message-error'), message: 'Write a short message.' }
];

function validateField(field) {
  const value = field.input.value.trim();
  const valid = value !== '' && field.input.validity.valid;
  field.input.setAttribute('aria-invalid', String(!valid));
  field.error.textContent = valid ? '' : field.message;
  return valid;
}

fields.forEach(({ input }) => {
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') {
      const field = fields.find((item) => item.input === input);
      validateField(field);
    }
    formStatus.textContent = '';
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';
  const valid = fields.map(validateField).every(Boolean);
  if (!valid) {
    fields.find((field) => field.input.getAttribute('aria-invalid') === 'true').input.focus();
    return;
  }
  formStatus.textContent = 'Thanks for reaching out. Your message is ready for Mina.';
  contactForm.reset();
  fields.forEach(({ input }) => input.removeAttribute('aria-invalid'));
});

