import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Select = ({ value, setValue, data, label }) => {
	return (
		<Autocomplete
			options={data}
			getOptionLabel={(option) => (option.name ? option.name : "")}
			fullWidth={true}
			value={value}
			onChange={(_, value) => setValue(value)}
			getOptionSelected={(option, value) =>
				option._id === value._id || option === ""
			}
			renderInput={(params) => (
				<TextField {...params} label={label} variant="outlined" />
			)}
			renderOption={(option) => (
				<span className="Mui" style={{ textTransform: "capitalize" }}>
					{option.name}
				</span>
			)}
		/>
	);
};

export default Select;
