const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// TEMP STORAGE (server memory)
let investmentData = {
  portfolio: 0,
  profit: 0
};

// GET data
app.get("/api", (req, res) => {
  res.json(investmentData);
});

// POST (save data)
app.post("/api", (req, res) => {
  const { portfolio, profit } = req.body;

  investmentData = {
    portfolio,
    profit
  };

  res.json({ message: "Saved successfully ✅" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
