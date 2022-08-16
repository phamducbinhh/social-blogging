import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import Heading from "../Layout/Heading";
import LayoutMain from "../Layout/LayoutMain";
import PostItem from "../Modules/post/PostItem";

const CategoryPages = () => {
  const [posts, setPosts] = useState([]);
  // khởi tạo params để lấy slug của category
  const params = useParams();

  // lấy dữ liệu từ firebase
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        //push dữ liệu vào 1 mảng rỗng để map
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]); // render lại khi params.slug thay đổi
  if (posts.length <= 0) return null;
  return (
    <LayoutMain>
      <div className="container">
        <div className="pt-10"></div>
        <Heading>{params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((post) => (
            <PostItem key={post?.id} data={post}></PostItem>
          ))}
        </div>
      </div>
    </LayoutMain>
  );
};

export default CategoryPages;
