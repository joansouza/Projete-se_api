import { Request, Response } from 'express';
import { getUserRepository } from '@models/User/repository';
import AppError from '@errors/AppError';
import destroyClientSession from '@services/destroyClientSession';

class SessionController {
  async update(req: Request, res: Response) {
    const userRep = getUserRepository();

    const user = req.user;
    user.updateSession(res);
    const { clientToken, serverToken } = user?.sessionData || {};

    if (!clientToken || !serverToken) {
      throw new AppError({
        message: 'Não foi possível criar os tokens de validação',
      });
    }

    await userRep.save(user);

    return res.json(user);
  }

  async destroy(req: Request, res: Response) {
    destroyClientSession(res);

    return res.json({ message: 'Session destroyed' });
  }
}

export default new SessionController();
