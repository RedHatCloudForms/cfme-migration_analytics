import {
  selectBundleError,
  selectIsBundleTaskFinished,
  selectIsPayloadReady,
  selectBundleTaskHref,
  selectNumVms
} from '../analyticsSelectors';
import { ERROR, FINISHED, OK } from '../../constants';

describe('analytics redux selectors', () => {
  describe('select bundle error', () => {
    test('when starting bundle', () => {
      const error = selectBundleError({ errorStartingBundle: { message: 'foo' } });
      expect(error).toBe('foo');
    });

    test('in start result', () => {
      const error = selectBundleError({ bundleStartResult: { success: false, message: 'foo' } });
      expect(error).toBe('foo');
    });

    test('in bundle task', () => {
      const error = selectBundleError({ bundleTask: { status: ERROR, message: 'foo' } });
      expect(error).toBe('foo');
    });

    test('when there is no error', () => {
      const error = selectBundleError({});
      expect(error).toBe(null);
    });
  });

  test('select is bundle task finished', () => {
    expect(selectIsBundleTaskFinished({ bundleTask: { state: FINISHED } })).toBe(true);
    expect(selectIsBundleTaskFinished({ bundleTask: { state: 'Active' } })).toBe(false);
    expect(selectIsBundleTaskFinished({ bundleTask: null })).toBe(null);
  });

  test('select is payload ready', () => {
    expect(
      selectIsPayloadReady(
        { isStartingBundle: false, bundleTask: { state: FINISHED, status: OK } },
        { bundleError: null, isBundleTaskFinished: true }
      )
    ).toBe(true);
    expect(
      selectIsPayloadReady(
        { isStartingBundle: false, bundleTask: { state: FINISHED, status: 'Error' } },
        { bundleError: null, isBundleTaskFinished: true }
      )
    ).toBe(false);
    expect(
      selectIsPayloadReady(
        { isStartingBundle: false, bundleTask: {} },
        { bundleError: null, isBundleTaskFinished: false }
      )
    ).toBe(false);
    expect(
      selectIsPayloadReady(
        { isStartingBundle: false, bundleTask: {} },
        { bundleError: 'foo', isBundleTaskFinished: true }
      )
    ).toBe(false);
    expect(
      selectIsPayloadReady(
        { isStartingBundle: true, bundleTask: {} },
        { bundleError: null, isBundleTaskFinished: false }
      )
    ).toBe(false);
  });

  test('select bundle task href', () => {
    expect(selectBundleTaskHref({ bundleStartResult: { task_href: '/api/foo/1' } })).toBe('/api/foo/1');
    expect(selectBundleTaskHref({ bundleStartResult: null })).toBe(null);
  });

  test('select num VMs', () => {
    const summaryData = { providers: [{ id: 1, numVms: 3 }, { id: 2, numVms: 5 }, { id: 3, numVms: 7 }] };
    const selectedProviders = [{ id: 2 }, { id: 3 }];
    expect(selectNumVms({ summaryData, selectedProviders })).toBe(12);
  });
});
