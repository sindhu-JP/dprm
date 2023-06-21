import dayjs from 'dayjs';
import moment from 'moment';

export const today = (format) => {
  return new dayjs().format(format || 'DD MMM YYYY');
};

export const todayMidnight = ({ format = 'DD MMM YYYY', startOf = 'day' }) => {
  return new dayjs().startOf(startOf).format(format);
};

export const midnightOn = ({ date, startOf = 'date' }) => {
  return new dayjs(date).startOf(startOf);
};

export const getISOStringComponents = (isoString) => {
  if (typeof isoString === 'string') {
    const parts = isoString.split('T');
    const date = parts[0];
    const time = parts[1];

    let hours = time.split(':')[0];
    let minutes = time.split(':')[1];
    let seconds = time.split(':')[2];

    const timezoneOffset = new Date().getTimezoneOffset();

    let offsetMinute = timezoneOffset % 60;
    let offsetHours = (timezoneOffset - offsetMinute) / 60;

    const finalTime = `${hours - offsetHours}:${
      minutes - offsetMinute
    }:${seconds}`;
  }
};

const getDateCalculation = (value) => {
  // var curr = new Date; // get current date
  // var first = curr.getDate() ; // First day is the day of the month - the day of the week
  // var last = first - value; // last day is the first day + 6

  // var firstday = new Date(curr.setDate(first)).toUTCString();
  // var lastday = new Date(curr.setDate(last)).toUTCString();
  if (value === 0 || value === 7) {
    var date = new Date();
    date.setDate(date.getDate() - 7);

    return {
      startDate: moment(date).format('YYYY-MM-DD'),

      endDate: moment(new Date()).format('YYYY-MM-DD')
    };
  } else {
    var todayDate = new Date().toISOString().slice(0, 10);
    var d = new Date(todayDate);
    d.setMonth(d.getMonth() - value);

    return {
      startDate: d.toISOString().slice(0, 10),

      endDate: todayDate
    };
  }
};

export default {
  today,
  midnightOn,
  todayMidnight,
  getISOStringComponents,
  getDateCalculation
};
