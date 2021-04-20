import React from "react";

import "./index.css";
import { ModifiedCart, ProductDetail } from "../../types";

type Props = {
  productDetail: ProductDetail;
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

const SingleProduct = ({
  productDetail,
  setCartsForChildren,
  cartId,
  cartsForChildren,
  discardItemList,
  setDiscardItemList,
}: Props): JSX.Element => {
  if (!productDetail) return <p>Loading...</p>;

  const updateQuantityHandler = (id: number, sign: 1 | -1) => {
    const cartsForChildrenCopy = { ...cartsForChildren };

    const quantityOfTargetItem =
      cartsForChildrenCopy[cartId].products[id].quantity;

    const newProductDetail = {
      ...cartsForChildrenCopy[cartId].products[id],
      quantity: quantityOfTargetItem + sign,
    } as ProductDetail;

    if (newProductDetail.quantity < 0) {
      newProductDetail.quantity = 0;
    }

    const updatedCart: ModifiedCart = {
      ...cartsForChildrenCopy,
      [cartId]: {
        ...cartsForChildrenCopy[cartId],
        products: {
          ...cartsForChildrenCopy[cartId].products,
          [id]: newProductDetail,
        },
      },
    };

    setCartsForChildren(updatedCart);
  };

  const discardSingleProductHandler = (productId: number) => {
    const confirmWindow = window.confirm(
      "Are you sure you want to discard this product? It will permanently be removed!"
    );
    if (!confirmWindow) return;

    const cartsForChildrenCopy = { ...cartsForChildren };
    const discardItemListCopy = { ...discardItemList };

    // remove the product out of cart and update to state
    const productList: { [id: number]: ProductDetail } = {};

    Object.entries(cartsForChildrenCopy[cartId].products).forEach((item) => {
      if (Number(item[0]) !== productId) {
        productList[Number(item[0])] = item[1];
      }
    });

    const updatedCarts = {
      ...cartsForChildrenCopy,
      [cartId]: {
        ...cartsForChildrenCopy[cartId],
        products: productList,
      },
    };

    // get the removed item and put it to discardItemList state
    const extractItem = cartsForChildrenCopy[cartId].products[productId];

    // the updated object can could cover either the target cartId is already saved on discardItemList state or not
    const discardItem: ModifiedCart = {
      ...discardItemListCopy,
      [cartId]: {
        ...cartsForChildrenCopy[cartId],
        products: {
          ...discardItemListCopy[cartId]?.products,
          [productId]: extractItem,
        },
      },
    };

    setDiscardItemList(discardItem);

    setCartsForChildren(updatedCarts);
  };

  return (
    <div>
      <div className="separator"></div>

      <div className="single-product-container">
        <img
          src={productDetail.image}
          alt="product-detail"
          className="product-image"
        />

        <div className="product-detail ">
          <p className="product-detail-title">
            <strong>{productDetail?.title}</strong>
          </p>

          <div className="quantity-container">
            <p style={{ width: "40%" }}>€{productDetail.price}</p>

            <button
              onClick={() => updateQuantityHandler(productDetail.id, 1)}
              className="quantity-button"
              data-testid="test-substract-quantity-button"
            >
              -
            </button>
            <p data-testid="test-product-quantity">{productDetail.quantity}</p>
            <button
              onClick={() => updateQuantityHandler(productDetail.id, -1)}
              className="quantity-button"
              data-testid="test-plus-quantity-button"
            >
              +
            </button>
            <div
              onClick={() => discardSingleProductHandler(productDetail.id)}
              className="discard-div"
              data-testid="test-discard-product-button"
            >
              x
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
