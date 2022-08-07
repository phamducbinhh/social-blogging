import React from "react";
import styled from "styled-components";
import PostCategory from "./PostComponents/PostCategory";
import PostImage from "./PostComponents/PostImage";
import PostMeta from "./PostComponents/PostMeta";
import PostTitle from "./PostComponents/PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <PostImage url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80" />
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle type="primary" size="normal">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      {/* post-meta */}
      <PostMeta />
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
