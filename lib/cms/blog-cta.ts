const CREATE_SONG_PATH = "/create-song";

const SLUG_HREFS: Record<string, string> = {
  "custom-song-for-wife": "/create-song?occasion=anniversary&recipient=wife",
  "custom-happy-birthday-song": "/create-song?occasion=birthday",
};

const OCCASION_MATCHES = [
  {
    occasion: "birthday",
    terms: ["birthday", "cumpleanos", "誕生日"],
  },
  {
    occasion: "valentines-day",
    terms: ["valentine", "valentines", "san valentin", "バレンタイン"],
  },
  {
    occasion: "mothers-day",
    terms: [
      "mother's day",
      "mothers day",
      "mothers-day",
      "dia de la madre",
      "母の日",
    ],
  },
  {
    occasion: "fathers-day",
    terms: [
      "father's day",
      "fathers day",
      "fathers-day",
      "dia del padre",
      "父の日",
    ],
  },
  {
    occasion: "anniversary",
    terms: ["anniversary", "aniversario", "記念日"],
  },
  {
    occasion: "wedding",
    terms: ["wedding", "boda", "結婚式"],
  },
  {
    occasion: "proposal",
    terms: ["proposal", "propuesta", "プロポーズ"],
  },
] as const;

const RECIPIENT_MATCHES = [
  {
    recipient: "wife",
    terms: ["wife", "esposa", "妻"],
    defaultOccasion: "anniversary",
  },
  {
    recipient: "husband",
    terms: ["husband", "esposo", "夫"],
    defaultOccasion: "anniversary",
  },
] as const;

const SKIP_HEADING_RE =
  /^(tl;?dr|too long|quick summary|in short|resumo|resumen|要約|要点)/i;

const MIN_BEFORE_CHARS = 280;
const MIN_AFTER_CHARS = 400;

function normalizeSlug(slug: string): string {
  return slug.replace(/^\//, "").replace(/^blogs\//, "");
}

function normalizeSearchText(value: string): string {
  return ` ${value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9fff]+/gi, " ")
    .trim()} `;
}

function containsTerm(haystack: string, term: string): boolean {
  const normalizedTerm = normalizeSearchText(term).trim();

  if (!normalizedTerm) {
    return false;
  }

  if (/[\u3040-\u30ff\u4e00-\u9fff]/.test(normalizedTerm)) {
    return haystack.includes(normalizedTerm);
  }

  return haystack.includes(` ${normalizedTerm} `);
}

function buildCreateHref(occasion?: string, recipient?: string): string {
  const params = new URLSearchParams();

  if (occasion) {
    params.set("occasion", occasion);
  }

  if (recipient) {
    params.set("recipient", recipient);
  }

  const query = params.toString();
  return query ? `${CREATE_SONG_PATH}?${query}` : CREATE_SONG_PATH;
}

export function getBlogCreateHref(input: {
  slug: string;
  tags?: string | string[] | null;
}): string {
  const slug = normalizeSlug(input.slug);
  const slugHref = SLUG_HREFS[slug];

  if (slugHref) {
    return slugHref;
  }

  const tagText = Array.isArray(input.tags)
    ? input.tags.join(" ")
    : (input.tags ?? "");
  const haystack = normalizeSearchText(`${slug} ${tagText}`);

  const recipientMatch = RECIPIENT_MATCHES.find((item) =>
    item.terms.some((term) => containsTerm(haystack, term)),
  );
  const occasionMatch = OCCASION_MATCHES.find((item) =>
    item.terms.some((term) => containsTerm(haystack, term)),
  );

  return buildCreateHref(
    occasionMatch?.occasion ?? recipientMatch?.defaultOccasion,
    recipientMatch?.recipient,
  );
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function headingMatches(html: string) {
  return [...html.matchAll(/<h([2-3])\b[^>]*>[\s\S]*?<\/h\1>/gi)].map(
    (match) => ({
      start: match.index ?? 0,
      end: (match.index ?? 0) + match[0].length,
      text: stripTags(match[0]),
    }),
  );
}

function isSkipHeading(text: string): boolean {
  return SKIP_HEADING_RE.test(text.trim());
}

function insertIndexBeforeSecondContentSection(html: string): number | null {
  const headings = headingMatches(html);
  let contentHeadingCount = 0;

  for (const heading of headings) {
    if (isSkipHeading(heading.text) && contentHeadingCount === 0) {
      continue;
    }

    contentHeadingCount += 1;

    if (contentHeadingCount === 2) {
      return heading.start;
    }
  }

  return null;
}

function insertIndexAtParagraphBoundary(html: string): number | null {
  const target = Math.floor(html.length * 0.4);
  const paragraphClose = html.indexOf("</p>", target);

  if (paragraphClose === -1) {
    return null;
  }

  return paragraphClose + 4;
}

export function splitArticleHtmlForMidCta(
  html: string,
): { before: string; after: string } | null {
  if (!html.trim()) {
    return null;
  }

  const insertAt =
    insertIndexBeforeSecondContentSection(html) ??
    insertIndexAtParagraphBoundary(html);

  if (insertAt == null) {
    return null;
  }

  const before = html.slice(0, insertAt);
  const after = html.slice(insertAt);

  if (before.trim().length < MIN_BEFORE_CHARS || after.trim().length < MIN_AFTER_CHARS) {
    return null;
  }

  return { before, after };
}
