// public/index.js
// This file handles the front-end logic for the authentication system inside the browser, including registration and login functionalities.

const API_URL = 'http://localhost:3000/api/auth'; // don't hardcode this in production; use environment variables or a config file instead

// DOM elements
const authScreen = document.getElementById('authScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const authForm = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleText = document.getElementById('toggleText');
const toggleAction = document.getElementById('toggleAction');
const message = document.getElementById('message');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const logoutBtn = document.getElementById('logoutBtn');

let isLoginMode = true;

// Toggle UI layout between Login mode and Register mode
toggleAction.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  message.textContent = '';
  authForm.reset();
  
  if (isLoginMode) {
    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Sign In';
    toggleText.textContent = "Don't have an account?";
    toggleAction.textContent = 'Register here';
  } else {
    formTitle.textContent = 'Register';
    submitBtn.textContent = 'Create Account';
    toggleText.textContent = 'Already have an account?';
    toggleAction.textContent = 'Login here';
  }
});

// Handle form submissions (Registration / Login network loops)
authForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevents default HTML page reload behavior
  message.textContent = '';

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const endpoint = isLoginMode ? `${API_URL}/login` : `${API_URL}/register`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    if (isLoginMode) {
      // Success: Route to dashboard view
      userEmailDisplay.textContent = data.user.email;
      authScreen.classList.add('hidden');
      dashboardScreen.classList.remove('hidden');
      authForm.reset();
    } else {
      // Success: Flash registration confirmation and switch to login interface
      message.className = 'success';
      message.textContent = 'Registration successful! Please sign in.';
      toggleAction.click(); 
    }
  } catch (err) {
    message.className = 'error';
    message.textContent = err.message;
  }
});

// Handle Logout action
logoutBtn.addEventListener('click', () => {
  dashboardScreen.classList.add('hidden');
  authScreen.classList.remove('hidden');
  message.className = 'error';
  message.textContent = '';
});
