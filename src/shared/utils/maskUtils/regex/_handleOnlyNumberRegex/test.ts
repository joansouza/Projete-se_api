import handleOnlyNumberRegex from '.';

describe('handleOnlyNumberRegex', () => {
  it('should return "12345" when given value equal as "1.2-3!4a5"', () => {
    expect(handleOnlyNumberRegex('1.2-3!4a5')).toBe('12345');
  });
});
