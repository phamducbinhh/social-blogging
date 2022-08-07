import React from "react";
import LayoutMain from "../Layout/LayoutMain";
import HomeBanner from "../Modules/home/HomeBanner";
import HomeFeature from "../Modules/home/HomeFeature";
import HomeNewest from "../Modules/home/HomeNewest";

const HomePage = () => {
  return (
    <LayoutMain>
      <HomeBanner />
      <HomeFeature />
      <HomeNewest />
    </LayoutMain>
  );
};

export default HomePage;
