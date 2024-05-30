import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../User/user.model";
import { donorFilterableFields } from "./request.constant";
import { TRequestStatus } from "./request.interface";
import { Request } from "./request.model";


const createRequestIntoDB = async (currentUser:Record<string,unknown>,payload: any) => {

    console.log('payload', payload)
    const donarUserData = await User.findById(payload.donorId);


    console.log('donarUserData', donarUserData)
    const createdRequestData= await Request.create({
     
            donorId: payload.donorId,
            phoneNumber: payload.phoneNumber,
            dateOfDonation: payload.dateOfDonation,
            hospitalName: payload.hospitalName,
            hospitalAddress: payload.hospitalAddress,
            reason: payload.reason,
            requesterId:currentUser?._id as string
        
    });
    return {
        requestData :createdRequestData,
        donor: donarUserData

        

    };
};



const getMyDonorRequestsFromDB = async (currentUser:JwtPayload) => {

   
    const request = await Request.find({ donorId: currentUser.userId as string});

    return request;
};


const getDonorListFromDB = async ( query: Record<string, unknown>) => {



  const academicDepartmentQuery = new QueryBuilder(
    Request.find(),
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



const updateStatusRequestIntoDB = async (requestId:string,payload:{status:TRequestStatus}) => {

    const request = await Request.findOneAndUpdate({ id: requestId},{requestStatus:payload?.status});

    return {request };
};
export const RequestServices = {
    createRequestIntoDB,
    getMyDonorRequestsFromDB,
    updateStatusRequestIntoDB,
    getDonorListFromDB
}