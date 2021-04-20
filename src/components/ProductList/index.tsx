import React from "react";

import { ModifiedCart, ProductDetail } from "../../types";
import SingleProduct from "../SingleProduct";

type Props = {
  productList: { [id: number]: ProductDetail };
  cartId: number;
  cartsForChildren: ModifiedCart;
  setCartsForChildren: React.Dispatch<
    React.SetStateAction<ModifiedCart | undefined>
  >;
  discardItemList: ModifiedCart | undefined;
  setDiscardItemList: React.Dispatch<
    React.SetStateAction<ModifiedCart | undefined>
  >;
};

const ProductList = ({
  productList,
  setCartsForChildren,
  cartId,
  cartsForChildren,
  discardItemList,
  setDiscardItemList,
}: Props) => {
  return (
    <div data-testid="test-product-list">
      {Object.values(productList).map((item) => {
        return (
          <SingleProduct
            key={item.id}
            productDetail={item}
            setCartsForChildren={setCartsForChildren}
            cartId={cartId}
            cartsForChildren={cartsForChildren}
            discardItemList={discardItemList}
            setDiscardItemList={setDiscardItemList}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
