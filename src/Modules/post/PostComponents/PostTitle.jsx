import React from "react";
import { NavLink } from "react-router-dom";
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
    props.type === "primary" &&
    css`
      color: ${(props) => props.theme.gray23}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      color: white;
    `};
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
      <NavLink to={to}>{children}</NavLink>
    </PostTileStyles>
  );
};

export default PostTitle;