import _getRandomName, { _getRandomNameType } from '../_getRandomName';

export type _getRandomEmailType = _getRandomNameType & { emailDomain?: string };

function _getRandomEmail(options?: _getRandomEmailType) {
  const { separator = '', caseType = 'lowerCase', emailDomain = 'gmail.com' } =
    options || {};

  const fullName = _getRandomName({ separator, caseType }).fullName;

  const atSign = emailDomain?.[0] === '@' ? '' : '@';

  return fullName + atSign + emailDomain;
}

export default _getRandomEmail;
