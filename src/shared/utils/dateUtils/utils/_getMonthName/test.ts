import _getMonthName from '.';

describe('getMonthName', () => {
  it('should return "Março" when given value equal as 2', () => {
    expect(_getMonthName(2)).toBe('Março');
  });
  it('should return "undefined" when given value different from range 0 to 11', () => {
    expect(_getMonthName(50)).toBe(undefined);
    expect(_getMonthName(-1)).toBe(undefined);
  });
});
