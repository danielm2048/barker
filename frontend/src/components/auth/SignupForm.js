import React, { useRef, useState } from "react";
import useSignup from "../../hooks/useSignup";
import {
	ModalActions,
	ModalButton,
	ModalError,
} from "../../styles/StyledModal";
import { SpinnerIcon } from "../../styles/StyledIcons";
import { useTokenStore } from "../../store";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import CitySelect from "../form/CitySelect";
import InputFile from "../form/InputFile";

const SignupForm = () => {
	const setAccessToken = useTokenStore((state) => state.setAccessToken);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [location, setLocation] = useState("");
	const [isOrganisation, setIsOrganisation] = useState(false);
	const [phone, setPhone] = useState("");

	const uploadedImage = useRef(null);

	const signup = useSignup(setAccessToken);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				signup.mutate({
					name,
					email,
					password,
					location,
					isOrganisation,
					phone,
				});

				setName("");
				setEmail("");
				setPassword("");
				setLocation("");
				setIsOrganisation("");
				setPhone("");
			}}
		>
			<ModalActions>
				{signup.error ? (
					<ModalError>
						<strong>{signup.error}</strong>
					</ModalError>
				) : null}
				<TextField
					required
					label="Enter name..."
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					fullWidth={true}
					className="text-field"
				/>
				<TextField
					required
					label="Email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					fullWidth={true}
					className="text-field"
				/>
				<TextField
					required
					label="Password"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					fullWidth={true}
					className="text-field"
				/>
				<TextField
					label="Phone Number"
					value={phone}
					onChange={(e) => {
						setPhone(e.target.value);
					}}
					name="numberformat"
					fullWidth={true}
					className="text-field"
				/>
				<FormControl component="fieldset">
					<FormLabel component="legend" className="text-field">
						Are you an organisation?
					</FormLabel>
					<RadioGroup
						row
						aria-label="isOrg"
						name="isOrg"
						value={isOrganisation}
						onChange={(e) => setIsOrganisation(e.target.value === "true")}
					>
						<FormControlLabel
							value={false}
							control={<Radio color="primary" />}
							label="No"
						/>
						<FormControlLabel
							value={true}
							control={<Radio color="primary" />}
							label="Yes"
						/>
					</RadioGroup>
				</FormControl>
				<CitySelect className="text-field" setLocation={setLocation} />
				<InputFile uploadedImage={uploadedImage} />
				<ModalButton type="submit">
					{signup.isLoading ? <SpinnerIcon size="24" /> : "Signup"}
				</ModalButton>
			</ModalActions>
		</form>
	);
};

export default SignupForm;
