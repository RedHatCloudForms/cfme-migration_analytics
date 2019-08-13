import {
  CALCULATE_SUMMARY_DATA,
  SELECT_PROVIDERS,
  SELECT_DETAILED_DATA,
  FETCH_MANIFEST_INFO,
  MANIFEST_INFO_URL
} from './constants';
import { simpleActionWithProperties, basicFetchAction } from '../../../../../redux/helpers';

export const fetchManifestInfoAction = () => basicFetchAction(FETCH_MANIFEST_INFO, MANIFEST_INFO_URL);

export const calculateSummaryDataAction = results => simpleActionWithProperties(CALCULATE_SUMMARY_DATA, { results });

export const selectProvidersAction = selectedProviders =>
  simpleActionWithProperties(SELECT_PROVIDERS, { selectedProviders });

export const selectDetailedDataAction = detailedDataSelected =>
  simpleActionWithProperties(SELECT_DETAILED_DATA, { detailedDataSelected });
