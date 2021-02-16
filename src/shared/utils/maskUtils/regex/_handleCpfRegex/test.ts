import handleCepRegex from '.';

describe('handleCepRegex', () => {
  it('should return "849.242.340-44" when given value equal as "84924234044"', () => {
    expect(handleCepRegex('84924234044')).toBe('849.242.340-44');
  });
});
