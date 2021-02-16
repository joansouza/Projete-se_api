import getRandomBirthday from '.';

describe('getRandomBirthday', () => {
  it('should return a valid birthday date', () => {
    const { asString, dayString, monthString, yearString, year } =
      getRandomBirthday()?.fromOne || {};
    expect(dayString >= 0 || dayString <= 31).toBe(true);
    expect(monthString > 1 || monthString <= 12).toBe(true);
    expect(typeof year).toBe('number');
    expect(asString).toBe(`${yearString}-${monthString}-${dayString}`);
  });
});
