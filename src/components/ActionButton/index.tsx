import React from "react";

type Props = {
  buttonName: string;
  backgroundColor: string;
  cartId: number;
  updateCartHandler: (id: number, action: "approve" | "discard") => void;
};

const ActionButton = ({
  buttonName,
  backgroundColor,
  updateCartHandler: approveHandler,
  cartId,
}: Props): JSX.Element => {
  return (
    <button
      onClick={() =>
        approveHandler(cartId, buttonName === "Approve" ? "approve" : "discard")
      }
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
    >
      {buttonName}
    </button>
  );
};

export default ActionButton;
