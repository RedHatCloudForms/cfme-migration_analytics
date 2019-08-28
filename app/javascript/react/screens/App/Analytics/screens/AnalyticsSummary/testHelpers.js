import { expectOnlySpecificActions } from '../../../../../../common/testReduxHelpers';

export const expectInitialFetchActions = (calledTimes, props) => {
  expect(props.fetchProvidersAction).toHaveBeenCalledTimes(calledTimes * 1);
  expect(props.fetchReportsAction).toHaveBeenCalledTimes(calledTimes * 2);
};

export const expectNoActionsOtherThan = (expectedActions, props) => {
  const allActions = [
    'fetchProvidersAction',
    'fetchReportsAction',
    'runReportAction',
    'fetchTaskAction',
    'fetchResultAction',
    'calculateSummaryDataAction',
    'resetAllStateAction'
  ];
  expectOnlySpecificActions({ allActions, expectedActions, props });
};

export const expectNoActions = props => expectNoActionsOtherThan([], props);

export const expectOnlyInitialFetchActions = (props, initialFetchTimes = 1) => {
  expectInitialFetchActions(initialFetchTimes, props);
  expectNoActionsOtherThan(['fetchProvidersAction', 'fetchReportsAction'], props);
};
