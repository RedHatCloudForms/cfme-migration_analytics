import React from 'react';
import { shallow } from 'enzyme';
import { TypeAheadSelect, Form } from 'patternfly-react';
import AnalyticsProviderSelection from '../AnalyticsProviderSelection';

describe('analytics provider selection screen', () => {
  const getBaseProps = () => ({
    summaryData: {
      providers: [{ id: 1, name: 'Provider 1' }, { id: 2, name: 'Provider 2' }]
    },
    selectedProviders: [],
    selectProvidersAction: jest.fn(),
    detailedDataSelected: false,
    selectDetailedDataAction: jest.fn(),
    onContinueClick: jest.fn(),
    onCancelClick: jest.fn()
  });

  test('renders correctly with basic data selected', () => {
    const component = shallow(<AnalyticsProviderSelection {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.smart-state-info')).toHaveLength(0);
  });

  test('renders radio buttons section correctly with detailed data selected', () => {
    const props = {
      ...getBaseProps(),
      detailedDataSelected: true
    };
    const component = shallow(<AnalyticsProviderSelection {...props} />);
    expect(component.find('.detailed-data-selection')).toMatchSnapshot();
    expect(component.find('.smart-state-info')).toHaveLength(1);
  });

  test('calls action correctly when changing provider selection', () => {
    const props = getBaseProps();
    const component = shallow(<AnalyticsProviderSelection {...props} />);
    component
      .find(TypeAheadSelect)
      .props()
      .onChange(['mock', 'providers']);
    expect(props.selectProvidersAction).toHaveBeenCalledWith(['mock', 'providers']);
  });

  test('calls action correctly when selecting basic data', () => {
    const props = getBaseProps();
    const component = shallow(<AnalyticsProviderSelection {...props} />);
    component
      .find(Form.Radio)
      .at(0)
      .props()
      .onChange({ target: { value: 'on' } });
    expect(props.selectDetailedDataAction).toHaveBeenCalledWith(false);
  });

  test('calls action correctly when deselecting basic data', () => {
    const props = getBaseProps();
    const component = shallow(<AnalyticsProviderSelection {...props} />);
    component
      .find(Form.Radio)
      .at(0)
      .props()
      .onChange({ target: { value: 'off' } });
    expect(props.selectDetailedDataAction).toHaveBeenCalledWith(true);
  });

  test('calls action correctly when selecting detailed data', () => {
    const props = getBaseProps();
    const component = shallow(<AnalyticsProviderSelection {...props} />);
    component
      .find(Form.Radio)
      .at(1)
      .props()
      .onChange({ target: { value: 'on' } });
    expect(props.selectDetailedDataAction).toHaveBeenCalledWith(true);
  });

  test('calls action correctly when deselecting detailed data', () => {
    const props = getBaseProps();
    const component = shallow(<AnalyticsProviderSelection {...props} />);
    component
      .find(Form.Radio)
      .at(1)
      .props()
      .onChange({ target: { value: 'off' } });
    expect(props.selectDetailedDataAction).toHaveBeenCalledWith(false);
  });
});
