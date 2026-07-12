const express = require('express');
const path = require('path');
const app = express();
// Import the database actions module
const dbActions = require('./sqlite-db'); 
const PORT = 3001;

app.use(express.json());

// Serve static frontend files (html, css, js) from a folder named 'web' in the root directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API Endpoint: Fetch count from database module
app.get('/api/clicks', (req, res) => {
  dbActions.getCount((err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ totalClicks: row ? row.click_count : 0 });
  });
});

// API Endpoint: Increment count using database module
app.post('/api/clicks/increment', (req, res) => {
  dbActions.incrementCount((err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ totalClicks: row ? row.click_count : 0 });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
