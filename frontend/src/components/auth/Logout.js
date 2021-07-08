import { MenuLink } from "../../styles/StyledMenu";
import useLogout from "../../hooks/useLogout";
import { LogOut } from "@styled-icons/feather";

const Logout = () => {
	const logout = useLogout();

	return (
		<MenuLink onClick={() => logout.mutate()} to="/" $icon>
			<LogOut size="24" title="logout" /> Logout
		</MenuLink>
	);
};

export default Logout;
