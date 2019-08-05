import React from 'react';
import { shallow } from 'enzyme';
import ReportTaskError from '../ReportTaskError';

describe('report task error', () => {
  const getBaseProps = () => ({
    taskWithError: {
      name: 'task name here',
      message: 'some error message'
    },
    onRetryClick: jest.fn()
  });

  test('renders correctly', () => {
    const component = shallow(<ReportTaskError {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });
});
