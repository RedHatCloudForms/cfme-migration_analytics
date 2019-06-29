export const selectReportByFilterValues = (state, filterValues) => {
  const {
    migrationAnalytics: {
      reports: { reports }
    }
  } = state;
  return reports.find(report => Object.keys(filterValues).every(key => filterValues[key] === report[key]));
};
