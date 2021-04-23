import React, { useEffect, useState } from "react";

import "./index.css";
import { ModifiedCart, ProductDetail } from "../../types";
import OverviewField from "../OverviewField";
import Total from "../Total";
import TabFields from "../TabFields";

export type ProductListAfterAction = {
  childrenId: number;
  products: ProductDetail[];
};

type ProductForTotal = {
  [id: number]: {
    title: string;
    repeatTimes: number;
    quantity: number;
    price: number;
  };
};

type Props = {
  discardList: ProductListAfterAction[];
  approveList: ProductListAfterAction[];
  discardItemList: ModifiedCart | undefined;
};

const ReviewBox = ({
  discardList,
  approveList,
  discardItemList,
}: Props): JSX.Element => {
  const [combinedDiscardArray, setCombinedDiscardArray] = useState<
    ProductListAfterAction[]
  >([]);
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
    if (discardItemList) {
      // possible to be undefined
      const itemlist = Object.values(discardItemList);

      const newItemList: ProductListAfterAction[] = itemlist.map((item) => {
        return { childrenId: item.id, products: Object.values(item.products) };
      });

      setCombinedDiscardArray(discardList.concat(newItemList));
    } else {
      setCombinedDiscardArray(discardList);
    }

    const approvedProductList = approveList.reduce((acc, val) => {
      return acc.concat(val.products);
    }, [] as ProductDetail[]);

    setAllApprovedProductList(approvedProductList);
  }, [discardList, discardItemList, approveList]);

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
              <OverviewField
                itemsList={combinedDiscardArray}
                mobile={isMobile}
              />
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
              itemsList={combinedDiscardArray}
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
