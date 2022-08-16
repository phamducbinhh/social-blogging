import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../Firebase/Firebase";
import LayoutMain from "../Layout/LayoutMain";
import PostCategory from "../Modules/post/PostComponents/PostCategory";
import PostImage from "../Modules/post/PostComponents/PostImage";
import PostMeta from "../Modules/post/PostComponents/PostMeta";
import PageNotFound from "./PageNotFound";
import parse from "html-react-parser";
import AuthorBox from "../Components/author/AuthorBox";
import PostSimilar from "../Modules/DashBoard/dasboard-page/PostSimilar";
import moment from "moment";
import ToggleLike from "../Components/toggle/ToggleLike";

const PostDetailsPageStyles = styled.div`
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

const PostDetailsPage = () => {
  const { slug } = useParams(); //lay ra duong dan cua bai viet
  const [postInfo, setPostInfo] = useState({});
  //lay data cua bai viet theo duong dan tu firebase
  useEffect(() => {
    const getPost = async () => {
      if (!slug) return;
      const postRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(postRef, (snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data()) {
            setPostInfo(doc.data());
          }
        });
      });
    };
    getPost();
  }, [slug]);

  //scroll to top
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  // điều kiện bài viết không tồn tại
  if (!slug || !postInfo.title) return;
  //time hien thi thoi gian post
  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo.createdAt.seconds * 1000)
    : new Date();
  //moment.js
  const time = moment(date).fromNow();
  const { title } = postInfo;
  return (
    <PostDetailsPageStyles>
      <LayoutMain>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo?.category?.slug}>
                {postInfo?.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo?.title}</h1>
              <PostMeta
                authorName={postInfo?.user?.username}
                date={time}
              ></PostMeta>
              <ToggleLike title={title} />
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postInfo?.content || "")}
            </div>
            <AuthorBox userId={postInfo?.user?.id}></AuthorBox>
          </div>
          <PostSimilar categoryId={postInfo?.categoryId}></PostSimilar>
        </div>
      </LayoutMain>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
