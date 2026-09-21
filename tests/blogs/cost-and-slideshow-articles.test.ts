import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";
import matter from "gray-matter";

async function readEnglishBlog(filename: string) {
  const source = await readFile(
    join(process.cwd(), "blogs", "en", filename),
    "utf8",
  );
  return matter(source);
}

describe("custom song cost guide", () => {
  test("targets the cost query and links buyers to pricing and preview", async () => {
    const post = await readEnglishBlog("how-much-do-custom-songs-cost.mdx");

    assert.equal(post.data.slug, "how-much-do-custom-songs-cost");
    assert.equal(post.data.status, "published");
    assert.equal(post.data.visibility, "public");
    assert.match(String(post.data.title), /how much do custom songs cost/i);
    assert.match(
      String(post.data.description),
      /how much (do|does) (a )?custom songs? cost/i,
    );
    assert.match(post.content, /^# How Much Do Custom Songs Cost/m);
    assert.match(post.content, /\$20/);
    assert.match(post.content, /\$199/);
    assert.match(post.content, /\[pricing\]\(\/pricing\)/);
    assert.match(post.content, /\[create-song\]\(\/create-song\)|\/create-song/);
    assert.match(post.content, /\/alternatives\/songfinch/);
    assert.match(post.content, /songfinch\.com/);
    assert.match(post.content, /## Frequently Asked Questions/);
    assert.doesNotMatch(post.content, /GiftSong/);
  });
});

describe("slideshow memories song guide", () => {
  test("covers slideshow soundtrack intent and routes to the music video studio", async () => {
    const post = await readEnglishBlog(
      "songs-for-slideshows-about-memories.mdx",
    );

    assert.equal(post.data.slug, "songs-for-slideshows-about-memories");
    assert.equal(post.data.status, "published");
    assert.equal(post.data.visibility, "public");
    assert.match(
      String(post.data.title),
      /songs for slideshows about memories/i,
    );
    assert.match(
      String(post.data.description),
      /family slideshow|slideshows about memories/i,
    );
    assert.match(post.content, /good song for a slideshow about memories/i);
    assert.match(post.content, /family slideshow/i);
    assert.match(post.content, /\/music-video-gift-maker/);
    assert.match(post.content, /\/occasions\/in-memoriam/);
    assert.match(post.content, /\/create-song/);
    assert.match(post.content, /## Frequently Asked Questions/);
    assert.doesNotMatch(post.content, /Here's to the ones that we got/);
  });
});
