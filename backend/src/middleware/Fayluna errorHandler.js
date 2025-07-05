// Centralized error-handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log detailed error in console

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { errorHandler };
