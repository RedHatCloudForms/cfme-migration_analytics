import React from 'react';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

const middlewares = [thunkMiddleware, promiseMiddleware];

export const generateStore = (reducers, initialState) =>
  createStore(combineReducers(reducers), initialState, applyMiddleware(...middlewares));

export const mockStore = initialState => configureMockStore(middlewares)(initialState);

export const mountWithTestStore = (reducers, initialState, children) => {
  const store = generateStore({ migrationAnalytics: combineReducers(reducers) }, { migrationAnalytics: initialState });
  return mount(<Provider store={store}>{children}</Provider>);
};

export const mockDispatch = actionCreator => {
  const dispatch = jest.fn();
  actionCreator(dispatch);
  return dispatch.mock.calls[0][0];
};
