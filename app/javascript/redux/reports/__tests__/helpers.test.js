import { concatPreservingUniqueIds } from '../helpers';

describe('reports helpers', () => {
  test('concat preserving unique ids', () => {
    const currentResources = [{ id: 1, mock: 'resource1' }, { id: 2, mock: 'resource2' }];
    const newResources = [{ id: 2, mock: 'resource2-overwritten' }, { id: 3, mock: 'resource3' }];
    const mergedResources = concatPreservingUniqueIds(currentResources, newResources);
    expect(mergedResources).toEqual([
      { id: 1, mock: 'resource1' },
      { id: 2, mock: 'resource2-overwritten' },
      { id: 3, mock: 'resource3' }
    ]);
  });
});
