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
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    const result = yield user_service_1.UserServices.createAdminIntoDB(req.file, password, adminData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin is created successfully',
        data: result,
    });
}));
const createDonor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donorData = req.body;
    const [result] = yield user_service_1.UserServices.createDonorIntoDB(req.file, donorData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Donor is created successfully',
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield user_service_1.UserServices.getMe(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is retrieved successfully',
        data: result,
    });
}));
const changeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserServices.changeStatus(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Status is updated successfully',
        data: result,
    });
}));
const getDonorList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    let user = {};
    console.log('req.body', req.body);
    try {
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            user = decoded;
            req.user = decoded;
        }
    }
    catch (error) {
        user = {};
    }
    // checking if the given token is valid
    const result = yield user_service_1.UserServices.getDonorListFromDB(req.query, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Donors are retrieved successfully',
        meta: result.meta,
        data: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Donors are retrieved successfully',
            meta: result.meta,
            data: result.result
        },
    });
}));
const getUsersList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getUsersListFromDB(req.query, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users are retrieved successfully',
        meta: result.meta,
        data: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Users are retrieved successfully',
            meta: result.meta,
            data: result.result
        },
    });
}));
exports.UserControllers = {
    createDonor,
    createAdmin,
    getMe,
    changeStatus,
    getDonorList,
    getUsersList
};
