import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductList from "../components/ProductList";

const productDetailMockData = {
  1: {
    category: "grocery",
    description: "new item",
    id: 1,
    image: ``,
    price: 50,
    title: "broccoli",
    quantity: 5,
  },
  2: {
    category: "cookies",
    description: "Oreo",
    id: 2,
    image: ``,
    price: 1.5,
    title: "Oreo Mint",
    quantity: 3,
  },
};

const cartsForChildrenMockData = {
  1: {
    products: productDetailMockData,
    date: "19/04/2021",
    id: 2,
    userId: 1,
  },
};

describe("<ProductList />", () => {
  test("display all products in a cart", () => {
    const component = render(
      <ProductList
        productList={productDetailMockData}
        setCartsForChildren={() => {}}
        cartId={1}
        cartsForChildren={cartsForChildrenMockData}
        discardItemList={undefined}
        setDiscardItemList={() => {}}
      />
    );

    const getElement = component.getByTestId("test-product-list");

    expect(getElement.childElementCount).toBe(2);
  });
});
