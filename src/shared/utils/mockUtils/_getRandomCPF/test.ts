import cpfValidator from '../../../validators/cpfValidator';
import getRandomCPF from '.';

describe('getRandomCPF', () => {
  it('should return a valid cpf', () => {
    expect(cpfValidator(getRandomCPF())).toBe(true);
  });
});
