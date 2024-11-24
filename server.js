const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./config/connectDb");

// config dot env file
dotenv.config();

// database call
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1/users", require("./routes/userRoute"));

// Serve static files from 'Client/public' directory in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Client", "public")));

  // Serve the index.html file for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client", "public", "index.html"));
  });
}

// port
const PORT = process.env.PORT || 8080;

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
