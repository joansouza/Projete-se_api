import AppError from '@errors/AppError';
import { getUserRepository } from '@models/User/repository';
import maskUtils from '@utils/maskUtils';
import { Request, Response } from 'express';

class UserController {
  async store(req: Request, res: Response) {
    const userData: { [key: string]: unknown } = req.body;

    const userRep = getUserRepository();

    const checkUser = await userRep.findOne({
      where: [
        { email: userData?.email },
        { cpf: maskUtils.setOnlyNumber(userData?.cpf) },
      ],
    });

    if (checkUser?.id) {
      const sameEmail = checkUser?.email === userData?.email;
      const message = `Já existe um usuário com esse ${
        sameEmail ? 'email' : 'cpf'
      }`;

      throw new AppError({
        message,
        statusCod: 400,
        userFriendly: true,
      });
    }

    const user = userRep.create(userData);

    await userRep.save(user);

    delete user.password;

    return res.json(user);
  }
}

export default new UserController();
