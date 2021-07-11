import { useCallback, useEffect, useRef } from "react";
import Logout from "../auth/Logout";

import {
	MenuContainer,
	Menu,
	MenuItem,
	MenuLink,
} from "../../styles/StyledMenu";
import {
	MenuIcon,
	UserIcon,
	HeartIcon,
	ChatIcon,
} from "../../styles/StyledIcons";
import { Plus } from "@styled-icons/feather";

const AuthMenu = ({ authMenuOpen, setAuthMenuOpen, userId }) => {
	const handleClickOutside = useCallback(
		(event) => {
			if (
				ref.current &&
				!ref.current.contains(event.target) &&
				event.target.id !== "menu" &&
				event.target.parentNode.id !== "menu" &&
				event.target.parentNode.parentNode.id !== "menu"
			) {
				setAuthMenuOpen(false);
			}
		},
		[setAuthMenuOpen]
	);

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	return (
		<>
			<MenuIcon size="24" title="Menu" />

			<MenuContainer open={authMenuOpen} ref={ref}>
				<Menu>
					<MenuItem>
						<MenuLink to={`/profile/${userId}`}>
							<UserIcon size="24" title="Profile" /> My Profile
						</MenuLink>
					</MenuItem>
					<MenuItem>
						<MenuLink to="/saved">
							<HeartIcon size="24" title="Saved" /> Saved Dogs
						</MenuLink>
					</MenuItem>
					<MenuItem>
						<MenuLink to="/messenger" style={{ marginLeft: 6 }}>
							<ChatIcon size="28" title="Messenger" /> Chat
						</MenuLink>
					</MenuItem>
					<MenuItem>
						<MenuLink to="/add-dog" style={{ marginLeft: 6 }}>
							<Plus size="28" title="Add" /> Add a Dog
						</MenuLink>
					</MenuItem>
					<MenuItem>
						<Logout />
					</MenuItem>
				</Menu>
			</MenuContainer>
		</>
	);
};

export default AuthMenu;
