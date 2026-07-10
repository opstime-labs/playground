// src/repositories/userRepositorymysqldb.js
const db = require('../config/mysql-db');

// Finds a record matching the unique email string
const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    
    // MySQL uses db.query instead of db.get
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      
      // MySQL always returns an array of rows. 
      // If found, return the first element. If empty, return undefined.
      resolve(results[0]); 
    });
  });
};

// Inserts a new user record into the MySQL data table
const save = (userObject) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (id, email, password) VALUES (?, ?, ?)`;
    const params = [userObject.id, userObject.email, userObject.password];

    // MySQL uses db.query instead of db.run
    db.query(query, params, (err, result) => {
      if (err) return reject(err);
      resolve(userObject);
    });
  });
};

module.exports = { findByEmail, save };
