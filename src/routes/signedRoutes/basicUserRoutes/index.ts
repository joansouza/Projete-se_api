import { Router } from 'express';
import userPerfilRoutes from './userPerfilRoutes';

const basicUserRoutes = Router();

basicUserRoutes.use(userPerfilRoutes);

export default basicUserRoutes;
