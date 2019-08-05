import React from 'react';

import { mountWithTestStore } from '../../../../../../../common/testReduxHelpers';
import analyticsReducer from '../../../redux/analyticsReducer';
import providersReducer from '../../../../../../../redux/providers/providersReducer';
import reportsReducer from '../../../../../../../redux/reports/reportsReducer';

import AnalyticsSummary from '../AnalyticsSummary';
import AnalyticsSummaryContainer from '../index';

test('some component should mount with mapStateToProps reduced', () => {
  const wrapper = mountWithTestStore(
    { providers: providersReducer, reports: reportsReducer, analytics: analyticsReducer },
    {},
    <AnalyticsSummaryContainer />
  );
  const component = wrapper.find(AnalyticsSummary);
  expect(component.props()).toMatchSnapshot();
});
