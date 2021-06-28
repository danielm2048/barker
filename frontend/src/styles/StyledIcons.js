import styled from "styled-components";
import { StyledNavLink } from "./StyledNavbar";
import { Heart, User } from "@styled-icons/feather";

export const UserIcon = styled(User)`
	transition: fill 0.1s;
	${StyledNavLink}:hover & {
		fill: black;
	}
`;

export const HeartIcon = styled(Heart)`
	transition: fill 0.1s;
	${StyledNavLink}:hover & {
		fill: red;
	}
`;
