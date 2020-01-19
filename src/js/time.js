// @flow
import moment from 'moment';
import 'moment-timezone';

export const DEFAULT_FORMAT = 'MM/DD/YYYY';
export const BROWSER_TIME_FORMAT = 'YYYY-MM-DD';

export const formatTime = (
  time: string | Date = new Date().toISOString(),
  format: string = DEFAULT_FORMAT
) => {
  if (typeof time === 'object') {
    time = time.toISOString();
  }
  return moment(time).format(format);
};

export const formatFromBrowserTime = (
  time: string | Date,
  fromFormat: string = BROWSER_TIME_FORMAT,
  toFormat: string = DEFAULT_FORMAT
) => {
  if (typeof time === 'object') {
    time = time.toISOString();
  }
  return moment(time, fromFormat).format(toFormat);
};

export const toBrowserTimeFormat = (time: string | Date) => {
  if (typeof time === 'object') {
    time = time.toISOString();
  }
  return moment(time).format(BROWSER_TIME_FORMAT);
};

export { moment };
export default formatTime;
