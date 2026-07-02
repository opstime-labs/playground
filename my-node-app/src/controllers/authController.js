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
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // authService.loginUser returns { user, token }
    const result = await authService.loginUser(email, password); 
    
    // Ensure you are sending the ENTIRE result (including the token) back to the browser!
    return res.status(200).json({ 
      message: 'Login successful', 
      user: result.user, 
      token: result.token 
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };
