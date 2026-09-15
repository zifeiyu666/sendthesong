export function createVirtualGiftShareToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = Buffer.from(bytes).toString("base64url").replace(/=+$/g, "");
  return `gift_${token}`;
}

export function isVirtualGiftShareToken(token: string): boolean {
  return /^gift_[A-Za-z0-9_-]{32,}$/.test(token);
}
