import React, { useEffect, useState } from "react";

import "./index.css";
import { CartListWithAction, ProductDetail } from "../../types";
import OverviewField from "../OverviewField";
import Total from "../Total";
import TabFields from "../TabFields";

type ProductForTotal = {
  [id: number]: {
    title: string;
    repeatTimes: number;
    quantity: number;
    price: number;
  };
};

type Props = {
  discardList: CartListWithAction[];
  approveList: CartListWithAction[];
};

const ReviewBox = ({ discardList, approveList }: Props): JSX.Element => {
  const [allApprovedProductList, setAllApprovedProductList] = useState<
    ProductDetail[]
  >([]);

  const getNumberOfItems = () => {
    return window.innerWidth;
  };

  const [width, setWidth] = useState(getNumberOfItems());

  useEffect(() => {
    function reportWindowSize() {
      setWidth(getNumberOfItems());
    }

    window.addEventListener("resize", reportWindowSize);

    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);

  useEffect(() => {
    const approvedProductList = approveList.reduce((acc, val) => {
      return acc.concat(val.products);
    }, [] as ProductDetail[]);

    setAllApprovedProductList(approvedProductList);
  }, [discardList, approveList]);

  const productsForTotal: ProductForTotal = allApprovedProductList.reduce(
    (acc: ProductForTotal, val) => {
      const isSavedProductId = acc.hasOwnProperty(val.id); //check if product id is saved already from different cart
      return {
        ...acc,
        [val.id]: {
          title: val.title,
          repeatTimes: isSavedProductId ? acc[val.id].repeatTimes + 1 : 1,
          quantity: isSavedProductId
            ? acc[val.id].quantity + val.quantity
            : val.quantity,
          price: val.price,
        },
      };
    },
    {}
  );

  const productsInTotalArray = Object.values(productsForTotal);
  const isMobile = width < 768;
  return (
    <div className="overview-box-container">
      <h2>Let's take a look at overview</h2>
      {isMobile ? (
        // UI for mobile
        <div data-testid="test-fields-container-mobile">
          <TabFields>
            <div>
              <p>Approve</p>
              <OverviewField itemsList={approveList} mobile={isMobile} />
            </div>
            <div>
              <p>Discard</p>
              <OverviewField itemsList={discardList} mobile={isMobile} />
            </div>
            <div>
              <p>Total</p>
              <Total
                productsInTotalArray={productsInTotalArray}
                mobile={isMobile}
              />
            </div>
          </TabFields>
        </div>
      ) : (
        // UI for tablet or desktop
        <div data-testid="test-fields-container">
          <div className="overview-fields-container">
            <OverviewField
              itemsList={approveList}
              field="Approve"
              mobile={isMobile}
            />
            <div className="field-separator"></div>
            <OverviewField
              itemsList={discardList}
              field="Discard"
              mobile={isMobile}
            />
          </div>
          <Total productsInTotalArray={productsInTotalArray} />
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
