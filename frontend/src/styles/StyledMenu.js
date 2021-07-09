import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MenuContainer = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  z-index: 1;
  right: 40px;
  top: 90px;
  width: 15rem;
  /* height: 100%; */
  border-radius: 15px;
  background-color: #fefefe;
`;

export const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  width: 100%;
  padding: 15px 0;
  text-align: left;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-radius: 15px 15px 0 0;
  }

  &:last-child {
    border-radius: 0 0 15px 15px;
  }
`;

export const MenuLink = styled(NavLink)`
  display: inline-block;
  width: 100%;
  color: black;
  font-weight: 400;
  text-decoration: none;
  margin-left: 10px;
`;
