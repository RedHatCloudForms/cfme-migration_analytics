import { CALCULATE_SUMMARY_DATA, SELECT_PROVIDERS } from './constants';

export const calculateSummaryDataAction = results => dispatch =>
  dispatch({
    type: CALCULATE_SUMMARY_DATA,
    results
  });

export const selectProvidersAction = selectedProviders => dispatch =>
  dispatch({
    type: SELECT_PROVIDERS,
    selectedProviders
  });
