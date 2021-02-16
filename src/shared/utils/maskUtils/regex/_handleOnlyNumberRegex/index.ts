import _maskUtilsHandleValue, {
  _maskUtilsValueType,
} from '../../utils/_maskUtilsHandleValue';
import _maskUtilsHandleOptions, {
  _maskUtilsDefaultOptionsType,
} from '../../utils/_maskUtilsHandleOptions';

function _handleSetOnlyNumberRegex(
  value: _maskUtilsValueType,
  options?: _maskUtilsDefaultOptionsType
) {
  let v = _maskUtilsHandleValue(value);

  v = v.replace(/\D+/g, '');

  _maskUtilsHandleOptions(v, options);

  return v;
}

export default _handleSetOnlyNumberRegex;
