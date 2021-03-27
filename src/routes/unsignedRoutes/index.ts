import { Router } from 'express';
import UserController from './UserController';
import SessionController from './SessionController';
import CityController from './CityController';
import StateController from './StateController';
import DistrictController from './DistrictController';

const unsignedRoutes = Router();

unsignedRoutes.post('/user', UserController.store);

unsignedRoutes.post('/session', SessionController.store);

unsignedRoutes.get('/state', StateController.index);
unsignedRoutes.get('/city', CityController.index);
unsignedRoutes.get('/district', DistrictController.index);

export default unsignedRoutes;
