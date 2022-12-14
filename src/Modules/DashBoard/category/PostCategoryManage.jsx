import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect } from "react";
import ActionDelete from "../../../Components/action/ActionDelete";
import ActionEdit from "../../../Components/action/ActionEdit";
import ActionView from "../../../Components/action/ActionView";
import Button from "../../../Components/button/Button";
import LabelStatus from "../../../Components/label/LabelStatus";
import TableComponent from "../../../Components/table/TableComponent";
import { db } from "../../../Firebase/Firebase";
import { categoryStatus, role } from "../../../Utils/constans";
import DashboardHeading from "../DashboardHeading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "../../../Context/AuthContext";
const PostCategoryManage = () => {

  const navigate = useNavigate();
  //chức năng tìm kiếm
  const [search, setSearch] = React.useState("");
  //lay du lieu tu firebase
  const [categoryList, setCategoryList] = React.useState([]);
  //set state page để loadmore
  const [visible, setVisible] = React.useState(2);

  const { userInfo } = useAuth();

  // fetch data của trường category từ firebase
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      onSnapshot(colRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        //push data vào mảng rỗng
        setCategoryList(result);
      });
    }
    getData();
  }, []);

  //delete categories item
  const handleDelete = async (id) => {
    // phần quyền phải là admin mới được quyền delete
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission delete category",
        "warning"
      );
      return;
    }
    const colRef = doc(db, "categories", id);
    //thu vien confirm deleted
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
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  //search category
  const handleSearchCategory = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  //hàm load more category
  const handleLoadMoreCategory = () => {
    setVisible((prevValue) => prevValue + 1);
  };
  return (
    <Fragment>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage Your Categories"
        ></DashboardHeading>
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </div>
      <div className="mb-10 flex justify-end">
        <input
          type="text"
          className="border border-gray-300 py-4 px-5 rounded-lg"
          placeholder="Search..."
          onChange={handleSearchCategory}
        />
      </div>
      <div className="shadow-md rounded-lg">
        <TableComponent>
          <thead>
            <tr className="capitalize">
              <th>id</th>
              <th>name</th>
              <th>slug</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.length > 0 &&
              categoryList
                //search category
                .filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, visible)
                //map ra data tu firebase
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <span className="text-gray-400 italic">{item.slug}</span>
                    </td>
                    <td>
                      {/*nếu status là 1 thì hiển thị là Approved không thì hiển thị Unaproved  */}
                      {item.status === categoryStatus.APPROVED ? (
                        <LabelStatus type="success">Approved</LabelStatus>
                      ) : (
                        <LabelStatus type="danger">Unaproved</LabelStatus>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-x-3">
                        <ActionEdit
                          onClick={() =>
                            navigate(`/manage/update-category?id=${item.id}`)
                          }
                        ></ActionEdit>
                        <ActionDelete
                          onClick={() => handleDelete(item.id)}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </TableComponent>
      </div>
      <div className="mt-10 text-center">
        <Button className="mx-auto w-[200px]" onClick={handleLoadMoreCategory}>
          Load more
        </Button>
      </div>
    </Fragment>
  );
};

export default PostCategoryManage;
