import cpfValidator from '.';

describe('cpfValidator', () => {
  it('should be true without mask value', () => {
    expect(cpfValidator('39225474008')).toBe(true);
  });

  it('should be true with mask value', () => {
    expect(cpfValidator('392.254.740-08')).toBe(true);
  });

  it('should be false without mask value', () => {
    expect(cpfValidator('391.254.740-08')).toBe(false);
  });

  it('should be false with mask value', () => {
    expect(cpfValidator('391.254.740-08')).toBe(false);
  });
});
