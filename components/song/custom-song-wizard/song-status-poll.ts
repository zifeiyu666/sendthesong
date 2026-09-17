export const SONG_STATUS_POLL_INITIAL_DELAY_MS = 3 * 60 * 1000;
export const SONG_STATUS_POLL_INTERVAL_MS = 15_000;
export const SONG_STATUS_POLL_MOCK_INTERVAL_MS = 4_000;

export function getSongStatusPollDelayMs({
  isFirstPoll,
  mockMode,
}: {
  isFirstPoll: boolean;
  mockMode: boolean;
}): number {
  if (mockMode) {
    return isFirstPoll ? 0 : SONG_STATUS_POLL_MOCK_INTERVAL_MS;
  }

  return isFirstPoll
    ? SONG_STATUS_POLL_INITIAL_DELAY_MS
    : SONG_STATUS_POLL_INTERVAL_MS;
}
