import { CALCULATE_SUMMARY_DATA, SELECT_PROVIDERS, SELECT_DETAILED_DATA } from './constants';
import { simpleActionWithProperties } from '../../../../../redux/helpers';

export const calculateSummaryDataAction = results => simpleActionWithProperties(CALCULATE_SUMMARY_DATA, { results });

export const selectProvidersAction = selectedProviders =>
  simpleActionWithProperties(SELECT_PROVIDERS, { selectedProviders });

export const selectDetailedDataAction = detailedDataSelected =>
  simpleActionWithProperties(SELECT_DETAILED_DATA, { detailedDataSelected });
