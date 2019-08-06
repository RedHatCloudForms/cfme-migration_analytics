import React from 'react';
import { shallow } from 'enzyme';
import ProviderRefreshErrors from '../ProviderRefreshErrors';

describe('provider refresh errors', () => {
  const getBaseProps = () => ({
    providersWithRefreshErrors: [
      { id: 1, name: 'Provider 1', last_refresh_error: 'some error here' },
      { id: 2, name: 'Provider 2', last_refresh_error: 'some error here' }
    ],
    onRetryClick: jest.fn()
  });

  test('renders correctly', () => {
    const component = shallow(<ProviderRefreshErrors {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });
});
