import { Router } from 'express';
import CreateUserController from './CreateUserController';
import SessionController from './SessionController';

const unsignedRoutes = Router();

unsignedRoutes.post('/createUser', CreateUserController.store);

unsignedRoutes.post('/session', SessionController.store);

export default unsignedRoutes;
