// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/authService');

const protectRoute = (req, res, next) => {
  // Grab the token from the HTTP Authorization Header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token signature and expiration
    const verifiedData = jwt.verify(token, JWT_SECRET);
    req.user = verifiedData; // Attach user payload to the request object
    next(); // Pass control to the next function (the controller)
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = { protectRoute };
