const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  primaryNav.classList.toggle('is-open', open);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectGrid = document.querySelector('.project-grid');
const projectCards = [...document.querySelectorAll('.project-card')];
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const visibleCards = projectCards.filter((card) => {
      const categories = card.dataset.category.split(' ');
      return filter === 'all' || categories.includes(filter);
    });
    projectGrid.replaceChildren(...visibleCards);
  });
});

const projectDialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#project-dialog-title');
const dialogDescription = document.querySelector('.project-dialog-description');
const dialogTech = document.querySelector('.project-dialog-tech');
const dialogRepo = document.querySelector('.project-dialog-repo');
document.querySelectorAll('[data-project-view]').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    dialogTitle.textContent = card.querySelector('h3').textContent;
    dialogDescription.textContent = card.querySelector('.project-info > p').textContent;
    dialogTech.textContent = `Built with: ${[...card.querySelectorAll('.tech-tags span')].map((tag) => tag.textContent).join(', ')}`;
    dialogRepo.href = card.querySelector('.project-meta a').href;
    projectDialog.showModal();
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
  formStatus.textContent = 'Thank you for reaching out. Your message is ready for Mina.';
  contactForm.reset();
  fields.forEach(({ input }) => input.removeAttribute('aria-invalid'));
});

