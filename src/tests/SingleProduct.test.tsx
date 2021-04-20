import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SingleProduct from "../components/SingleProduct";

const productDetailMockData = {
  category: "grocery",
  description: "new item",
  id: 1,
  image: ``,
  price: 50,
  title: "broccoli",
  quantity: 5,
};

const cartsForChildrenMockData = {
  1: {
    products: { 1: productDetailMockData },
    date: "19/04/2021",
    id: 2,
    userId: 1,
  },
};

describe("<SingleProduct />", () => {
  test("click on substract button should decrease product quantity by 1", () => {
    const component = render(
      <SingleProduct
        productDetail={productDetailMockData}
        cartId={1}
        cartsForChildren={cartsForChildrenMockData}
        setCartsForChildren={() => {
          productDetailMockData.quantity = 4;
        }}
        discardItemList={undefined}
        setDiscardItemList={() => {}}
      />
    );

    const getElement = component.getByTestId("test-substract-quantity-button");
    const getQuantityElement = component.getByTestId("test-product-quantity");

    expect(getElement).toHaveTextContent("-");
    expect(getQuantityElement).toHaveTextContent("5");

    fireEvent.click(getElement);

    component.rerender(
      <SingleProduct
        productDetail={productDetailMockData}
        cartId={1}
        cartsForChildren={cartsForChildrenMockData}
        setCartsForChildren={() => {
          productDetailMockData.quantity = 4;
        }}
        discardItemList={undefined}
        setDiscardItemList={() => {}}
      />
    );

    expect(getQuantityElement).toHaveTextContent("4");
  });

  test("click on plus button should increase product quantity by 1", () => {
    const component = render(
      <SingleProduct
        productDetail={productDetailMockData}
        cartId={1}
        cartsForChildren={cartsForChildrenMockData}
        setCartsForChildren={() => {
          productDetailMockData.quantity = 5;
        }}
        discardItemList={undefined}
        setDiscardItemList={() => {}}
      />
    );

    const getElement = component.getByTestId("test-plus-quantity-button");
    const getQuantityElement = component.getByTestId("test-product-quantity");

    expect(getElement).toHaveTextContent("+");
    expect(getQuantityElement).toHaveTextContent("4");

    fireEvent.click(getElement);

    component.rerender(
      <SingleProduct
        productDetail={productDetailMockData}
        cartId={1}
        cartsForChildren={cartsForChildrenMockData}
        setCartsForChildren={() => {
          productDetailMockData.quantity = 5;
        }}
        discardItemList={undefined}
        setDiscardItemList={() => {}}
      />
    );

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
        cartId={1}
        cartsForChildren={cartsForChildrenMockData}
        setCartsForChildren={() => {
          productDetailMockData.quantity = 4;
        }}
        discardItemList={undefined}
        setDiscardItemList={() => {}}
      />
    );

    const getElement = component.getByTestId("test-discard-product-button");

    expect(getElement).toHaveTextContent("x");

    fireEvent.click(getElement);

    expect(isConfirmWindowShown).toBeTruthy();
  });
});
