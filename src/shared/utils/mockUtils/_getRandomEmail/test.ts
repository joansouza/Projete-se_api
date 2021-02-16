import getRandomEmail from '.';

describe('getRandomEmail', () => {
  it('should return a email address', () => {
    expect(
      getRandomEmail({ emailDomain: 'email.com' }).includes('@email.com')
    ).toBe(true);
  });
});
