"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.getAllAdmins);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.getSingleAdmin);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(admin_validation_1.updateAdminValidationSchema), admin_controller_1.AdminControllers.updateAdmin);
router.delete('/:adminId', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin), admin_controller_1.AdminControllers.deleteAdmin);
exports.AdminRoutes = router;
