"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidations = exports.updateDonorValidationSchema = exports.createDonorValidationSchema = void 0;
const zod_1 = require("zod");
const donor_constant_1 = require("./donor.constant");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    middleName: zod_1.z.string().max(20).optional(),
    lastName: zod_1.z.string().max(20),
});
exports.createDonorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        username: zod_1.z.string().max(20),
        age: zod_1.z.number(),
        name: createUserNameValidationSchema,
        gender: zod_1.z.enum([...donor_constant_1.Gender]),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email(),
        contactNo: zod_1.z.string(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloogGroup: zod_1.z.enum([...donor_constant_1.BloodGroup]),
        address: zod_1.z.any().optional(),
        wantToDonateBlood: zod_1.z.any()
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(20).optional(),
    middleName: zod_1.z.string().min(3).max(20).optional(),
    lastName: zod_1.z.string().min(3).max(20).optional(),
});
exports.updateDonorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: updateUserNameValidationSchema,
        gender: zod_1.z.enum([...donor_constant_1.Gender]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloogGroup: zod_1.z.enum([...donor_constant_1.BloodGroup]).optional(),
        address: zod_1.z.any().optional(),
        age: zod_1.z.number().optional(),
        wantToDonateBlood: zod_1.z.any().optional(),
    }),
});
exports.AdminValidations = {
    createDonorValidationSchema: exports.createDonorValidationSchema,
    updateDonorValidationSchema: exports.updateDonorValidationSchema,
};
