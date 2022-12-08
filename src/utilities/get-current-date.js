function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const checkValue = value => (value < 10 ? `0${value}` : `${value}`);
  return `${checkValue(year)}-${checkValue(month)}-${checkValue(day)}`;
}

module.exports = getCurrentDate;
