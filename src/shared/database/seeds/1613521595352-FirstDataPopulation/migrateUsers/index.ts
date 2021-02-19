import RoleEntity from '@models/Role/entity';
import UserRepository from '@models/User/repository';
import createUserMock from '@models/User/utils/createUserMock';
import { EntityManager } from 'typeorm';

type dataType = {
  roles: RoleEntity[];
};

async function migrateUsers(transaction: EntityManager, data: dataType) {
  const { roles } = data;

  const userRepository = transaction.getCustomRepository(UserRepository);

  const users = [
    await createUserMock(
      {
        name: 'Rafael Rudá Rocha Cordeiro Guedes',
        email: 'rrocha.rafael@gmail.com',
        birthday: '1992-03-24',
        roles,
      },
      {
        entityManager: transaction,
      }
    ),
  ];

  await userRepository.save(users);

  return users;
}

export default migrateUsers;
