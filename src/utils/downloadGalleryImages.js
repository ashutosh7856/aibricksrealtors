/**
 * Trigger downloads for gallery image URLs (best-effort; cross-origin may open in new tab).
 * @param {string[]} urls
 * @param {string} baseName
 */
export async function downloadGalleryImages(urls, baseName = "gallery") {
  const list = (urls || []).filter(Boolean);
  for (let i = 0; i < list.length; i += 1) {
    const url = list[i];
    const extMatch = url.split("?")[0].match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1] : "jpg";
    const filename = `${baseName}-${i + 1}.${ext}`;
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch failed");
      // eslint-disable-next-line no-await-in-loop
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }
}
