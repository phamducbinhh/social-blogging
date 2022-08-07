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
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
