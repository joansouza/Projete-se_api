import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import UserEntity from '../entity';
import bcrypt from 'bcryptjs';
import { Response } from 'express';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async startSession(
    response: Response,
    { email, password }: { email: string; password: string }
  ): Promise<UserEntity | undefined> {
    const select: any = this.metadata.columns.map((e) => e.propertyName);

    const user = await this.findOne({ where: { email }, select });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      delete user.password;

      user.updateSession(response);

      return user;
    }
  }
}

export default UserRepository;

export function getUserRepository() {
  return getCustomRepository(UserRepository);
}
