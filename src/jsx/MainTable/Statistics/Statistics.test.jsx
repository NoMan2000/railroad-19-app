// @flow
import * as React from 'react';
import { Statistics } from './Statistics';
import { mount } from 'enzyme';
import { createMockData } from '../../../__test__/createServerModal';
import type { ServerDataWithShowModal } from '../../../types';

const defaultProps = {
  data: createMockData(50)
};

type CurrentType = {
  data: ServerDataWithShowModal[]
};

let props = {};

const createMount = (newProps: ?CurrentType) => {
  props = { ...defaultProps, ...newProps };
  return mount(<Statistics {...props} />);
};

describe('Statistics.jsx', () => {
  it('Can mount successfully', () => {
    createMount();
  });
  it('Will mount if at least one element is passed in', () => {
    const mounted = createMount();
    const mainEl = mounted.find('[data-test="statistics"]');
    expect(mainEl).toHaveLength(1);
  });
  it('Will not mount if no elements are passed in', () => {
    const mounted = createMount({ data: [] });
    const mainEl = mounted.find('[data-test="statistics"]');
    expect(mainEl).toHaveLength(0);
  });
});
