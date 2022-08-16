import React from "react";
import PostTable from "./PostTable";
import DashboardHeading from "../DashboardHeading";
const PostManage = () => {
  return (
    <div>
      <DashboardHeading title="All Post" desc="Manage All Post" />
      <PostTable></PostTable>
    </div>
  );
};

export default PostManage;
