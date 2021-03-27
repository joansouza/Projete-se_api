function passwordValidator(password?: string) {
  const result = {
    isValid: false,
    invalidMessage:
      'A senha precisa ter pelo menos 6 caracteres, devendo conter letras e números.',
  };
  if (typeof password === 'string' && password.length >= 6) {
    const regularExpression = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])');

    result.isValid = regularExpression.test(String(password).toLowerCase());
    if (result.isValid) {
      result.invalidMessage = '';
    }
  }
  return result;
}

export default passwordValidator;
