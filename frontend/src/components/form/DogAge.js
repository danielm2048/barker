import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

function DogAge({ value, setValue, label, required }) {
	return (
		<FormControl fullWidth={true}>
			<InputLabel id={`${label}`}>{label}</InputLabel>
			<Select
				required={required}
				labelId={`${label}`}
				id={`${label}`}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			>
				<MenuItem value={1}>1 Month</MenuItem>
				<MenuItem value={2}>2 Month</MenuItem>
				<MenuItem value={3}>3 Month</MenuItem>
				<MenuItem value={4}>4 Month</MenuItem>
				<MenuItem value={5}>5 Month</MenuItem>
				<MenuItem value={6}>6 Month</MenuItem>
				<MenuItem value={7}>7 Month</MenuItem>
				<MenuItem value={8}>8 Month</MenuItem>
				<MenuItem value={9}>9 Month</MenuItem>
				<MenuItem value={10}>10 Month</MenuItem>
				<MenuItem value={11}>11 Month</MenuItem>
				<MenuItem value={12}>1 Years Old</MenuItem>
				<MenuItem value={2 * 12}>2 Years Old</MenuItem>
				<MenuItem value={3 * 12}>3 Years Old</MenuItem>
				<MenuItem value={4 * 12}>4 Years Old</MenuItem>
				<MenuItem value={5 * 12}>5 Years Old</MenuItem>
				<MenuItem value={6 * 12}>6 Years Old</MenuItem>
				<MenuItem value={7 * 12}>7 Years Old</MenuItem>
				<MenuItem value={8 * 12}>8 Years Old</MenuItem>
				<MenuItem value={9 * 12}>9 Years Old</MenuItem>
				<MenuItem value={10 * 12}>10 Years Old</MenuItem>
				<MenuItem value={11 * 12}>11 Years Old</MenuItem>
				<MenuItem value={12 * 12}>12 Years Old</MenuItem>
				<MenuItem value={13 * 12}>13 Years Old</MenuItem>
				<MenuItem value={14 * 12}>14 Years Old</MenuItem>
				<MenuItem value={15 * 12}>15 Years Old</MenuItem>
				<MenuItem value={16 * 12}>16 Years Old</MenuItem>
				<MenuItem value={17 * 12}>17 Years Old</MenuItem>
				<MenuItem value={18 * 12}>18 Years Old</MenuItem>
				<MenuItem value={19 * 12}>19 Years Old</MenuItem>
				<MenuItem value={20 * 12}>20 Years Old</MenuItem>
			</Select>
		</FormControl>
	);
}

export default DogAge;
