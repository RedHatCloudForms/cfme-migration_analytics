import React from 'react';
import { shallow } from 'enzyme';
import EmptyStateWithButton from '../EmptyStateWithButton';

describe('empty state with button', () => {
  const getBaseProps = () => ({
    title: 'Title Goes Here',
    message: 'Message goes here',
    buttonText: 'Click me',
    onClick: jest.fn()
  });

  test('renders correctly', () => {
    const component = shallow(<EmptyStateWithButton {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  test('calls onClick prop when primary button is clicked', () => {
    const props = getBaseProps();
    const component = shallow(<EmptyStateWithButton {...props} />);
    component.find('Button[bsStyle="primary"]').simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
