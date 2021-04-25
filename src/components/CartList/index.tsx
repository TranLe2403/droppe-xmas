import React, { useState } from "react";
import axios from "axios";

import "./index.css";
import {
  CartWithoutId,
  ProductInCart,
  CartListWithAction,
  SingleCart,
} from "../../types";
import ActionButton from "../ActionButton";
import ProductList from "../ProductList";
import ReviewBox from "../ReviewBox";
import { useCartContext } from "../../context/childrenCartContext";

const CartList = (): JSX.Element => {
  const [approveList, setApproveList] = useState<CartListWithAction[]>([]);
  const [discardList, setDiscardList] = useState<CartListWithAction[]>([]); // save discarded items from the whole card - clicking on discard button

  const { childrenCarts, setChildrenCarts } = useCartContext();

  const onDiscardListUpdate = (discardItem: CartListWithAction) => {
    const index = discardList.findIndex(
      (item) => item.cartId === discardItem.cartId
    );
    if (index === -1) {
      setDiscardList(discardList.concat(discardItem));
    } else {
      const updatedProducts = discardList[index].products.concat(
        discardItem.products
      );
      const updatedDiscardList = discardList.splice(index, 1, {
        ...discardList[index],
        products: updatedProducts,
      });
      setDiscardList(updatedDiscardList);
    }
  };

  const saveDataToAPI = async (
    cart: SingleCart,
    action: "approve" | "discard"
  ): Promise<void> => {
    const productInCartArray: ProductInCart[] = Object.values(
      cart.products
    ).map((product) => {
      return { productId: product.id, quantity: product.quantity };
    });

    // convert data to CartWithoutId before sending request to API
    const uploadCart: CartWithoutId = {
      date: cart.date,
      products: productInCartArray,
      userId: cart.userId,
    };

    try {
      const uploadedCart = await axios.post(
        "https://fakestoreapi.com/carts",
        uploadCart
      );

      console.log("Response: ", action, uploadedCart);
    } catch (err) {
      console.error(err);
    }
  };

  const decisionHandler = (cart: SingleCart, action: "approve" | "discard") => {
    const cartsForChildrenCopy = { ...childrenCarts };

    const cartsCopyWithAction =
      action === "approve" ? [...approveList] : [...discardList];

    cartsCopyWithAction.push({
      cartId: cart.id,
      products: Object.values(cart.products),
    });

    saveDataToAPI(cart, action);

    cartsForChildrenCopy[cart.id] = undefined;

    action === "approve"
      ? setApproveList(cartsCopyWithAction)
      : setDiscardList(cartsCopyWithAction);

    setChildrenCarts(cartsForChildrenCopy);
  };

  const isOutOfCart =
    Object.values(childrenCarts).filter((cart) => cart !== undefined).length ===
    0;

  return (
    <>
      {isOutOfCart ? (
        <div className="review-box-container">
          <ReviewBox discardList={discardList} approveList={approveList} />
        </div>
      ) : (
        <div className="cart-list-container" data-testid="test-carts-display">
          {Object.values(childrenCarts).map(
            (cart, index) =>
              cart && (
                <div key={cart.id} className="single-cart-container">
                  <div className="product-list-cover">
                    <h3
                      style={{
                        borderBottom: "1px solid #cecece",
                        paddingBottom: 20,
                      }}
                    >
                      Children {cart.id}
                    </h3>
                    <ProductList
                      productList={cart.products}
                      cart={cart}
                      onDiscardListUpdate={onDiscardListUpdate}
                    />
                  </div>

                  <div
                    className="button-cover"
                    data-testid="test-action-buttons"
                  >
                    <ActionButton
                      updateCartHandler={decisionHandler}
                      buttonName="Approve"
                      cart={cart}
                      backgroundColor="#f8b229"
                    />
                    <ActionButton
                      updateCartHandler={decisionHandler}
                      buttonName="Discard"
                      cart={cart}
                      backgroundColor="#ea4630"
                    />
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export default CartList;
