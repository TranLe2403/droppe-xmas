import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ReviewBox, { ProductListAfterAction } from "../components/ReviewBox";
import { ProductDetail } from "../types";

const approveProductlMockData: ProductDetail[] = [
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

const discardProductlMockData: ProductDetail[] = [
  {
    category: "grocery",
    description: "food",
    id: 6,
    image: ``,
    price: 1.75,
    title: "bacon",
    quantity: 5,
  },
];

const approveList: ProductListAfterAction[] = [
  {
    childrenId: 1,
    products: approveProductlMockData,
  },
];

const discardList: ProductListAfterAction[] = [
  {
    childrenId: 2,
    products: discardProductlMockData,
  },
];

describe("<ReviewBox />", () => {
  test("has two field in the overview part which are Approve and Discard product lists", () => {
    const component = render(
      <ReviewBox
        discardList={discardList}
        approveList={approveList}
        discardItemList={undefined}
      />
    );

    const getElement = component.getByTestId("test-fields-container");

    expect(getElement).toHaveTextContent("Approve");
    expect(getElement).toHaveTextContent("Discard");
    expect(getElement).toHaveTextContent("Total");
    expect(getElement).toHaveTextContent("bacon"); //discard product is displayed on desktop or tablet view
  });
});

describe("Responsive ReviewBox", () => {
  test("should display 3 buttons standing for Approve, Discard and Total and Approve option is chosen as default", () => {
    window = Object.assign(window, { innerWidth: 600 });
    const component = render(
      <ReviewBox
        discardList={discardList}
        approveList={approveList}
        discardItemList={undefined}
      />
    );

    const getElement = component.getByTestId("test-fields-container-mobile");

    expect(getElement).toHaveTextContent("Approve");
    expect(getElement).toHaveTextContent("Discard");
    expect(getElement).toHaveTextContent("Total");
    expect(getElement).toHaveTextContent("broccoli"); // approve products are displayed
    expect(getElement).not.toHaveTextContent("bacon"); // discard product is not displayed on mobile view
  });
});
