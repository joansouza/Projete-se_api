import { getCustomRepository } from 'typeorm';
import UserRepository from '@models/User/UserRepository';
import { Request, Response } from 'express';

class CreateUserController {
  async store(req: Request, res: Response) {
    const userData: { [key: string]: unknown } = req.body;

    const userRep = getCustomRepository(UserRepository);

    const user = userRep.create(userData);

    await userRep.save(user);

    delete user.password;

    return res.json(user);
  }
}

export default new CreateUserController();
