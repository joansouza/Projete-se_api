import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AppError from '@errors/AppError';
import { getUserRepository } from '@models/User/repository';

class PasswordController {
  async update(req: Request, res: Response) {
    const { id } = req.user;
    const { newPassword, oldPassword } = req.body;
    const userRep = getUserRepository();

    const user = await userRep.findOne({
      where: { id },
      select: ['id', 'password'],
    });

    if (
      !(user?.password && (await bcrypt.compare(oldPassword, user.password)))
    ) {
      throw new AppError({ message: 'Incorrect old password' });
    }

    user.password = newPassword;

    await userRep.save(user);

    const refreshUser = await userRep.findOne(id);

    delete refreshUser?.password;

    return res.json(refreshUser);
  }
}

export default new PasswordController();
