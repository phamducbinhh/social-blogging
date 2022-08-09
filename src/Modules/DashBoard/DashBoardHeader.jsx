import React from "react";
import styled from "styled-components";
import Button from "../../Components/button/Button";

const DashBoardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;
const DashBoardHeader = () => {
  return (
    <DashBoardHeaderStyles>
      <div className="sidebar-logo flex items-center">
        <img srcSet="/monkey.png 5x" alt="" />
        <span className="text-xl font-bold ml-3">Monkey Blogging</span>
      </div>
      <div className="flex">
        <Button
          to="/manage/add-post"
          className="header-button mr-3"
          height="52px"
        >
          Write new post
        </Button>
        <div className="header-avatar">
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
            alt=""
          />
        </div>
      </div>
    </DashBoardHeaderStyles>
  );
};

export default DashBoardHeader;
