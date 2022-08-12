import React, { Fragment } from "react";
import Button from "../../../Components/button/Button";
import DashboardHeading from "../DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-8">
        <DashboardHeading title="Users" desc="Manage your user" />
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Create Users
        </Button>
      </div>
      <UserTable />
    </Fragment>
  );
};

export default UserManage;
