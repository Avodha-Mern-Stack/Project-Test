const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection

try {
  mongoose.connect(process.env.MONGODB_URI + process.env.DB_NAME);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

// Routes
app.use("/api/items", require("./routes/items"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Server is Running on Test Purpose")
});
