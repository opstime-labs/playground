const sqlite3 = require('sqlite3').verbose();

// 1. Connect to the local file-based database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('Database connection failed:', err.message);
  else console.log('Connected to the SQLite database.');
});

// 2. Initialize the database table structure
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY,
      click_count INTEGER DEFAULT 0
    )
  `);

  db.get("SELECT COUNT(*) as count FROM stats", (err, row) => {
    if (row && row.count === 0) {
      db.run("INSERT INTO stats (id, click_count) VALUES (1, 0)");
    }
  });
});

// 3. Define helper functions to execute queries
const databaseActions = {
  // Fetch current count
  getCount: (callback) => {
    db.get("SELECT click_count FROM stats WHERE id = 1", callback);
  },

  // Increment and then fetch the new count
  incrementCount: (callback) => {
    db.run("UPDATE stats SET click_count = click_count + 1 WHERE id = 1", function(err) {
      if (err) return callback(err);
      // Fetch the updated value immediately after updating
      db.get("SELECT click_count FROM stats WHERE id = 1", callback);
    });
  }
};

// 4. Export the helper functions so server.js can use them
module.exports = databaseActions;
