// import User from '@models/User';

interface IUserSeed {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  birthday?: string;
  avatarId?: string;
  cpf?: string;
}

/**
 * Utilize o size abaixo com 8 saltos para gerar uma senha criptografada.
 * https://bcrypt-generator.com/
 */

const commonUser = {
  /**
   * password: "123qwe!@#"
   */
  password: '$2y$08$DhiikOQJ7.2xaIJacbeCsO3GxywjHKgVOz.I7gC63vkoHv8GHeCHq',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userSeeds: IUserSeed[] = [
  {
    ...commonUser,
    name: 'Rafael Rudá Rocha Cordeiro Guedes',
    email: 'rrocha.rafael@gmail.com',
    password: '$2y$08$8PjZ8eHO4B39HiBVMzxAQeZwN7ke8LSS1nJQRqZvJhICtkRsirDhe',
    birthday: '1992-03-24',
  },
];

export default userSeeds;
