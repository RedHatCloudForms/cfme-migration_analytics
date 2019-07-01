export const functionLookupReducer = (initialState, actionHandlers) => (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export const getHandlersForFetchActionsIndexedByHref = (actionType, fetchingHrefsKey, errorKey, payloadsByHrefKey) => {
  return {
    initialState: {
      [fetchingHrefsKey]: [],
      [errorKey]: null,
      [payloadsByHrefKey]: {}
    },
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
          .set(errorKey, action.payload)
          .set(fetchingHrefsKey, state[fetchingHrefsKey].filter(href => href !== action.meta.href))
    }
  };
};
