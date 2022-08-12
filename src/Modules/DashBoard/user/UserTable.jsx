import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import ActionDelete from "../../../Components/action/ActionDelete";
import ActionEdit from "../../../Components/action/ActionEdit";
import LabelStatus from "../../../Components/label/LabelStatus";
import TableComponent from "../../../Components/table/TableComponent";
import { db } from "../../../Firebase/Firebase";
import { role, userStatus } from "../../../Utils/constans";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import Button from "../../../Components/button/Button";

const UserTable = () => {
  const navigate = useNavigate();
  // //sate page
  const [visible, setVisible] = React.useState(2);

  //ham dieu kien hien thi status cua user
  const renderUserStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.HANDING:
        return <LabelStatus type="warning">Handing</LabelStatus>;
      case userStatus.BLOCKED:
        return <LabelStatus type="danger">Blocked</LabelStatus>;
      default:
        break;
    }
  };

  //ham xoa user khoi he thong
  const { userList, userInfo } = useAuth();
  const handleDeleteUser = (id) => {
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission Delete User",
        "warning"
      );
      return;
    }
    const colRef = doc(db, "users", id);
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

  //hàm load more user

  const handleLoadMoreUser = () => {
    setVisible((prevValue) => prevValue + 1);
  };
  return (
    <div>
      <TableComponent>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.slice(0, visible).map((user) => (
              <tr key={user?.id} title={user?.id}>
                <td>{user.id.slice(0, 2) + "..."}</td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={user?.avatar || "/monkey.png"}
                      alt=""
                      className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{user?.username}</h3>
                      <span className="text-sm text-gray-500 italic">
                        {new Date(
                          user?.createAt?.seconds * 1000
                        ).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="italic text-gray-600 cursor-pointer"
                  title={user?.username}
                >
                  {user?.email.slice(0, 5) + "..."}
                </td>
                <td>{renderUserStatus(user?.status)}</td>
                <td>
                  {user?.role === role.USER ? (
                    <LabelStatus type="warning">User</LabelStatus>
                  ) : user?.role === role.ADMIN ? (
                    <LabelStatus type="success">Admin</LabelStatus>
                  ) : (
                    <LabelStatus type="danger">Mode</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/user-update?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </TableComponent>
      <div className="mt-10 text-center">
        <Button className="mx-auto w-[200px]" onClick={handleLoadMoreUser}>
          Load more
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
