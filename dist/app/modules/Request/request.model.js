"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
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
            values: ['PENDING', 'APPROVED', 'REJECTED'],
            message: '{VALUE} is not a valid blood group',
        },
        default: 'PENDING'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});
exports.Request = (0, mongoose_1.model)('Request', requestSchema);
