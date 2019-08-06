import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../Toolbar';

describe('Toolbar component', () => {
  test('renders correctly', () => {
    expect(shallow(<Toolbar>Children Here</Toolbar>)).toMatchSnapshot();
  });
});
