import React from 'react';
import { mount } from 'enzyme';
import AnalyticsEmptyState from '..';

describe('Empty state screen', () => {
  test('renders correctly', () => {
    // Full mount so we get coverage with the SVG file
    expect(mount(<AnalyticsEmptyState onGetStartedClick={() => {}} />)).toMatchSnapshot();
  });
});
