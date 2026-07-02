// src/app.js

//Load the environment variables from the .env file immediately
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authController = require('./controllers/authController');

const app = express();
app.use(cors()); // Allows browser fetch requests
app.use(express.json());
 
// Show a welcome message
/*app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});*/

// Serve static frontend files from a folder named 'web' in the root directory
app.use(express.static(path.join(__dirname, '../web')));

// API Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server }; // Export for testing purposes
