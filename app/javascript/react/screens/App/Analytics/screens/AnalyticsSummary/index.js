import { connect } from 'react-redux';
import AnalyticsSummary from './AnalyticsSummary';
import { fetchReportsAction, runReportAction } from '../../../../../../redux/reports/reportsActions';
import { selectReportByFilterValues, selectReportRunByReport } from '../../../../../../redux/reports/reportsSelectors';
import { PROVIDERS_SUMMARY_REPORT_FILTERS } from '../../constants';

const mapStateToProps = state => {
  const providersSummaryReport = selectReportByFilterValues(state, PROVIDERS_SUMMARY_REPORT_FILTERS);
  return {
    providersSummaryReport,
    lastProvidersSummaryReportRun: selectReportRunByReport(state, providersSummaryReport)
  };
};

export default connect(
  mapStateToProps,
  { fetchReportsAction, runReportAction }
)(AnalyticsSummary);
