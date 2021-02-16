import _getRandomDate from '../_getRandomDate';

function _getRandomBirthday(maxAge = 100) {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - maxAge);

  const randomDate = _getRandomDate(startDate);
  const year = randomDate.getUTCFullYear();
  const month = randomDate.getUTCMonth();
  const day = randomDate.getUTCDate();

  function getData(fromOne: boolean) {
    function handleDateNumber(numb: number) {
      return numb > 9 ? numb : `0${numb}`;
    }

    const addNumb = fromOne ? 1 : 0;

    return {
      asString: `${year}-${handleDateNumber(
        month + addNumb
      )}-${handleDateNumber(day)}`,
      year,
      yearString: `${year}`,
      month: month + addNumb,
      monthString: handleDateNumber(month + addNumb),
      day,
      dayString: handleDateNumber(day),
    };
  }

  return {
    asDate: randomDate,
    fromOne: getData(true),
    fromZero: getData(false),
  };
}

export default _getRandomBirthday;
