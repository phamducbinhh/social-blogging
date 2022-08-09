import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../Firebase/Firebase";
import PostCategory from "./PostComponents/PostCategory";
import PostImage from "./PostComponents/PostImage";
import PostMeta from "./PostComponents/PostMeta";
import PostTitle from "./PostComponents/PostTitle";
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
  //lấy id từ trường category trong firebase
  const [categoriesID, setCategoriesID] = React.useState("");
  //lấy user id từ trường user trong firebase
  const [user, setUser] = React.useState("");

  useEffect(() => {
    async function FetchData() {
      const docRef = doc(db, "categories", item.categoryId);
      const docSnap = await getDoc(docRef);
      setCategoriesID(docSnap.data());
    }
    FetchData();
  }, [item.categoryId]);

  //lấy user id từ trường user để hiện tên tác giả trong firebase
  useEffect(() => {
    async function FetchUser() {
      if (item.userId) {
        const docRef = doc(db, "users", item.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap) {
          setUser(docSnap.data());
        }
      }
    }
    FetchUser();
  }, [item.userId]);

  //time hien thi thoi gian post
  const date = item?.createdAt?.seconds
    ? new Date(item.createdAt.seconds * 1000)
    : new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const time = `${hour}:${minutes}`;
  console.log(time);
  const formartDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostFeatureItemStyles>
      {/* post-image component */}
      <PostImage url={item?.image} alt="unsplash" />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {/* component postCategory */}
          {categoriesID?.name && (
            <PostCategory to={categoriesID.slug}>
              {categoriesID?.name}
            </PostCategory>
          )}
          {/* post-meta */}
          <PostMeta authorName={user?.username} date={formartDate} />
        </div>
        {/* component postTile */}
        <PostTitle>{item?.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
