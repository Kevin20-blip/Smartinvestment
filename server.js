const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// TEMP DATABASE (for now)
let users = [];

// SECRET KEY
const JWT_SECRET = "mysecretkey";

// REGISTER
app.post("/register", async (req, resconst express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// TEMP DATABASE (for now)
let users = [];

// SECRET KEY
const JWT_SECRET = "mysecretkey";

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword,
    balance: 0
  };

  users.push(newUser);

  res.json({ message: "Registered successfully" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
});

// DASHBOARD (protected)
app.get("/dashboard", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

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

app.liste
});
