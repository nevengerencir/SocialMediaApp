const express = require("express");
const path = require('path')
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

const cookieParser = require("cookie-parser");
const colors = require("colors");
const errorHandler = require("../backend/middelware/errorHandler.js");
const cors = require("cors");
const { urlencoded } = require("body-parser");

const users = require("./routes/userRoutes");
const posts = require("./routes/postRoutes");
const comments = require("./routes/commentRoutes");

const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(urlencoded({ extended: false }));

// setting up my routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comment", comments);


// Serve Frontend
if(process.env.NODE_ENV === 'production'){
  // Setting build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req,res)=> res.sendFile(__dirname,'../', 'frontend', 'build','index.html'))
} else {
  app.get('/', (req,res)=>{
    res.status(200).json({
      message: 'Welcome to my Social Media app'
    })
  })
}

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
