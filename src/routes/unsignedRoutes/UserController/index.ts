import AppError from '@errors/AppError';
import { getUserRepository } from '@models/User/repository';
import { Request, Response } from 'express';

class UserController {
  async store(req: Request, res: Response) {
    const userData: { [key: string]: unknown } = req.body;

    const userRep = getUserRepository();

    const user = userRep.create(userData);

    if (!user) {
      throw new AppError({ message: 'Error on user creation' });
    }

    await userRep.save(user);

    delete user.password;

    return res.json(user);
  }
}

export default new UserController();
