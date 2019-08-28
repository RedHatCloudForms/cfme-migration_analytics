import Immutable from 'seamless-immutable';

import { mockStore } from '../../common/testReduxHelpers';
import { mockRequest, mockReset } from '../../common/mockRequests';
import {
  functionLookupReducer,
  getHandlersForFetchResourcesActions,
  getHandlersForFetchActionsIndexedByHref,
  formatApiFilterValues,
  filterResources,
  findResource,
  fetchExpandedResourcesAction,
  simpleActionWithProperties,
  getHandlersForBasicFetchActions
} from '../helpers';

const store = mockStore();

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('redux helpers', () => {
  test('function lookup reducer', () => {
    const reducer = functionLookupReducer(Immutable({ foo: 'initial' }), {
      SET_FOO: (state, action) => state.set('foo', action.foo)
    });
    const initialState = reducer();
    expect(initialState).toEqual({ foo: 'initial' });
    const reducedState = reducer(initialState, { type: 'SET_FOO', foo: 'new value' });
    expect(reducedState).toEqual({ foo: 'new value' });
    const stateAfterUnknownAction = reducer(reducedState, { type: 'SOME_OTHER_ACTION' });
    expect(stateAfterUnknownAction).toEqual(reducedState);
  });

  test('get handlers for basic fetch actions with default getResource function', () => {
    const fetchWidget = getHandlersForBasicFetchActions(
      'FETCH_WIDGET',
      'isFetchingWidget',
      'errorFetchingWidget',
      'widget'
    );
    const widgetReducer = functionLookupReducer(fetchWidget.initialState, fetchWidget.actionHandlers);
    const stateAfterFulfilled = widgetReducer(fetchWidget.initialState, {
      type: 'FETCH_WIDGET_FULFILLED',
      payload: { data: { mock: 'widget' } }
    });
    expect(stateAfterFulfilled.widget).toEqual({ mock: 'widget' });
  });

  test('get handlers for fetch resources actions', () => {
    const fetchWidgets = getHandlersForFetchResourcesActions(
      'FETCH_WIDGETS',
      'isFetchingWidgets',
      'errorFetchingWidgets',
      'widgets'
    );
    const widgetsReducer = functionLookupReducer(fetchWidgets.initialState, fetchWidgets.actionHandlers);

    const stateBeforePending = fetchWidgets.initialState.set('errorFetchingWidgets', 'some error');
    const stateAfterPending = widgetsReducer(stateBeforePending, { type: 'FETCH_WIDGETS_PENDING' });
    expect(stateAfterPending).toEqual({ isFetchingWidgets: true, errorFetchingWidgets: null, widgets: null });

    const stateBeforeFulfilled = stateAfterPending.set('errorFetchingWidgets', 'some error');
    const stateAfterFulfilled = widgetsReducer(stateBeforeFulfilled, {
      type: 'FETCH_WIDGETS_FULFILLED',
      payload: { data: { resources: [{ mock: 'widget1', id: 1 }, { mock: 'widget2', id: 2 }] } }
    });
    expect(stateAfterFulfilled).toEqual({
      isFetchingWidgets: false,
      errorFetchingWidgets: null,
      widgets: [{ mock: 'widget1', id: 1 }, { mock: 'widget2', id: 2 }]
    });

    const stateBeforeRejected = stateAfterPending;
    const stateAfterRejected = widgetsReducer(stateBeforeRejected, {
      type: 'FETCH_WIDGETS_REJECTED',
      payload: { data: { error: 'some error' } }
    });
    expect(stateAfterRejected).toEqual({ isFetchingWidgets: false, errorFetchingWidgets: 'some error', widgets: null });
  });

  test('get handlers for fetch actions indexed by href', () => {
    const fetchWidget = getHandlersForFetchActionsIndexedByHref(
      'FETCH_WIDGET',
      'fetchingWidgetHrefs',
      'errorFetchingWidget',
      'widgetsByHref'
    );
    const widgetReducer = functionLookupReducer(fetchWidget.initialState, fetchWidget.actionHandlers);

    const stateBeforePending1 = fetchWidget.initialState.set('errorFetchingWidget', 'some error');
    const stateAfterPending1 = widgetReducer(stateBeforePending1, {
      type: 'FETCH_WIDGET_PENDING',
      meta: { href: '/api/widgets/1' }
    });
    expect(stateAfterPending1).toEqual({
      fetchingWidgetHrefs: ['/api/widgets/1'],
      errorFetchingWidget: null,
      widgetsByHref: {}
    });

    const stateAfterPending2 = widgetReducer(stateAfterPending1, {
      type: 'FETCH_WIDGET_PENDING',
      meta: { href: '/api/widgets/2' }
    });
    expect(stateAfterPending2).toEqual({
      fetchingWidgetHrefs: ['/api/widgets/1', '/api/widgets/2'],
      errorFetchingWidget: null,
      widgetsByHref: {}
    });

    const stateAfterRejected2 = widgetReducer(stateAfterPending2, {
      type: 'FETCH_WIDGET_REJECTED',
      meta: { href: '/api/widgets/2' },
      payload: { data: { error: 'some error' } }
    });
    expect(stateAfterRejected2).toEqual({
      fetchingWidgetHrefs: ['/api/widgets/1'],
      errorFetchingWidget: 'some error',
      widgetsByHref: {}
    });

    const stateBeforeFulfilled1 = stateAfterPending2.set('errorFetchingWidget', 'some error');
    const stateAfterFulfilled1 = widgetReducer(stateBeforeFulfilled1, {
      type: 'FETCH_WIDGET_FULFILLED',
      meta: { href: '/api/widgets/1' },
      payload: { data: { mock: 'widget1', id: 1 } }
    });
    expect(stateAfterFulfilled1).toEqual({
      fetchingWidgetHrefs: ['/api/widgets/2'],
      errorFetchingWidget: null,
      widgetsByHref: { '/api/widgets/1': { mock: 'widget1', id: 1 } }
    });

    const stateAfterFulfilled2 = widgetReducer(stateAfterFulfilled1, {
      type: 'FETCH_WIDGET_FULFILLED',
      meta: { href: '/api/widgets/2' },
      payload: { data: { mock: 'widget2', id: 2 } }
    });
    expect(stateAfterFulfilled2).toEqual({
      fetchingWidgetHrefs: [],
      errorFetchingWidget: null,
      widgetsByHref: {
        '/api/widgets/1': { mock: 'widget1', id: 1 },
        '/api/widgets/2': { mock: 'widget2', id: 2 }
      }
    });
  });

  test('format API filter values', () =>
    expect(formatApiFilterValues({ key1: 'val1', key2: 'val2' })).toEqual(["key1='val1'", "key2='val2'"]));

  describe('basic filtering helpers', () => {
    const resources = [
      { id: 1, type: 'widget', size: 'large', name: 'foo' },
      { id: 2, type: 'widget', size: 'large', name: 'bar' },
      { id: 3, type: 'widget', size: 'small', name: 'quux' },
      { id: 4, type: 'other', size: 'small', name: 'xyzzy' }
    ];
    const filterValues = {
      type: 'widget',
      size: 'large'
    };

    test('filter resources', () =>
      expect(filterResources(resources, filterValues)).toEqual([
        { id: 1, type: 'widget', size: 'large', name: 'foo' },
        { id: 2, type: 'widget', size: 'large', name: 'bar' }
      ]));

    test('find resource', () =>
      expect(findResource(resources, filterValues)).toEqual({ id: 1, type: 'widget', size: 'large', name: 'foo' }));
  });

  describe('fetch expanded resources action', () => {
    const action = fetchExpandedResourcesAction('FETCH_WIDGETS', '/api/widgets', { size: 'large' }, ['id', 'name']);

    test('formats URL properly with filterValues and attributes', () => {
      global.API.get.mockClear();
      store.dispatch(action);
      expect(global.API.get.mock.calls[0][0]).toEqual(
        '/api/widgets?filter%5B%5D=size%3D%27large%27&attributes=id%2Cname&expand=resources'
      );
    });

    test('formats URL properly with no filterValues or actions', () => {
      global.API.get.mockClear();
      store.dispatch(fetchExpandedResourcesAction('FETCH_WIDGETS', '/api/widgets'));
      expect(global.API.get.mock.calls[0][0]).toEqual('/api/widgets?expand=resources');
    });

    test('is successful', () => {
      mockRequest({
        method: 'GET',
        url: '/api/widgets',
        status: 200,
        response: [{ mock: 'widget' }]
      });
      return store.dispatch(action).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: 'FETCH_WIDGETS_PENDING' },
          { type: 'FETCH_WIDGETS_FULFILLED', payload: [{ mock: 'widget' }] }
        ]);
      });
    });

    test('is rejected', () => {
      mockRequest({
        method: 'GET',
        url: '/api/widgets',
        status: 404
      });
      return store.dispatch(action).catch(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: 'FETCH_WIDGETS_PENDING' },
          { type: 'FETCH_WIDGETS_REJECTED', error: true, payload: new Error('<mocked error>') }
        ]);
      });
    });
  });

  test('simple action with properties', () => {
    store.dispatch(simpleActionWithProperties('SOME_ACTION', { prop1: 'one', prop2: 'two' }));
    expect(store.getActions()).toEqual([{ type: 'SOME_ACTION', prop1: 'one', prop2: 'two' }]);
  });
});
