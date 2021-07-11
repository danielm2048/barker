import styled, { keyframes } from "styled-components";
import { StyledNavLink } from "./StyledNavbar";
import { MenuItem } from "./StyledMenu";
import {
  Heart,
  User,
  ArrowLeft,
  Menu,
  MessageCircle,
} from "@styled-icons/feather";
import { Spinner3 } from "@styled-icons/evil";

export const UserIcon = styled(User)`
  transition: fill 0.1s;
  &:hover,
  ${StyledNavLink}:hover &,
  ${MenuItem}:hover & {
    fill: black;
  }
`;

export const MenuIcon = styled(Menu)`
  transition: fill 0.1s;
  &:hover {
    fill: black;
  }
`;

export const HeartIcon = styled(Heart)`
  transition: fill 0.1s;
  &:hover,
  ${StyledNavLink}:hover &,
  ${MenuItem}:hover & {
    fill: red;
  }
`;

export const ChatIcon = styled(MessageCircle)`
  transition: fill 0.1s;
  &:hover,
  ${StyledNavLink}:hover &,
  ${MenuItem}:hover & {
    fill: #f8acac;
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
