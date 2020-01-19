// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { PrimaryButton } from './PrimaryButton';
import type { ButtonProps } from '../../../../__test__/testTypes';

const defaultProps = {
  value: '1',
  onClick: jest.fn(),
  color: 'black',
  background: 'white'
};

let newProps = {};

const createMount = (props?: $Keys<ButtonProps>) => {
  newProps = { ...defaultProps, ...props };
  return mount(<PrimaryButton {...newProps} />);
};

describe('PrimaryButton.jsx', () => {
  it('Should be able to mount', () => {
    createMount();
  });
  it('Should call the onClick method from the props', () => {
    const mounted = createMount();
    mounted.simulate('click');
    expect(newProps.onClick).toHaveBeenCalled();
  });
  it('Should display the text value of whatever is passed in', () => {
    const mounted = createMount();
    const button = mounted.find('button');
    expect(button.text()).toBe(newProps.value);
  });
});