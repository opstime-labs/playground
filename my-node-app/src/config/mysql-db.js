const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0
});

// 2. Open the connection and test it
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('🚀 Successfully connected to the Dockerized MySQL database!');

});

  // 3. Optional: Run a test query to confirm it works
  db.query('SELECT 1 + 1 AS solution', (queryErr, results) => {
    if (queryErr) throw queryErr;
    console.log('✅ Test query solution is:', results[0].solution);    
  });

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );
`;

// Run the schema setup right on startup
db.query(createTableQuery, (err) => {
  if (err) {
    console.error('❌ Failed to verify or create users table:', err.message);
  } else {
    console.log('✅ Users table structure verified successfully!');
  }
});

module.exports = db;