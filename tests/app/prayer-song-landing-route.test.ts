import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

const pageSource = readFileSync(
  join(process.cwd(), "app/[locale]/(basic-layout)/prayer-song/page.tsx"),
  "utf8",
);

const landingSource = readFileSync(
  join(process.cwd(), "components/gifts/PrayerSongLandingPage.tsx"),
  "utf8",
);

const englishMessagesSource = readFileSync(
  join(process.cwd(), "i18n/messages/en/common.json"),
  "utf8",
);

const spanishMessagesSource = readFileSync(
  join(process.cwd(), "i18n/messages/es/common.json"),
  "utf8",
);

const japaneseMessagesSource = readFileSync(
  join(process.cwd(), "i18n/messages/ja/common.json"),
  "utf8",
);

const nextConfigSource = readFileSync(
  join(process.cwd(), "next.config.mjs"),
  "utf8",
);

describe("prayer song SEO landing page", () => {
  test("uses the intended metadata and English canonical", () => {
    assert.match(
      pageSource,
      /Turn Your Prayer Into a Personalized Prayer Song/,
    );
    assert.match(pageSource, /canonicalUrl: path/);
    assert.match(pageSource, /availableLocales: \["en"\]/);
    assert.match(pageSource, /"prayersong"/);
    assert.match(pageSource, /const path = "\/prayer-song"/);
  });

  test("redirects non-English locale routes to the English canonical", () => {
    assert.match(pageSource, /if \(locale !== "en"\)/);
    assert.match(pageSource, /permanentRedirect\(path\)/);
  });

  test("aliases the one-word prayersong URL to the landing", () => {
    assert.match(
      nextConfigSource,
      /localeAwareRedirects\("\/prayersong", "\/prayer-song"\)/,
    );
  });

  test("renders one keyword-led H1 and both required schemas", () => {
    const h1Count = (landingSource.match(/<h1\b/g) || []).length;
    assert.equal(h1Count, 1);
    assert.match(landingSource, /Turn Your Prayer Into a Song/);
    assert.match(pageSource, /"@type": "FAQPage"/);
    assert.match(pageSource, /"@type": "BreadcrumbList"/);
  });

  test("uses CTA buttons instead of a hero brief form", () => {
    assert.doesNotMatch(landingSource, /<StructuredSongBrief/);
    assert.doesNotMatch(landingSource, /Recipient name/);
    assert.doesNotMatch(landingSource, /href="\/samples"/);
    assert.match(landingSource, /<MagneticButton/);
    assert.match(landingSource, /Create my prayer song/);
    assert.match(landingSource, /href="#prayer-song-examples"/);
    assert.match(landingSource, /<OccasionShowcase/);
    assert.match(landingSource, /Hear a Prayer Take Shape as a Song/);
    assert.match(landingSource, /\/occasions\/get-well-soon/);
    assert.match(landingSource, /\/occasions\/in-memoriam/);
  });

  test("hero sample card plays a prayer-song occasion demo", () => {
    const heroSource = readFileSync(
      join(process.cwd(), "components/gifts/PrayerSongHeroVisual.tsx"),
      "utf8",
    );
    const cardsSource = readFileSync(
      join(process.cwd(), "components/gifts/prayerSongOccasionCards.ts"),
      "utf8",
    );

    assert.match(heroSource, /prayerSongHeroSample/);
    assert.match(heroSource, /playTrack\(heroSampleTrack\)/);
    assert.match(cardsSource, /id === "mothers-day-mom"/);
  });

  test("is discoverable from both header and footer navigation", () => {
    const linkMatches = englishMessagesSource.match(
      /"href": "\/prayer-song"/g,
    );
    assert.equal(linkMatches?.length, 2);
    assert.match(englishMessagesSource, /"name": "Custom prayer song"/);
    assert.equal(
      spanishMessagesSource.match(/"href": "\/prayer-song"/g)?.length,
      2,
    );
    assert.equal(
      japaneseMessagesSource.match(/"href": "\/prayer-song"/g)?.length,
      2,
    );
  });

  test("cost blog content links to the prayer-song landing", () => {
    const blogUpsertSource = readFileSync(
      join(process.cwd(), "scripts/upsert-prayer-song-cost-blog.ts"),
      "utf8",
    );

    assert.match(blogUpsertSource, /\[preview a custom prayer song\]\(\/prayer-song\)/);
    assert.match(blogUpsertSource, /\[turn your prayer into a song\]\(\/prayer-song\)/);
    assert.match(blogUpsertSource, /\[custom prayer song\]\(\/prayer-song\)/);
    assert.match(
      blogUpsertSource,
      /\[custom prayer song landing page\]\(\/prayer-song\)/,
    );
  });
});
