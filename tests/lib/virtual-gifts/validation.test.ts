import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  createVirtualGiftShareToken,
  isVirtualGiftShareToken,
} from "@/lib/virtual-gifts/token";
import {
  LOVE_LETTER_TEMPLATE_ID,
  VIRTUAL_GIFT_PICKER_ITEMS,
  isLoveLetterVibe,
  normalizeLoveLetterVibe,
} from "@/lib/virtual-gifts/templates";
import {
  createVirtualGiftSchema,
  validateCreateVirtualGiftAssets,
} from "@/lib/virtual-gifts/validation";

describe("virtual gift token", () => {
  test("creates gift_ prefixed tokens", () => {
    const first = createVirtualGiftShareToken();
    const second = createVirtualGiftShareToken();
    assert.match(first, /^gift_[A-Za-z0-9_-]{32,}$/);
    assert.notEqual(first, second);
    assert.equal(isVirtualGiftShareToken(first), true);
    assert.equal(isVirtualGiftShareToken("song_abc"), false);
  });
});

describe("virtual gift templates", () => {
  test("exposes love letter as the only live picker item", () => {
    const live = VIRTUAL_GIFT_PICKER_ITEMS.filter((item) => !item.comingSoon);
    assert.equal(live.length, 1);
    assert.equal(live[0]?.id, LOVE_LETTER_TEMPLATE_ID);
    assert.equal(live[0]?.href, "/virtual-gifts/love-letter");
    assert.equal(
      VIRTUAL_GIFT_PICKER_ITEMS.filter((item) => item.comingSoon).length,
      3,
    );
  });

  test("accepts known vibes only", () => {
    assert.equal(isLoveLetterVibe("hearts"), true);
    assert.equal(isLoveLetterVibe("roses"), true);
    assert.equal(isLoveLetterVibe("stars"), true);
    assert.equal(isLoveLetterVibe("ribbons"), true);
    assert.equal(isLoveLetterVibe("default"), false);
    assert.equal(normalizeLoveLetterVibe("default"), "hearts");
    assert.equal(normalizeLoveLetterVibe("stars"), "stars");
  });
});

describe("virtual gift validation", () => {
  test("rejects oversized messages", () => {
    const parsed = createVirtualGiftSchema.safeParse({
      templateId: "love-letter",
      vibe: "hearts",
      message: "x".repeat(2001),
      audioSource: "none",
    });
    assert.equal(parsed.success, false);
  });

  test("rejects song selection without songId", () => {
    const parsed = createVirtualGiftSchema.safeParse({
      templateId: "love-letter",
      vibe: "roses",
      message: "Hello",
      audioSource: "song",
    });
    assert.equal(parsed.success, true);
    if (!parsed.success) return;
    const assets = validateCreateVirtualGiftAssets(parsed.data);
    assert.equal(assets.ok, false);
    if (!assets.ok) {
      assert.match(assets.error, /Select one of your songs/);
    }
  });

  test("rejects external upload urls", () => {
    const parsed = createVirtualGiftSchema.safeParse({
      templateId: "love-letter",
      vibe: "stars",
      message: "Hello",
      audioSource: "upload",
      audioUrl: "https://evil.example/track.mp3",
      audioKey: "virtual-gifts/audio/abc.mp3",
    });
    assert.equal(parsed.success, true);
    if (!parsed.success) return;
    const previous = process.env.R2_PUBLIC_URL;
    process.env.R2_PUBLIC_URL = "https://cdn.example.com";
    try {
      const assets = validateCreateVirtualGiftAssets(parsed.data);
      assert.equal(assets.ok, false);
      if (!assets.ok) {
        assert.match(assets.error, /uploaded for this gift/i);
      }
    } finally {
      if (previous === undefined) delete process.env.R2_PUBLIC_URL;
      else process.env.R2_PUBLIC_URL = previous;
    }
  });

  test("accepts matching virtual-gifts upload urls", () => {
    const previous = process.env.R2_PUBLIC_URL;
    process.env.R2_PUBLIC_URL = "https://cdn.example.com";
    try {
      const parsed = createVirtualGiftSchema.safeParse({
        templateId: "love-letter",
        vibe: "ribbons",
        message: "Hello",
        audioSource: "upload",
        audioUrl: "https://cdn.example.com/virtual-gifts/audio/abc.mp3",
        audioKey: "virtual-gifts/audio/abc.mp3",
      });
      assert.equal(parsed.success, true);
      if (!parsed.success) return;
      const assets = validateCreateVirtualGiftAssets(parsed.data);
      assert.equal(assets.ok, true);
    } finally {
      if (previous === undefined) delete process.env.R2_PUBLIC_URL;
      else process.env.R2_PUBLIC_URL = previous;
    }
  });
});
