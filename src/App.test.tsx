import React from "react";
import moxios from "moxios";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";
import { cartsMockData, productsMockData } from "./tests/mockData";

describe("<App />", () => {
  beforeEach(() => {
    moxios.install(); // install moxios before each test
  });

  afterEach(() => {
    moxios.uninstall(); // uninstall moxios after each test finished
  });

  test("display `IS LOADING ...` text when there is no data", () => {
    const component = render(<App />);

    const getElement = component.getByTestId("test-no-content-text");

    expect(getElement).toHaveTextContent("IS LOADING ...");
  });

  test("get data and display 5 carts according to 5 children", async () => {
    const component = render(<App />);

    moxios.wait(() => {
      moxios.requests
        .get("get", "https://fakestoreapi.com/carts?limit=5")
        .respondWith({
          status: 200,
          response: cartsMockData,
        });
    });

    moxios.wait(() => {
      const productRequest = moxios.requests.get(
        "get",
        "https://fakestoreapi.com/products"
      );
      productRequest.respondWith({
        status: 200,
        response: productsMockData,
      });
    });

    await waitFor(
      () => {
        const getElement = component.getByTestId("test-carts-display");

        expect(getElement.childElementCount).toBe(5);
      },
      {
        timeout: 3000,
      }
    );
  });
});
