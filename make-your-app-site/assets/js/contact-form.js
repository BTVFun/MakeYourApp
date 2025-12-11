export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Contact form submission placeholder', data);
  });
}

initContactForm();
