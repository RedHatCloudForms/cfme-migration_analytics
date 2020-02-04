import { connect } from 'react-redux';
import AnalyticsDataCollection from './AnalyticsDataCollection';
import {
  startInventoryBundleAction,
  fetchBundleTaskAction,
  downloadPayloadAction,
  resetDataCollectionStateAction
} from '../../redux/analyticsActions';
import {
  selectIsPayloadReady,
  selectBundleError,
  selectBundleTaskHref,
  selectIsBundleTaskFinished,
  selectNumVms,
  selectBundleTaskId
} from '../../redux/analyticsSelectors';

const mapStateToProps = ({
  migrationAnalytics: {
    analytics,
    analytics: { selectedProviders, isFetchingBundleTask, isDownloadingPayload }
  }
}) => {
  const bundleError = selectBundleError(analytics);
  const isBundleTaskFinished = selectIsBundleTaskFinished(analytics);
  return {
    selectedProviders,
    bundleError,
    bundleTaskHref: selectBundleTaskHref(analytics),
    isFetchingBundleTask,
    isBundleTaskFinished,
    isPayloadReady: selectIsPayloadReady(analytics, { bundleError, isBundleTaskFinished }),
    numVms: selectNumVms(analytics),
    bundleTaskId: selectBundleTaskId(analytics),
    isDownloadingPayload
  };
};

export default connect(
  mapStateToProps,
  { startInventoryBundleAction, fetchBundleTaskAction, downloadPayloadAction, resetDataCollectionStateAction }
)(AnalyticsDataCollection);
