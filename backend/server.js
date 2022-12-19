const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const users = require("./routes/users");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const errorHandler = require("../backend/middelware/errorHandler.js");
const cors = require("cors");

const { urlencoded } = require("body-parser");

const PORT = process.env.PORT || 8000;

const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(urlencoded({ extended: false }));

// setting up my routes
app.use("/api/users", users);
app.use(errorHandler);

app.listen(PORT || 8000, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(`server...`.rainbow);

// Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`.red.bold);
  //Close server and exit process
  server.close(() => process.exit(1));
});
