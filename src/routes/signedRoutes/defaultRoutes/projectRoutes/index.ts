import { Router } from 'express';
// import uploaderMiddleware from '@middlewares/uploaderMiddleware';
import ProjectController from './ProjectController';
import ProjectProposalController from './ProjectProposalController';

const userPerfilRoutes = Router();

userPerfilRoutes.get('/project', ProjectController.index);
userPerfilRoutes.get('/project/:id', ProjectController.show);
userPerfilRoutes.post('/project', ProjectController.store);
userPerfilRoutes.put('/project/:id', ProjectController.update);
userPerfilRoutes.delete('/project/:id', ProjectController.destroy);

userPerfilRoutes.get('/projectProposal', ProjectProposalController.index);
userPerfilRoutes.get('/projectProposal/:id', ProjectProposalController.show);
userPerfilRoutes.post('/projectProposal', ProjectProposalController.store);
userPerfilRoutes.put('/projectProposal/:id', ProjectProposalController.update);
userPerfilRoutes.delete(
  '/projectProposal/:id',
  ProjectProposalController.destroy
);

// userPerfilRoutes.put(
//   '/meuAvatar',
//   uploaderMiddleware({ imageOnly: true }).single('file'),
//   AvatarController.update
// );

export default userPerfilRoutes;
