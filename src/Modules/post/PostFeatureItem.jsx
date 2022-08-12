import styled from "styled-components";
import React from "react";
import PostTitle from "./PostComponents/PostTitle";
import PostMeta from "./PostComponents/PostMeta";
import PostImage from "./PostComponents/PostImage";
import PostCategory from "./PostComponents/PostCategory";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ item }) => {
  if (!item || !item.id) return null;
  //time hien thi thoi gian post
  const date = item?.createdAt?.seconds
    ? new Date(item.createdAt.seconds * 1000)
    : new Date();
  const formartDate = new Date(date).toLocaleDateString("vi-VI");
  const { category, user } = item;
  return (
    <PostFeatureItemStyles>
      {/* post-image component */}
      {/* dữ liệu được truyền props từ bên component Home Feature */}
      <PostImage url={item?.image} alt="unsplash"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category?.name}</PostCategory>
          )}
          <PostMeta authorName={user?.username} date={formartDate} />
        </div>
        <PostTitle to={item.slug} className="hover:text-gray-300">{item?.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
