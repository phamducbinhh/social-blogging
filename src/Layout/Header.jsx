import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "../Components/button/Button";
import { useAuth } from "../Context/AuthContext";

const HeaderStyles = styled.header`
  padding: 15px 0;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.grayF3};
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
    font-size: 18px;
    text-transform: capitalize;
  }
  .menu-item {
    transition: 0.3s;
    :hover {
      color: ${(props) => props.theme.gray23};
    }
  }
  .header-button {
    background: #82d19c;
    transition: all 0.3s;
    :hover {
      background: #6dde92;
      transition: all 0.3s;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-auth {
      display: none;
    }
    .header-main {
      justify-content: space-between;
    }
  }
`;
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img
              srcSet="/monkey.png 2x"
              alt="monkey-blogging"
              className="logo"
            />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          {userInfo ? (
            <>
              <Button
                type="button"
                height="50px"
                className="header-button"
                to="/dashboard"
              >
                Dasboard
              </Button>
            </>
          ) : (
            <Button
              type="button"
              height="50px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
