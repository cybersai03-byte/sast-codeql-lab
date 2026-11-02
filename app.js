
const express = require("express");

const app = express();

// Demonstration only: deliberately unsafe query construction.
// Do not connect this example to a real database.
app.get("/user", (req, res) => {
  const userId = req.query.id;

  const query =
    "SELECT * FROM users WHERE id = '" + userId + "'";

  console.log("Constructed SQL:", query);
  res.json({ message: "Demo only" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
