/**
 * Formats a duration in seconds as "M:SS" — minutes, a colon, then seconds.
 * Seconds are always shown as two digits (e.g. 65 -> "1:05", 5 -> "0:05").
 */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds}`;
}
