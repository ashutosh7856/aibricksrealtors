export function formatName(slug) {
  if (!slug) return "";

  const value = Array.isArray(slug) ? slug[0] : slug;

  if (typeof value !== "string") return "";

  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function createSlug(name) {
  return name?.toLowerCase().trim().replace(/\s+/g, "-");
}
