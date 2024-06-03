import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DonorServices } from './donor.service';

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DonorServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully',
    data: result,
  });
});


const getDonorByUsername = catchAsync(async (req, res) => {
  const { username } = req.params;
  const result = await DonorServices.getSingleDonorByUsernameFromDB(username);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donor is retrieved successfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await DonorServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateDonor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await DonorServices.updateDonorIntoDB(id, data,

    req.file,

  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donor is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DonorServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const DonorControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateDonor,
  getDonorByUsername
};
