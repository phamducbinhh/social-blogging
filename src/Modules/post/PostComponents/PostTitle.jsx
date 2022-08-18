import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTileStyles = styled.div`
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.25px;
  padding: 10px 0;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 16px;
      @media screen and (max-width: 1023.98px) {
        font-size: 14px;
      }
    `};
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 14px;
      @media screen and (max-width: 1023.98px) {
        font-size: 12px;
      }
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 25px;
      @media screen and (max-width: 1023.98px) {
        font-size: 16px;
      }
    `};
  ${(props) =>
    props.type === "primary" &&
    css`
      color: ${(props) => props.theme.gray23}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      color: white;
    `};
  @media only screen and (max-width: 740px) {
    font-size: 11px;
  }
`;
const PostTitle = ({
  children,
  to = "/",
  className = "",
  size = "normal",
  type = "secondary",
}) => {
  return (
    <PostTileStyles
      size={size}
      type={type}
      className={`post-title ${className}`}
    >
      <Link to={`/${to}`}>{children}</Link>
    </PostTileStyles>
  );
};

export default PostTitle;
