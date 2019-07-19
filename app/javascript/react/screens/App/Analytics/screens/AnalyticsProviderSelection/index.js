import { connect } from 'react-redux';
import AnalyticsProviderSelection from './AnalyticsProviderSelection';
import { selectProvidersAction, selectDetailedDataAction } from '../../redux/analyticsActions';

const mapStateToProps = ({
  migrationAnalytics: {
    analytics: { summaryData, selectedProviders, detailedDataSelected }
  }
}) => ({
  summaryData,
  selectedProviders,
  detailedDataSelected
});

export default connect(
  mapStateToProps,
  { selectProvidersAction, selectDetailedDataAction }
)(AnalyticsProviderSelection);
