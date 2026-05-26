

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "EIF-websitehp")));

// Simple in-memory accounts
const accounts = {
    Br: "123",
    bob: "secure456",
    charlie: "mypassword"
};

// Login route
app.post("/login", (req, res) => {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    // Check if fields are empty
    if (!username || !password) {
        return res.send(`
            <h2>❌ Please enter both username and password.</h2>
            <a href="/">Go Back</a>
        `);
    }

    // Check if username exists
    if (!accounts[username]) {
        return res.send(`
            <h2>❌ Username not found.</h2>
            <a href="/">Try Again</a>
        `);
    }

    // Check if password matches
    if (accounts[username] !== password) {
        return res.send(`
            <h2>❌ Incorrect password.</h2>
            <a href="/">Try Again</a>
        `);
    }

    // Success → redirect to timetable
    return res.redirect("/User1timetable.html");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});