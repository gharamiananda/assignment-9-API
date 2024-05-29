"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donor = void 0;
const mongoose_1 = require("mongoose");
const donor_constant_1 = require("./donor.constant");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
});
const donorSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    donorRequests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            unique: true,
            ref: 'User',
        }],
    requesterRequests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            unique: true,
            ref: 'User',
        }],
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: donor_constant_1.Gender,
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
        type: String,
    },
    bloogGroup: {
        type: String,
        enum: {
            values: donor_constant_1.BloodGroup,
            message: '{VALUE} is not a valid blood group',
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String, default: '' },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// generating full name
donorSchema.virtual('fullName').get(function () {
    var _a, _b, _c;
    return (((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) +
        '' +
        ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName) +
        '' +
        ((_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName));
});
// filter out deleted documents
donorSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
donorSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
donorSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
//checking if user is already exist!
donorSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Donor.findOne({ id });
        return existingUser;
    });
};
exports.Donor = (0, mongoose_1.model)('Donor', donorSchema);
