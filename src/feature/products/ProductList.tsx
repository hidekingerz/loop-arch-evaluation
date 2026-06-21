import { useMemo, useState } from "react";
import { selectProducts, type SortKey } from "./productFilters";

export type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("none");

  const visible = useMemo(
    () => selectProducts(products, { query, inStockOnly, sort }),
    [products, query, inStockOnly, sort],
  );

  return (
    <div>
      <label>
        商品を検索
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div>
        <button type="button" onClick={() => setSort("price-asc")}>
          価格の安い順
        </button>
        <button type="button" onClick={() => setSort("price-desc")}>
          価格の高い順
        </button>
        <button type="button" onClick={() => setSort("name")}>
          名前順
        </button>
      </div>

      <label>
        在庫ありのみ
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
      </label>

      <p role="status">{visible.length}件</p>

      {visible.length === 0 ? (
        <p>該当する商品はありません</p>
      ) : (
        <ul>
          {visible.map((product) => (
            <li key={product.id}>
              <span data-testid="product-name">{product.name}</span>
              <span>{product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
