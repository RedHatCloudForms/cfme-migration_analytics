import { findResource } from '../helpers';

export const selectReportByFilterValues = ({ reports }, filterValues) => findResource(reports, filterValues);

export const selectRunByReport = ({ reportRunsByHref }, report) => report && reportRunsByHref[report.href];

export const selectIsFetchingTaskByRun = ({ fetchingTaskHrefs }, reportRun) =>
  reportRun && fetchingTaskHrefs.includes(reportRun.task_href);

export const selectTaskByRun = ({ tasksByHref }, reportRun) => reportRun && tasksByHref[reportRun.task_href];

export const selectResultByRun = ({ resultsByHref }, reportRun) => reportRun && resultsByHref[reportRun.result_href];
