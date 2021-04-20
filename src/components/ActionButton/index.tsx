import React from "react";

type Props = {
  buttonName: "Approve" | "Discard";
  backgroundColor: "#165b33" | "#ea4630";
  cartId: number;
  updateCartHandler: (id: number, action: "approve" | "discard") => void;
};

const ActionButton = ({
  buttonName,
  backgroundColor,
  updateCartHandler: approveDiscardHandler,
  cartId,
}: Props): JSX.Element => {
  const handleButtonClick = () => {
    const confirmWindow = window.confirm(
      `Are you sure you want to ${buttonName.toUpperCase()} all products in this cart`
    );

    if (!confirmWindow) return;

    approveDiscardHandler(cartId, buttonName.toLowerCase() as "approve" | "discard");
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
      }}
      data-testid="test-action-button"
    >
      {buttonName}
    </button>
  );
};

export default ActionButton;
