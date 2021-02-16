import AppError from '@errors/AppError';
import { getUserRepository } from '@models/User/repository';
import createUserMock from '@models/User/utils/createUserMock';
import { Request, Response } from 'express';

class CreateUserController {
  async store(req: Request, res: Response) {
    // const userData: { [key: string]: unknown } = req.body;

    const userRep = getUserRepository();

    const userMock = await createUserMock();
    const user = userRep.create(userMock);

    if (!user) {
      throw new AppError({ message: 'Error on user creation' });
    }
    await userRep.save(user);

    delete user.password;

    return res.json(user);
  }
}

export default new CreateUserController();
