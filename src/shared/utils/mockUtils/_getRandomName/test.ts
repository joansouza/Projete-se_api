import getRandomName from '.';

describe('getRandomName', () => {
  it('should return a valid aaaa', () => {
    const { fullName, name1, name2 } = getRandomName() || {};

    expect(name1.length > 0).toBe(true);
    expect(name2.length > 0).toBe(true);
    expect(fullName).toBe(`${name1} ${name2}`);
  });
});
