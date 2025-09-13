export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};
