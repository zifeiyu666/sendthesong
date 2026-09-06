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
