// src/controllers/authController.js
const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await authService.registerUser(email, password);
    return res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.log(`Error in register controller: ${error.message} ${error.stack}`);
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sessionData = await authService.loginUser(email, password);
    return res.status(200).json({ message: 'Login successful', user: sessionData });
  } catch (error) {
    console.log(`Error in login controller: ${error.message} ${error.stack}`);
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };
