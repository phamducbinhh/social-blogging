import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute left-0 w-full shadow-sm top-full ">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
