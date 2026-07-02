// src/repositories/userRepositorydb.js
const db = require('../config/db');

// Finds a record matching the unique email string
const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    
    db.get(query, [email], (err, row) => {
      if (err) return reject(err);
      resolve(row); // returns undefined if not found, or the user object
    });
  });
};

// Inserts a new user record into the SQLite data table
const save = (userObject) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (id, email, password) VALUES (?, ?, ?)`;
    const params = [userObject.id, userObject.email, userObject.password];

    db.run(query, params, function (err) {
      if (err) return reject(err);
      resolve(userObject);
    });
  });
};

module.exports = { findByEmail, save };
