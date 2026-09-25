export function extractYouTubeId(input?: string): string | null {
  if (!input) return null;
  try {
    // Plain ID
    if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;

    const url = new URL(input);

    // watch?v=ID
    const v = url.searchParams.get("v");
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;

    // youtu.be/ID
    if (url.hostname.includes("youtu.be")) {
      const shortId = url.pathname.split("/").filter(Boolean)[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(shortId)) return shortId;
    }

    // /embed/ID
    const parts = url.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (
      embedIndex >= 0 &&
      parts[embedIndex + 1] &&
      /^[A-Za-z0-9_-]{11}$/.test(parts[embedIndex + 1])
    ) {
      return parts[embedIndex + 1];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Gets the appropriate image URL for a project
 * @param embedLink - YouTube embed link
 * @param imageUrl - Optional image URL from Supabase Storage
 * @returns Image URL (YouTube thumbnail, uploaded image, or placeholder)
 */
export function getProjectImageUrl(
  embedLink?: string,
  imageUrl?: string
): string {
  if (imageUrl) return imageUrl;
  
  if (embedLink) {
    const youtubeId = extractYouTubeId(embedLink);
    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    }
  }
  
  return "/assets/placeholder.png";
}
