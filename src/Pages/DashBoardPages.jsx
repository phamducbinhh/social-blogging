import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import Heading from "../Layout/Heading";
import PostFavorite from "../Modules/DashBoard/dasboard-page/PostFavorite";
import DashboardHeading from "../Modules/DashBoard/DashboardHeading";

const DashBoardPages = () => {
  const [postLike, setPostLike] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("likes", "==", 1));
    onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((item) => {
        result.push({
          id: item.id,
          ...item.data(),
        });
        setPostLike(result);
      });
    });
  }, []);

  if (!postLike) return null;
  return (
    <Fragment>
      <DashboardHeading title="Favorite Posts" />
      <div className="home-block">
        <div className="container">
          <Heading>Favorite Posts</Heading>
          <div className="grid-layout">
            {postLike.length > 0 &&
              postLike.map((item) => (
                <PostFavorite key={item.id} data={item} />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoardPages;
