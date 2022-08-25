import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Heading from "../Layout/Heading";
import LayoutMain from "../Layout/LayoutMain";
import PostBlogItem from "../Modules/post/PostComponents/PostBlogItem";

const BlogPageStyles = styled.div`
  padding-bottom: 50px;
`;

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const response = await fetch("https://dev.to/api/articles");
      const data = await response.json();
      if (!data) return;
      setBlogPosts(data);
    };
    fetchBlogPosts();
  }, []);
  return (
    <LayoutMain>
      <BlogPageStyles>
        <div className="container">
          <Heading>Tin Tức Dev To</Heading>
          <div className="blog-layout">
            {blogPosts.slice(5, 14).map((post) => (
              <PostBlogItem key={post.id} data={post} />
            ))}
          </div>
        </div>
      </BlogPageStyles>
    </LayoutMain>
  );
};

export default BlogPage;
