// src/services/authService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

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
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return { id: user.id, email: user.email }; // Never return the hashed password
};

module.exports = { registerUser, loginUser };
