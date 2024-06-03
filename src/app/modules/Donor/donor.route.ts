import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { DonorControllers } from './donor.controller';
import {  updateDonorValidationSchema } from './donor.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  DonorControllers.getAllAdmins,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  DonorControllers.getSingleAdmin,
);

router.get(
  '/donor-by-username/:username',
  // auth(),
  DonorControllers.getDonorByUsername,
);


router.patch(
  '/:id',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.superAdmin, USER_ROLE.donor),
  validateRequest(updateDonorValidationSchema),
  DonorControllers.updateDonor,
);

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  DonorControllers.deleteAdmin,
);

export const DonorRoutes = router;
