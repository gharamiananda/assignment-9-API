import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../User/user.model";
import { RequestSearchableFields } from "./request.constant";
import { TRequestStatus } from "./request.interface";
import { Request } from "./request.model";


const createRequestIntoDB = async (currentUser:Record<string,unknown>,payload: any) => {

    const {...donarUserData} = await User.findOne({id: payload.donorId});

    const createdRequestData= await Request.create({
        data: {
            donorId: payload.donorId,
            phoneNumber: payload.phoneNumber,
            dateOfDonation: payload.dateOfDonation,
            hospitalName: payload.hospitalName,
            hospitalAddress: payload.hospitalAddress,
            reason: payload.reason,
            requesterId:currentUser?.userId as string
        }
    });
    return {
        ...createdRequestData,
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
    .search(RequestSearchableFields)
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