import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RequestController } from './request.controller';
import { statusValidationSchemas } from './request.validation';

const router = express.Router();

router.post(
    '/donation-request',
    auth(),
    validateRequest(statusValidationSchemas.createRequest),

    RequestController.createRequest
);


router.get(
    '/donation-request',
    auth(),
    RequestController.getMyDonorRequests
);



router.get(
    '/donation-request-to-me',
    auth(),
    RequestController.getRequestsToMe
);


router.put(
    '/donation-request/:requestId',
    auth(),
    validateRequest(statusValidationSchemas.updateStatusRequest),

    RequestController.updateStatusRequest
);


router.get(
    '/my-donation-request-approved-or-not',
    auth(),

    RequestController.getMyAnyRequestpprovedOrNot
);

router.get(
    '/donor-list',
    // auth(),
    RequestController.getDonorList
);





export const RequestRoutes = router;