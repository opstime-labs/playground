// Select the HTML button element using its unique ID
const toggleButton = document.getElementById('themeToggle');

// Add an event listener to run code whenever the user clicks the button
toggleButton.addEventListener('click', () => {
  
  // Check if the current theme is dark
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    // Switch to Light Mode
    document.documentElement.removeAttribute('data-theme');
    toggleButton.textContent = 'Switch to Dark Mode';
  } else {
    // Switch to Dark Mode
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleButton.textContent = 'Switch to Light Mode';
  }
});
