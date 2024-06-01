import { TBloodGroup, TGender } from "../Admin/admin.interface";

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
  'A_POSITIVE'
 , 'A_NEGETIVE'
 , 'B_POSITIVE'
 , 'B_NEGETIVE'
 , 'AB_POSITIVE'
 , 'AB_NEGETIVE'
 , 'O_POSITIVE'
 , 'O_NEGETIVE'
];

export const AdminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
