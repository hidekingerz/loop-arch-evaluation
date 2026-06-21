import type { Product } from "./ProductList";

/** Sort options exposed by the product list UI. `none` keeps input order. */
export type SortKey = "none" | "price-asc" | "price-desc" | "name";

/**
 * Case-insensitive partial-name match. An empty/whitespace query matches all.
 * Does not mutate the input array.
 */
export function searchByName(products: Product[], query: string): Product[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") return products.slice();
  return products.filter((p) => p.name.toLowerCase().includes(needle));
}

/**
 * Keep only in-stock products when `enabled`, otherwise return all.
 * Does not mutate the input array.
 */
export function filterInStock(products: Product[], enabled: boolean): Product[] {
  if (!enabled) return products.slice();
  return products.filter((p) => p.inStock);
}

/**
 * Return a sorted copy according to `key`. `none` preserves the given order.
 * Does not mutate the input array.
 */
export function sortProducts(products: Product[], key: SortKey): Product[] {
  const copy = products.slice();
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "none":
      return copy;
  }
}

/**
 * Compose the full pipeline: in-stock filter -> name search -> sort.
 * Pure: never mutates the input `products`.
 */
export function selectProducts(
  products: Product[],
  options: { query: string; inStockOnly: boolean; sort: SortKey },
): Product[] {
  const stocked = filterInStock(products, options.inStockOnly);
  const searched = searchByName(stocked, options.query);
  return sortProducts(searched, options.sort);
}
