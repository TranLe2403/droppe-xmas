import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ActionButton from "../components/ActionButton";
import { SingleCart } from "../types";

export const mockData: SingleCart = {
  products: {},
  date: "",
  id: 1,
  userId: 2,
};

describe("<ActionButton />", () => {
  test("display with `Approve` text as title and ##f8b229 as background color", () => {
    const component = render(
      <ActionButton
        updateCartHandler={() => {}}
        buttonName="Approve"
        cart={mockData}
        backgroundColor="#f8b229"
      />
    );

    const getElement = component.getByTestId("test-action-button");

    expect(getElement).toHaveTextContent("Approve");
    expect(getElement.style.background).toBe("rgb(248, 178, 41)"); //convert hex code to rbg
  });

  test("display with `Discard` text as title and #ea4630 as background color", () => {
    const component = render(
      <ActionButton
        updateCartHandler={() => {}}
        buttonName="Discard"
        cart={mockData}
        backgroundColor="#ea4630"
      />
    );

    const getElement = component.getByTestId("test-action-button");

    expect(getElement).toHaveTextContent("Discard");
    expect(getElement.style.background).toBe("rgb(234, 70, 48)"); //convert hex code to rbg
  });

  test("click on action button approve/discard of a certain cart", () => {
    let isConfirmWindowShown = false;

    const handleClick = jest.fn();
    jest.spyOn(window, "confirm").mockImplementation(() => {
      isConfirmWindowShown = true;
      return true;
    });

    const component = render(
      <ActionButton
        updateCartHandler={handleClick}
        buttonName="Approve"
        cart={mockData}
        backgroundColor="#f8b229"
      />
    );

    const getElement = component.getByTestId("test-action-button");

    fireEvent.click(getElement);

    expect(isConfirmWindowShown).toBeTruthy();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
