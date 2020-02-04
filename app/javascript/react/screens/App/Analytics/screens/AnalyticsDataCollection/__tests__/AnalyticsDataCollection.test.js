import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsDataCollection from '../AnalyticsDataCollection';
import { expectNoActionsOtherThan } from '../testHelpers';

jest.useFakeTimers();

describe('Data collection screen', () => {
  const getBaseProps = () => ({
    onCancelClick: jest.fn(),
    onReturnClick: jest.fn(),
    selectedProviders: [{ id: 1 }, { id: 2 }],
    startInventoryBundleAction: jest.fn(),
    fetchBundleTaskAction: jest.fn(),
    resetDataCollectionStateAction: jest.fn()
  });

  test('renders with a spinner initially and starts the bundle on mount', () => {
    const props = getBaseProps();
    expect(shallow(<AnalyticsDataCollection {...props} />)).toMatchSnapshot();
    expect(props.startInventoryBundleAction).toHaveBeenCalledWith([1, 2]);
  });

  describe('update lifecycle', () => {
    test('calls no actions after bundle starts', () => {
      const props = getBaseProps();
      const component = shallow(<AnalyticsDataCollection {...props} />);
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
      component.update();
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
    });

    test('fetches task for bundle after it was just started', () => {
      const props = getBaseProps();
      const component = shallow(<AnalyticsDataCollection {...props} />);
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
      component.setProps({ bundleTaskHref: '/api/foo/1' });
      expect(props.fetchBundleTaskAction).toHaveBeenCalledTimes(1);
      expect(props.fetchBundleTaskAction).toHaveBeenCalledWith('/api/foo/1');
      expectNoActionsOtherThan(['startInventoryBundleAction', 'fetchBundleTaskAction'], props);
    });

    test('polls bundle task once after it comes back unfinished', () => {
      const props = {
        ...getBaseProps(),
        bundleTaskHref: '/api/foo/1',
        isFetchingBundleTask: true
      };
      const component = shallow(<AnalyticsDataCollection {...props} />);
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
      component.setProps({ isFetchingBundleTask: false, isBundleTaskFinished: false });
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
      jest.runAllTimers(props);
      expect(props.fetchBundleTaskAction).toHaveBeenCalledTimes(1);
      expect(props.fetchBundleTaskAction).toHaveBeenCalledWith('/api/foo/1');
      expectNoActionsOtherThan(['startInventoryBundleAction', 'fetchBundleTaskAction'], props);
    });

    test('cancels bundle task polling if task came back finished before timer is up', () => {
      const props = {
        ...getBaseProps(),
        bundleTaskHref: '/api/foo/1',
        isFetchingBundleTask: true
      };
      const component = shallow(<AnalyticsDataCollection {...props} />);
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
      expect(component.instance().fetchBundleTaskTimeout).toBe(null);
      component.setProps({
        isFetchingBundleTask: false,
        isBundleTaskFinished: false
      });
      expect(component.instance().fetchBundleTaskTimeout).toBeTruthy();
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
      component.setProps({
        isBundleTaskFinished: true
      });
      expect(component.instance().fetchBundleTaskTimeout).toBe(null);
      expectNoActionsOtherThan(['startInventoryBundleAction'], props);
    });
  });

  test('clears timer and resets state on unmount', () => {
    const props = {
      ...getBaseProps(),
      bundleTaskHref: '/api/foo/1',
      isFetchingBundleTask: true
    };
    const component = shallow(<AnalyticsDataCollection {...props} />);
    component.setProps({
      isFetchingBundleTask: false,
      isBundleTaskFinished: false
    });
    expect(component.instance().fetchBundleTaskTimeout).toBeTruthy();
    component.instance().componentWillUnmount();
    expect(component.instance().fetchBundleTaskTimeout).toBe(null);
    expect(props.resetDataCollectionStateAction).toHaveBeenCalledTimes(1);
    expectNoActionsOtherThan(['startInventoryBundleAction', 'resetDataCollectionStateAction'], props);
  });

  test('renders an error message if data collection failed', () => {
    const props = {
      ...getBaseProps(),
      bundleError: 'some error here'
    };
    const component = shallow(<AnalyticsDataCollection {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('renders a success message and download button after payload is loaded', () => {
    const props = {
      ...getBaseProps(),
      isPayloadReady: true,
      numVms: 7
    };
    const component = shallow(<AnalyticsDataCollection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
