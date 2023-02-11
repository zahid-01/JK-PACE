const User = require('../Model/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');
const Email = require('../utils/email');

const createSendToken = (id, res, statusCode, req, user) => {
  const token = jwt.sign(id, process.env.JWT_PAYLOAD);

  res.set('Access-Controll-Allow-Credentials', true);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'none',
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    // secure: true,
  });
  res.status(statusCode).json({
    data: {
      status: 'Success',
      message: 'Logged in successfully',
      token: token,
    },
  });
};

exports.signUp = catchError(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  await new Email(user, 'Welcome').sendWelcome(
    req.body.email,
    req.body.password
  );
  createSendToken(user.id, res, 200, req);
});

exports.logIn = catchError(async (req, res, next) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    return next(new createError('Provide Credentials', 501));
  const user = await User.findOne({ phone }).select('password');
  const check = await user?.verifyPassword(password, user.password);
  if (!user || !check) return next(new createError('Invalid credentials', 400));
  createSendToken(user.id, res, 200, req, user);
});

exports.updateMe = catchError(async (req, res, next) => {
  const me = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'Success',
    data: {
      data: me,
    },
  });
});

exports.protect = catchError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (req.headers.cookie) {
    token = req.headers.cookie.split('=')[1];
  }

  if (!token) {
    return next(new createError('Not Logged in'));
  }

  const verify = await jwt.verify(token, process.env.JWT_PAYLOAD);
  const user = await User.findById(verify);
  if (!user) return next(new createError('Login again', 400));

  req.user = user;
  next();
});

exports.verify = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new createError('You are not authorized', 400));
    }
    next();
  };
};

exports.forgotPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new createError('No user with that email found', 401));
  const resetToken = user?.genResetToken();
  await user.save({ runValidators: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/jkegov/user/resetPassword/${resetToken}`;

  try {
    await new Email(user, resetUrl).sendPasswordReset();

    res.status(200).json({
      status: 'Success',
      message: 'Token sent to your email',
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordReseTokenExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(new createError('Sending email failed', 500));
  }
});

exports.resetPassword = catchError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordReseTokenExpires: { $gt: Date.now() },
  });
  if (!user) return next(new createError('Invalid token', 403));

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new createError('Enter Password and Confirm Passsword', 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordReseTokenExpires = undefined;
  await user.save();

  createSendToken(user.id, res, 200, req, user);
});

exports.getMe = catchError(async (req, res) => {
  res.status(200).json({
    status: 'Success',
    user: req.user,
  });
});

exports.updatePassword = catchError(async (req, res) => {
  const password = req.body.password;

  req.user.password = password;
  req.user.save();

  res
    .status(200)
    .json({ status: 'Success', message: 'Password changed successfully' });
});
