import { filterResources } from '../helpers';

export const selectProvidersByFilterValues = ({ providers }, filterValues) => filterResources(providers, filterValues);

export const selectProvidersAwaitingRefresh = ({ providers }) =>
  providers && providers.filter(provider => !provider.last_refresh_date);

export const selectProvidersWithRefreshErrors = ({ providers }) =>
  providers && providers.filter(provider => !!provider.last_refresh_error);
