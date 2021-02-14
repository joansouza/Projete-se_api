import _maskUtilsHandleValue, {
  _maskUtilsValueType,
} from '../utils/_maskUtilsHandleValue';
import _maskUtilsHandleOptions, {
  _maskUtilsDefaultOptionsType,
} from '../utils/_maskUtilsHandleOptions';

function _handleSetCpfRegex(
  value: _maskUtilsValueType,
  options: _maskUtilsDefaultOptionsType
) {
  let v = _maskUtilsHandleValue(value);

  v = v.replace(/\D/g, '');

  if (v.length > 11) v = v.slice(0, 11);

  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  _maskUtilsHandleOptions(v, options);

  return v;
}

export default _handleSetCpfRegex;
