
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database(":memory:");

app.get("/search", (req, res) => {
  const username = req.query.username;

  // Intentionally vulnerable: untrusted input enters SQL.
  const query =
    "SELECT * FROM users WHERE username = '" +
    username +
    "'";

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send("Query failed");
    }
    res.json(rows);
  });
});

module.exports = app;
