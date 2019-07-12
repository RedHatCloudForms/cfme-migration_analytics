import Immutable from 'seamless-immutable';
import { functionLookupReducer, getHandlersForFetchResourcesActions } from '../helpers';
import { FETCH_PROVIDERS } from './constants';

const fetchProviders = getHandlersForFetchResourcesActions(
  FETCH_PROVIDERS,
  'isFetchingProviders',
  'errorFetchingProviders',
  'providers'
);

export const initialState = Immutable({
  ...fetchProviders.initialState
});

const actionHandlers = {
  ...fetchProviders.actionHandlers
};

export default functionLookupReducer(initialState, actionHandlers);
