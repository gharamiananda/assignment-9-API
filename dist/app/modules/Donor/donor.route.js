"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const donor_controller_1 = require("./donor.controller");
const donor_validation_1 = require("./donor.validation");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), donor_controller_1.DonorControllers.getAllAdmins);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), donor_controller_1.DonorControllers.getSingleAdmin);
router.get('/donor-by-username/:username', 
// auth(),
donor_controller_1.DonorControllers.getDonorByUsername);
router.patch('/:id', sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.donor), (0, validateRequest_1.default)(donor_validation_1.updateDonorValidationSchema), donor_controller_1.DonorControllers.updateDonor);
router.delete('/:adminId', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin), donor_controller_1.DonorControllers.deleteAdmin);
exports.DonorRoutes = router;
