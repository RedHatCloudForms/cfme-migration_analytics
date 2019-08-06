import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsSummary from '../AnalyticsSummary';
import { ERROR, FINISHED, OK } from '../../../constants';
import {
  expectInitialFetchActions,
  expectOnlyInitialFetchActions,
  expectNoActions,
  expectNoActionsOtherThan
} from '../testHelpers';

jest.useFakeTimers();

describe('analytics summary screen', () => {
  const getBaseProps = () => ({
    fetchProvidersAction: jest.fn(),
    fetchReportsAction: jest.fn(),
    runReportAction: jest.fn(),
    fetchTaskAction: jest.fn(),
    fetchResultAction: jest.fn(),
    calculateSummaryDataAction: jest.fn(),
    onCollectInventoryClick: jest.fn(),
    resetAllStateAction: jest.fn()
  });

  const providersRefreshingProps = {
    providers: [{ mock: 'provider' }],
    providersWithRefreshErrors: [],
    providersAwaitingRefresh: [{ mock: 'provider' }]
  };

  const providersReadyProps = {
    providers: [{ mock: 'provider' }],
    providersWithRefreshErrors: [],
    providersAwaitingRefresh: []
  };

  const reportsReadyProps = {
    vmSummaryReport: { mock: 'report', href: 'mock vm report href' },
    envSummaryReport: { mock: 'report', href: 'mock env report href' }
  };

  const reportsRanProps = {
    vmSummaryReportRun: { mock: 'report run', task_href: 'mock vm task href', result_href: 'mock vm result href' },
    envSummaryReportRun: { mock: 'report run', task_href: 'mock env task href', result_href: 'mock env result href' }
  };

  const reportTasksFinishedProps = {
    vmSummaryReportTask: { mock: 'task', state: FINISHED, status: OK },
    envSummaryReportTask: { mock: 'task', state: FINISHED, status: OK }
  };

  const reportResultProps = {
    vmSummaryReportResult: { mock: 'result' },
    envSummaryReportResult: { mock: 'result' }
  };

  describe('renders correctly', () => {
    test('while running reports with no errors (default props)', () => {
      const component = shallow(<AnalyticsSummary {...getBaseProps()} />);
      expect(component).toMatchSnapshot();
    });

    test('when there is an error fetching providers', () => {
      const props = {
        ...getBaseProps(),
        errorFetchingProviders: { message: 'dummy error message' }
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when providers are missing', () => {
      const props = {
        ...getBaseProps(),
        providers: []
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when there are errors refreshing providers', () => {
      const props = {
        ...getBaseProps(),
        providersWithRefreshErrors: [{ mock: 'provider' }]
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when there is an error fetching reports', () => {
      const props = {
        ...getBaseProps(),
        errorFetchingReports: { message: 'dummy error message' }
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when there is an error running the VM report', () => {
      const props = {
        ...getBaseProps(),
        vmSummaryReportTask: { mock: 'task', status: ERROR }
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when there is an error running the environment report', () => {
      const props = {
        ...getBaseProps(),
        envSummaryReportTask: { mock: 'task', status: ERROR }
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when there are providers awaiting refresh', () => {
      const props = {
        ...getBaseProps(),
        providersAwaitingRefresh: [{ mock: 'provider' }]
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('while fetching providers', () => {
      const props = {
        ...getBaseProps(),
        isFetchingProviders: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });

    test('when summary data is ready', () => {
      const props = {
        ...getBaseProps(),
        summaryData: { mock: 'summary data' }
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('initial fetch', () => {
    test('runs if providers are missing', () => {
      const props = getBaseProps();
      shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
    });

    test('runs if VM summary report is missing', () => {
      const props = {
        ...getBaseProps(),
        providers: [{ mock: 'provider' }]
      };
      shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
    });

    test('runs if environment summary report is missing', () => {
      const props = {
        ...getBaseProps(),
        providers: [{ mock: 'provider' }],
        vmSummaryReport: { mock: 'report' }
      };
      shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
    });

    test('does not run if providers and both reports exist', () => {
      const props = {
        ...getBaseProps(),
        providers: [{ mock: 'provider' }],
        vmSummaryReport: { mock: 'report' },
        envSummaryReport: { mock: 'report' }
      };
      shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props, 0);
    });

    test('resets all state and repeats initial fetch if retry button is clicked', () => {
      const props = getBaseProps();
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.instance().retry();
      expect(props.resetAllStateAction).toHaveBeenCalledTimes(1);
      expectInitialFetchActions(2, props);
    });
  });

  describe('update lifecycle for providers', () => {
    test('calls no actions after provider fetch starts', () => {
      const props = getBaseProps();
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({ isFetchingProviders: true });
      expectOnlyInitialFetchActions(props);
    });

    test('calls no actions after provider fetch comes back empty', () => {
      const props = {
        ...getBaseProps(),
        isFetchingProviders: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({ isFetchingProviders: false, providers: [] });
      expectOnlyInitialFetchActions(props);
    });

    test('calls no actions after provider fetch comes back with refresh errors', () => {
      const props = {
        ...getBaseProps(),
        isFetchingProviders: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({
        isFetchingProviders: false,
        providers: [{ mock: 'provider' }],
        providersWithRefreshErrors: [{ mock: 'provider' }]
      });
      expectOnlyInitialFetchActions(props);
    });

    test('polls providers once after provider fetch comes back with ongoing refresh', () => {
      const props = {
        ...getBaseProps(),
        isFetchingProviders: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({
        isFetchingProviders: false,
        ...providersRefreshingProps
      });
      expectOnlyInitialFetchActions(props);
      jest.runAllTimers();
      expect(props.fetchProvidersAction).toHaveBeenCalledTimes(2);
      expect(props.fetchReportsAction).toHaveBeenCalledTimes(2);
      expectNoActionsOtherThan(['fetchProvidersAction', 'fetchReportsAction'], props);
    });

    test('cancels polling if providers become ready before timer is up', () => {
      const props = {
        ...getBaseProps(),
        isFetchingProviders: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({
        isFetchingProviders: false,
        ...providersRefreshingProps
      });
      expect(component.instance().fetchProvidersTimeout).toBeTruthy();
      component.setProps({
        ...providersReadyProps
      });
      expect(component.instance().fetchProvidersTimeout).toBeFalsy();
      expectOnlyInitialFetchActions(props);
    });
  });

  describe('update lifecycle for reports', () => {
    test('calls no actions if reports were ready and nothing report-related changed', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        vmSummaryReport: { mock: 'report' },
        envSummaryReport: { mock: 'report' }
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({ isFetchingProviders: true });
      expectNoActions(props);
    });

    test('runs VM report if it became ready', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps
      };
      const href = 'mock vm report href';
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({
        vmSummaryReport: { mock: 'report', href }
      });
      expect(props.runReportAction).toHaveBeenCalledTimes(1);
      expect(props.runReportAction).toHaveBeenCalledWith(href);
      expectNoActionsOtherThan(['fetchProvidersAction', 'fetchReportsAction', 'runReportAction'], props);
    });

    test('runs environment report if it became ready', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps
      };
      const href = 'mock env report href';
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({
        envSummaryReport: { mock: 'report', href }
      });
      expect(props.runReportAction).toHaveBeenCalledTimes(1);
      expect(props.runReportAction).toHaveBeenCalledWith(href);
      expectNoActionsOtherThan(['fetchProvidersAction', 'fetchReportsAction', 'runReportAction'], props);
    });

    test('runs both reports if they both became ready', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps
      };
      const vmHref = 'mock vm report href';
      const envHref = 'mock env report href';
      const component = shallow(<AnalyticsSummary {...props} />);
      expectOnlyInitialFetchActions(props);
      component.setProps({
        vmSummaryReport: { mock: 'report', href: vmHref },
        envSummaryReport: { mock: 'report', href: envHref }
      });
      expect(props.runReportAction).toHaveBeenCalledTimes(2);
      expect(props.runReportAction).toHaveBeenCalledWith(vmHref);
      expect(props.runReportAction).toHaveBeenCalledWith(envHref);
      expectNoActionsOtherThan(['fetchProvidersAction', 'fetchReportsAction', 'runReportAction'], props);
    });

    test('fetches task for VM report after it was just run', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps
      };
      const taskHref = 'mock task href';
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        vmSummaryReportRun: { mock: 'report run', task_href: taskHref }
      });
      expect(props.fetchTaskAction).toHaveBeenCalledTimes(1);
      expect(props.fetchTaskAction).toHaveBeenCalledWith(taskHref);
      expectNoActionsOtherThan(['fetchTaskAction'], props);
    });

    test('fetches task for environment report after it was just run', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps
      };
      const taskHref = 'mock task href';
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        envSummaryReportRun: { mock: 'report run', task_href: taskHref }
      });
      expect(props.fetchTaskAction).toHaveBeenCalledTimes(1);
      expect(props.fetchTaskAction).toHaveBeenCalledWith(taskHref);
      expectNoActionsOtherThan(['fetchTaskAction'], props);
    });

    test('fetches tasks for both reports if they both were just run', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps
      };
      const vmTaskHref = 'mock vm task href';
      const envTaskHref = 'mock env task href';
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        vmSummaryReportRun: { mock: 'report run', task_href: vmTaskHref },
        envSummaryReportRun: { mock: 'report run', task_href: envTaskHref }
      });
      expect(props.fetchTaskAction).toHaveBeenCalledTimes(2);
      expect(props.fetchTaskAction).toHaveBeenCalledWith(vmTaskHref);
      expect(props.fetchTaskAction).toHaveBeenCalledWith(envTaskHref);
      expectNoActionsOtherThan(['fetchTaskAction'], props);
    });

    test('polls VM report task once after it comes back unfinished', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingVmSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        vmSummaryReportTask: { mock: 'task', state: 'Running' }
      });
      expectNoActions(props);
      jest.runAllTimers(props);
      expect(props.fetchTaskAction).toHaveBeenCalledTimes(1);
      expectNoActionsOtherThan(['fetchTaskAction'], props);
    });

    test('polls environment report task once after it comes back unfinished', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingEnvSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingEnvSummaryReportTask: false,
        envSummaryReportTask: { mock: 'task', state: 'Running' }
      });
      expectNoActions(props);
      jest.runAllTimers(props);
      expect(props.fetchTaskAction).toHaveBeenCalledTimes(1);
      expectNoActionsOtherThan(['fetchTaskAction'], props);
    });

    test('polls both report tasks once each if they both came back unfinished', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingVmSummaryReportTask: true,
        isFetchingEnvSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        isFetchingEnvSummaryReportTask: false,
        vmSummaryReportTask: { mock: 'task', state: 'Running' },
        envSummaryReportTask: { mock: 'task', state: 'Running' }
      });
      expectNoActions(props);
      jest.runAllTimers(props);
      expect(props.fetchTaskAction).toHaveBeenCalledTimes(2);
      expectNoActionsOtherThan(['fetchTaskAction'], props);
    });

    test('cancels VM report task polling if task came back finished before timer is up', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingVmSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      expect(component.instance().fetchTaskTimeouts).toEqual({});
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        vmSummaryReportTask: { mock: 'task', state: 'Running' }
      });
      expect(Object.values(component.instance().fetchTaskTimeouts)[0]).toBeTruthy();
      expectNoActions(props);
      component.setProps({
        vmSummaryReportTask: { mock: 'task', state: FINISHED, status: OK }
      });
      expect(Object.values(component.instance().fetchTaskTimeouts)).toEqual([null]);
      expect(props.fetchResultAction).toHaveBeenCalledTimes(1);
      expectNoActionsOtherThan(['fetchResultAction'], props);
    });

    test('cancels environment report task polling if task came back finished before timer is up', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingEnvSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      expect(component.instance().fetchTaskTimeouts).toEqual({});
      component.setProps({
        isFetchingEnvSummaryReportTask: false,
        envSummaryReportTask: { mock: 'task', state: 'Running' }
      });
      expect(Object.values(component.instance().fetchTaskTimeouts)[0]).toBeTruthy();
      expectNoActions(props);
      component.setProps({
        envSummaryReportTask: { mock: 'task', state: FINISHED, status: OK }
      });
      expect(Object.values(component.instance().fetchTaskTimeouts)).toEqual([null]);
      expect(props.fetchResultAction).toHaveBeenCalledTimes(1);
      expectNoActionsOtherThan(['fetchResultAction'], props);
    });

    test('cancels both report tasks polling if both tasks came back finished before timers were up', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingVmSummaryReportTask: true,
        isFetchingEnvSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      expect(component.instance().fetchTaskTimeouts).toEqual({});
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        isFetchingEnvSummaryReportTask: false,
        vmSummaryReportTask: { mock: 'task', state: 'Running' },
        envSummaryReportTask: { mock: 'task', state: 'Running' }
      });
      const timeouts = Object.values(component.instance().fetchTaskTimeouts);
      expect(timeouts).toHaveLength(2);
      timeouts.map(timeout => expect(timeout).toBeTruthy);
      expectNoActions(props);
      component.setProps({
        ...reportTasksFinishedProps
      });
      expect(Object.values(component.instance().fetchTaskTimeouts)).toEqual([null, null]);
      expect(props.fetchResultAction).toHaveBeenCalledTimes(2);
      expectNoActionsOtherThan(['fetchResultAction'], props);
    });

    test('fetches results if VM report task came back finished', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingVmSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        isFetchingEnvSummaryReportTask: false,
        vmSummaryReportTask: { mock: 'task', state: FINISHED, status: OK }
      });
      expect(props.fetchResultAction).toHaveBeenCalledTimes(1);
      expect(props.fetchResultAction).toHaveBeenCalledWith('mock vm result href');
      expectNoActionsOtherThan(['fetchResultAction'], props);
    });

    test('fetches results if environment report task came back finished', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingEnvSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        isFetchingEnvSummaryReportTask: false,
        envSummaryReportTask: { mock: 'task', state: FINISHED, status: OK }
      });
      expect(props.fetchResultAction).toHaveBeenCalledTimes(1);
      expect(props.fetchResultAction).toHaveBeenCalledWith('mock env result href');
      expectNoActionsOtherThan(['fetchResultAction'], props);
    });

    test('fetches both results if both reports came back finished', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        isFetchingVmSummaryReportTask: true,
        isFetchingEnvSummaryReportTask: true
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingVmSummaryReportTask: false,
        isFetchingEnvSummaryReportTask: false,
        ...reportTasksFinishedProps
      });
      expect(props.fetchResultAction).toHaveBeenCalledTimes(2);
      expect(props.fetchResultAction).toHaveBeenCalledWith('mock vm result href');
      expect(props.fetchResultAction).toHaveBeenCalledWith('mock env result href');
      expectNoActionsOtherThan(['fetchResultAction'], props);
    });

    test('calculates summary data if all necessary report results became ready', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        ...reportTasksFinishedProps
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        ...reportResultProps
      });
      expect(props.calculateSummaryDataAction).toHaveBeenCalledTimes(1);
      expect(props.calculateSummaryDataAction).toHaveBeenCalledWith(reportResultProps);
      expectNoActionsOtherThan(['calculateSummaryDataAction'], props);
    });

    test('does not recalculate summary data if all report results were already ready on update', () => {
      const props = {
        ...getBaseProps(),
        ...providersReadyProps,
        ...reportsReadyProps,
        ...reportsRanProps,
        ...reportTasksFinishedProps,
        ...reportResultProps
      };
      const component = shallow(<AnalyticsSummary {...props} />);
      expectNoActions(props);
      component.setProps({
        isFetchingProviders: true
      });
      expectNoActions(props);
    });
  });
});
