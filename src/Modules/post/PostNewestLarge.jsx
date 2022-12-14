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

const PostNewestLarge = ({ data }) => {
  if (!data) return null;
  //time hien thi thoi gian post
  const formartDate = new Date(
    data?.createAt?.seconds * 1000
  ).toLocaleDateString("vi-VN");
  return (
    <PostNewestLargeStyles>
      <PostImage url={data?.image} />
      <PostCategory to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle
        type="primary"
        size="normal"
        to={data?.slug}
        className="hover:text-primary  hover:transition-all duration-300"
      >
        {data?.title}
      </PostTitle>
      {/* post-meta */}
      <PostMeta date={formartDate} authorName={data?.user?.username} />
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
