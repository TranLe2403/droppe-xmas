import React from "react";

type Props = {
  activeTab: string;
  label: string;
  tabHandler: (tab: string) => void;
};

const Tab = ({ activeTab, label, tabHandler }: Props) => {
  const onClick = () => {
    tabHandler(label);
  };

  const isActive = activeTab === label;

  return (
    <button
      onClick={onClick}
      style={{
        color: isActive ? "whitesmoke" : "black",
        width: 70,
        height: 30,
        background: isActive ? "#165b33" : "whitesmoke",
        border: "thin solid #cecece",
        borderRadius: 10,
        fontWeight: "bold",
        outline: "none",
      }}
    >
      {label}
    </button>
  );
};

export default Tab;
