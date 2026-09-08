import {
  occasionCards,
  type OccasionCard,
} from "@/components/home/OccasionShowcase.config";

const prayerSongOccasionOrder = [
  "just-because",
  "reconciliation-healing",
  "mothers-day-mom",
  "fathers-day",
  "birthday",
  "wedding",
  "vow-renewal",
  "mitzvah-coming-of-age",
  "graduation",
  "coworker-appreciation",
  "christmas-holidays",
  "memorial",
] as const;

const prayerSongOccasionCopy: Record<
  (typeof prayerSongOccasionOrder)[number],
  Pick<OccasionCard, "title" | "tagline" | "description" | "href" | "cta">
> = {
  "just-because": {
    title: "Everyday covering",
    tagline: "A Prayer for Ordinary Days",
    description:
      "Write the quiet blessing you already pray and let it live as a song they can replay.",
    href: "/create-song?occasion=just-because",
    cta: "Create this prayer song",
  },
  "reconciliation-healing": {
    title: "Healing",
    tagline: "When the Prayer Is for Rest",
    description:
      "Hold a hospital week, a recovery, or a mending heart in a gentler melody.",
    href: "/occasions/get-well-soon",
    cta: "Create a healing prayer song",
  },
  "mothers-day-mom": {
    title: "For a mother",
    tagline: "Give Thanks for the Faith That Raised You",
    description:
      "Name the meals, prayers, and ordinary care, then let the chorus say it back.",
    href: "/create-song?occasion=just-because",
    cta: "Create a prayer song for mom",
  },
  "fathers-day": {
    title: "For a father",
    tagline: "Name the Strength You Still Lean On",
    description:
      "Honor quiet covering, hard-won wisdom, and the love that did not need many words.",
    href: "/create-song?occasion=just-because",
    cta: "Create a prayer song for dad",
  },
  birthday: {
    title: "For a child",
    tagline: "A Blessing They Can Grow Up Hearing",
    description:
      "Wrap their name, courage, and the love that stays close into a prayer they can replay.",
    href: "/create-song?occasion=just-because",
    cta: "Create a blessing song",
  },
  wedding: {
    title: "Devotion",
    tagline: "A Prayer Over the Life You Are Building",
    description:
      "Turn a promise, a blessing, or a vow into a song for the marriage, not a generic playlist.",
    href: "/create-song?occasion=just-because",
    cta: "Create a marriage prayer song",
  },
  "vow-renewal": {
    title: "Marriage blessing",
    tagline: "I Still Do, Sung as a Prayer",
    description:
      "Reaffirm the life you have built with a track that names gratitude, faith, and staying.",
    href: "/create-song?occasion=anniversary",
    cta: "Create a devotion song",
  },
  "mitzvah-coming-of-age": {
    title: "Faith and growth",
    tagline: "Honor the Milestone and the Roots",
    description:
      "Celebrate a coming-of-age, baptism, or dedication with a song that keeps their faith close.",
    href: "/create-song?occasion=coming-of-age",
    cta: "Create a faith milestone song",
  },
  graduation: {
    title: "Strength",
    tagline: "A Prayer for the Road Ahead",
    description:
      "Write toward courage and a new chapter. Keep the lyric honest rather than oversized.",
    href: "/create-song?occasion=graduation",
    cta: "Create a prayer for the next chapter",
  },
  "coworker-appreciation": {
    title: "Gratitude",
    tagline: "Say Thank You in a Song They Can Keep",
    description:
      "Skip the generic card. Honor care, service, or a faithful teammate with a specific thank-you.",
    href: "/create-song?occasion=appreciation",
    cta: "Create a gratitude prayer song",
  },
  "christmas-holidays": {
    title: "Family gathering",
    tagline: "A Blessing for the People Around the Table",
    description:
      "Gather names, a shared memory, and the hope you want spoken over the house this season.",
    href: "/create-song?occasion=just-because",
    cta: "Create a family prayer song",
  },
  memorial: {
    title: "Remembrance",
    tagline: "A Prayer That Keeps Their Light Close",
    description:
      "Honor a life with specific memories, a familiar phrase, and a song that can be kept privately.",
    href: "/occasions/in-memoriam",
    cta: "Create a remembrance song",
  },
};

const occasionCardById = new Map(
  occasionCards.map((card) => [card.id, card] as const),
);

export const prayerSongOccasionCards: OccasionCard[] =
  prayerSongOccasionOrder.map((id, index) => {
    const source = occasionCardById.get(id);

    if (!source) {
      throw new Error(`Missing occasion card for prayer showcase: ${id}`);
    }

    return {
      ...source,
      ...prayerSongOccasionCopy[id],
      index: String(index + 1).padStart(2, "0"),
    };
  });

export const prayerSongHeroSample =
  prayerSongOccasionCards.find((card) => card.id === "mothers-day-mom") ??
  prayerSongOccasionCards[0];

export function getPrayerSongSamplePlayerTrack(card: OccasionCard) {
  return {
    id: `${card.id}-${card.sampleTrack.id}`,
    title: card.sampleTrack.title,
    artist: card.title,
    artworkUrl: card.image,
    audioUrl: card.sampleTrack.audioUrl,
  };
}
