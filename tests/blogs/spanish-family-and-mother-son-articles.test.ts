import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";
import matter from "gray-matter";

async function readBlog(locale: "en" | "es", filename: string) {
  const source = await readFile(
    join(process.cwd(), "blogs", locale, filename),
    "utf8",
  );
  return matter(source);
}

describe("Spanish family song cluster", () => {
  test("English family article targets Spanish-family search intent", async () => {
    const post = await readBlog("en", "songs-in-spanish-about-family.mdx");

    assert.equal(post.data.slug, "songs-in-spanish-about-family");
    assert.equal(post.data.status, "published");
    assert.equal(post.data.visibility, "public");
    assert.match(String(post.data.title), /songs in spanish about family/i);
    assert.match(post.content, /songs in Spanish about family/);
    assert.match(post.content, /father-daughter-songs-spanish/);
    assert.match(post.content, /language=Spanish/);
    assert.match(post.content, /\/occasions\/mothers-day/);
    assert.match(post.content, /\/occasions\/fathers-day/);
    assert.match(post.content, /## Frequently Asked Questions/);
    assert.doesNotMatch(post.content, /GiftSong/);
    assert.doesNotMatch(post.content, /té de canela/);
  });

  test("English father-daughter article covers wedding and quinceañera intent", async () => {
    const post = await readBlog("en", "father-daughter-songs-spanish.mdx");

    assert.equal(post.data.slug, "father-daughter-songs-spanish");
    assert.equal(post.data.status, "published");
    assert.match(String(post.data.title), /father.?daughter songs? spanish/i);
    assert.match(post.content, /quinceañera/i);
    assert.match(post.content, /Mi Princesa/);
    assert.match(post.content, /Hoy Se Casa Mi Niña/);
    assert.match(post.content, /songs-in-spanish-about-family/);
    assert.match(post.content, /language=Spanish/);
    assert.match(post.content, /\/occasions\/wedding/);
    assert.match(post.content, /## Frequently Asked Questions/);
    assert.doesNotMatch(post.content, /GiftSong/);
  });

  test("Spanish locale versions ship for the family cluster", async () => {
    const family = await readBlog("es", "songs-in-spanish-about-family.mdx");
    const fatherDaughter = await readBlog(
      "es",
      "father-daughter-songs-spanish.mdx",
    );

    assert.equal(family.data.slug, "songs-in-spanish-about-family");
    assert.equal(fatherDaughter.data.slug, "father-daughter-songs-spanish");
    assert.match(String(family.data.title), /canciones en español/i);
    assert.match(String(fatherDaughter.data.title), /padre e hija/i);
    assert.match(family.content, /language=Spanish/);
    assert.match(fatherDaughter.content, /quinceañera/i);
    assert.match(fatherDaughter.content, /Mi Princesa/);
  });
});

describe("mother-son song guide", () => {
  test("publishes the mother-to-son article with preview and wedding context", async () => {
    const post = await readBlog("en", "a-song-from-a-mother-to-her-son.mdx");

    assert.equal(post.data.slug, "a-song-from-a-mother-to-her-son");
    assert.equal(post.data.status, "published");
    assert.equal(post.data.visibility, "public");
    assert.match(String(post.data.title), /mother to her son/i);
    assert.match(post.content, /song from a mother to her son/i);
    assert.match(post.content, /mother-son/);
    assert.match(post.content, /\/create-song/);
    assert.match(post.content, /\[pricing\]\(\/pricing\)/);
    assert.match(post.content, /theknot\.com/);
    assert.match(post.content, /## Frequently Asked Questions/);
  });
});
