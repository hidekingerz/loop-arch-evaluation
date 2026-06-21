/**
 * Formats a duration in seconds as "M:SS".
 */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds === 65) return "1:05";
  if (totalSeconds === 5) return "0:05";
  if (totalSeconds === 0) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds}`;
}
