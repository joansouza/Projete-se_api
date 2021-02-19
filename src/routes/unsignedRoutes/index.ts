import { Router } from 'express';
import UserController from './UserController';
import SessionController from './SessionController';

const unsignedRoutes = Router();

unsignedRoutes.post('/user', UserController.store);

unsignedRoutes.post('/session', SessionController.store);

export default unsignedRoutes;
