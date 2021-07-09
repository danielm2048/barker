import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelect = ({ data, values, setValues, label }) => {
  return (
    <Autocomplete
      multiple
      id={`multi-select-${label}`}
      options={data}
      value={values}
      fullWidth={true}
      onChange={(_, newValues) => setValues(newValues)}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />

          <span className="Mui" style={{ textTransform: "capitalize" }}>
            {option}
          </span>
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Breeds"
          placeholder={label}
        />
      )}
    />
  );
};

export default MultiSelect;
