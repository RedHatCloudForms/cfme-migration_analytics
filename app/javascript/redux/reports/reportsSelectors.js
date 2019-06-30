export const selectReportByFilterValues = ({ reports }, filterValues) =>
  reports.find(report => Object.keys(filterValues).every(key => filterValues[key] === report[key]));

export const selectRunByReport = ({ reportRunsByHref }, report) => report && reportRunsByHref[report.href];

export const selectIsFetchingTaskByRun = ({ fetchingTaskHrefs }, reportRun) =>
  reportRun && fetchingTaskHrefs.includes(reportRun.task_href);

export const selectTaskByRun = ({ tasksByHref }, reportRun) => reportRun && tasksByHref[reportRun.task_href];

export const selectResultByRun = ({ resultsByHref }, reportRun) => reportRun && resultsByHref[reportRun.result_href];
