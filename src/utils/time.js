const { pad } = require('./pad');

const getTimeStamp = () => {
  return Math.floor(Date.now() / 1000);
};

const getYearMonth = (currentDate) => {
  const date = currentDate || new Date();

  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}`;
};

const getYearMonthDayHourMinuteSecond = (currentDate) => {
  let date = currentDate || new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() + (offset*60*1000));

  // return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}_${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`;
  return `${date.toISOString().split('T')[0]} ${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`;
};

module.exports = {
  getTimeStamp,
  getYearMonth,
  getYearMonthDayHourMinuteSecond
};
