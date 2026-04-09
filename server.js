
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
