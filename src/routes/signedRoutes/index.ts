import { Router } from 'express';
import defaultRoutes from './defaultRoutes';

const signedRoutes = Router();

signedRoutes.use('/default', defaultRoutes);

export default signedRoutes;
