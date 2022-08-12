import React from "react";
import PostTable from "./PostTable";
import Dropdown from "../../../Components/dropdown/Dropdown";
import DashboardHeading from "../DashboardHeading";
const PostManage = () => {
  return (
    <div>
      <DashboardHeading title="All Post" desc="Manage All Post" />
      <div className="flex justify-start gap-5 mb-3">
        <div className="w-full max-w-[200px]">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
      </div>
      <PostTable></PostTable>
    </div>
  );
};

export default PostManage;
