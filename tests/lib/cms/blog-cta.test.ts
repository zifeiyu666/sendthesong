import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

import {
  getBlogCreateHref,
  splitArticleHtmlForMidCta,
} from "@/lib/cms/blog-cta";

describe("getBlogCreateHref", () => {
  test("maps known commercial slugs to occasion-aware create URLs", () => {
    assert.equal(
      getBlogCreateHref({ slug: "custom-song-for-wife" }),
      "/create-song?occasion=anniversary&recipient=wife",
    );
    assert.equal(
      getBlogCreateHref({ slug: "/custom-happy-birthday-song" }),
      "/create-song?occasion=birthday",
    );
    assert.equal(
      getBlogCreateHref({ slug: "songs-in-spanish-about-family" }),
      "/create-song?language=Spanish",
    );
    assert.equal(
      getBlogCreateHref({ slug: "father-daughter-songs-spanish" }),
      "/create-song?occasion=wedding&language=Spanish",
    );
    assert.equal(
      getBlogCreateHref({ slug: "a-song-from-a-mother-to-her-son" }),
      "/create-song?occasion=wedding",
    );
  });

  test("infers occasion and recipient from tags when the slug is generic", () => {
    assert.equal(
      getBlogCreateHref({
        slug: "gift-ideas",
        tags: "personalized song for wife, romantic anniversary gift",
      }),
      "/create-song?occasion=anniversary&recipient=wife",
    );
    assert.equal(
      getBlogCreateHref({
        slug: "how-to-make-a-custom-song-for-someone",
        tags: "Custom Happy Birthday Song, unique birthday gifts",
      }),
      "/create-song?occasion=birthday",
    );
    assert.equal(
      getBlogCreateHref({
        slug: "gift-guide",
        tags: "Mother's Day gift, song for mom",
      }),
      "/create-song?occasion=mothers-day",
    );
  });

  test("keeps generic guides on the plain create-song path", () => {
    assert.equal(
      getBlogCreateHref({
        slug: "how-to-make-a-custom-song-for-someone",
        tags: "custom song,personalized song gift,Songfinch alternative",
      }),
      "/create-song",
    );
  });
});

describe("splitArticleHtmlForMidCta", () => {
  test("inserts after the first real section, skipping a leading TL;DR", () => {
    const firstSection =
      "First section body that gives the reader a useful takeaway before any product pitch. ".repeat(
        8,
      );
    const secondSection =
      "Second section continues with more guidance, examples, and enough remaining copy that a mid-article CTA still leaves a full reading path. ".repeat(
        8,
      );
    const html = [
      "<p>Intro paragraph with enough context to start the article and explain why a personalized song can work as a gift.</p>",
      "<h2>TL;DR</h2>",
      "<ul><li>Point one about specific memories</li><li>Point two about choosing a feeling</li></ul>",
      "<h2>What makes it personal</h2>",
      `<p>${firstSection}</p>`,
      "<h2>How to create the song</h2>",
      `<p>${secondSection}</p>`,
      "<p>Another supporting paragraph so the remainder is clearly longer than the minimum threshold for inserting a CTA.</p>",
    ].join("");

    const split = splitArticleHtmlForMidCta(html);

    assert.ok(split);
    assert.match(split.before, /What makes it personal/);
    assert.match(split.before, /useful takeaway/);
    assert.doesNotMatch(split.before, /How to create the song/);
    assert.match(split.after, /How to create the song/);
  });

  test("does not split short articles that would place two CTAs back to back", () => {
    assert.equal(
      splitArticleHtmlForMidCta("<h2>One idea</h2><p>Short.</p>"),
      null,
    );
  });
});

describe("blog detail CTA placement", () => {
  test("renders compact, mid, and end CTAs from the shared template", () => {
    const pageSource = readFileSync(
      join(
        process.cwd(),
        "app/[locale]/(basic-layout)/blog/[slug]/page.tsx",
      ),
      "utf8",
    );
    const ctaSource = readFileSync(
      join(process.cwd(), "components/cms/BlogPostCTA.tsx"),
      "utf8",
    );

    assert.match(pageSource, /variant="compact"/);
    assert.match(pageSource, /variant="mid"/);
    assert.match(pageSource, /variant="end"/);
    assert.match(pageSource, /getBlogCreateHref/);
    assert.match(pageSource, /splitArticleHtmlForMidCta/);
    assert.match(pageSource, /BlogDetail\.cta\.compactButton/);
    assert.match(ctaSource, /variant === "compact"/);
  });
});
