function _getRandomDate(start: Date | string, end?: Date | string) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

export default _getRandomDate;
