import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import {
  Cart,
  CartWithoutId,
  ModifiedCart,
  Product,
  ProductDetail,
  ProductInCart,
  CartListWithAction,
} from "./types";
import ActionButton from "./components/ActionButton";
import ProductList from "./components/ProductList";
import ReviewBox from "./components/ReviewBox";

const App = (): JSX.Element => {
  const [cartsForChildren, setCartsForChildren] = useState<ModifiedCart>();
  const [approveList, setApproveList] = useState<CartListWithAction[]>([]);
  const [discardList, setDiscardList] = useState<CartListWithAction[]>([]); // save discarded items from the whole card - clicking on discard button
  const [discardItemList, setDiscardItemList] = useState<ModifiedCart>(); // save discarded items when clicking on x button

  useEffect(() => {
    const getFiveCartsForChildren = async () => {
      const { data: carts } = await axios.get<Cart[]>(
        "https://fakestoreapi.com/carts?limit=5"
      );

      const { data: products } = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );

      // Handling data get from fetching APIs for convenient implementation later
      const modifiedCartObject: ModifiedCart = {};
      carts.forEach((cart) => {
        const modifiedProductObject: { [id: number]: ProductDetail } = {};

        cart.products.forEach((product) => {
          const cartProductInfo = products.find(
            (item) => item.id === product.productId
          ) as Product;

          modifiedProductObject[product.productId] = {
            ...cartProductInfo,
            quantity: product.quantity,
          };
        });

        modifiedCartObject[cart.id] = {
          ...cart,
          products: modifiedProductObject,
        };
      });

      setCartsForChildren(modifiedCartObject);
    };

    getFiveCartsForChildren();
  }, []);

  const saveDataToAPI = async (
    id: number,
    action: "approve" | "discard"
  ): Promise<void> => {
    const cartsForChildrenCopy = { ...cartsForChildren };

    const productArray = Object.values(cartsForChildrenCopy[id].products);
    const productInCartArray: ProductInCart[] = productArray.map((product) => {
      return { productId: product.id, quantity: product.quantity };
    });

    // convert data to CartWithoutId before sending request to API
    const uploadCart: CartWithoutId = {
      date: cartsForChildrenCopy[id].date,
      products: productInCartArray,
      userId: cartsForChildrenCopy[id].userId,
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

  const decisionHandler = (cartId: number, action: "approve" | "discard") => {
    const cartsForChildrenCopy = { ...cartsForChildren };

    // if (cartsForChildrenCopy === undefined || !action) {
    //   throw new Error("Missing data or action");
    // }

    const cartsCopyWithAction =
      action === "approve" ? [...approveList] : [...discardList];

    cartsCopyWithAction.push({
      childrenId: cartsForChildrenCopy[cartId].id,
      products: Object.values(cartsForChildrenCopy[cartId].products),
    });

    saveDataToAPI(cartId, action);

    delete cartsForChildrenCopy[cartId];

    action === "approve"
      ? setApproveList(cartsCopyWithAction)
      : setDiscardList(cartsCopyWithAction);
    setCartsForChildren(cartsForChildrenCopy);
  };

  if (!cartsForChildren) {
    return (
      <div className="App">
        <h1 className="app-header">DROPPE XMAS 🎄</h1>
        <div className="loading-text " data-testid="test-no-content-text">
          IS LOADING ...
        </div>
      </div>
    );
  }

  const isOutOfCart =
    (discardList.length > 0 || approveList.length > 0) &&
    Object.values(cartsForChildren).length === 0;

  return (
    <div className="App">
      <h1 className="app-header">DROPPE XMAS 🎄</h1>

      {isOutOfCart ? (
        <div className="review-box-container">
          <ReviewBox
            discardList={discardList}
            approveList={approveList}
            discardItemList={discardItemList}
          />
        </div>
      ) : (
        <div className="cart-list-container" data-testid="test-carts-display">
          {Object.values(cartsForChildren).map((cart) => (
            <div key={cart.id} className="single-cart-container">
              <div className="product-list-cover">
                <h3>Children {cart.id}</h3>
                <div className="separator"></div>
                <ProductList
                  productList={cart.products}
                  setCartsForChildren={setCartsForChildren}
                  cartId={cart.id}
                  cartsForChildren={cartsForChildren}
                  discardItemList={discardItemList}
                  setDiscardItemList={setDiscardItemList}
                />
              </div>

              <div className="button-cover" data-testid="test-action-buttons">
                <ActionButton
                  updateCartHandler={decisionHandler}
                  buttonName="Approve"
                  cartId={cart.id}
                  backgroundColor="#f8b229"
                />
                <ActionButton
                  updateCartHandler={decisionHandler}
                  buttonName="Discard"
                  cartId={cart.id}
                  backgroundColor="#ea4630"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
