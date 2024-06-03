import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A_POSITIVE'
  | 'A_NEGETIVE'
  | 'B_POSITIVE'
  | 'B_NEGETIVE'
  | 'AB_POSITIVE'
  | 'AB_NEGETIVE'
  | 'O_POSITIVE'
  | 'O_NEGETIVE';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
