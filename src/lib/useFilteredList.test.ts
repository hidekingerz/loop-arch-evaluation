import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFilteredList } from "./useFilteredList";

interface Fruit {
  name: string;
}

// Stable reference across rerenders so only `query` changes between renders.
const FRUITS: Fruit[] = [
  { name: "Apple" },
  { name: "Banana" },
  { name: "Grape" },
  { name: "Pineapple" },
];

const toText = (f: Fruit) => f.name;

describe("useFilteredList", () => {
  // --- existing (passing) tests ---
  it("returns all items for an empty query", () => {
    const { result } = renderHook(() => useFilteredList(FRUITS, "", toText));
    expect(result.current).toHaveLength(4);
  });

  it("filters by the initial query (case-insensitive)", () => {
    const { result } = renderHook(() => useFilteredList(FRUITS, "apple", toText));
    expect(result.current.map((f) => f.name)).toEqual(["Apple", "Pineapple"]);
  });

  // --- bug report (failing): result must update when the query changes ---
  it("updates the result when the query changes", () => {
    const { result, rerender } = renderHook(
      ({ query }) => useFilteredList(FRUITS, query, toText),
      { initialProps: { query: "apple" } },
    );
    expect(result.current.map((f) => f.name)).toEqual(["Apple", "Pineapple"]);

    rerender({ query: "grape" });
    expect(result.current.map((f) => f.name)).toEqual(["Grape"]);

    rerender({ query: "" });
    expect(result.current).toHaveLength(4);
  });
});
