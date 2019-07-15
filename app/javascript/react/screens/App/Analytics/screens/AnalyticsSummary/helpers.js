export const someProvidersExist = ({ providers }) => providers && providers.length > 0;

export const noRefreshErrorsExist = ({ providersWithRefreshErrors }) =>
  providersWithRefreshErrors && providersWithRefreshErrors.length === 0;

export const someProvidersAwaitingRefresh = ({ providersAwaitingRefresh }) =>
  providersAwaitingRefresh && providersAwaitingRefresh.length > 0;

export const noProvidersAwaitingRefresh = ({ providersAwaitingRefresh }) =>
  providersAwaitingRefresh && providersAwaitingRefresh.length === 0;

export const providersRefreshed = props =>
  someProvidersExist(props) && noRefreshErrorsExist(props) && noProvidersAwaitingRefresh(props);
