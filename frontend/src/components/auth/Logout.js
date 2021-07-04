import useLogout from "../../hooks/useLogout";
import { LogOut } from "@styled-icons/feather";
import { NavItem, StyledNavLink } from "../../styles/StyledNavbar";

const Logout = () => {
	const logout = useLogout();

	return (
		<NavItem>
			<StyledNavLink onClick={() => logout.mutate()} to="/" $icon>
				<LogOut size="24" title="logout" />
			</StyledNavLink>
		</NavItem>
	);
};

export default Logout;
