import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect } from "react";
import ActionDelete from "../../../Components/action/ActionDelete";
import ActionEdit from "../../../Components/action/ActionEdit";
import ActionView from "../../../Components/action/ActionView";
import TableComponent from "../../../Components/table/TableComponent";
import { db } from "../../../Firebase/Firebase";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Button from "../../../Components/button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { role } from "../../../Utils/constans";

const PostTable = () => {
  const navigate = useNavigate();
  const { postList, userInfo } = useAuth();
  // const [postList, setPostList] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState("");
  //sate page
  const [visible, setVisible] = React.useState(2);

  //ham xoa post khoi he thong
  const handleDeletePost = (id) => {
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission Delete Post",
        "warning"
      );
      return;
    }
    const colRef = doc(db, "posts", id);
    //thu vien confirm deletedc
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //xoa truong user trong firebase
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  //ham search post
  const handleSearchPost = debounce((e) => {
    setSearchFilter(e.target.value);
  }, 500);

  //ham load more post
  const handleLoadMorePost = async () => {
    setVisible((prevValue) => prevValue + 1);
  };
  return (
    <Fragment>
      <div className="w-full flex justify-end">
        <div className="w-full max-w-[300px] mb-5 ">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <TableComponent>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList
              .filter((item) =>
                item.title.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .slice(0, visible)
              .map((post) => (
                <tr key={post?.id}>
                  <td></td>
                  <td>{post?.id.slice(0, 3)}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={post?.image}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{post?.title}</h3>
                        <span className="text-sm text-gray-500 italic">
                          {new Date(
                            post?.createAt?.seconds * 1000
                          ).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500 font-bold italic">
                      {post?.category?.name}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-500 font-bold italic ">
                      {post?.user?.username}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </TableComponent>
      <div className="mt-10 text-center">
        <Button className="mx-auto w-[200px]" onClick={handleLoadMorePost}>
          Load more
        </Button>
      </div>
    </Fragment>
  );
};

export default PostTable;
