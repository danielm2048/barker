import React, { useRef, useState } from "react";
import useSignup from "../../hooks/useSignup";
import {
	ModalActions,
	ModalInput,
	ModalButton,
	ModalError,
} from "../../styles/StyledModal";
import { SpinnerIcon } from "../../styles/StyledIcons";
import { useTokenStore } from "../../store";

const SignupForm = () => {
	const setAccessToken = useTokenStore((state) => state.setAccessToken);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [location, setLocation] = useState("");
	const [isOrganisation, setIsOrganisation] = useState(false);
	const [phone, setPhone] = useState("");

	const picRef = useRef(null);

	const signup = useSignup(setAccessToken);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();

				setEmail("");
				setPassword("");

				signup.mutate({ email, password });
			}}
		>
			<ModalActions>
				{signup.error ? (
					<ModalError>
						<strong>{signup.error}</strong>
					</ModalError>
				) : null}

				<label htmlFor="name">
					<strong>Name:</strong>
				</label>
				<ModalInput
					type="text"
					value={name}
					placeholder="Enter name..."
					name="name"
					onChange={(e) => {
						setName(e.target.value);
					}}
					required
				/>

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

				<label>
					<strong>Are you an organisation:</strong>
				</label>
				<div
					onChange={(e) => {
						setIsOrganisation(e.target.value);
					}}
				>
					<label htmlFor="yes">Yes</label>
					<ModalInput
						id="yes"
						type="radio"
						value={true}
						name="isOrganisation"
						required
					/>

					<label htmlFor="no">No</label>
					<ModalInput
						id="no"
						type="radio"
						value={false}
						name="isOrganisation"
						required
					/>
				</div>

				<label htmlFor="pic">
					<strong>Picture:</strong>
				</label>
				<ModalInput type="file" name="pic" ref={picRef} required />

				<label htmlFor="phone">
					<strong>Phone:</strong>
				</label>
				<ModalInput
					type="phone"
					value={phone}
					placeholder="Enter phone..."
					name="phone"
					onChange={(e) => {
						setPhone(e.target.value);
					}}
					required
				/>

				<ModalButton type="submit">
					{signup.isLoading ? <SpinnerIcon size="24" /> : "Signup"}
				</ModalButton>
			</ModalActions>
		</form>
	);
};

export default SignupForm;
