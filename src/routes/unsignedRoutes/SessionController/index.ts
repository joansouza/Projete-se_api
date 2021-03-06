import { Request, Response } from 'express';
import { getUserRepository } from '@models/User/repository';
import AppError from '@errors/AppError';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRep = getUserRepository();

    const user = await userRep.startSession(res, { email, password });
    const { clientToken, serverToken } = user?.sessionData || {};

    if (!user || !clientToken || !serverToken) {
      throw new AppError({
        message: 'Email ou senha incorretos',
        statusCod: 404,
      });
    }

    await userRep.save(user);

    return res.json(user);
  }
}

export default new SessionController();
