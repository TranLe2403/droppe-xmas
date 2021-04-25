import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SingleProduct from "../components/SingleProduct";
import { mockData } from "./ActionButton.test";
import { ChildrenCartContext } from "../context/childrenCartContext";
import { ModifiedCart, ProductDetail } from "../types";

const productDetailMockData: ProductDetail = {
  category: "grocery",
  description: "new item",
  id: 1,
  image: ``,
  price: 50,
  title: "broccoli",
  quantity: 5,
};

let cartsForChildrenMockData: ModifiedCart = {
  1: {
    products: { 1: productDetailMockData },
    date: "19/04/2021",
    id: 2,
    userId: 1,
  },
};

describe("<SingleProduct />", () => {
  test("click on substract button should decrease product quantity by 1", () => {
    const renderer = () => (
      <ChildrenCartContext.Provider
        value={{
          childrenCarts: cartsForChildrenMockData,
          setChildrenCarts: jest.fn((item) => {
            cartsForChildrenMockData = item;
          }),
        }}
      >
        <SingleProduct
          // @ts-expect-error
          productDetail={cartsForChildrenMockData[1].products[1]}
          cart={mockData}
          onDiscardListUpdate={() => {}}
        />
      </ChildrenCartContext.Provider>
    );
    const component = render(renderer());

    const getElement = component.getByTestId("test-substract-quantity-button");
    const getQuantityElement = component.getByTestId("test-product-quantity");

    expect(getElement).toHaveTextContent("-");
    expect(getQuantityElement).toHaveTextContent("5");

    fireEvent.click(getElement);

    component.rerender(renderer());

    expect(getQuantityElement).toHaveTextContent("4");
  });

  test("click on plus button should increase product quantity by 1", () => {
    const renderer = () => (
      <ChildrenCartContext.Provider
        value={{
          childrenCarts: cartsForChildrenMockData,
          setChildrenCarts: jest.fn((item) => {
            cartsForChildrenMockData = item;
          }),
        }}
      >
        <SingleProduct
          // @ts-expect-error
          productDetail={cartsForChildrenMockData[1].products[1]}
          cart={mockData}
          onDiscardListUpdate={() => {}}
        />
      </ChildrenCartContext.Provider>
    );
    const component = render(renderer());

    const getElement = component.getByTestId("test-plus-quantity-button");
    const getQuantityElement = component.getByTestId("test-product-quantity");

    expect(getElement).toHaveTextContent("+");
    expect(getQuantityElement).toHaveTextContent("4");

    fireEvent.click(getElement);

    component.rerender(renderer());

    expect(getQuantityElement).toHaveTextContent("5");
  });

  test("click on discard product button should display a confirmation window", () => {
    let isConfirmWindowShown = false;
    jest.spyOn(window, "confirm").mockImplementation(() => {
      isConfirmWindowShown = true;
      return true;
    });

    const component = render(
      <SingleProduct
        productDetail={productDetailMockData}
        cart={mockData}
        onDiscardListUpdate={() => {}}
      />
    );

    const getElement = component.getByTestId("test-discard-product-button");

    expect(getElement).toHaveTextContent("x");

    fireEvent.click(getElement);

    expect(isConfirmWindowShown).toBeTruthy();
  });
});
