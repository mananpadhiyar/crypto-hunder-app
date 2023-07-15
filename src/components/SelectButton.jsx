import React from "react";

const SelectButton = ({ childern, selected, onClick }) => {
  return <span onClick={onClick}>{childern}</span>;
};

export default SelectButton;
