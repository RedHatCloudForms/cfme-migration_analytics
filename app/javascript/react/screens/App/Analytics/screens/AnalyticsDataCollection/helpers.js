const payloadPathRegex = /\/migration_analytics\/.+$/;

export const getPayloadUrl = payloadPath => {
  const match = payloadPath && payloadPath.match(payloadPathRegex);
  return match ? match[0] : null;
};
