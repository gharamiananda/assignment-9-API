/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../User/user.model";
import { donorFilterableFields } from "./request.constant";
import { TRequestStatus } from "./request.interface";
import { Request } from "./request.model";


const createRequestIntoDB = async (currentUser:Record<string,unknown>,payload: any) => {

    console.log('payload', payload)
    const donarUserData = await User.findOne({id:payload.donorId});


    console.log('currentUser', currentUser)
    const createdRequestData= await Request.create({
     
            donorId: payload.donorId,
            phoneNumber: payload.phoneNumber,
            dateOfDonation: payload.dateOfDonation,
            hospitalName: payload.hospitalName,
            hospitalAddress: payload.hospitalAddress,
            reason: payload.reason,
            requesterId:currentUser?.userId as string,
            bloogGroup:payload.bloogGroup,
            requesterName:payload.requesterName,

            donorName:payload.donorName
        
    });
    return {
        requestData :createdRequestData,
        donor: donarUserData

        

    };
};



const getMyDonorRequestsFromDB = async (currentUser:JwtPayload) => {

   
    const request = await Request.find({ requesterId: currentUser.userId as string});

    return request;
};


const getRequestsToMeFromDB = async (currentUser:JwtPayload) => {
console.log('currentUser', currentUser)
   
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






const getAnyRequestsApprovedOrNotFromDB = async (currentUser:JwtPayload) => {
  console.log('currentUser', currentUser)
     
    const request = await Request.find({ requesterId: currentUser.userId as string,requestStatus:'APPROVED'});
  
    return request;
  };
  

const updateStatusRequestIntoDB = async (requestId:string,payload:{status:TRequestStatus}) => {

    const request = await Request.findByIdAndUpdate(requestId,{requestStatus:payload?.status},{
      new:true,

    });

    return {request };
};

export const RequestServices = {
    createRequestIntoDB,
    getMyDonorRequestsFromDB,
    updateStatusRequestIntoDB,
    getDonorListFromDB,
    getRequestsToMeFromDB,
    getAnyRequestsApprovedOrNotFromDB
}