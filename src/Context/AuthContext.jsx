import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase";

const AuthContext = createContext();
function AuthProvider(props) {
  const [toggle, setToggle] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);

  //get data user from firebase
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) =>
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      setUserList(result);
    });
  }, []);

  //authen user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({
              ...user,
              ...doc.data(),
            });
          });
        });
        setUserInfo(user);
      } else {
        return setUserInfo(null);
      }
    });
  }, []);

  //get data tu post from firebase

  // //lay danh sach post tu firebase
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) =>
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      setPostList(result);
    });
  }, []);

  const value = {
    userInfo,
    setUserInfo,
    toggle,
    setToggle,
    userList,
    setUserList,
    postList,
    setPostList,
  };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
