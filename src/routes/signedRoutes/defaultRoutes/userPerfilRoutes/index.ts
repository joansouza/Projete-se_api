import { Router } from 'express';
import uploaderMiddleware from '@middlewares/uploaderMiddleware';
import AvatarController from './AvatarController';
import PasswordController from './PasswordController';
import PerfilController from './PerfilController';
import SessionController from './SessionController';
import UserRatingController from './UserRatingController';

const userPerfilRoutes = Router();

userPerfilRoutes.get('/meuPerfil', PerfilController.show);
userPerfilRoutes.put('/meuPerfil', PerfilController.update);

userPerfilRoutes.put('/minhaSessao', SessionController.update);
userPerfilRoutes.delete('/minhaSessao', SessionController.destroy);

userPerfilRoutes.put(
  '/meuAvatar',
  uploaderMiddleware({ imageOnly: true }).single('file'),
  AvatarController.update
);

userPerfilRoutes.put('/meuPassword', PasswordController.update);

userPerfilRoutes.put('/userRating', UserRatingController.store);

export default userPerfilRoutes;
