const hamburger = document.querySelector('.hamburger-menu');
const navbarItems = document.querySelector('.navbar-items');

hamburger.addEventListener('click', () => {
  // Toggle active state for the hamburger menu animation
  hamburger.classList.toggle('active');
  
  // Toggle active state for the navigation menu
  navbarItems.classList.toggle('active');
});
