import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import OverviewField from "../components/OverviewField";
import { CartListWithAction, ProductDetail } from "../types";

const ProductslMockData: ProductDetail[] = [
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

const itemsList: CartListWithAction[] = [
  {
    cartId: 1,
    products: ProductslMockData,
  },
];

describe("<OverviewField/>", () => {
  test("displayed on desktop or tablet", () => {
    window = Object.assign(window, { innerWidth: 1000 });
    const component = render(
      <OverviewField itemsList={itemsList} field="Approve" mobile={false} />
    );

    const getElement = component.getByTestId("test-overview-field-container");

    expect(getElement.style.width).toBe("45%");
    expect(getElement).toHaveTextContent("Approve");
  });

  test("displayed on mobile", () => {
    window = Object.assign(window, { innerWidth: 600 });
    const component = render(<OverviewField itemsList={itemsList} mobile />);

    const getElement = component.getByTestId("test-overview-field-container");

    expect(getElement.style.width).toBe("100%");
    expect(getElement).not.toHaveTextContent("Approve");
  });
});
