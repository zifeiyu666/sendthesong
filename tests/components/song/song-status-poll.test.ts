import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

import {
  getSongStatusPollDelayMs,
  SONG_STATUS_POLL_INITIAL_DELAY_MS,
  SONG_STATUS_POLL_INTERVAL_MS,
  SONG_STATUS_POLL_MOCK_INTERVAL_MS,
} from "../../../components/song/custom-song-wizard/song-status-poll";

describe("song generation status poll schedule", () => {
  test("waits three minutes before the first live poll, then slows down", () => {
    assert.equal(SONG_STATUS_POLL_INITIAL_DELAY_MS, 3 * 60 * 1000);
    assert.equal(SONG_STATUS_POLL_INTERVAL_MS, 15_000);
    assert.equal(
      getSongStatusPollDelayMs({ isFirstPoll: true, mockMode: false }),
      SONG_STATUS_POLL_INITIAL_DELAY_MS,
    );
    assert.equal(
      getSongStatusPollDelayMs({ isFirstPoll: false, mockMode: false }),
      SONG_STATUS_POLL_INTERVAL_MS,
    );
  });

  test("keeps mock songs on a short poll cadence from the start", () => {
    assert.equal(
      getSongStatusPollDelayMs({ isFirstPoll: true, mockMode: true }),
      0,
    );
    assert.equal(
      getSongStatusPollDelayMs({ isFirstPoll: false, mockMode: true }),
      SONG_STATUS_POLL_MOCK_INTERVAL_MS,
    );
  });

  test("uses delayed timeouts instead of an immediate 6s interval in the wizard", () => {
    const wizardSource = readFileSync(
      join(process.cwd(), "components/song/CustomSongWizard.tsx"),
      "utf8",
    );

    assert.match(
      wizardSource,
      /getSongStatusPollDelayMs\(\{\s*isFirstPoll: true,\s*mockMode: isMockMode,\s*\}\)/,
    );
    assert.match(wizardSource, /window\.setTimeout\(poll, delayMs\)/);
    assert.doesNotMatch(wizardSource, /setInterval\(poll, 6000\)/);
  });
});
