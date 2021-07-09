import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SelectBreed = ({ value, setValue, data, label }) => {
  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => (option ? option : "")}
      fullWidth={true}
      value={value}
      onChange={(_, value) => setValue(value)}
      getOptionSelected={(option, value) => option === value || option === ""}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      renderOption={(option) => (
        <span className="Mui" style={{ textTransform: "capitalize" }}>
          {option}
        </span>
      )}
    />
  );
};

export default SelectBreed;
