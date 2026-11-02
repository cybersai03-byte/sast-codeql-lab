
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { rateLimit } = require("express-rate-limit");

const app = express();
const db = new sqlite3.Database(":memory:");

// Maximum 10 requests per minute per client
const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later."
  }
});

app.get("/search", searchLimiter, (req, res) => {
  const username = req.query.username;

  // Secure parameterized SQL query
  const query =
    "SELECT * FROM users WHERE username = ?";

  db.all(query, [username], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Database query failed"
      });
    }

    res.json(rows);
  });
});

module.exports = app;
