import { fetchProvidersAction } from '../providersActions';
import { fetchExpandedResourcesAction } from '../../helpers';
import { FETCH_PROVIDERS, PROVIDERS_URL } from '../constants';

jest.mock('../../helpers');

describe('providers actions', () => {
  test('fetch providers action', () => {
    fetchProvidersAction({ type: 'foo' }, ['id', 'name']);
    expect(fetchExpandedResourcesAction).toHaveBeenCalledWith(FETCH_PROVIDERS, PROVIDERS_URL, { type: 'foo' }, [
      'id',
      'name'
    ]);
  });
});
