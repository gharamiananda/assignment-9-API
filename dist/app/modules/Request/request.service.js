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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../User/user.model");
const request_constant_1 = require("./request.constant");
const request_model_1 = require("./request.model");
const createRequestIntoDB = (currentUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const donarUserData = __rest(yield user_model_1.User.findOne({ id: payload.donorId }), []);
    const createdRequestData = yield request_model_1.Request.create({
        data: {
            donorId: payload.donorId,
            phoneNumber: payload.phoneNumber,
            dateOfDonation: payload.dateOfDonation,
            hospitalName: payload.hospitalName,
            hospitalAddress: payload.hospitalAddress,
            reason: payload.reason,
            requesterId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId
        }
    });
    return Object.assign(Object.assign({}, createdRequestData), { donor: donarUserData });
});
const getMyDonorRequestsFromDB = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield request_model_1.Request.find({ donorId: currentUser.userId });
    return request;
});
const getDonorListFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentQuery = new QueryBuilder_1.default(request_model_1.Request.find(), query)
        .search(request_constant_1.RequestSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield academicDepartmentQuery.modelQuery;
    const meta = yield academicDepartmentQuery.countTotal();
    return {
        meta,
        result,
    };
});
const updateStatusRequestIntoDB = (requestId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield request_model_1.Request.findOneAndUpdate({ id: requestId }, { requestStatus: payload === null || payload === void 0 ? void 0 : payload.status });
    return { request };
});
exports.RequestServices = {
    createRequestIntoDB,
    getMyDonorRequestsFromDB,
    updateStatusRequestIntoDB,
    getDonorListFromDB
};
