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
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ data }) => {
  if (!data) return null;
  //time hien thi thoi gian post
  const date = data?.createdAt?.seconds
    ? new Date(data.createdAt.seconds * 1000)
    : new Date();
  const formartDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles>
      <PostImage url={data?.image} to={data?.slug} />
      <PostCategory to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle type="primary" size="small" to={data?.slug}>
        {data?.title}
      </PostTitle>
      <PostMeta date={formartDate} authorName={data?.user?.username} />
    </PostItemStyles>
  );
};

export default PostItem;
