import { connect } from 'react-redux';
import AnalyticsSummary from './AnalyticsSummary';
import { fetchReportsAction } from '../../../../../../redux/reports/reportsActions';
import { selectReportByFilterValues } from '../../../../../../redux/reports/reportsSelectors';
import { PROVIDERS_SUMMARY_REPORT_FILTERS } from '../../constants';

const mapStateToProps = state => ({
  providersSummaryReport: selectReportByFilterValues(state, PROVIDERS_SUMMARY_REPORT_FILTERS)
});

export default connect(
  mapStateToProps,
  { fetchReportsAction }
)(AnalyticsSummary);
