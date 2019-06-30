export const selectReportByFilterValues = (state, filterValues) => {
  const {
    migrationAnalytics: {
      reports: { reports }
    }
  } = state;
  return reports.find(report => Object.keys(filterValues).every(key => filterValues[key] === report[key]));
};

export const selectRunByReport = (state, report) => {
  const {
    migrationAnalytics: {
      reports: { reportRuns }
    }
  } = state;
  return report && reportRuns.find(run => run.href === report.href);
};
