// @flow
import * as React from 'react';
import { DateDropdown } from './DateDropdown';
import { mount } from 'enzyme';
import type { DateDropdownProps } from './DateDropdown';

const defaultProps: DateDropdownProps = {
  handleChange: jest.fn(),
  defaultValue: 'data',
  name: 'checkbox',
  label: 'checkbox',
  sideBar: false,
  showCalendar: true,
  handleShowCalendar: jest.fn(),
  handleHideCalendar: jest.fn(),
  selectedDateRangePreset: 'currentMonth',
  onSelectedDateRangePresetChange: jest.fn(),
  readOnly: false,
  displayValue: 'date',
  placeholder: '',
  placement: 'top',
  className: ''
};
let props = {};

const createMount = (newProps: DateDropdownProps = {}) => {
  props = { ...defaultProps, ...newProps };
  return mount(<DateDropdown {...props} />);
};

describe('DateDropdown.jsx', () => {
  it('Can mount successfully', () => {
    createMount();
  });
});
