import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Cart, ModifiedCart, Product, ProductDetail } from "./types";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { ChildrenCartContext } from "./context/childrenCartContext";
import CartList from "./components/CartList";

const baseURL = "https://fakestoreapi.com";

const cartsLimit = 5;

const App = (): JSX.Element => {
  const [childrenCarts, setChildrenCarts] = useState<ModifiedCart>();

  useEffect(() => {
    const getCarts = async (numberOfCart: number) => {
      const { data: carts } = await axios.get<Cart[]>(
        `${baseURL}/carts?limit=${numberOfCart}`
      );

      const { data: products } = await axios.get<Product[]>(
        `${baseURL}/products`
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

      setChildrenCarts(modifiedCartObject);
    };

    getCarts(cartsLimit);
  }, []);

  if (!childrenCarts) {
    return (
      <div className="App">
        <Header />
        <Loader />
      </div>
    );
  }

  return (
    <ChildrenCartContext.Provider value={{ childrenCarts, setChildrenCarts }}>
      <div className="App">
        <Header />
        <CartList />
      </div>
    </ChildrenCartContext.Provider>
  );
};

export default App;
