import React, { useEffect } from "react";
import LayoutMain from "../Layout/LayoutMain";
import HomeBanner from "../Modules/home/HomeBanner";
import HomeFeature from "../Modules/home/HomeFeature";
import HomeNewest from "../Modules/home/HomeNewest";

const HomePage = () => {
  useEffect(() => {
    document.title = "Monkey Blogging";
  }, []);
  return (
    <LayoutMain>
      <HomeBanner />
      <HomeFeature />
      <HomeNewest />
    </LayoutMain>
  );
};

export default HomePage;
