import React from "react";

import "./index.css";
import { CartListWithAction, ModifiedCart, ProductDetail } from "../../types";
import { useCartContext } from "../../context/childrenCartContext";
import { SingleCart } from "../../types";

type Props = {
  productDetail: ProductDetail;
  cart: SingleCart;
  onDiscardListUpdate: (discardItem: CartListWithAction) => void;
};

const SingleProduct = ({
  productDetail,
  cart,
  onDiscardListUpdate,
}: Props): JSX.Element => {
  const { childrenCarts, setChildrenCarts } = useCartContext();

  if (!productDetail) return <p>Loading...</p>;

  const updateQuantityHandler = (id: number, sign: 1 | -1) => {
    const cartsForChildrenCopy = { ...childrenCarts };

    const quantityOfTargetItem = productDetail.quantity;

    const newProductDetail = {
      ...productDetail,
      quantity: quantityOfTargetItem + sign,
    } as ProductDetail;

    if (newProductDetail.quantity < 1) {
      newProductDetail.quantity = 1;
    }

    const updatedCart: ModifiedCart = {
      ...cartsForChildrenCopy,
      [cart.id]: {
        ...cart,
        products: {
          ...cart.products,
          [id]: newProductDetail,
        },
      },
    };

    setChildrenCarts(updatedCart);
  };

  const discardSingleProductHandler = (productId: number) => {
    const confirmWindow = window.confirm(
      "Are you sure you want to discard this product? It will permanently be removed!"
    );
    if (!confirmWindow) return;

    const cartsForChildrenCopy = { ...childrenCarts };

    // remove the product out of cart and update to state
    const productList: { [id: number]: ProductDetail } = {};

    Object.entries(cart.products).forEach((item) => {
      if (Number(item[0]) !== productId) {
        productList[Number(item[0])] = item[1];
      }
    });

    const updatedCarts = {
      ...cartsForChildrenCopy,
      [cart.id]: {
        ...cart,
        products: productList,
      },
    };

    // the updated object can could cover either the target cartId is already saved on discardItemList state or not

    onDiscardListUpdate({ cartId: cart.id, products: [productDetail] });

    setChildrenCarts(updatedCarts);
  };

  return (
    <div>
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
            <p className="product-price">€{productDetail.price}</p>

            <button
              onClick={() => updateQuantityHandler(productDetail.id, -1)}
              className="quantity-button"
              data-testid="test-substract-quantity-button"
            >
              -
            </button>
            <p data-testid="test-product-quantity" className="quantity-text">
              {productDetail.quantity}
            </p>
            <button
              onClick={() => updateQuantityHandler(productDetail.id, 1)}
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
