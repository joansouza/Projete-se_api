import { Request, Response } from 'express';
import AppError from '@errors/AppError';
import { getUserRepository } from '@models/User/repository';

class PerfilController {
  async show(req: Request, res: Response) {
    return res.json(req.user);
  }

  async update(req: Request, res: Response) {
    const { id, avatarId, password, ...rest } = req.body;

    const userRep = getUserRepository();

    if (!req?.user?.id) {
      throw new AppError({ message: 'User not found', statusCod: 404 });
    }

    await userRep.save(Object.assign({}, req.user, rest));

    const user = await userRep.findOne(req.user.id);

    delete user?.password;

    return res.json(user);
  }
}

export default new PerfilController();
