import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/AuthContext";
import PageNotFound from "../../Pages/PageNotFound";
import DashBoardHeader from "./DashBoardHeader";
import Sidebar from "./Sidebar";

const DashBoardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 35px;
      color: ${(props) => props.theme.gray23};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashBoardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  if (!userInfo) return <PageNotFound />;
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <DashBoardStyles>
      <DashBoardHeader></DashBoardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashBoardStyles>
  );
};

export default DashBoardLayout;
