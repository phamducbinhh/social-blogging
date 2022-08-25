import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LayoutMain from "../Layout/LayoutMain";
import PostCategory from "../Modules/post/PostComponents/PostCategory";
import PostImage from "../Modules/post/PostComponents/PostImage";
import PostMeta from "../Modules/post/PostComponents/PostMeta";
import parse from "html-react-parser";

const BlogDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 350px;
        height: 200px;
      }
    }
  }
`;
const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respones = await fetch(`https://dev.to/api/articles/${id}`);
      const data = await respones.json();
      if (data) {
        setBlogDetail(data);
      }
    };
    fetchData();
  }, [id]);
  console.log(" blogDetail", blogDetail);

  return (
    <BlogDetailsPageStyles>
      <LayoutMain>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={blogDetail?.social_image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">
                <span>{blogDetail?.tag_list}</span>
              </PostCategory>
              <h1 className="post-heading">{blogDetail?.title}</h1>
              <PostMeta
                authorName={blogDetail?.user?.name}
                date={blogDetail?.last_comment_at}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              <div>{blogDetail?.body_markdown}</div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </BlogDetailsPageStyles>
  );
};

export default BlogDetailsPage;
