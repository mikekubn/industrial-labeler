/**
 * Normalize UUID to remove hyphens and convert to lowercase.
 */
const normalizeUuid = (uuid: string) => uuid.replace(/-/g, "").toLowerCase();

export { normalizeUuid };
