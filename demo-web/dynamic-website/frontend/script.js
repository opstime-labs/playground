const toggleButton = document.getElementById('themeToggle');
// 1. Select the new text span element
const clickDisplay = document.getElementById('clickDisplay');

// 2. Fetch the starting click count from the server when the page loads
async function fetchInitialCount() {
  try {
    const response = await fetch('/api/clicks');
    const data = await response.json();
    
    // UPDATE UI: Replace "Loading..." with the real server number
    clickDisplay.textContent = data.totalClicks;
  } catch (error) {
    console.error('Error fetching count:', error);
    clickDisplay.textContent = 'Error';
  }
}
fetchInitialCount();

// 3. Handle the button click and update the server
toggleButton.addEventListener('click', async () => {
  // Toggle the visual theme
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    toggleButton.textContent = 'Switch to Dark Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleButton.textContent = 'Switch to Light Mode';
  }

  // Send a request to the backend server to increment the global count
  try {
    const response = await fetch('/api/clicks/increment', { method: 'POST' });
    const data = await response.json();
    
    // UPDATE UI: Instantly update the counter on screen with the new total
    clickDisplay.textContent = data.totalClicks;
  } catch (error) {
    console.error('Failed to communicate with backend server:', error);
  }
});
