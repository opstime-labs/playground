const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware to allow the backend to read JSON data sent from the frontend
app.use(express.json());

// Serve static frontend files (html, css, js) from a folder named 'web' in the root directory
app.use(express.static(path.join(__dirname, '../frontend')));

// A simple in-memory backend variable to track total global clicks
let globalClickCount = 0;

// 2. Create an API endpoint to GET the current click count
app.get('/api/clicks', (req, res) => {
  res.json({ totalClicks: globalClickCount });
});

// 3. Create an API endpoint to POST/increment the click count
app.post('/api/clicks/increment', (req, res) => {
  globalClickCount += 1;
  res.json({ totalClicks: globalClickCount });
});

// 4. Start the server on port 3001
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
