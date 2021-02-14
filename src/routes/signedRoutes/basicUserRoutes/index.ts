import { Router } from 'express';
import perfilRoutes from './perfilRoutes';

const userRoutes = Router();

userRoutes.use('/perfil', perfilRoutes);

export default userRoutes;
