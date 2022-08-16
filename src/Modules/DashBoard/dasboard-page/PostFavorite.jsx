import React from "react";
import styled from "styled-components";
import PostCategory from "../../post/PostComponents/PostCategory";
import PostImage from "../../post/PostComponents/PostImage";
import PostMeta from "../../post/PostComponents/PostMeta";
import PostTitle from "../../post/PostComponents/PostTitle";

const PostFavoriteStyles = styled.div`
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
const PostFavorite = ({ data }) => {
  console.log(data);
  if (!data) return null;
  return (
    <PostFavoriteStyles>
      <PostImage url={data?.image} to={data?.slug}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {data?.category?.name && (
            <PostCategory to={data?.category.slug}>
              {data?.category?.name}
            </PostCategory>
          )}
        </div>
        <PostTitle
          to={data?.slug}
          className="hover:text-gray-300 hover:transition-all duration-300"
        >
          {data?.title}
        </PostTitle>
      </div>
      <PostMeta className="mt-6" authorName={data?.peopleLike} />
    </PostFavoriteStyles>
  );
};

export default PostFavorite;
