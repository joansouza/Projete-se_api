export type _maskUtilsDefaultOptionsType = {
  maxLength?: number;
};

function _maskUtilsHandleOptions(
  newValue: string,
  options: _maskUtilsDefaultOptionsType
) {
  const { maxLength } = options || {};

  if (maxLength && newValue.length > maxLength) {
    newValue = newValue.slice(0, maxLength);
  }
}

export default _maskUtilsHandleOptions;
