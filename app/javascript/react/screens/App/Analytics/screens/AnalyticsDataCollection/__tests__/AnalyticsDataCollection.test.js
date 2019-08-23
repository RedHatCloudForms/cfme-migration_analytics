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

  /*
  test('renders a success message with a download button after payload is loaded', () => {
    const props = {
      ...getBaseProps(),
      isPayloadReady: true,
      numVms: 7,
      payloadPath: 'some/path/to/payload.tgz',
      payloadUrl: 'fake/url/here/payload.tgz'
    };
    const component = shallow(<AnalyticsDataCollection {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('renders a success message with disabled button if there is no download url', () => {
    const props = {
      ...getBaseProps(),
      isPayloadReady: true,
      numVms: 7,
      payloadPath: 'some/path/to/payload.tgz'
    };
    const component = shallow(<AnalyticsDataCollection {...props} />);
    expect(component).toMatchSnapshot();
  });
  */
});
