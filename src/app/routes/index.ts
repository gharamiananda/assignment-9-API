import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

import { RequestRoutes } from '../modules/Request/request.route';
import { UserRoutes } from '../modules/User/user.route';
import { DonorRoutes } from '../modules/Donor/donor.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
 
  {
    path: '/admins',
    route: AdminRoutes,
  },
 
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/request',
    route: RequestRoutes,
  },
  {
    path: '/donors',
    route: DonorRoutes,
  },

  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
