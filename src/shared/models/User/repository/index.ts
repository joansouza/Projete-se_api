import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import UserEntity from '../entity';
import bcrypt from 'bcryptjs';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async startSession(
    email: string,
    password: string
  ): Promise<UserEntity | undefined> {
    const select: any = this.metadata.columns.map((e) => e.propertyName);

    const user = await this.findOne({ where: { email }, select });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      delete user.password;

      user.updateSession();

      await this.save(user);

      return user;
    }
  }
}

export default UserRepository;

export function getUserRepository() {
  return getCustomRepository(UserRepository);
}
