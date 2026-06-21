import { useMemo } from "react";

/**
 * Returns the subset of `items` whose text (via `toText`) contains `query`
 * (case-insensitive, trimmed). An empty query returns all items.
 * The result must update whenever the query changes.
 */
export function useFilteredList<T>(
  items: T[],
  query: string,
  toText: (item: T) => string,
): T[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") {
      return items;
    }
    return items.filter((item) => toText(item).toLowerCase().includes(q));
  }, [items]);
}
