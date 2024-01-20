// Returns string value for a meta key
export const getMetaEnvString = (key: string): string | undefined => {
  const metaElement = document.querySelector(`meta[name="ENV_${key}"]`);
  if (metaElement === null) {
    return undefined;
  }
  return metaElement.getAttribute("content") || undefined;
};

// Returns decoded JSON from a meta key
export const getMetaEnvJson = (
  key: string
): Record<string, string | number> | string | undefined => {
  const contentRaw = getMetaEnvString(key);
  if (!contentRaw) {
    return undefined;
  }

  const contentDecoded = decodeURI(contentRaw);
  return JSON.parse(contentDecoded);
};
