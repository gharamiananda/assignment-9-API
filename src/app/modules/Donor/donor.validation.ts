import { z } from 'zod';
import { BloodGroup, Gender } from './donor.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20).optional(),
  lastName: z.string().max(20),
});

export const createDonorValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    username: z.string().max(20),
    age: z.number(),

   
    name: createUserNameValidationSchema,
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string().optional(),
    bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
    address :z.any().optional()  ,
    
    wantToDonateBlood:z.any()
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateDonorValidationSchema = z.object({
  body: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      address :z.any().optional()  ,

      age: z.number().optional(),
      wantToDonateBlood:z.any().optional(),
 
  }),
});

export const AdminValidations = {
  createDonorValidationSchema,
  updateDonorValidationSchema,
};
