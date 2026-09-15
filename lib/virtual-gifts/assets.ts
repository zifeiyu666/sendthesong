const VIRTUAL_GIFTS_KEY_PREFIX = "virtual-gifts/";

export function getR2PublicBaseUrl(): string | null {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  return base || null;
}

export function isVirtualGiftAssetUrl(url: string): boolean {
  const base = getR2PublicBaseUrl();
  if (!base) return false;

  try {
    const parsed = new URL(url);
    const expected = new URL(base);
    if (parsed.origin !== expected.origin) return false;
    const key = parsed.pathname.replace(/^\//, "");
    return key.startsWith(VIRTUAL_GIFTS_KEY_PREFIX);
  } catch {
    return false;
  }
}

export function extractR2KeyFromPublicUrl(url: string): string | null {
  const base = getR2PublicBaseUrl();
  if (!base) return null;

  try {
    const parsed = new URL(url);
    const expected = new URL(base);
    if (parsed.origin !== expected.origin) return null;
    const key = parsed.pathname.replace(/^\//, "");
    return key || null;
  } catch {
    return null;
  }
}

export function isVirtualGiftImageKey(key: string): boolean {
  return /^virtual-gifts\/images\/[A-Za-z0-9._-]+$/.test(key);
}

export function isVirtualGiftAudioKey(key: string): boolean {
  return /^virtual-gifts\/audio\/[A-Za-z0-9._-]+$/.test(key);
}
