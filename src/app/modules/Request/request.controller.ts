import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from '../../utils/catchAsync';
import sendResponse from "../../utils/sendResponse";
import { RequestServices } from "./request.service";

const createRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestServices.createRequestIntoDB(req.user,req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Request successfully made",
        data: result
    })
});

const getMyDonorRequests = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestServices.getMyDonorRequestsFromDB(req.user);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Donation requests retrieved successfully",
        data: result
    })
});

const updateStatusRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestServices.updateStatusRequestIntoDB(req.params.requestId, req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Donation request status successfully updated",
        data: result
    })
});


const donorFilterableFields = ['bloodType', 'searchTerm', 'bloodType','availability'];

const getDonorList: RequestHandler = catchAsync(async (req: Request, res: Response) => {
   
  const result =
  await RequestServices.getDonorListFromDB(req.query);
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Academic departments are retrieved successfully',
  meta: result.meta,
  data: result.result,
});
})

export const RequestController = {
    createRequest,
    getMyDonorRequests,
    updateStatusRequest,
    getDonorList
};