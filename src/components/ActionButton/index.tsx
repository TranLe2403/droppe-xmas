import React from "react";

import { SingleCart } from "../../types";

type Props = {
  buttonName: "Approve" | "Discard";
  backgroundColor: "#f8b229" | "#ea4630";
  cart: SingleCart;
  updateCartHandler: (cart: SingleCart, action: "approve" | "discard") => void;
};

const ActionButton = ({
  buttonName,
  backgroundColor,
  updateCartHandler: approveDiscardHandler,
  cart,
}: Props): JSX.Element => {
  const handleButtonClick = () => {
    const confirmWindow = window.confirm(
      `Are you sure you want to ${buttonName.toUpperCase()} all products in this cart?`
    );

    if (!confirmWindow) return;

    approveDiscardHandler(
      cart,
      buttonName.toLowerCase() as "approve" | "discard"
    );
  };

  return (
    <button
      onClick={handleButtonClick}
      style={{
        width: "40%",
        margin: 5,
        padding: 10,
        borderRadius: 5,
        border: "none",
        background: backgroundColor,
        color: "whitesmoke",
        fontWeight: "bold",
        outline: "none",
        cursor: "pointer",
      }}
      data-testid="test-action-button"
    >
      {buttonName}
    </button>
  );
};

export default ActionButton;
