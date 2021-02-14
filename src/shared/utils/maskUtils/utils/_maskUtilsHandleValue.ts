export type _maskUtilsValueType = string | number;

function _maskUtilsHandleValue(value: _maskUtilsValueType) {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value) || '';
  } else {
    return '';
  }
}

export default _maskUtilsHandleValue;
