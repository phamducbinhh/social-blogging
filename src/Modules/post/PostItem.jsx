import React from "react";
import styled from "styled-components";
import PostCategory from "./PostComponents/PostCategory";
import PostImage from "./PostComponents/PostImage";
import PostMeta from "./PostComponents/PostMeta";
import PostTitle from "./PostComponents/PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
  }
`;

const PostItem = () => {
  return (
    <PostItemStyles>
      <PostImage url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80" />
      <PostCategory>Kiến thức</PostCategory>
      {/* post-title */}
      <PostTitle type="primary" size="small">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      {/* post-meta */}
      <PostMeta />
    </PostItemStyles>
  );
};

export default PostItem;
