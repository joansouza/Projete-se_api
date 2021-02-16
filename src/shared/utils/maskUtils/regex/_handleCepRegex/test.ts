import handleCepRegex from '.';

describe('handleCepRegex', () => {
  it('should return "72235-204" when given value equal as "72235204"', () => {
    expect(handleCepRegex('72235204')).toBe('72235-204');
  });
});
