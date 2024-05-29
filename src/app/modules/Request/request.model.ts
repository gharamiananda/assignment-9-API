import { Schema, model } from 'mongoose';
import { RequestModel, TRequest } from './request.interface';


const requestSchema = new Schema<TRequest, RequestModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    donorId: {
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
