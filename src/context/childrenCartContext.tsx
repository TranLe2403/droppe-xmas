import { createContext, useContext } from "react";

import { ModifiedCart } from "../types";

type CartContext = {
  childrenCarts: ModifiedCart;
  setChildrenCarts: (childrenCart: ModifiedCart) => void;
};
export const ChildrenCartContext = createContext<CartContext>({
  childrenCarts: {},
  setChildrenCarts: () => {},
});

export const useCartContext = () => useContext(ChildrenCartContext);
