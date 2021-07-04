import React from "react";
import { Upload } from "@styled-icons/feather";

function InputFile({ uploadedImage }) {
	const handleImageUpload = (e) => {
		const [file] = e.target.files;
		if (file) {
			console.log(file);
			console.log(uploadedImage);
		}
	};
	return (
		<div style={{ margin: "10px" }}>
			<label className="input-file" htmlFor="file-upload">
				<Upload size="24" />
				Upload Picture
			</label>
			<input
				id="file-upload"
				name="pic"
				type="file"
				accept="image/*"
				style={{ display: "none" }}
				onChange={handleImageUpload}
				ref={uploadedImage}
			/>
		</div>
	);
}

export default InputFile;
