import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
const SignUpPage = React.lazy(() => import("./Pages/SignUpPage"));
const SignInPage = React.lazy(() => import("./Pages/SignInPage"));
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound"));
const PostDetailsPage = React.lazy(() => import("./Pages/PostDetailsPage"));
const DashBoardLayout = React.lazy(() =>
  import("./Modules/DashBoard/DashBoardLayout")
);
const DashBoardPages = React.lazy(() => import("./Pages/DashBoardPages"));
const PostManage = React.lazy(() =>
  import("./Modules/DashBoard/dasboard-page/PostManage")
);
const PostAddNew = React.lazy(() =>
  import("./Modules/DashBoard/dasboard-page/PostAddNew")
);
const PostCategoryManage = React.lazy(() =>
  import("./Modules/DashBoard/category/PostCategoryManage")
);
const UserManage = React.lazy(() =>
  import("./Modules/DashBoard/user/UserManage")
);
const PostCategoryAddNew = React.lazy(() =>
  import("./Modules/DashBoard/category/PostCategoryAddNew")
);
const UserProfile = React.lazy(() =>
  import("./Modules/DashBoard/user/UserProfile")
);
const UserAddNew = React.lazy(() =>
  import("./Modules/DashBoard/user/UserAddNew")
);
const PostCategoryUpdate = React.lazy(() =>
  import("./Modules/DashBoard/category/PostCategoryUpdate")
);
const UpdateUser = React.lazy(() =>
  import("./Modules/DashBoard/user/UpdateUser")
);
const PostUpdate = React.lazy(() =>
  import("./Modules/DashBoard/dasboard-page/PostUpdate")
);
const HomePage = React.lazy(() => import("./Pages/HomePage"));

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Suspense>
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
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
