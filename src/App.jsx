import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import BlogPage from "./Pages/BlogPage";
const SignUpPage = lazy(() => import("./Pages/SignUpPage"));
const SignInPage = lazy(() => import("./Pages/SignInPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const PostDetailsPage = lazy(() => import("./Pages/PostDetailsPage"));
const DashBoardLayout = lazy(() =>
  import("./Modules/DashBoard/DashBoardLayout")
);
const DashBoardPages = lazy(() => import("./Pages/DashBoardPages"));
const PostManage = lazy(() =>
  import("./Modules/DashBoard/dasboard-page/PostManage")
);
const PostAddNew = lazy(() =>
  import("./Modules/DashBoard/dasboard-page/PostAddNew")
);
const PostCategoryManage = lazy(() =>
  import("./Modules/DashBoard/category/PostCategoryManage")
);
const UserManage = lazy(() => import("./Modules/DashBoard/user/UserManage"));
const PostCategoryAddNew = lazy(() =>
  import("./Modules/DashBoard/category/PostCategoryAddNew")
);
const UserProfile = lazy(() => import("./Modules/DashBoard/user/UserProfile"));
const UserAddNew = lazy(() => import("./Modules/DashBoard/user/UserAddNew"));
const PostCategoryUpdate = lazy(() =>
  import("./Modules/DashBoard/category/PostCategoryUpdate")
);
const PostUpdate = lazy(() =>
  import("./Modules/DashBoard/dasboard-page/PostUpdate")
);
const UpdateUser = lazy(() => import("./Modules/DashBoard/user/UpdateUser"));
const CategoryPages = lazy(() => import("./Pages/CategoryPages"));
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            <Route
              path="/contact"
              element={<PageNotFound></PageNotFound>}
            ></Route>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/category/:slug"
              element={<CategoryPages></CategoryPages>}
            ></Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/:slug" element={<PostDetailsPage />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
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
