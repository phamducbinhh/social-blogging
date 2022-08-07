import React from "react";
import styled from "styled-components";
import Heading from "../../Layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>bài viết nổi bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem />
          <PostFeatureItem />
          <PostFeatureItem />
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
