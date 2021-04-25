import React from "react";
import { SingleCart } from "../../types";

import { CartListWithAction, ProductDetail } from "../../types";
import SingleProduct from "../SingleProduct";

type Props = {
  productList: { [id: number]: ProductDetail };
  cart: SingleCart;
  onDiscardListUpdate: (discardItem: CartListWithAction) => void;
};

const ProductList = ({ productList, cart, onDiscardListUpdate }: Props) => {
  return (
    <div data-testid="test-product-list">
      {Object.values(productList).map((item) => {
        return (
          <SingleProduct
            key={item.id + item.description + item.quantity}
            productDetail={item}
            cart={cart}
            onDiscardListUpdate={onDiscardListUpdate}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
