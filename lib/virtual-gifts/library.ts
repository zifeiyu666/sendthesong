type FilterableVirtualGift = {
  templateId: string;
  message: string;
  senderName: string | null;
};

export function getVirtualGiftCardTitle(
  message: string,
  fallback: string,
): string {
  const firstLine = message.trim().split(/\r?\n/, 1)[0] ?? "";
  if (!firstLine) return fallback;
  if (firstLine.length <= 72) return firstLine;
  return `${firstLine.slice(0, 69).trimEnd()}…`;
}

export function filterVirtualGifts<T extends FilterableVirtualGift>(
  gifts: T[],
  {
    template,
    query,
  }: {
    template: string;
    query: string;
  },
): T[] {
  const normalizedQuery = query.trim().toLowerCase();

  return gifts.filter((gift) => {
    const matchesTemplate =
      template === "all" || gift.templateId === template;
    const matchesQuery =
      !normalizedQuery ||
      gift.message.toLowerCase().includes(normalizedQuery) ||
      gift.templateId.toLowerCase().includes(normalizedQuery) ||
      (gift.senderName ?? "").toLowerCase().includes(normalizedQuery);

    return matchesTemplate && matchesQuery;
  });
}
