import createTestConnection from '@database/createTestConnection';
import createUserMock from '@models/User/utils/createUserMock';
import { getUserRepository } from '@models/User/repository/index';

describe('cpfValidator', () => {
  createTestConnection();

  it('should be false with mask value', async () => {
    const userRepository = getUserRepository();
    const userMock = await createUserMock();

    const user = userRepository.create(userMock);

    await userRepository.save(user);

    expect(user.name).toBe(userMock.name);
  });
});
