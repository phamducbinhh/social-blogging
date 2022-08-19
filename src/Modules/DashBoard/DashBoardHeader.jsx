import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../../Components/button/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

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
  @media only screen and (max-width: 740px) {
    span {
      display: none;
    }
  }
`;
const DashBoardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashBoardHeaderStyles>
      <div className="sidebar-logo flex items-center">
        <NavLink to="/">
          <img srcSet="/monkey.png 5x" alt="" />
        </NavLink>
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
          <NavLink to={`/profile?id=${userInfo?.uid}`}>
            <img src={userInfo?.avatar} alt="" />
          </NavLink>
        </div>
      </div>
    </DashBoardHeaderStyles>
  );
};

export default DashBoardHeader;
