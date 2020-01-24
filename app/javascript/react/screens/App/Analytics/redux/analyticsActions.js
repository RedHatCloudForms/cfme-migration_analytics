import URI from 'urijs';
import API from '../../../../../common/API';
import {
  CALCULATE_SUMMARY_DATA,
  SELECT_PROVIDERS,
  SELECT_DETAILED_DATA,
  FETCH_MANIFEST_INFO,
  MANIFEST_INFO_URL,
  TOGGLE_MANIFEST_UPDATE_MODAL,
  START_INVENTORY_BUNDLE,
  INVENTORY_BUNDLE_URL,
  FETCH_BUNDLE_TASK,
  RESET_DATA_COLLECTION_STATE,
  UPLOAD_MANIFEST,
  RESET_MANIFEST
} from './constants';
import { simpleActionWithProperties, basicFetchAction } from '../../../../../redux/helpers';

export const fetchManifestInfoAction = () => basicFetchAction(FETCH_MANIFEST_INFO, MANIFEST_INFO_URL);

export const toggleManifestUpdateModalAction = () => dispatch => dispatch({ type: TOGGLE_MANIFEST_UPDATE_MODAL });

export const uploadManifestAction = fileBody => dispatch => {
  try {
    const manifest = JSON.parse(fileBody);
    dispatch({
      type: UPLOAD_MANIFEST,
      payload: API.post(new URI(MANIFEST_INFO_URL).toString(), {
        action: 'import_manifest',
        manifest
      })
    }).then(() => fetchManifestInfoAction()(dispatch));
  } catch (e) {
    // TODO dispatch some error action here, maybe UPLOAD_MANIFEST_REJECTED?
  }
};

export const resetManifestAction = () => dispatch =>
  dispatch({
    type: RESET_MANIFEST,
    payload: API.post(new URI(MANIFEST_INFO_URL).toString(), {
      action: 'reset_manifest'
    })
  }).then(() => fetchManifestInfoAction()(dispatch));

export const calculateSummaryDataAction = results => simpleActionWithProperties(CALCULATE_SUMMARY_DATA, { results });

export const selectProvidersAction = selectedProviders =>
  simpleActionWithProperties(SELECT_PROVIDERS, { selectedProviders });

export const selectDetailedDataAction = detailedDataSelected =>
  simpleActionWithProperties(SELECT_DETAILED_DATA, { detailedDataSelected });

export const startInventoryBundleAction = providerIds => dispatch =>
  dispatch({
    type: START_INVENTORY_BUNDLE,
    payload: API.post(new URI(INVENTORY_BUNDLE_URL).toString(), {
      action: 'bundle',
      provider_ids: providerIds
    })
  });

export const fetchBundleTaskAction = taskHref => basicFetchAction(FETCH_BUNDLE_TASK, taskHref);

export const resetDataCollectionStateAction = () => dispatch => dispatch({ type: RESET_DATA_COLLECTION_STATE });
