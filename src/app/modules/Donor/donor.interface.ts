import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TDonor = {
  id: string;
  user: Types.ObjectId;
  username: string;
  password: string;
age:number;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloogGroup?: TBloodGroup;
  address: Record<string,unknown>;


  profileImg?: string;
  availability:boolean;
  wantToDonateBlood:boolean;
  // donorRequests  :  Types.ObjectId;
  // requesterRequests: Types.ObjectId
};

export interface DonorModel extends Model<TDonor> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TDonor | null>;
}
