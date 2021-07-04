import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SpinnerIcon } from "../../styles/StyledIcons";
import useCities from "../../hooks/useCities";

const CitySelect = ({ setLocation }) => {
	const [searchText, setSearchText] = useState("");

	const { data: cities, isLoading, isError } = useCities(searchText);

	if (isError) {
		// alert("Can't get cities at the moment");
		console.log("Can't get cities at the moment");
	}

	return (
		<Autocomplete
			id="cities"
			options={isLoading ? [<SpinnerIcon size="24" />] : cities?.data}
			getOptionLabel={(option) => (isLoading ? "Loading..." : option?.name)}
			fullWidth={true}
			onChange={(_, value) => setLocation(value)}
			renderInput={(params) => (
				<TextField
					{...params}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					label="City"
					variant="outlined"
				/>
			)}
		/>
	);
};

export default CitySelect;
