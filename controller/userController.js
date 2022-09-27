const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../model/userModel');
const createSendToken = require('../utils/jwtToken');

//Register User
exports.registerUser = catchAsync(async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    country,
    phone,
    role,
  } = req.body;
  const user = await User.create({
    firstName,
    middleName,
    lastName,
    email,
    password,
    country,
    phone,
    role,
  });
  createSendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new AppError('Please provide email or password', 400));
  }
  const user = await User.findOne({ email: email, role: role }).select(
    '+password'
  );
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isPasswordValid = user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new AppError('Invalid email or password', 401));
  }
  createSendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie('token', null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
