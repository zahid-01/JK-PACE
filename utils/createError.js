module.exports = class createError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
};

// module.exports = class AppError extends Error {
//   constructor(statusCode, message) {
//     super(message);

//     this.statusCode = statusCode;
//     Error.captureStackTrace(this, this.constructor);
//   }
// };
