import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();

  const handleClickDropdown = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="flex items-center justify-between py-4 px-5 bg-[#E7ECF3] border border-grayf1 rounded-lg cursor-pointer text-sm text-[#000] overflow-hidden mt-3"
      onClick={handleClickDropdown}
    >
      {props.children}
    </div>
  );
};

export default Option;
