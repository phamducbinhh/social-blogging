import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  :hover {
    background-color: ${(props) => props.theme.primary};
    color: white;
    transition: 0.3s;
    cursor: pointer;
  }
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;
const PostCategory = ({
  children,
  className = "",
  type = "primary",
  to = "",
}) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      <Link to={`/category/${to}`}>{children}</Link>
    </PostCategoryStyles>
  );
};

export default PostCategory;
