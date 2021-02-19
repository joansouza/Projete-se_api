import { Router } from 'express';
import basicUserRoutes from './basicUserRoutes';

const signedRoutes = Router();

signedRoutes.use('basicUser', basicUserRoutes);

export default signedRoutes;
