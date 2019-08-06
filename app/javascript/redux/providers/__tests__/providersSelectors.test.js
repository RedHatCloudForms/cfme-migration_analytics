import {
  selectProvidersByFilterValues,
  selectProvidersAwaitingRefresh,
  selectProvidersWithRefreshErrors
} from '../providersSelectors';

describe('providers selectors', () => {
  const providers = [
    { id: 1, name: 'provider1', type: 'vmware', last_refresh_date: 'some date' },
    { id: 2, name: 'provider2', type: 'vmware', last_refresh_date: null },
    { id: 3, name: 'provider3', type: 'rhv', last_refresh_date: 'some date', last_refresh_error: 'some error' }
  ];

  test('select providers by filter values', () =>
    expect(selectProvidersByFilterValues({ providers }, { type: 'vmware' })).toEqual([providers[0], providers[1]]));

  test('select providers awaiting refresh', () =>
    expect(selectProvidersAwaitingRefresh({ providers })).toEqual([providers[1]]));

  test('select providers with refresh errors', () =>
    expect(selectProvidersWithRefreshErrors({ providers })).toEqual([providers[2]]));
});
