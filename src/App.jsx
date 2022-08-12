import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import PostDetailsPage from "./Pages/PostDetailsPage";
import DashBoardLayout from "./Modules/DashBoard/DashBoardLayout";
import DashBoardPages from "./Pages/DashBoardPages";
import PostManage from "./Modules/DashBoard/dasboard-page/PostManage";
import PostAddNew from "./Modules/DashBoard/dasboard-page/PostAddNew";
import PostCategoryManage from "./Modules/DashBoard/category/PostCategoryManage";
import UserManage from "./Modules/DashBoard/user/UserManage";
import PostCategoryAddNew from "./Modules/DashBoard/category/PostCategoryAddNew";
import UserProfile from "./Modules/DashBoard/user/UserProfile";
import UserAddNew from "./Modules/DashBoard/user/UserAddNew";
import PostCategoryUpdate from "./Modules/DashBoard/category/PostCategoryUpdate";
import PostUpdate from "./Modules/DashBoard/dasboard-page/PostUpdate";
import UpdateUser from "./Modules/DashBoard/user/UpdateUser";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/:slug" element={<PostDetailsPage />} />
          <Route element={<DashBoardLayout />}>
            <Route path="/dashboard" element={<DashBoardPages />} />
            <Route path="/manage/post" element={<PostManage />} />
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            />
            <Route path="/manage/update-post" element={<PostUpdate />} />
            <Route
              path="/manage/category"
              element={<PostCategoryManage></PostCategoryManage>}
            />
            <Route
              path="/manage/add-category"
              element={<PostCategoryAddNew />}
            />
            <Route
              path="/manage/update-category"
              element={<PostCategoryUpdate />}
            />
            <Route path="/manage/user" element={<UserManage></UserManage>} />
            <Route path="/manage/add-user" element={<UserAddNew />}></Route>
            <Route path="/manage/user-update" element={<UpdateUser />} />
            <Route path="/profile" element={<UserProfile />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
