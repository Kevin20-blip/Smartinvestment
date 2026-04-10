const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API route
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "Smart Investment API is working 🚀"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
