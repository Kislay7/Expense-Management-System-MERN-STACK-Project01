const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require("path");

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

// Serve static files from the React app (if any)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Client", "build")));

  // Serve the index.html for any routes that are not API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client", "build", "index.html"));
  });
}

// port
const PORT = process.env.PORT || 8080;

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
