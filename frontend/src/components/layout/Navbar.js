import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
	NavLeft,
	NavRight,
	NavItem,
	StyledNavLink,
	StyledNavButton,
	NavContainer,
} from "../../styles/StyledNavbar";
import { HeartIcon, BoneIcon } from "../../styles/StyledIcons";
import logo from "../../images/BarkerLogo.png";
import AuthModal from "../auth/AuthModal";
import AuthMenu from "../auth/AuthMenu";

const NavBar = () => {
	const auth = useAuth();
	const [scroll, setScroll] = useState(false);

	const [authMenuOpen, setAuthMenuOpen] = useState(false);

	const location = useLocation();

	const authLinks = (
		<>
			<NavItem>
				<StyledNavLink to="/swoofer">
					Swoofer <BoneIcon size="24" title="swoofer" />{" "}
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink to="/saved">
					My Pack <HeartIcon size="24" title="Saved" />
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavButton
					id="menu"
					onClick={() => setAuthMenuOpen(!authMenuOpen)}
					$icon
				>
					<AuthMenu
						authMenuOpen={authMenuOpen}
						setAuthMenuOpen={setAuthMenuOpen}
						userId={auth.data?.id}
					/>
				</StyledNavButton>
			</NavItem>
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
		if (location.pathname === "/") {
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
	}, [scroll, location]);

	return (
		<NavContainer scroll={scroll}>
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
				<NavRight>
					{auth.data ? (auth.data.admin ? adminLinks : null) : null}
					<NavItem>
						<StyledNavLink to="/about">About</StyledNavLink>
					</NavItem>
					{auth.data ? authLinks : guestLinks}
				</NavRight>
			</div>
		</NavContainer>
	);
};

export default NavBar;
