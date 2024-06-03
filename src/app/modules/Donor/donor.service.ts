/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdminSearchableFields } from '../Admin/admin.constant';
import { Admin } from '../Admin/admin.model';
import { User } from '../User/user.model';
import { Donor } from './donor.model';
import { TDonor } from './donor.interface';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};


const getSingleDonorByUsernameFromDB = async (username: string) => {
  const result = await Donor.findOne({username:username});
  return result;
};


const updateDonorIntoDB = async (id: string, payload: Partial<TDonor>,file:any) => {

  console.log('payload upadte', payload,id)
  const {username, name,email,id:customId, user,...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (file) {
    const imageName = `${id}${payload?.name?.firstName}`;
    const path = file?.path;
    //send image to cloudinaryresult
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    modifiedUpdatedData.profileImg = secure_url as string;
  }
  console.log('modifiedUpdatedData', modifiedUpdatedData)

  const result = await Donor.findOneAndUpdate({id: id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const DonorServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateDonorIntoDB,
  getSingleDonorByUsernameFromDB,
  deleteAdminFromDB,
};
