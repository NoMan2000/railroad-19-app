// @flow

export const colors = {
  red: {
    red: '#D82C26',
    medium: '#DF4A41',
    // Ask about this one, this is wrong by the spec
    heading: '#F12B15',
    dark: '#9B2827',
    ultra_dark: '#D82C26', // This is the most commonly used color.
    administration: '#D72C25',
    asterisk: '#D9001B'
  },
  white: {
    primary: '#FFFFFF',
    ultraWhite: 'ghostwhite'
  },
  black: {
    light: '#333333',
    dark: '#2E1807'
  },
  grey: {
    light: '#FAFCFD',
    lightBlue: '#F4F7FC',
    medium: '#E0E8F7',
    darkerBlue: '#757A8C',
    dark: '#6C7A97'
  },
  blue: {
    light: '#45B8EC',
    lightText: '#3ea6d3',
    mediumLight: '#069cdd',
    medium: '#1F94CB',
    dark: '#6395B1'
  },
  beige: {
    light: '#F8F3EB',
    medium: '#E9D498',
    dark: '#ECA533',
    administrationColor: '#E8D496'
  },
  green: {
    light: '#6BD82C'
  }
};

export const hex2rgba = (hex: string, alpha: number = 1) => {
  const match = hex.match(/\w\w/g);
  if (match) {
    const [r, g, b] = match.map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return '';
};

export default colors;
