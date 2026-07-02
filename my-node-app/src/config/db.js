// src/config/db.js

// Create empty table (array) for users.
// const usersTable = []; 
// module.exports = { usersTable };

const sqlite3 = require('sqlite3').verbose(); // verbose gives richer stack traces
const path = require('path');

// Creates a file named database.sqlite in your root directory
const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database successfully.');
  }
});

// Run a DDL script to initialize the table if it does not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

module.exports = db;


