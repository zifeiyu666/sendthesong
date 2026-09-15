export const LOVE_LETTER_TEMPLATE_ID = "love-letter" as const;

export const VIRTUAL_GIFT_VIBES = [
  "hearts",
  "roses",
  "stars",
  "ribbons",
] as const;

export type LoveLetterVibe = (typeof VIRTUAL_GIFT_VIBES)[number];

const LEGACY_VIBE_MAP: Record<string, LoveLetterVibe> = {
  default: "hearts",
  red: "hearts",
  pink: "hearts",
  black: "hearts",
};

export type VirtualGiftPickerItem = {
  id: string;
  href: string | null;
  comingSoon: boolean;
  accentClassName: string;
  textClassName: string;
};

export const VIRTUAL_GIFT_PICKER_ITEMS: VirtualGiftPickerItem[] = [
  {
    id: "love-letter",
    href: "/virtual-gifts/love-letter",
    comingSoon: false,
    accentClassName: "bg-[#e85a6b] border-[#c93d4f]",
    textClassName: "text-white",
  },
  {
    id: "super-box",
    href: null,
    comingSoon: true,
    accentClassName: "bg-[#f08a3a] border-[#d4732a]",
    textClassName: "text-stone-950",
  },
  {
    id: "birthday-balloons",
    href: null,
    comingSoon: true,
    accentClassName: "bg-[#f5d045] border-[#e0bc2e]",
    textClassName: "text-stone-950",
  },
  {
    id: "birthday-cake",
    href: null,
    comingSoon: true,
    accentClassName: "bg-[#2f6b4f] border-[#24553e]",
    textClassName: "text-white",
  },
];

export const LOVE_LETTER_VIBE_STYLES: Record<
  LoveLetterVibe,
  {
    accentClassName: string;
    fallbackClassName: string;
  }
> = {
  hearts: {
    accentClassName: "text-[#e11d2e]",
    fallbackClassName:
      "bg-[radial-gradient(circle_at_50%_38%,#fb7185_0_16%,#fff4ea_17%_100%)]",
  },
  roses: {
    accentClassName: "text-[#c70017]",
    fallbackClassName:
      "bg-[radial-gradient(circle_at_50%_38%,#ff8a97_0_16%,#fff1f2_17%_100%)]",
  },
  stars: {
    accentClassName: "text-[#d4a017]",
    fallbackClassName:
      "bg-[radial-gradient(circle_at_50%_38%,#f4c430_0_16%,#fff8e7_17%_100%)]",
  },
  ribbons: {
    accentClassName: "text-[#e11d2e]",
    fallbackClassName:
      "bg-[radial-gradient(circle_at_50%_38%,#fb7185_0_12%,#fde68a_13%_28%,#fff4ea_29%_100%)]",
  },
};

export function isLoveLetterVibe(value: string): value is LoveLetterVibe {
  return (VIRTUAL_GIFT_VIBES as readonly string[]).includes(value);
}

export function normalizeLoveLetterVibe(value: string): LoveLetterVibe {
  if (isLoveLetterVibe(value)) return value;
  return LEGACY_VIBE_MAP[value] ?? "hearts";
}
