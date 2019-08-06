import {
  someProvidersExist,
  noRefreshErrorsExist,
  someProvidersAwaitingRefresh,
  noProvidersAwaitingRefresh,
  providersRefreshed
} from '../helpers';

describe('analytics summary helpers', () => {
  test('some providers exist', () => {
    expect(someProvidersExist({ providers: null })).toBeFalsy();
    expect(someProvidersExist({ providers: [] })).toBeFalsy();
    expect(someProvidersExist({ providers: [{ mock: 'provider' }] })).toBeTruthy();
  });

  test('no refresh errors exist', () => {
    expect(noRefreshErrorsExist({ providersWithRefreshErrors: null })).toBeFalsy();
    expect(noRefreshErrorsExist({ providersWithRefreshErrors: [] })).toBeTruthy();
    expect(noRefreshErrorsExist({ providersWithRefreshErrors: [{ mock: 'provider' }] })).toBeFalsy();
  });

  test('some providers awaiting refresh', () => {
    expect(someProvidersAwaitingRefresh({ providersAwaitingRefresh: null })).toBeFalsy();
    expect(someProvidersAwaitingRefresh({ providersAwaitingRefresh: [] })).toBeFalsy();
    expect(someProvidersAwaitingRefresh({ providersAwaitingRefresh: [{ mock: 'provider' }] })).toBeTruthy();
  });

  test('no providers awaiting refresh', () => {
    expect(noProvidersAwaitingRefresh({ providersAwaitingRefresh: null })).toBeFalsy();
    expect(noProvidersAwaitingRefresh({ providersAwaitingRefresh: [] })).toBeTruthy();
    expect(noProvidersAwaitingRefresh({ providersAwaitingRefresh: [{ mock: 'provider' }] })).toBeFalsy();
  });

  test('providers refreshed', () => {
    expect(providersRefreshed({ providers: null })).toBeFalsy();
    expect(providersRefreshed({ providers: [{ mock: 'provider' }], providersWithRefreshErrors: null })).toBeFalsy();
    expect(providersRefreshed({ providers: [{ mock: 'provider' }], providersWithRefreshErrors: [] })).toBeFalsy();
    expect(
      providersRefreshed({
        providers: [{ mock: 'provider' }],
        providersWithRefreshErrors: [],
        providersAwaitingRefresh: null
      })
    ).toBeFalsy();
    expect(
      providersRefreshed({
        providers: [{ mock: 'provider' }],
        providersWithRefreshErrors: [],
        providersAwaitingRefresh: []
      })
    ).toBeTruthy();
  });
});
