import { connect } from 'react-redux';
import AnalyticsDataCollection from './AnalyticsDataCollection';
import {
  startInventoryBundleAction,
  fetchBundleTaskAction,
  resetDataCollectionStateAction
} from '../../redux/analyticsActions';
import {
  selectIsPayloadReady,
  selectBundleError,
  selectBundleTaskHref,
  selectIsBundleTaskFinished,
  selectPayloadPath,
  selectPayloadHost,
  selectNumVms
} from '../../redux/analyticsSelectors';
import { getPayloadUrl } from './helpers';

const mapStateToProps = ({ migrationAnalytics: { analytics } }) => {
  const bundleError = selectBundleError(analytics);
  const isBundleTaskFinished = selectIsBundleTaskFinished(analytics);
  const payloadPath = selectPayloadPath(analytics);
  const payloadHost = selectPayloadHost(analytics);
  return {
    selectedProviders: analytics.selectedProviders,
    bundleError,
    bundleTaskHref: selectBundleTaskHref(analytics),
    isFetchingBundleTask: analytics.isFetchingBundleTask,
    isBundleTaskFinished,
    isPayloadReady: selectIsPayloadReady(analytics, { bundleError, isBundleTaskFinished }),
    numVms: selectNumVms(analytics),
    payloadHost,
    payloadPath,
    payloadUrl: getPayloadUrl(payloadPath)
  };
};

export default connect(
  mapStateToProps,
  { startInventoryBundleAction, fetchBundleTaskAction, resetDataCollectionStateAction }
)(AnalyticsDataCollection);
