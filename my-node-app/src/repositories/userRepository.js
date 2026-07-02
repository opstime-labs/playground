// src/repositories/userRepository.js
const { usersTable } = require('../config/table');

const findByEmail = async (email) => {
  return usersTable.find(user => user.email === email);
};

const save = async (userObject) => {
  usersTable.push(userObject);
  return userObject;
};

module.exports = { findByEmail, save };
