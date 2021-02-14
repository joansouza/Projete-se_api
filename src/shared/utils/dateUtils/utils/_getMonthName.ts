export type _getMonthNameOptionsT = {
  digits?: number;
};

function _getMonthName(
  /** Range from 0 to 11 */
  month: number,
  options?: _getMonthNameOptionsT
) {
  const { digits } = options || {};

  function checkName(name: string) {
    if (digits) {
      return name.slice(0, digits);
    }

    return name;
  }

  switch (month) {
    case 0:
      return checkName('Janeiro');
    case 1:
      return checkName('Fevereiro');
    case 2:
      return checkName('Março');
    case 3:
      return checkName('Abril');
    case 4:
      return checkName('Maio');
    case 5:
      return checkName('Junho');
    case 6:
      return checkName('Julho');
    case 7:
      return checkName('Agosto');
    case 8:
      return checkName('Setembro');
    case 9:
      return checkName('Outubro');
    case 10:
      return checkName('Novembro');
    case 11:
      return checkName('Dezembro');
    default:
      return undefined;
  }
}

export default _getMonthName;
