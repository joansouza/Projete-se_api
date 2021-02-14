import { Router } from 'express';
import signedRoutes from './signedRoutes';
import unsignedRoutes from './unsignedRoutes';

import userAuthenticationMiddleware from './_infra/middlewares/userAuthenticationMiddleware';

const routes = Router();

routes.use('/signed', userAuthenticationMiddleware, signedRoutes);
routes.use(unsignedRoutes);

export default routes;
