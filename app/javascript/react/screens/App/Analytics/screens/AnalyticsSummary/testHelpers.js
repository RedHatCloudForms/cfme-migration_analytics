export const expectInitialFetchActions = (calledTimes, props) => {
  expect(props.fetchProvidersAction).toHaveBeenCalledTimes(calledTimes * 1);
  expect(props.fetchReportsAction).toHaveBeenCalledTimes(calledTimes * 2);
};

export const expectNoActionsOtherThan = (otherThanActions, props) => {
  const allActions = [
    'fetchProvidersAction',
    'fetchReportsAction',
    'runReportAction',
    'fetchTaskAction',
    'fetchResultAction',
    'calculateSummaryDataAction',
    'resetAllStateAction'
  ];
  allActions.forEach(action => {
    if (!otherThanActions.includes(action)) {
      const numCalls = props[action].mock.calls.length;
      if (numCalls > 0) {
        console.error(`${action} was called unexpectedly`); // eslint-disable-line no-console
      }
      expect(props[action]).toHaveBeenCalledTimes(0);
    }
  });
};

export const expectNoActions = props => expectNoActionsOtherThan([], props);

export const expectOnlyInitialFetchActions = (props, initialFetchTimes = 1) => {
  expectInitialFetchActions(initialFetchTimes, props);
  expectNoActionsOtherThan(['fetchProvidersAction', 'fetchReportsAction'], props);
};
