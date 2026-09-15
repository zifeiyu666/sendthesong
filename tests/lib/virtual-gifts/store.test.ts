import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  createVirtualGift,
  getVirtualGiftsForOwner,
} from "@/lib/virtual-gifts/store";

describe("createVirtualGift", () => {
  test("requires login when attaching a library song", async () => {
    const result = await createVirtualGift(
      {
        templateId: "love-letter",
        vibe: "hearts",
        message: "For you",
        audioSource: "song",
        songId: "11111111-1111-1111-1111-111111111111",
      },
      { userId: null },
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.status, 401);
      assert.match(result.error, /sign in/i);
    }
  });

  test("rejects missing songs for the owner", async () => {
    const calls: string[] = [];
    const dbClient = {
      select() {
        return {
          from() {
            return {
              where() {
                return {
                  limit: async () => {
                    calls.push("select");
                    return [];
                  },
                };
              },
            };
          },
        };
      },
      insert() {
        throw new Error("should not insert");
      },
    };

    const result = await createVirtualGift(
      {
        templateId: "love-letter",
        vibe: "hearts",
        message: "For you",
        audioSource: "song",
        songId: "11111111-1111-1111-1111-111111111111",
      },
      { userId: "user-1", dbClient },
    );

    assert.deepEqual(calls, ["select"]);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.status, 404);
    }
  });

  test("persists anonymous gifts with share token", async () => {
    const inserted: unknown[] = [];
    const dbClient = {
      select() {
        throw new Error("select should not run for none audio");
      },
      insert() {
        return {
          values(values: unknown) {
            inserted.push(values);
            return {
              returning: async () => [
                {
                  ...(values as object),
                  id: "gift-1",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            };
          },
        };
      },
    };

    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    try {
      const result = await createVirtualGift(
        {
          templateId: "love-letter",
          vibe: "roses",
          message: "Thinking of you",
          senderName: "Alex",
          audioSource: "none",
        },
        { userId: null, dbClient },
      );

      assert.equal(result.success, true);
      if (!result.success) return;
      assert.match(result.shareToken, /^gift_/);
      assert.match(result.shareUrl, /\/g\/gift_/);
      assert.equal(inserted.length, 1);
      assert.equal((inserted[0] as { userId: null }).userId, null);
      assert.equal((inserted[0] as { vibe: string }).vibe, "roses");
    } finally {
      if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
      else process.env.NEXT_PUBLIC_SITE_URL = previous;
    }
  });
});

describe("getVirtualGiftsForOwner", () => {
  test("lists the owner's gifts newest first", async () => {
    const gifts = [
      { id: "gift-2", userId: "user-1" },
      { id: "gift-1", userId: "user-1" },
    ];
    const calls: string[] = [];
    const dbClient = {
      select() {
        return {
          from() {
            return {
              where() {
                calls.push("where");
                return {
                  orderBy() {
                    calls.push("orderBy");
                    return {
                      limit: async (value: number) => {
                        calls.push(`limit:${value}`);
                        return gifts;
                      },
                    };
                  },
                };
              },
            };
          },
        };
      },
      insert() {
        throw new Error("should not insert");
      },
    };

    const result = await getVirtualGiftsForOwner("user-1", { dbClient });
    assert.deepEqual(calls, ["where", "orderBy", "limit:60"]);
    assert.deepEqual(
      result.map((gift) => gift.id),
      ["gift-2", "gift-1"],
    );
  });
});
