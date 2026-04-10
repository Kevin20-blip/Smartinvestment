const express = require("express");
const app = express();

// Required for Render
const PORT = process.env.PORT || 3000;

// Basic route
app.get("/", (req, res) => {
  res.send("🚀 Smart Investment Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
