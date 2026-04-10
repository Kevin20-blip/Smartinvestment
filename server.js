const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const JWT_SECRET = "secret123";

// Fake DB
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

// AUTH MIDDLEWARE
function auth(req, res, next) {
const token = req.headers.authorization;

if (!token) {
return res.status(401).json({ message: "No token" });
}

try {
const decoded = jwt.verify(token, JWT_SECRET);
req.userId = decoded.id;
next();
} catch {
res.status(401).json({ message: "Invalid token" });
}
}

// PROFILE
app.get("/profile", auth, (req, res) => {
const user = users.find(u => u.id === req.userId);

res.json({
email: user.email,
balance: user.balance
});
});

// DEPOSIT
app.post("/deposit", auth, (req, res) => {
const { amount } = req.body;

const user = users.find(u => u.id === req.userId);

user.balance += Number(amount);

res.json({ balance: user.balance });
});

// WITHDRAW
app.post("/withdraw", auth, (req, res) => {
const { amount } = req.body;

const user = users.find(u => u.id === req.userId);

if (user.balance < amount) {
return res.status(400).json({ message: "Insufficient funds" });
}

user.balance -= Number(amount);

res.json({ balance: user.balance });
});

// HOME
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("🚀 Server running on port " + PORT);
});
