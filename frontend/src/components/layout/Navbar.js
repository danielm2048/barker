import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { HeartIcon } from "../../styles/StyledIcons";
import {
  NavLeft,
  NavRight,
  NavItem,
  StyledNavLink,
  NavContainer,
  BurgerMenu,
} from "../../styles/StyledNavbar";
import logo from "../../images/BarkerLogo.png";
import AuthModal from "../auth/AuthModal";
import Logout from "../auth/Logout";

const NavBar = () => {
  const auth = useAuth();
  const [scroll, setScroll] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const history = useHistory();

  const authLinks = (
    <>
      <NavItem>
        <StyledNavLink to="/swoofer">Swoofer</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/wishlist" $icon>
          <HeartIcon size="24" title="My Wishlist" />
        </StyledNavLink>
      </NavItem>
      <Logout />
    </>
  );

  const adminLinks = (
    <>
      <NavItem>
        <StyledNavLink to="/admin-section">Admin Section</StyledNavLink>
      </NavItem>
    </>
  );

  const guestLinks = <AuthModal />;

  const handleScroll = () => {
    if (window.scrollY < 75) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  };

  useEffect(() => {
    if (history.location.pathname === "/") {
      if (window.scrollY === 0) {
        setScroll(false);
      }
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setScroll(true);
    }
  }, [scroll, history.location.pathname]);

  return (
    <NavContainer scroll={scroll} burgerMenuOpen={burgerMenuOpen}>
      <div style={{ display: "flex", height: "100%" }}>
        <NavLeft>
          <NavItem>
            <NavLink to="/" style={{ padding: "18px 25px" }}>
              <img
                src={logo}
                alt="logo"
                style={{ height: 90, width: 220 }}
              ></img>
            </NavLink>
          </NavItem>
        </NavLeft>
        <NavRight burgerMenuOpen={burgerMenuOpen}>
          {auth.data ? (auth.data.admin ? adminLinks : null) : null}
          <NavItem>
            <StyledNavLink to="/about">About</StyledNavLink>
          </NavItem>
          {auth.data ? authLinks : guestLinks}
          <BurgerMenu
            size="24"
            title="Menu"
            onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
          />
        </NavRight>
      </div>
    </NavContainer>
  );
};

export default NavBar;
