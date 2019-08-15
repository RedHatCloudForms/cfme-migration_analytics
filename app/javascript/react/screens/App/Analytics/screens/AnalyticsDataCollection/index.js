import { connect } from 'react-redux';
import AnalyticsDataCollection from './AnalyticsDataCollection';
import { startInventoryBundleAction, fetchBundleTaskAction } from '../../redux/analyticsActions';
import {
  selectIsPayloadReady,
  selectBundleError,
  selectBundleTaskHref,
  selectIsBundleTaskFinished,
  selectPayloadPath
} from '../../redux/analyticsSelectors';

const mapStateToProps = ({ migrationAnalytics: { analytics } }) => {
  const bundleError = selectBundleError(analytics);
  const isBundleTaskFinished = selectIsBundleTaskFinished(analytics);
  return {
    selectedProviders: analytics.selectedProviders,
    bundleError,
    bundleTaskHref: selectBundleTaskHref(analytics),
    isFetchingBundleTask: analytics.isFetchingBundleTask,
    isBundleTaskFinished,
    isPayloadReady: selectIsPayloadReady(analytics, { bundleError, isBundleTaskFinished }),
    payloadPath: selectPayloadPath(analytics)
  };
};

export default connect(
  mapStateToProps,
  { startInventoryBundleAction, fetchBundleTaskAction }
)(AnalyticsDataCollection);
