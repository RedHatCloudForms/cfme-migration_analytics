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
  RESET_DATA_COLLECTION_STATE
} from './constants';
import { simpleActionWithProperties, basicFetchAction } from '../../../../../redux/helpers';

export const fetchManifestInfoAction = () => basicFetchAction(FETCH_MANIFEST_INFO, MANIFEST_INFO_URL);

export const toggleManifestUpdateModalAction = () => dispatch => dispatch({ type: TOGGLE_MANIFEST_UPDATE_MODAL });

export const uploadManifestAction = () => dispatch => dispatch(); // TODO

export const resetManifestAction = () => dispatch => dispatch(); // TODO

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
