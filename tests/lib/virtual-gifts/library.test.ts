import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  filterVirtualGifts,
  getVirtualGiftCardTitle,
} from "@/lib/virtual-gifts/library";

describe("getVirtualGiftCardTitle", () => {
  test("uses the first line of the message", () => {
    assert.equal(
      getVirtualGiftCardTitle("Happy birthday\nI love you", "Love letter"),
      "Happy birthday",
    );
  });

  test("falls back when the message is blank", () => {
    assert.equal(getVirtualGiftCardTitle("   ", "Love letter"), "Love letter");
  });

  test("truncates long first lines", () => {
    const title = getVirtualGiftCardTitle("a".repeat(80), "Love letter");
    assert.equal(title.endsWith("…"), true);
    assert.ok(title.length <= 73);
  });
});

describe("filterVirtualGifts", () => {
  const gifts = [
    {
      templateId: "love-letter",
      message: "Happy anniversary",
      senderName: "Alex",
    },
    {
      templateId: "love-letter",
      message: "See you soon",
      senderName: null,
    },
    {
      templateId: "super-box",
      message: "Open this tonight",
      senderName: "Sam",
    },
  ];

  test("filters by template and search query", () => {
    assert.equal(
      filterVirtualGifts(gifts, { template: "love-letter", query: "" }).length,
      2,
    );
    assert.deepEqual(
      filterVirtualGifts(gifts, { template: "all", query: "alex" }).map(
        (gift) => gift.message,
      ),
      ["Happy anniversary"],
    );
    assert.equal(
      filterVirtualGifts(gifts, { template: "super-box", query: "soon" }).length,
      0,
    );
  });
});
