import setCpf from './regex/_handleCpfRegex';
import setCnpj from './regex/_handleCnpjRegex';
import setPhone from './regex/_handlePhoneRegex';
import setCep from './regex/_handleCepRegex';
import setOnlyNumber from './regex/_handleOnlyNumberRegex';

export { default as setCpf } from './regex/_handleCpfRegex';
export { default as setCnpj } from './regex/_handleCnpjRegex';
export { default as setPhone } from './regex/_handlePhoneRegex';
export { default as setCep } from './regex/_handleCepRegex';
export { default as setOnlyNumber } from './regex/_handleOnlyNumberRegex';

export default {
  setCpf,
  setCnpj,
  setPhone,
  setCep,
  setOnlyNumber,
};
