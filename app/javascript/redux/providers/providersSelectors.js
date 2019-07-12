export const selectProvidersAwaitingRefresh = ({ providers }) =>
  providers && providers.filter(provider => !provider.last_refresh_date);
