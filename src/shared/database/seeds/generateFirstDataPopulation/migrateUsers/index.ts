import UserRepository from '@models/User/repository';
import createUserMock from '@models/User/utils/createUserMock';
import { EntityManager } from 'typeorm';
import migrateRoleBasedAccessControl from './migrateRoleBasedAccessControl';

async function migrateUsers(transaction: EntityManager) {
  const roles = await migrateRoleBasedAccessControl(transaction);

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
