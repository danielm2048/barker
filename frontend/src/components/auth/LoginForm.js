import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import {
	ModalActions,
	ModalInput,
	ModalButton,
	ModalError,
} from "../../styles/StyledModal";
import { SpinnerIcon } from "../../styles/StyledIcons";
import { useTokenStore } from "../../store";

const LoginForm = () => {
	const setAccessToken = useTokenStore((state) => state.setAccessToken);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = useLogin(setAccessToken);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();

				setEmail("");
				setPassword("");

				login.mutate({ email, password });
			}}
		>
			<ModalActions>
				{login.error ? (
					<ModalError>
						<strong>{login.error}</strong>
					</ModalError>
				) : null}

				<label htmlFor="email">
					<strong>Email:</strong>
				</label>
				<ModalInput
					type="email"
					value={email}
					placeholder="Enter email..."
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>

				<label htmlFor="password">
					<strong>Password:</strong>
				</label>
				<ModalInput
					type="password"
					value={password}
					placeholder="Enter password..."
					name="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					required
				/>

				<ModalButton type="submit">
					{login.isLoading ? <SpinnerIcon size="24" /> : "Login"}
				</ModalButton>
			</ModalActions>
		</form>
	);
};

export default LoginForm;
