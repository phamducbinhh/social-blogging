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
import PostItem from "../post/PostItem";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";
import { v4 } from "uuid";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 80px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f5f5f0;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;
const HomeNewest = () => {
  const [postNew, setPostNew] = useState([]);
  //lấy data từ firebase
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((item) => {
        result.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPostNew(result);
    });
  }, []);
  const [first, ...other] = postNew; //chia ra  phần tử đầu tiên và các phần tử còn lại
  if (postNew.length <= 0) return null;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>mới nhất</Heading>
        <div className="layout">
          {/* phan tu dau tien */}
          <PostNewestLarge data={first} />
          <div className="sidebar">
            {/* phan tu con lai */}
            {other.length > 0 &&
              other.map((item) => (
                <PostNewestItem key={v4()} data={item}></PostNewestItem>
              ))}
          </div>
        </div>
        <Heading>Bài viết liên quan</Heading>
        <div className="grid-layout grid-layout--primary">
          {postNew.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
