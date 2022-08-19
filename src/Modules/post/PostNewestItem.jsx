import React from "react";
import styled from "styled-components";
import PostCategory from "./PostComponents/PostCategory";
import PostImage from "./PostComponents/PostImage";
import PostMeta from "./PostComponents/PostMeta";
import PostTitle from "./PostComponents/PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
  }
`;
const PostNewestItem = ({ data }) => {
  if (!data) return null;
  //time hien thi thoi gian post
  const formartDate = new Date(
    data?.createAt?.seconds * 1000
  ).toLocaleDateString("vi-VN");
  return (
    <PostNewestItemStyles>
      <PostImage url={data?.image} />
      <div className="post-content">
        <PostCategory to={data?.category?.slug} type="secondary">
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
        <PostMeta authorName={data?.user?.username} date={formartDate} />
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
