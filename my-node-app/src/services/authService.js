// src/repositories/userRepositorymysqldb.js
const dbType = process.env.DB_TYPE || 'sqlite'; // Defaults to sqlite if not set
const bcrypt = require('bcryptjs');

let userRepository;
if (dbType === 'mysql') {
  console.log('📦 App Architecture: Using MySQL Repository Layer');
  userRepository = require('../repositories/userRepositorymysqldb');
} else {
  console.log('📦 App Architecture: Using SQLite Repository Layer');
  userRepository = require('../repositories/userRepositorydb'); // Your original SQLite file
}



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
