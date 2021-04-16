import RoleEntity from '@models/Role/entity';
import UserRepository from '@models/User/repository';
import { UserPropertiesType } from '@models/User/types';
import createUserMock from '@models/User/utils/createUserMock';
import { EntityManager } from 'typeorm';

type dataType = {
  roles: RoleEntity[];
};

async function migrateUsers(transaction: EntityManager, data: dataType) {
  const { roles } = data;

  const userRepository = transaction.getCustomRepository(UserRepository);

  async function userFactory(data: UserPropertiesType) {
    return createUserMock(
      {
        roles,
        ...data,
      },
      {
        entityManager: transaction,
      }
    );
  }

  const users = [
    await userFactory({
      name: 'Rafael Rudá Rocha Cordeiro Guedes',
      email: 'rrocha.rafael@gmail.com',
      birthday: '1992-03-24',
    }),
    await userFactory({
      name: 'Joan de Souza Pereira',
      email: 'joanpereira@edu.unifor.br',
      birthday: '2000-01-01',
    }),
    await userFactory({
      name: 'Rômulo Sérgio Rodrigues Evangelista',
      email: 'rsrevan2000zsx@gmail.com',
      birthday: '2000-01-01',
    }),
    await userFactory({
      name: 'Daniel Teixeira Do Carmo',
      email: 'danielt.docarmo@gmail.com',
      birthday: '2000-01-01',
    }),
  ];

  await userRepository.save(users);

  return users;
}

export default migrateUsers;
