import { Router } from 'express';
import uploaderMiddleware from '@middlewares/uploaderMiddleware';
import AvatarController from './AvatarController';
import PasswordController from './PasswordController';
import PerfilController from './PerfilController';
import SessionController from './SessionController';

const userPerfilRoutes = Router();

userPerfilRoutes.get('/user', PerfilController.show);
userPerfilRoutes.put('/user', PerfilController.update);

userPerfilRoutes.put('/session', SessionController.update);
userPerfilRoutes.delete('/session', SessionController.destroy);

userPerfilRoutes.put(
  '/userAvatar',
  uploaderMiddleware({ imageOnly: true }).single('file'),
  AvatarController.update
);

userPerfilRoutes.put('/userPassword', PasswordController.update);

export default userPerfilRoutes;
