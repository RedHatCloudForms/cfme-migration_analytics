import {
  selectReportByFilterValues,
  selectRunByReport,
  selectIsFetchingTaskByRun,
  selectTaskByRun,
  selectResultByRun
} from '../reportsSelectors';

describe('reports selectors', () => {
  const reports = [{ id: 1, name: 'report1', href: '/reports/1' }, { id: 2, name: 'report2', href: '/reports/2' }];
  const mockTask = { mock: 'task', href: '/tasks/1' };
  const mockResult = { mock: 'result', href: '/results/1' };
  const mockRun = { mock: 'run', task_href: mockTask.href, result_href: mockResult.href };
  const reportRunsByHref = { '/reports/1': mockRun };
  const fetchingTaskHrefs = [mockTask.href];
  const tasksByHref = { [mockTask.href]: mockTask };
  const resultsByHref = { [mockResult.href]: mockResult };

  test('select report by filter values', () =>
    expect(selectReportByFilterValues({ reports }, { name: 'report1' })).toEqual(reports[0]));

  test('select run by report', () => expect(selectRunByReport({ reportRunsByHref }, reports[0])).toEqual(mockRun));

  test('select is fetching task by run', () =>
    expect(selectIsFetchingTaskByRun({ fetchingTaskHrefs }, mockRun)).toBe(true));

  test('select task by run', () => expect(selectTaskByRun({ tasksByHref }, mockRun)).toEqual(mockTask));

  test('select result by run', () => expect(selectResultByRun({ resultsByHref }, mockRun)).toEqual(mockResult));
});
