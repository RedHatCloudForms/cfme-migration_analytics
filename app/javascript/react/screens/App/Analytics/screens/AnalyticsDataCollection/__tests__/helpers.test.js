import { getPayloadUrl } from '../helpers';

describe('data collection helpers', () => {
  test('get payload url', () => {
    const payloadPath = '/tmp/something/migration_analytics/something/payload.tgz';
    expect(getPayloadUrl(payloadPath)).toBe('/migration_analytics/something/payload.tgz');
    expect(getPayloadUrl('foo')).toBe(null);
  });
});
