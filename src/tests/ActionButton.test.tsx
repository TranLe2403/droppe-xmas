import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ActionButton from "../components/ActionButton";

describe("<ActionButton />", () => {
  test("display with `Approve` text as title and #165b33 as background color", () => {
    const component = render(
      <ActionButton
        updateCartHandler={() => {}}
        buttonName="Approve"
        cartId={1}
        backgroundColor="#165b33"
      />
    );

    const getElement = component.getByTestId("test-action-button");

    expect(getElement).toHaveTextContent("Approve");
    expect(getElement.style.background).toBe("rgb(22, 91, 51)"); //convert hex code to rbg
  });

  test("display with `Discard` text as title and #ea4630 as background color", () => {
    const component = render(
      <ActionButton
        updateCartHandler={() => {}}
        buttonName="Discard"
        cartId={1}
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
        cartId={1}
        backgroundColor="#165b33"
      />
    );

    const getElement = component.getByTestId("test-action-button");

    fireEvent.click(getElement);

    expect(isConfirmWindowShown).toBeTruthy();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
