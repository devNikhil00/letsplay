const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db/connection");

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello from CommonJS backend!");
});

