"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusValidationSchemas = void 0;
const zod_1 = require("zod");
const donor_constant_1 = require("../Donor/donor.constant");
const createRequest = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string({
            required_error: 'donorId field is required.',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber field is required.',
        }),
        dateOfDonation: zod_1.z.string({
            required_error: 'dateOfDonation field is required.',
        }),
        hospitalName: zod_1.z.string({
            required_error: 'hospitalName field is required.',
        }),
        hospitalAddress: zod_1.z.string({
            required_error: 'hospitalAddress field is required.',
        }),
        reason: zod_1.z.string({
            required_error: 'reason field is required.',
        }),
        donorName: zod_1.z.string({
            required_error: 'reason field is required.',
        }), requesterName: zod_1.z.string({
            required_error: 'reason field is required.',
        }),
        bloogGroup: zod_1.z.enum([...donor_constant_1.BloodGroup]),
    }),
});
const updateStatusRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...Object.values(['PENDING', 'APPROVED', 'REJECTED'])]),
    }),
});
exports.statusValidationSchemas = {
    createRequest,
    updateStatusRequest,
};
