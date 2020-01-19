// @flow
import moment from 'moment';
import 'moment-timezone';

export const DEFAULT_FORMAT = 'MM/DD/YYYY';

export const convertDateToString = (time: Date | string): string => {
  return time instanceof Date ? time.toISOString() : time;
};

export const convertToHumanReadable = (
  time: string | Date,
  format: string = DEFAULT_FORMAT
): string => {
  time = convertDateToString(time);
  return time ? moment(time).format(format) : '';
};

export const dateInPast = (
  time: {
    years?: number,
    months?: number,
    days?: number
  } = {
    years: 0,
    months: 0,
    days: 0
  },
  refDate?: string
) => {
  let { years = 0, days = 0, months = 0 } = time;
  const date = refDate ? new Date(Date.parse(refDate)) : new Date();
  const newDate = moment(date);
  if (days) {
    newDate.subtract(days, 'days');
  }
  if (months) {
    newDate.subtract(months, 'months');
  }
  if (years) {
    newDate.subtract(years, 'years');
  }
  return newDate.toDate();
};

export { moment };
