import React from "react";
import { DropdownProvider } from "./dropdown-context";
import List from "./List";
import Select from "./Select";

const Dropdown = ({
  placeholder = "Please select an option",
  children,
  ...props
}) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
