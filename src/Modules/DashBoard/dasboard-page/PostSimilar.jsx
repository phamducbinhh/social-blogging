import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../../Firebase/Firebase";
import Heading from "../../../Layout/Heading";
import PostItem from "../../post/PostItem";

const PostSimilar = ({ categoryId = "" }) => {
  //lay ra cac bai viet cung chuyen muc
  const [postSimilar, setPostSimilar] = React.useState({});

  // lấy ra dữ liệu từ firebase
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostSimilar(result);
    });
  }, [categoryId]);
  if (!categoryId) return null;

  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {postSimilar.length > 0 &&
          postSimilar.map((post) => {
            return <PostItem key={post?.id} data={post}></PostItem>;
          })}
      </div>
    </div>
  );
};

export default PostSimilar;
