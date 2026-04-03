const express = require("express");
const app = express();

// Use PORT from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
res.send(`     <h1>🚀portfolio  DevOps CI/CD Pipeline Working!</h1>     <p>Application successfully deployed using Jenkins, Docker & AWS</p>     <p><b>Version:</b> v1</p>
  `);
});

// Health check (important for real-world apps)
app.get("/health", (req, res) => {
res.status(200).send("OK");
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
