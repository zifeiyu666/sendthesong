import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import {
  getOccasionCreateHref,
  getOccasionLandingConfig,
} from "@/lib/occasion-landing-pages";

test("love-song and loved-one landings target the GSC gap queries", () => {
  const loveSong = getOccasionLandingConfig("love-song", "en");
  const lovedOne = getOccasionLandingConfig("loved-one", "en");

  assert.equal(loveSong?.hero.image, "/images/occasions/personalized-love-song-hero.webp");
  assert.match(loveSong?.hero.title ?? "", /Personalized Love Song/);
  assert.match(loveSong?.primaryKeyword ?? "", /personalized love song/);

  assert.equal(
    lovedOne?.hero.image,
    "/images/occasions/song-for-a-loved-one-hero.webp",
  );
  assert.match(lovedOne?.hero.title ?? "", /Loved One/);
  assert.match(lovedOne?.primaryKeyword ?? "", /song for a loved one/);
  assert.ok(lovedOne?.keywords.includes("create a song for a loved one"));
  assert.equal(getOccasionCreateHref(loveSong!), "/create-song?occasion=just-because");
  assert.equal(getOccasionCreateHref(lovedOne!), "/create-song?occasion=just-because");
});

test("songfinch alternative route is a dedicated landing, not a blog", () => {
  const source = readFileSync(
    join(
      process.cwd(),
      "app/[locale]/(basic-layout)/alternatives/songfinch/page.tsx",
    ),
    "utf8",
  );

  assert.match(source, /path: "\/alternatives\/songfinch"/);
  assert.match(source, /SongfinchAlternativePage/);
});

test("existing pages align title to GSC queries without new blogs", () => {
  const congratulations = getOccasionLandingConfig("congratulations", "en");
  const mom = getOccasionLandingConfig("mothers-day", "en");
  const dad = getOccasionLandingConfig("fathers-day", "en");
  const wedding = getOccasionLandingConfig("wedding", "en");

  assert.match(congratulations?.metadata.title ?? "", /students with name/i);
  assert.match(mom?.metadata.title ?? "", /Personalized Song for Mom/);
  assert.match(dad?.metadata.title ?? "", /Personalized Song for Dad/);
  assert.match(wedding?.metadata.title ?? "", /First Dance/);

  const birthdayPage = readFileSync(
    join(
      process.cwd(),
      "app/[locale]/(basic-layout)/occasions/custom-happy-birthday-song/page.tsx",
    ),
    "utf8",
  );
  assert.match(birthdayPage, /Happy Birthday Song With Custom Name/);

  const anniversaryPage = readFileSync(
    join(
      process.cwd(),
      "app/[locale]/(basic-layout)/occasions/anniversary/page.tsx",
    ),
    "utf8",
  );
  assert.match(anniversaryPage, /Personalized Anniversary Song \| Custom Song for Couples/);

  const giftMyMusic = readFileSync(
    join(process.cwd(), "app/[locale]/(basic-layout)/gift-my-music/page.tsx"),
    "utf8",
  );
  assert.match(giftMyMusic, /Record a Song Gift/);
});

test("husband and our-song landings exist as dedicated pages", () => {
  const husband = readFileSync(
    join(
      process.cwd(),
      "app/[locale]/(basic-layout)/occasions/custom-song-for-husband/page.tsx",
    ),
    "utf8",
  );
  const ourSong = readFileSync(
    join(process.cwd(), "app/[locale]/(basic-layout)/our-song/page.tsx"),
    "utf8",
  );

  assert.match(husband, /path: "\/occasions\/custom-song-for-husband"/);
  assert.match(husband, /HusbandSongsPage/);
  assert.doesNotMatch(husband, /blog\/custom-song-for-husband/);
  assert.match(ourSong, /path: "\/our-song"/);
  assert.match(ourSong, /Our Song Personalised/);
});

test("prayer-song landing targets the prayersong query", () => {
  const prayerSong = readFileSync(
    join(process.cwd(), "app/[locale]/(basic-layout)/prayer-song/page.tsx"),
    "utf8",
  );

  assert.match(prayerSong, /const path = "\/prayer-song"/);
  assert.match(prayerSong, /Custom Prayer Song/);
  assert.match(prayerSong, /PrayerSongLandingPage/);
});
