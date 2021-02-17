import { Router } from 'express';
import signedRoutes from './signedRoutes';
import unsignedRoutes from './unsignedRoutes';

import userAuthenticationMiddleware from '@middlewares/userAuthenticationMiddleware';
import getRolePermissions from '@services/roleBasedAccessControl/getRolePermissions';

const routes = Router();

routes.post('/teste', async (req, res) => {
  const role = await getRolePermissions(req?.body?.roleId);

  return res.json(role);
});

routes.use('/signed', userAuthenticationMiddleware, signedRoutes);
routes.use(unsignedRoutes);

export default routes;
