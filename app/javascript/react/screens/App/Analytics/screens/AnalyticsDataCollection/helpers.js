const payloadPathRegex = /\/migration_analytics\/.+$/;

export const getPayloadUrl = payloadPath => {
  const match = payloadPath && payloadPath.match(payloadPathRegex);
  if (!match) return null;
  const { protocol, hostname, port } = window.location;
  const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  return `${origin}${match[0]}`;
};
