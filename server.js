const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "your_secret_key";

// Dummy users (replace with DB later)
const users = [
  { id: 1, email: "test@example.com", balance: 1000 }
];

// Protected route
app.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      email: user.email,
      balance: user.balance
    });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// HOME
app.get("/", (req, res) => {
  res.send("🚀 SmartInvest AUTH running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
