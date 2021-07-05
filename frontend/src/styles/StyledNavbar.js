import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Menu } from "@styled-icons/feather";

export const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 10vh;
  z-index: 2;
  background-color: ${(props) =>
    props.scroll || props.burgerMenuOpen ? "#ffffff" : "none"};
  box-shadow: ${(props) =>
    props.scroll || props.burgerMenuOpen
      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
      : "none"};
  transition: background-color 0.3s ease;
  @media screen and (max-width: 768px) {
    position: relative;
  }
`;

export const NavRight = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  margin-right: 30px;
  width: 50%;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.burgerMenuOpen ? "auto" : "none")};
  }
`;
export const NavLeft = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  margin-left: 30px;
  width: 50%;
`;

export const NavItem = styled.li`
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  background: none;
  cursor: pointer;
  color: black;
  font-family: "Gotu", sans-serif;
  font-weight: 700;
  text-align: center;
  border-radius: 50px;
  line-height: ${(props) => (props.$icon ? "1" : "1.5")};
  min-height: 24px;
  min-width: 24px;
  margin-top: ${(props) => (props.$icon ? "2px" : "0")};
  padding: ${(props) => (props.$icon ? "12px 12px" : "15px 15px")};
  font-size: 15px;
  text-decoration: none;
  z-index: 10;
  @media screen and (max-width: 768px) {
    padding: 25px 26px;
  }

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    background: inherit;
    border: inherit;
    border-radius: inherit;
    color: #222222;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: rotate(0.0001deg);
  }

  &:before {
    background: #222222;
    transform: scale(0.7) perspective(1px);
    box-shadow: 0 4px 20px rgba(34, 34, 34, 0.15);
    opacity: 0;
    transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),
      opacity 150ms ease-out;
  }

  &:after {
    transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),
      background 150ms ease-out, box-shadow 200ms ease-out;
  }

  &:hover:after {
    opacity: 1;
    transform: scaleX(1.015) scaleY(1.035) perspective(1px);
  }

  &:hover:before {
    opacity: 0.075;
    transform: scale(1) perspective(1px);
  }
`;

export const BurgerMenu = styled(Menu)`
  display: none;

  @media screen and (max-width: 768px) {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 40px;
  }
`;
