import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/Firebase";

const AuthorBox = ({ userId = "" }) => {
  const [authorList, setAuthorList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const colRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(colRef);
      docSnapshot.data() && setAuthorList(docSnapshot.data());
    };
    fetchData();
  }, []);
  if (!userId) return null;
  return (
    <div className="author">
      <div className="author-image">
        <img src={authorList?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{authorList?.username}</h3>
        <p className="author-desc">{authorList?.description}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
