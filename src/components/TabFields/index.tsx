import React, { useState } from "react";

import "./index.css";
import Tab from "./Tab";

const TabFields = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  const getLabelText = children[0].props.children[0].props.children;
  const [activeTab, setActiveTab] = useState<string>(getLabelText);

  const onClickTabItem = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="all-tabs-container">
        {children.map((child, index) => {
          const label = child.props.children[0].props.children;

          return (
            <Tab
              activeTab={activeTab}
              key={label + index}
              label={label}
              tabHandler={onClickTabItem}
            />
          );
        })}
      </div>

      <div>
        {children.map((child) => {
          if (child.props.children[0].props.children !== activeTab) return null;
          return child.props.children[1];
        })}
      </div>
    </>
  );
};

export default TabFields;
