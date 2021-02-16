import createUserMock from '@models/User/utils/createUserMock';

async function getUserSeeds() {
  return [
    await createUserMock({
      name: 'Rafael Rudá Rocha Cordeiro Guedes',
      email: 'rrocha.rafael@gmail.com',
      birthday: '1992-03-24',
    }),
  ];
}

export default getUserSeeds;
