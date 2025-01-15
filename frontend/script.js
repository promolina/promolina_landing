const hamburger = document.querySelector('.hamburger-menu');
const navbarItems = document.querySelector('.navbar-items');

const menuButton = document.querySelector('.hamburger-menu');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !expanded);
});


hamburger.addEventListener('click', () => {
  // Toggle active state for the hamburger menu animation
  hamburger.classList.toggle('active');
  
  // Toggle active state for the navigation menu
  navbarItems.classList.toggle('active');
});
