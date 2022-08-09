import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../Firebase/Firebase";
import Heading from "../../Layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [post, setPost] = useState([]);
  //lấy data từ firebase
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((item) => {
        result.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPost(result);
    });
  }, []);
  console.log(post);
  if (post.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>bài viết nổi bật</Heading>
        <div className="grid-layout">
          {post.length > 0 &&
            post.map((item) => <PostFeatureItem key={item.id} item={item} />)}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
