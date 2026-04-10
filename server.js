
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
