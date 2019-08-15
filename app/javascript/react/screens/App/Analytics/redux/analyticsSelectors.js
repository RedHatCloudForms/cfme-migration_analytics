import { FINISHED, OK, ERROR } from '../constants';

export const selectBundleError = ({ errorStartingBundle, bundleStartResult, bundleTask }) =>
  (errorStartingBundle && errorStartingBundle.message) ||
  (bundleStartResult && !bundleStartResult.success && bundleStartResult.message) ||
  (bundleTask && bundleTask.status === ERROR && bundleTask.message) ||
  null;

export const selectIsBundleTaskFinished = ({ bundleTask }) => bundleTask && bundleTask.state === FINISHED;

export const selectIsPayloadReady = ({ isStartingBundle, bundleTask }, { bundleError, isBundleTaskFinished }) =>
  !isStartingBundle && !bundleError && isBundleTaskFinished && bundleTask.status === OK;

export const selectBundleTaskHref = ({ bundleStartResult }) => bundleStartResult && bundleStartResult.task_href;

export const selectPayloadPath = ({ bundleTask }) =>
  bundleTask && bundleTask.context_data && bundleTask.context_data.payload_path;
