import Immutable from 'seamless-immutable';
import URI from 'urijs';
import API from '../common/API';

export const functionLookupReducer = (initialState, actionHandlers) => (state = initialState, action) => {
  const handler = action && actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export const getHandlersForFetchResourcesActions = (actionType, isFetchingKey, errorKey, resourcesKey) => ({
  initialState: Immutable({
    [isFetchingKey]: false,
    [errorKey]: null,
    [resourcesKey]: null
  }),
  actionHandlers: {
    [`${actionType}_PENDING`]: state => state.set(errorKey, null).set(isFetchingKey, true),
    [`${actionType}_FULFILLED`]: (state, action) =>
      state
        .set(errorKey, null)
        .set(isFetchingKey, false)
        .set(resourcesKey, action.payload.data.resources),
    [`${actionType}_REJECTED`]: (state, action) =>
      state.set(errorKey, action.payload.data.error).set(isFetchingKey, false)
  }
});

export const getHandlersForFetchActionsIndexedByHref = (actionType, fetchingHrefsKey, errorKey, payloadsByHrefKey) => ({
  initialState: Immutable({
    [fetchingHrefsKey]: [],
    [errorKey]: null,
    [payloadsByHrefKey]: {}
  }),
  actionHandlers: {
    [`${actionType}_PENDING`]: (state, action) =>
      state.set(errorKey, null).set(fetchingHrefsKey, [...state[fetchingHrefsKey], action.meta.href]),
    [`${actionType}_FULFILLED`]: (state, action) =>
      state
        .set(errorKey, null)
        .set(fetchingHrefsKey, state[fetchingHrefsKey].filter(href => href !== action.meta.href))
        .set(payloadsByHrefKey, { ...state[payloadsByHrefKey], [action.meta.href]: action.payload.data }),
    [`${actionType}_REJECTED`]: (state, action) =>
      state
        .set(errorKey, action.payload.data.error)
        .set(fetchingHrefsKey, state[fetchingHrefsKey].filter(href => href !== action.meta.href))
  }
});

export const formatApiFilterValues = filterValues =>
  Object.keys(filterValues).map(key => `${key}='${filterValues[key]}'`);

const resourceMatchesFilters = (resource, filterValues) =>
  Object.keys(filterValues).every(key => filterValues[key] === resource[key]);

export const filterResources = (resources, filterValues) =>
  resources && resources.filter(resource => resourceMatchesFilters(resource, filterValues));

export const findResource = (resources, filterValues) =>
  resources && resources.find(resource => resourceMatchesFilters(resource, filterValues));

export const fetchExpandedResourcesAction = (type, href, filterValues, attributes) => dispatch => {
  const uri = new URI(href);
  if (filterValues) uri.addSearch('filter[]', formatApiFilterValues(filterValues));
  if (attributes) uri.addSearch('attributes', attributes.join(','));
  uri.addSearch('expand', 'resources');
  return dispatch({
    type,
    payload: API.get(uri.toString())
  });
};

export const simpleActionWithProperties = (type, properties) => dispatch => dispatch({ type, ...properties });
