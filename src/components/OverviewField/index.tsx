import React from "react";

import "./index.css";
import { ProductListAfterAction } from "../ReviewBox";

type Props = {
  itemsList: ProductListAfterAction[];
  field: string;
};

const OverviewField = ({ itemsList, field }: Props): JSX.Element => {
  return (
    <div className="single-field-container">
      <div>
        <h4>{field}</h4>
        <div style={{ color: "#cecece" }}>
          {itemsList.length === 0 && `No item on ${field} field`}
        </div>
      </div>
      {itemsList.map((item) => (
        <div key={item.childrenId}>
          <h5>Children{item.childrenId}</h5>
          <div>
            {item.products.map((product) => (
              <div
                className="product-info"
                key={`${product.id}+${product.title}`}
              >
                <div className="product-image-title-cover ">
                  <img
                    className="overview-image"
                    src={product.image}
                    alt="product-review-images"
                  />
                  <p className="product-title">{product.title}</p>
                </div>
                <p>
                  €{product.price} x {product.quantity} = €
                  {product.price * product.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewField;
