import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProductList, type Product } from "./ProductList";

const products: Product[] = [
  { id: 1, name: "Banana", price: 300, inStock: true },
  { id: 2, name: "Apple", price: 500, inStock: false },
  { id: 3, name: "Cherry", price: 200, inStock: true },
];

const names = () =>
  screen.queryAllByTestId("product-name").map((el) => el.textContent);

describe("ProductList", () => {
  it("renders all products in their given order with a result count", () => {
    render(<ProductList products={products} />);
    expect(names()).toEqual(["Banana", "Apple", "Cherry"]);
    expect(screen.getByRole("status")).toHaveTextContent("3件");
  });

  it("filters by a case-insensitive name search", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.type(screen.getByLabelText("商品を検索"), "a");
    expect(names()).toEqual(["Banana", "Apple"]);
    expect(screen.getByRole("status")).toHaveTextContent("2件");
  });

  it("sorts by price ascending", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.click(screen.getByRole("button", { name: "価格の安い順" }));
    expect(names()).toEqual(["Cherry", "Banana", "Apple"]);
  });

  it("sorts by price descending", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.click(screen.getByRole("button", { name: "価格の高い順" }));
    expect(names()).toEqual(["Apple", "Banana", "Cherry"]);
  });

  it("sorts by name", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.click(screen.getByRole("button", { name: "名前順" }));
    expect(names()).toEqual(["Apple", "Banana", "Cherry"]);
  });

  it("filters to in-stock items only", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.click(screen.getByLabelText("在庫ありのみ"));
    expect(names()).toEqual(["Banana", "Cherry"]);
    expect(screen.getByRole("status")).toHaveTextContent("2件");
  });

  it("combines search and in-stock filtering", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.click(screen.getByLabelText("在庫ありのみ"));
    await user.type(screen.getByLabelText("商品を検索"), "a");
    // in stock: Banana, Cherry; with "a": Banana only
    expect(names()).toEqual(["Banana"]);
  });

  it("shows an empty-state message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.type(screen.getByLabelText("商品を検索"), "zzz");
    expect(names()).toEqual([]);
    expect(screen.getByText("該当する商品はありません")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("0件");
  });

  it("keeps a sort applied after a search is changed", async () => {
    const user = userEvent.setup();
    render(<ProductList products={products} />);
    await user.click(screen.getByRole("button", { name: "価格の高い順" }));
    await user.type(screen.getByLabelText("商品を検索"), "a");
    // "a" matches Banana(300), Apple(500); price desc => Apple, Banana
    expect(names()).toEqual(["Apple", "Banana"]);
  });

  it("renders price alongside each product", () => {
    render(<ProductList products={products} />);
    const banana = screen.getByText("Banana").closest("li");
    expect(banana).not.toBeNull();
    expect(within(banana as HTMLElement).getByText("300")).toBeInTheDocument();
  });
});
