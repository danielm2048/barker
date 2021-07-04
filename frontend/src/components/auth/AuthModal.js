import React, { useState, useRef, useEffect } from "react";
import { useModalStore } from "../../store";
import {
	Modal,
	ModalContent,
	ModalImg,
	ModalImgContainer,
	Close,
	TextButton,
} from "../../styles/StyledModal";
import { UserIcon } from "../../styles/StyledIcons";
import { NavItem, StyledNavLink } from "../../styles/StyledNavbar";
import logo from "../../images/BarkerLogo.png";
import { X } from "@styled-icons/feather";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import { useCallback } from "react";

const AuthModal = () => {
	const { isOpen, close, open } = useModalStore();

	const [alreadyUser, setAlreadyUser] = useState(true);
	const [forgot, setForgot] = useState(false);

	const handleClickOutside = useCallback(
		(event) => {
			if (
				ref.current &&
				!ref.current.contains(event.target) &&
				!event.target.classList[0]?.includes("MuiAutocomplete")
			) {
				setForgot(false);
				close();
			}
		},
		[close]
	);

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handleClickOutside]);

	const handleClick = () => {
		setAlreadyUser((prevState) => !prevState);
	};

	return (
		<>
			<NavItem>
				<StyledNavLink
					onClick={(e) => {
						e.preventDefault();

						open();
					}}
					to="#"
					$icon
				>
					<UserIcon size="24" title="Login" />
				</StyledNavLink>
			</NavItem>

			<Modal modal={isOpen}>
				<ModalContent ref={ref}>
					<ModalImgContainer>
						<Close onClick={() => close()}>
							<X size="32" title="Close" />
						</Close>
						<ModalImg src={logo} alt="logo" />
					</ModalImgContainer>

					{!forgot && (
						<TextButton onClick={handleClick}>
							{alreadyUser
								? "Don't have an account? Click here to register"
								: "Have an account? Click here to login"}
						</TextButton>
					)}

					{forgot ? (
						<ForgotPassword close={close} />
					) : alreadyUser ? (
						<LoginForm />
					) : (
						<SignupForm />
					)}

					{!forgot && (
						<TextButton onClick={() => setForgot(true)}>
							Forgot password?
						</TextButton>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
