import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../Firebase/Firebase";
const ToggleLike = ({ title }) => {
  const { userInfo } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likePeople, setLikePeople] = useState([]);
  const [postId, setPostId] = useState("");

  const handleLikePost = async () => {
    const docRef = doc(db, "posts", postId);
    //lọc ra mảng không chứa userInfo.email
    const filter = likePeople.filter((item) => item !== userInfo.email);
    if (!liked) {
      await updateDoc(docRef, {
        likes: likeCount + 1,
        peopleLike: [...likePeople, userInfo.email],
      });
    } else {
      await updateDoc(docRef, {
        likes: likeCount <= 0 ? 0 : likeCount - 1,
        peopleLike: likePeople.length <= 0 ? [] : [...filter],
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("title", "==", title));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setPostId(doc?.id);
          setLikeCount(doc?.data()?.likes);
          setLikePeople([...(doc?.data()?.peopleLike || [])]);
          setLiked(doc?.data()?.peopleLike.includes(userInfo?.email));
        });
      });
    };
    fetchData();
  }, [title, userInfo.email]);
  return (
    <span
      onClick={handleLikePost}
      className=" cursor-pointer mt-3 inline-block text-red-500 hover:text-red-700 transition-all duration-300"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </span>
  );
};

export default ToggleLike;
