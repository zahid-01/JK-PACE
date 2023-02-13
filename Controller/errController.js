module.exports = (err, req, res, next) => {
  res.status(200).json({
    message: err.message,
    stack: err.stack,
  });
};
