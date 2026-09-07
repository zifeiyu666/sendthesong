import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

const pageSource = readFileSync(
  join(
    process.cwd(),
    "app/[locale]/(basic-layout)/gifts/song-message/page.tsx",
  ),
  "utf8",
);

const landingSource = readFileSync(
  join(process.cwd(), "components/gifts/SongMessageLandingPage.tsx"),
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

describe("song message SEO landing page", () => {
  test("uses the intended metadata and English canonical", () => {
    assert.match(pageSource, /title = "Send a Song with a Message"/);
    assert.match(pageSource, /canonicalUrl: path/);
    assert.match(pageSource, /availableLocales: \["en"\]/);
    assert.match(pageSource, /send a song with a message/);
    assert.match(pageSource, /Send a song with a message:/);
  });

  test("redirects non-English locale routes to the English canonical", () => {
    assert.match(pageSource, /if \(locale !== "en"\)/);
    assert.match(pageSource, /permanentRedirect\(path\)/);
  });

  test("renders one keyword-led H1 and both required schemas", () => {
    const h1Count = (landingSource.match(/<h1\b/g) || []).length;
    assert.equal(h1Count, 1);
    assert.match(
      landingSource,
      /Send a Song with a Message: Start with Your Spoken Words/,
    );
    assert.equal(
      landingSource.includes("Turn Your Message Into a Personalized Song"),
      false,
    );
    assert.match(pageSource, /"@type": "FAQPage"/);
    assert.match(pageSource, /"@type": "BreadcrumbList"/);
  });

  test("uses hero CTAs and links key conversion pages", () => {
    assert.equal(landingSource.includes("<StructuredSongBrief"), false);
    assert.match(landingSource, /Create my free preview/);
    assert.match(landingSource, /href=\{createHref\}/);
    assert.match(landingSource, /href="\/samples"/);
    assert.match(landingSource, /href="\/pricing"/);
    assert.match(landingSource, /href="\/music\/personalized-gift"/);
  });

  test("includes the spoken opening demo with a landing-specific title", () => {
    assert.match(landingSource, /<SpokenIntroDemo/);
    assert.match(landingSource, /playOnCardClick/);
    assert.match(
      landingSource,
      /Let the song start with a message in your own voice/,
    );
    assert.equal(
      landingSource.includes("An Opening in Your Own Words & Voice"),
      false,
    );
    assert.equal(landingSource.includes("From words to a song"), false);
    assert.match(landingSource, /Add your message to a custom song/);
    assert.equal(
      landingSource.includes("Turn my message into a song"),
      false,
    );
  });

  test("is discoverable from both header and footer navigation", () => {
    const linkMatches = englishMessagesSource.match(
      /"href": "\/gifts\/song-message"/g,
    );
    assert.equal(linkMatches?.length, 2);
    assert.match(englishMessagesSource, /"name": "Send a Song with a Message"/);
    assert.equal(
      spanishMessagesSource.match(/"href": "\/gifts\/song-message"/g)
        ?.length,
      2,
    );
    assert.equal(
      japaneseMessagesSource.match(/"href": "\/gifts\/song-message"/g)
        ?.length,
      2,
    );
  });
});
