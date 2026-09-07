const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  nav.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation menu');
  nav.classList.remove('open');
}));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('[required]')];
  const firstInvalid = fields.find((field) => !field.validity.valid);
  fields.forEach((field) => field.removeAttribute('aria-invalid'));

  if (firstInvalid) {
    firstInvalid.setAttribute('aria-invalid', 'true');
    const label = form.querySelector(`label[for="${firstInvalid.id}"]`).textContent;
    status.textContent = `Please enter a valid ${label.toLowerCase()}.`;
    status.className = 'form-status error';
    firstInvalid.focus();
    return;
  }

  status.textContent = 'Thanks — your message is ready to send. I’ll be in touch soon.';
  status.className = 'form-status success';
  form.reset();
});
