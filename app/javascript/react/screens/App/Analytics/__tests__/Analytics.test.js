import React from 'react';
import { shallow } from 'enzyme';
import Analytics from '../Analytics';
import AnalyticsEmptyState from '../screens/AnalyticsEmptyState';
import AnalyticsSummary from '../screens/AnalyticsSummary';
import AnalyticsProviderSelection from '../screens/AnalyticsProviderSelection';
import AnalyticsDataCollection from '../screens/AnalyticsDataCollection';

describe('Analytics root component', () => {
  const shallowSummaryScreen = () => {
    const component = shallow(<Analytics />);
    component
      .find(AnalyticsEmptyState)
      .props()
      .onGetStartedClick();
    return component;
  };

  const shallowProviderSelectionScreen = () => {
    const component = shallowSummaryScreen();
    component
      .find(AnalyticsSummary)
      .props()
      .onCollectInventoryClick();
    return component;
  };

  const shallowDataCollectionScreen = () => {
    const component = shallowProviderSelectionScreen();
    component
      .find(AnalyticsProviderSelection)
      .props()
      .onContinueClick();
    return component;
  };

  test('renders toolbar and empty state correctly', () => {
    const component = shallow(<Analytics />);
    expect(component.find(AnalyticsEmptyState)).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  test('renders container with cards-pf class for empty state', () => {
    const component = shallow(<Analytics />);
    expect(component.find('AnalyticsContainer').dive()).toMatchSnapshot();
  });

  test('renders container without cards-pf class for other screens', () => {
    const component = shallowSummaryScreen();
    expect(component.find('AnalyticsContainer').dive()).toMatchSnapshot();
  });

  test('renders summary after clicking Get Started from empty state', () => {
    const component = shallowSummaryScreen();
    expect(component.find(AnalyticsSummary)).toHaveLength(1);
  });

  test('renders provider selection after clicking Collect Inventory from summary', () => {
    const component = shallowProviderSelectionScreen();
    expect(component.find(AnalyticsProviderSelection)).toHaveLength(1);
  });

  test('renders summary after clicking Cancel from provider selection', () => {
    const component = shallowProviderSelectionScreen();
    component
      .find('Connect(AnalyticsProviderSelection)')
      .props()
      .onCancelClick();
    expect(component.find(AnalyticsSummary)).toHaveLength(1);
  });

  test('renders data collection after clicking Continue on provider selection', () => {
    const component = shallowDataCollectionScreen();
    expect(component.find(AnalyticsDataCollection)).toHaveLength(1);
  });

  test('renders provider selection after clicking Cancel on data collection', () => {
    const component = shallowDataCollectionScreen();
    component
      .find('Connect(AnalyticsDataCollection)')
      .props()
      .onCancelClick();
    expect(component.find(AnalyticsProviderSelection)).toHaveLength(1);
  });

  test('renders summary after clicking Return to Summary on data collection', () => {
    const component = shallowDataCollectionScreen();
    component
      .find('Connect(AnalyticsDataCollection)')
      .props()
      .onReturnClick();
    expect(component.find(AnalyticsSummary)).toHaveLength(1);
  });
});
