import { Request, Response } from 'express';
import { getUserRepository } from '@models/User/repository';
import AppError from '@errors/AppError';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRep = getUserRepository();

    const user = await userRep.startSession(email, password);

    if (!user?.sessionData?.token) {
      throw new AppError({ message: 'Email ou senha incorretos' });
    }

    return res.json(user);
  }
}

export default new SessionController();
