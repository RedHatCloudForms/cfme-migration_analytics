import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsDataCollection from '../AnalyticsDataCollection';

jest.useFakeTimers();

describe('Data collection screen', () => {
  const getBaseProps = () => ({
    onCancelClick: jest.fn(),
    onReturnClick: jest.fn()
  });

  test('renders with a spinner initially', () => {
    expect(shallow(<AnalyticsDataCollection {...getBaseProps()} />)).toMatchSnapshot();
  });

  test('renders a success message after payload is loaded', () => {
    // TODO replace this when we replace the setTimeout placeholder
    const component = shallow(<AnalyticsDataCollection {...getBaseProps()} />);
    jest.runAllTimers();
    expect(component).toMatchSnapshot();
  });
});
