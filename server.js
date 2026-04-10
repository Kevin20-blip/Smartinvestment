const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "public")));

const JWT_SECRET = "secret123";

// Fake database
const users = [
{
id: 1,
email: "test@example.com",
password: "1234",
balance: 1000
}
];

// LOGIN
app.post("/login", (req, res) => {
const { email, password } = req.body;

const user = users.find(
u => u.email === email && u.password === password
);

if (!user) {
return res.status(401).json({ message: "Invalid credentials" });
}

const token = jwt.sign({ id: user.id }, JWT_SECRET);

res.json({ token });
});

// PROFILE
app.get("/profile", (req, res) => {
const token = req.headers.authorization;

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
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("🚀 Server running on port " + PORT);
});
