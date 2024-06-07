import { Schema, model } from 'mongoose';
import { RequestModel, TRequest } from './request.interface';
import { BloodGroup } from '../Donor/donor.constant';


const requestSchema = new Schema<TRequest, RequestModel>(
  {
 
    donorId: {
      type: String,
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },requesterName: {
      type: String,
      required: true,
    },
    
    
    requesterId: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dateOfDonation: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    hospitalAddress: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    bloogGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    requestStatus: {
      type: String,
      enum: {
        values: ['PENDING' , 'APPROVED' , 'REJECTED'],
        message: '{VALUE} is not a valid blood group',
      },
      default:'PENDING'
    }
  
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Request = model<TRequest, RequestModel>('Request', requestSchema);
