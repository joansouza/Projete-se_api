import handlePhoneRegex from '.';

describe('handlePhoneRegex', () => {
  it('should return "(85) 12345-6789" when given value equal as "85123456789"', () => {
    expect(handlePhoneRegex('85123456789')).toBe('(85) 12345-6789');
  });
});
