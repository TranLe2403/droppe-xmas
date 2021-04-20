import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Total from "../components/Total";

const productsInTotalArrayMockData = [
  {
    title: "broccoli",
    repeatTimes: 2,
    quantity: 10,
    price: 5,
  },
  {
    title: "Oreo Mint",
    repeatTimes: 1,
    quantity: 3,
    price: 1.5,
  },
];

describe("<Total />", () => {
  test("display prices of 2 products", () => {
    const component = render(
      <Total productsInTotalArray={productsInTotalArrayMockData} />
    );

    const getElement = component.getByTestId("test-final-product-list");

    expect(getElement.childElementCount).toBe(2);
  });

  test("calculate the final price", () => {
    const component = render(
      <Total productsInTotalArray={productsInTotalArrayMockData} />
    );

    const firstDataInfo = productsInTotalArrayMockData[0];
    const secondDataInfo = productsInTotalArrayMockData[1];

    const finalPrice =
      firstDataInfo.price * firstDataInfo.quantity -
      (firstDataInfo.price *
        firstDataInfo.quantity *
        firstDataInfo.repeatTimes) /
        10 +
      secondDataInfo.price * secondDataInfo.quantity;

    const getElement = component.getByTestId("test-final-price");

    expect(getElement).toHaveTextContent(`Final Total: €${finalPrice}`);
  });
});
