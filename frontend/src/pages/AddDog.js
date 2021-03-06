import { useEffect, useRef, useState } from "react";

import { ModalButton } from "../styles/StyledModal";
import { DogAddForm, DogAddBody } from "../styles/StyledForm";
import { SpinnerIcon } from "../styles/StyledIcons";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { Paw } from "@styled-icons/ionicons-solid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import AutoCompleteSelect from "../components/form/Select";
import SelectBreed from "../components/form/SelectBreed";
import InputFile from "../components/form/InputFile";
import DogAge from "../components/form/DogAge";
import Loader from "../components/Loader";

import useCities from "../hooks/useCities";
import useBreeds from "../hooks/useBreeds";
import useAddDog from "../hooks/useAddDog";

import { useToastStore } from "../store";

const AddDog = () => {
	const {
		data: citiesData,
		isLoading: citiesLoading,
		isError: citiesError,
	} = useCities();
	const {
		data: breedsData,
		isLoading: breedsLoading,
		isError: breedsError,
	} = useBreeds();

	const setToast = useToastStore((state) => state.setToast);

	const [name, setName] = useState("");
	const [breed, setBreed] = useState("");
	const [age, setAge] = useState("");
	const [fileName, setFileName] = useState("");
	const [gender, setGender] = useState("");
	const [location, setLocation] = useState("");
	const [info, setInfo] = useState("");

	let uploadedImage = useRef(null);
	const dog = useAddDog();

	useEffect(() => {
		if (dog.isSuccess) {
			setName("");
			setBreed("");
			setAge("");
			setLocation("");
			setInfo("");
			setGender("");
			setFileName("");
			uploadedImage.current.value = "";
			setToast("success", "You added a dog!");
		}
	}, [dog.isSuccess, setToast]);

	if (citiesError || breedsError) {
		console.error("Something went wrong.. Please try again");
	}

	if (citiesLoading || breedsLoading) {
		return <Loader />;
	}

	return (
		<DogAddBody>
			<DogAddForm>
				<h1>Let's Add a Dog!</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						const formData = new FormData();
						formData.append("pic", uploadedImage.current.files[0]);
						formData.append("name", name);
						formData.append("breed", breed);
						formData.append("age", age);
						formData.append("gender", gender);
						formData.append("info", info);
						formData.append("locationId", location._id);

						dog.mutate(formData);
					}}
				>
					<TextField
						required
						label="Enter Dog Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						fullWidth={true}
						style={{ paddingBottom: "10px", paddingTop: "10px" }}
						className="text-field"
					/>
					<SelectBreed
						value={breed}
						setValue={setBreed}
						data={breedsData}
						label="Breed"
					/>
					<DogAge value={age} setValue={setAge} label="Age" required={true} />
					<FormControl component="fieldset">
						<FormLabel
							component="legend"
							style={{ paddingTop: "10px" }}
							className="text-field"
						>
							Gender
						</FormLabel>
						<RadioGroup
							row
							aria-label="isOrg"
							name="isOrg"
							value={gender}
							onChange={(e) => setGender(e.target.value === "true")}
						>
							<FormControlLabel
								value={false}
								control={<Radio color="primary" />}
								label="Male"
							/>
							<FormControlLabel
								value={true}
								control={<Radio color="primary" />}
								label="Female"
							/>
						</RadioGroup>
					</FormControl>
					<TextField
						required
						label="Tell Us a Bit About The Dog"
						value={info}
						onChange={(e) => {
							setInfo(e.target.value);
						}}
						name="numberformat"
						fullWidth={true}
						className="text-field"
						multiline={true}
						style={{ paddingBottom: "10px", paddingTop: "10px" }}
					/>
					<AutoCompleteSelect
						className="text-field"
						value={location}
						setValue={setLocation}
						data={citiesData}
						label="City"
					/>
					<InputFile
						uploadedImage={uploadedImage}
						required={true}
						setFileName={setFileName}
						fileName={fileName}
					/>
					<ModalButton type="submit" disabled={dog.isLoading}>
						{dog.isLoading ? (
							<SpinnerIcon size="24" />
						) : (
							<span>
								Add Dog <Paw size="24" />
							</span>
						)}
					</ModalButton>
				</form>
			</DogAddForm>
		</DogAddBody>
	);
};

export default AddDog;
