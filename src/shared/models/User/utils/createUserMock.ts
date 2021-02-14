import mockUtils from 'shared/utils/mockUtils';

interface IUserSeed {
  name?: string;
  email?: string;
  password?: string;
  birthday?: string;
  avatarId?: string;
  cpf?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * password: "123qwe!@#"
 */
function createUserMock(data: IUserSeed) {
  const { fullName, name1, name2 } = mockUtils.getRandomName();

  return {
    name: fullName,
    email: `${name1.toLowerCase()}${name2.toLowerCase()}@gmail.com`,
    birthday: '1992-03-24',
    cpf: mockUtils.getRandomCPF(),
    password: '$2y$08$DhiikOQJ7.2xaIJacbeCsO3GxywjHKgVOz.I7gC63vkoHv8GHeCHq',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  };
}

export default createUserMock;
