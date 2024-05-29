import { Model } from 'mongoose';




export type TRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type TRequest = {
  id: string;

  donorId: string;
  requesterId: string;
  phoneNumber: string;
  dateOfDonation: string;
  hospitalName: string;
  hospitalAddress: string;
  reason: string;
  requestStatus: TRequestStatus;
};

export interface RequestModel extends Model<TRequest> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TRequest | null>;
}
