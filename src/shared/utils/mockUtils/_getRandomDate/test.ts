import getRandomDate from '.';

describe('getRandomDate', () => {
  it('should return a valid date', () => {
    const thisDate = getRandomDate('1992-03-24')?.getUTCMilliseconds();
    const minDate = new Date('1992-03-24').getUTCMilliseconds();
    const maxDate = new Date().getUTCMilliseconds();
    expect(thisDate >= minDate || thisDate <= maxDate).toBe(true);
  });
});
