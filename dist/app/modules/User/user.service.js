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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const admin_model_1 = require("../Admin/admin.model");
const donor_model_1 = require("../Donor/donor.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createAdminIntoDB = (file, password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = 'admin';
    //set admin email
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        if (file) {
            const imageName = `${userData.id}${(_a = payload === null || payload === void 0 ? void 0 : payload.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
            const path = file === null || file === void 0 ? void 0 : file.path;
            //send image to cloudinary
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            payload.profileImg = secure_url;
        }
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newDonor = yield admin_model_1.Admin.create([payload], { session });
        if (!newDonor.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newDonor;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createDonorIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // create a user object
    const userData = {};
    console.log('userData', { userData, payload });
    //set student role
    userData.role = 'donor';
    userData.username = payload.username;
    userData.password = payload.password;
    //set admin email
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        if (file) {
            const imageName = `${userData.id}${(_b = payload === null || payload === void 0 ? void 0 : payload.name) === null || _b === void 0 ? void 0 : _b.firstName}`;
            const path = file === null || file === void 0 ? void 0 : file.path;
            //send image to cloudinary
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            payload.profileImg = secure_url;
        }
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newDonor = yield donor_model_1.Donor.create([payload], { session });
        if (!newDonor.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newDonor;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getMe = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'donor') {
        result = yield donor_model_1.Donor.findOne({ id: userId }).populate('user');
    }
    if (role === 'admin') {
        result = yield admin_model_1.Admin.findOne({ id: userId }).populate('user');
    }
    return result;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.UserServices = {
    createDonorIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus,
};
