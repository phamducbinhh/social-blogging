import React from "react";
import styled from "styled-components";
import PostImage from "./PostImage";
import { Link } from "react-router-dom";

const PostBlogItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  height: 179px;
  position: relative;
  margin: 20px 0;
  .title {
    margin-top: 10px;
    font-size: 15px;
    color: #111;
    font-weight: 700;
  }
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
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostBlogItem = ({ data }) => {
  if (!data) return null;
  return (
    <PostBlogItemStyles>
      <PostImage url={data?.social_image} className="border border-slate-400" />
      <div className="post-overlay"></div>
      <div className="blog-title">
        <Link to={`/blog/${data?.id}`}>
          <p className="title">{data?.title}</p>
        </Link>
      </div>
    </PostBlogItemStyles>
  );
};

export default PostBlogItem;
