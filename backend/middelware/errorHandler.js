const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  if (err.code === 11000) {
    error = new ErrorResponse("Invalid credentials", 400);
  }
  console.log(error.message);
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = errorHandler;
