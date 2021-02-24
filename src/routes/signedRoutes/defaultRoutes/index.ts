import { Router } from 'express';
import userPerfilRoutes from './userPerfilRoutes';

const defaultRoutes = Router();

defaultRoutes.use(userPerfilRoutes);

export default defaultRoutes;
