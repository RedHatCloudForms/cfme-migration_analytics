import { PROVIDERS_URL, FETCH_PROVIDERS } from './constants';
import { fetchExpandedResourcesAction } from '../helpers';

export const fetchProvidersAction = (filterValues, attributes) =>
  fetchExpandedResourcesAction(FETCH_PROVIDERS, PROVIDERS_URL, filterValues, attributes);
