"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const admin_validation_1 = require("../Admin/admin.validation");
const donor_validation_1 = require("../Donor/donor.validation");
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-donor', 
// auth(USER_ROLE.superAdmin, USER_ROLE.admin),
sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(donor_validation_1.createDonorValidationSchema), user_controller_1.UserControllers.createDonor);
router.post('/create-admin', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
router.post('/change-status/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(user_validation_1.UserValidation.changeStatusValidationSchema), user_controller_1.UserControllers.changeStatus);
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), user_controller_1.UserControllers.getMe);
exports.UserRoutes = router;
