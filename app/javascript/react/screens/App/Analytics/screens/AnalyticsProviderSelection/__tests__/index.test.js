import React from 'react';
import { noop } from 'patternfly-react';

import { mountWithTestStore } from '../../../../../../../common/testReduxHelpers';
import analyticsReducer, { initialState as analyticsInitialState } from '../../../redux/analyticsReducer';

import AnalyticsProviderSelection from '../AnalyticsProviderSelection';
import AnalyticsProviderSelectionContainer from '../index';

test('Data collection screen should mount with mapStateToProps reduced', () => {
  const provider1 = { id: 1, name: 'Provider 1' };
  const provider2 = { id: 2, name: 'Provider 2' };
  const wrapper = mountWithTestStore(
    { analytics: analyticsReducer },
    {
      analytics: {
        ...analyticsInitialState,
        summaryData: { providers: [provider1, provider2] },
        selectedProviders: [provider1]
      }
    },
    <AnalyticsProviderSelectionContainer onContinueClick={noop} onCancelClick={noop} />
  );
  const component = wrapper.find(AnalyticsProviderSelection);
  expect(component.props()).toMatchSnapshot();
});
