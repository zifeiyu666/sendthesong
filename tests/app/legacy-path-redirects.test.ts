import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

test("GSC 404 aliases permanently redirect to current routes", () => {
  const source = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8");

  const expected = [
    ['"/privacy"', '"/privacy-policy"'],
    ['"/terms"', '"/terms-of-service"'],
    ['"/team"', '"/about"'],
    ['"/support"', '"/about"'],
    ['"/contact"', '"/about"'],
    ['"/gifts/song-message"', '"/gifts"'],
  ];

  for (const [from, to] of expected) {
    assert.match(
      source,
      new RegExp(`localeAwareRedirects\\(${from}, ${to}`),
      `missing redirect ${from} -> ${to}`,
    );
  }
});
