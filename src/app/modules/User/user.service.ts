/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { TDonor } from '../Donor/donor.interface';
import { Donor } from '../Donor/donor.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateDonorId,
} from './user.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { donorFilterableFields } from '../Request/request.constant';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from './user.constant';

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newDonor = await Admin.create([payload], { session });

    if (!newDonor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newDonor;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createDonorIntoDB = async (
  file: any,
  payload: TDonor,
) => {

  // create a user object
  const userData: Partial<TUser> = {};

 

  //set student role
  userData.role = 'donor';
  userData.username = payload.username;
  userData.password = payload.password;


  //set admin email
  userData.email = payload.email;

 
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateDonorId();
  console.log('userData', {userData})


    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinaryresult
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // console.log('newUser', newUser)

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create donor');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; 
    


    console.log('payload', payload)

    // create a admin (transaction-2)
    const newDonor = await Donor.create([{...payload,role:'donor'}], { session });

    if (!newDonor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create donor');
    }

    await session.commitTransaction();
    await session.endSession();
console.log('newdonor', newDonor)
    return newDonor;
  } catch (err: any) {

    console.log('err', err)
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'donor') {
    result = await Donor.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  if (role === USER_ROLE.superAdmin) {
    result = await User.findOne({ id: userId })
  }


  return result;
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};





const getDonorListFromDB = async ( query: Record<string, unknown>,currentUser:JwtPayload) => {

console.log('currentUser?.userId ', currentUser?.userId )


  const academicDepartmentQuery = new QueryBuilder(
    Donor.find({ id: { $ne: currentUser?.userId } ,wantToDonateBlood:true,availability:true}
    ),
    query,
  )
    .search(donorFilterableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return {
    meta,
    result,
  };
};





const getUsersListFromDB = async ( query: Record<string, unknown>,currentUser:JwtPayload) => {
  
  
    const academicDepartmentQuery = new QueryBuilder(
      User.find({ id: { $ne: currentUser?.userId }}),
      query,
    )
      .search(donorFilterableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await academicDepartmentQuery.modelQuery;
    const meta = await academicDepartmentQuery.countTotal();
  
    return {
      meta,
      result,
    };
  };

export const UserServices = {
  getDonorListFromDB,
  createDonorIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
  getUsersListFromDB
};
