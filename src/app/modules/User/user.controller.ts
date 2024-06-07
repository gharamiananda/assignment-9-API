import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { Request, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';




const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
const createDonor = catchAsync(async (req, res) => {
  const  donorData  = req.body;

  const [result] = await UserServices.createDonorIntoDB(
    req.file,
   
   donorData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donor is created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});




const getDonorList: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  let user:JwtPayload={}

  console.log('req.body', req.body)

  try {
    if(token){


      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    
      user=decoded
      req.user = decoded as JwtPayload & { role: string };
      }
    
    
  } catch (error) {
    user={}
  }


  // checking if the given token is valid
 


  const result =
  await UserServices.getDonorListFromDB(req.query,user);
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Donors are retrieved successfully',
  meta: result.meta,
  data:{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donors are retrieved successfully',
    meta: result.meta,
    data: result.result},
});
})





const getUsersList: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result =
  await UserServices.getUsersListFromDB(req.query,req.user);
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Users are retrieved successfully',
  meta: result.meta,
  data:{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved successfully',
    meta: result.meta,
    data: result.result},
});
})




export const UserControllers = {

  createDonor,
  createAdmin,
  getMe,
  changeStatus,
  getDonorList,
  getUsersList
};
