export const selectReportByFilterValues = ({ reports }, filterValues) =>
  reports.find(report => Object.keys(filterValues).every(key => filterValues[key] === report[key]));

export const selectRunByReport = ({ reportRuns }, report) => report && reportRuns.find(run => run.href === report.href);

export const selectIsFetchingTaskByRun = ({ fetchingTaskHrefs }, reportRun) =>
  reportRun && fetchingTaskHrefs.includes(reportRun.task_href);

export const selectTaskByRun = ({ tasksById }, reportRun) => reportRun && tasksById[reportRun.task_id];

export const selectResultByRun = ({ resultsById }, reportRun) => reportRun && resultsById[reportRun.result_id];
