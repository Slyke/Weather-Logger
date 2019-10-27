const { pad } = require('./pad');

const getTimeStamp = () => {
  return Math.floor(Date.now() / 1000);
};

const getYearMonth = (currentDate) => {
  const date = currentDate || new Date();

  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}`;
};

const getYearMonthDayHourMinuteSecond = (currentDate) => {
  const date = currentDate || new Date();
  const offset = date.getTimezoneOffset();
  const convertedDate = new Date(date.getTime() + (offset * 60 * 1000));
  const timeStr = `${date.getHours()}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`

  // return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}_${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`;
  return `${convertedDate.toISOString().split('T')[0]} ${timeStr}`;
};

module.exports = {
  getTimeStamp,
  getYearMonth,
  getYearMonthDayHourMinuteSecond
};
