import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {

  console.log('eq.body', req.body)
  const result = await AuthServices.loginUser(req.body);
  const { bloodAssigRefreshToken, accessToken, needsPasswordChange,id } = result;

  // res.cookie('bloodAssigRefreshToken', bloodAssigRefreshToken, {
  //   secure: false,
  //   httpOnly: true,
  //   sameSite: 'none',
  //   maxAge: 1000 * 60 * 60 * 24 * 365,
  // });

  const cookieOptions = {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  };

  res.cookie('bloodAssigRefreshToken', bloodAssigRefreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
    message: 'User is logged in successfully!',

      accessToken,
      needsPasswordChange,
      bloodAssigRefreshToken,
      id
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

const bloodAssigRefreshToken = catchAsync(async (req, res) => {
  const { bloodAssigRefreshToken } = req.cookies;
  const result = await AuthServices.bloodAssigRefreshToken(bloodAssigRefreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  const result = await AuthServices.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  bloodAssigRefreshToken,
  forgetPassword,
  resetPassword,
};
