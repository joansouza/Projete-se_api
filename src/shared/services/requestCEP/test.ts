import requestCEP from '.';

describe('requestCEP', () => {
  it('should be true without mask value', async () => {
    const data = await requestCEP('60060170').catch(() => undefined);
    expect(data?.uf).toBe('CE');
  });
});
