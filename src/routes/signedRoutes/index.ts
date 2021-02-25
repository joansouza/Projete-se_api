import { Router } from 'express';
import defaultRoutes from './defaultRoutes';

const signedRoutes = Router();

signedRoutes.use(defaultRoutes);

export default signedRoutes;
