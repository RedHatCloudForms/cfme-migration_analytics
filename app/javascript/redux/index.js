import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import createReducers from './createReducers';

let middleware = [thunkMiddleware, promiseMiddleware];

if (process.env.NODE_ENV !== 'production' && !global.__testing__) {
  middleware = [...middleware, createLogger()];
}

export default createStore(
  createReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);
