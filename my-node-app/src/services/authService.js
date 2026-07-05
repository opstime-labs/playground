// src/services/authService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken'); // Import JWT
const JWT_SECRET = process.env.JWT_SECRET || 'local_development_fallback_key';

const registerUser = async (email, password) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash password (Like BCryptPasswordEncoder in Spring Security)
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword
  };

  return await userRepository.save(newUser);
};

const loginUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  // Generate a security badge containing the user's ID that expires in 1 hour
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return { 
    user: { id: user.id, email: user.email }, 
    token // Send the token back to the frontend
  };
};

module.exports = { registerUser, loginUser, JWT_SECRET };
