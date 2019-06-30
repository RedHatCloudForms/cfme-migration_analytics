export const selectReportByFilterValues = ({ reports }, filterValues) =>
  reports.find(report => Object.keys(filterValues).every(key => filterValues[key] === report[key]));

export const selectRunByReport = ({ reportRuns }, report) => report && reportRuns.find(run => run.href === report.href);
