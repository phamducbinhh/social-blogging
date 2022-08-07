import React, { Fragment } from "react";
import Header from "./Header";

const LayoutMain = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>;{children}
    </Fragment>
  );
};

export default LayoutMain;
