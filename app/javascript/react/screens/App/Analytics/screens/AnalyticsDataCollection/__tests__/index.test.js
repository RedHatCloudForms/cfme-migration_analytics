import React from 'react';
import { noop } from 'patternfly-react';

import { mountWithTestStore } from '../../../../../../../common/testReduxHelpers';
import analyticsReducer from '../../../redux/analyticsReducer';

import AnalyticsDataCollection from '../AnalyticsDataCollection';
import AnalyticsDataCollectionContainer from '../index';

test('Data collection screen should mount with mapStateToProps reduced', () => {
  const wrapper = mountWithTestStore(
    { analytics: analyticsReducer },
    {},
    <AnalyticsDataCollectionContainer onCancelClick={noop} onReturnClick={noop} />
  );
  const component = wrapper.find(AnalyticsDataCollection);
  expect(component.props()).toMatchSnapshot();
});
