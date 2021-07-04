import styled, { keyframes } from "styled-components";
import { StyledNavLink } from "./StyledNavbar";
import { Heart, User, ArrowLeft } from "@styled-icons/feather";
import { Spinner3 } from "@styled-icons/evil";

export const UserIcon = styled(User)`
	transition: fill 0.1s;
	&:hover,
	${StyledNavLink}:hover & {
		fill: black;
	}
`;

export const HeartIcon = styled(Heart)`
	transition: fill 0.1s;
	&:hover,
	${StyledNavLink}:hover & {
		fill: red;
	}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerIcon = styled(Spinner3)`
	vertical-align: middle;
	animation: ${rotate} 1s linear infinite;
`;

export const ArrowLeftIcon = styled(ArrowLeft);
