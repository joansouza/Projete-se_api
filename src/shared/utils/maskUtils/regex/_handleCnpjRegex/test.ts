import handleSetCpfRegex from '.';

describe('handleSetCpfRegex', () => {
  it('should return "52.675.098/0001-80" when given value equal as "52675098000180"', () => {
    expect(handleSetCpfRegex('52675098000180')).toBe('52.675.098/0001-80');
  });
});
