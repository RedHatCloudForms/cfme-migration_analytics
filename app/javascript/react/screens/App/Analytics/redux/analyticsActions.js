import URI from 'urijs';
import { saveAs } from 'file-saver';
import API from '../../../../../common/API';
import {
  CHANGE_MANIFEST,
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
  DOWNLOAD_PAYLOAD,
  PAYLOAD_DOWNLOAD_URL
} from './constants';
import { simpleActionWithProperties, basicFetchAction } from '../../../../../redux/helpers';

export const fetchManifestInfoAction = () => basicFetchAction(FETCH_MANIFEST_INFO, MANIFEST_INFO_URL);

export const toggleManifestUpdateModalAction = (show = null) => dispatch =>
  dispatch({ type: TOGGLE_MANIFEST_UPDATE_MODAL, show });

export const uploadManifestAction = fileBody => dispatch => {
  toggleManifestUpdateModalAction(false)(dispatch);
  try {
    const manifest = JSON.parse(fileBody);
    if (!manifest.cfme_version || !manifest.manifest || !manifest.manifest.version) {
      throw new Error();
    }
    dispatch({
      type: CHANGE_MANIFEST,
      payload: API.post(new URI(MANIFEST_INFO_URL).toString(), {
        action: 'import_manifest',
        manifest
      })
    }).then(() => fetchManifestInfoAction()(dispatch));
  } catch (e) {
    // If JSON.parse fails or the error above is thrown
    dispatch({
      type: `${CHANGE_MANIFEST}_REJECTED`,
      payload: { data: { error: { message: __('Selected file is not a valid manifest') } } }
    });
  }
};

export const resetManifestAction = () => dispatch => {
  toggleManifestUpdateModalAction(false)(dispatch);
  dispatch({
    type: CHANGE_MANIFEST,
    payload: API.post(new URI(MANIFEST_INFO_URL).toString(), {
      action: 'reset_manifest'
    })
  }).then(() => fetchManifestInfoAction()(dispatch));
};

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

const fileNameRegex = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/; // https://stackoverflow.com/a/52738125

export const downloadPayloadAction = bundleTaskId => dispatch => {
  const uri = new URI(PAYLOAD_DOWNLOAD_URL);
  uri.addSearch('task_id', bundleTaskId);
  dispatch({
    type: DOWNLOAD_PAYLOAD,
    payload: new Promise((resolve, reject) =>
      API.get(uri.toString(), {}, {}, { skipJsonParsing: true })
        .then(({ data: response }) =>
          response.blob().then(blob => {
            const fileName = response.headers.get('content-disposition').match(fileNameRegex)[1];
            saveAs(blob, fileName);
            resolve({ data: fileName });
          })
        )
        .catch(error => reject(error))
    )
  });
};

export const resetDataCollectionStateAction = () => dispatch => dispatch({ type: RESET_DATA_COLLECTION_STATE });
