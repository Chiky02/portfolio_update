export function parseTags(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map(String).filter(Boolean);
    }
  } catch {
    /* comma-separated fallback */
  }
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function serializeTags(tags: string[] | string): string {
  if (Array.isArray(tags)) {
    return JSON.stringify(tags.map((tag) => tag.trim()).filter(Boolean));
  }
  return JSON.stringify(parseTags(tags));
}
