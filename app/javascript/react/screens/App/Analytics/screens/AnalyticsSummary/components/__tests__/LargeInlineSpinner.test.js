import React from 'react';
import { shallow } from 'enzyme';
import LargeInlineSpinner from '../LargeInlineSpinner';

describe('large inline spinner', () => {
  test('renders correctly', () => {
    const component = shallow(<LargeInlineSpinner message="Loading stuff" />);
    expect(component).toMatchSnapshot();
  });
});
