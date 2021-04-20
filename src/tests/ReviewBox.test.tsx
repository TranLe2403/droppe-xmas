import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ReviewBox, { ProductListAfterAction } from "../components/ReviewBox";
import { ProductDetail } from "../types";

const productDetailMockData: ProductDetail[] = [
  {
    category: "grocery",
    description: "new item",
    id: 1,
    image: ``,
    price: 50,
    title: "broccoli",
    quantity: 5,
  },
  {
    category: "cookies",
    description: "Oreo",
    id: 2,
    image: ``,
    price: 1.5,
    title: "Oreo Mint",
    quantity: 3,
  },
];

const productList: ProductListAfterAction[] = [
  {
    childrenId: 1,
    products: productDetailMockData,
  },
];

describe("<ReviewBox />", () => {
  test("has two field in the overview part which are Approve and Discard product lists", () => {
    const component = render(
      <ReviewBox
        discardList={productList}
        approveList={productList}
        discardItemList={undefined}
      />
    );

    const getElement = component.getByTestId("test-fields-container");

    expect(getElement).toHaveTextContent("Approve");
    expect(getElement).toHaveTextContent("Discard");
  });
});
