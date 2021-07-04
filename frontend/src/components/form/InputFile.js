import { useState } from "react";
import { Upload } from "@styled-icons/feather";

function InputFile({ uploadedImage }) {
	const [fileName, setFileName] = useState("");

	const handleImageUpload = (e) => {
		const [file] = e.target.files;
		if (file) {
			setFileName(uploadedImage.current.files[0].name);
		}
	};

	return (
		<div style={{ margin: "10px" }}>
			<>
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
				<br />
				{fileName && (
					<label style={{ color: "rgb(148, 146, 146)" }}>{fileName}*</label>
				)}
			</>
		</div>
	);
}

export default InputFile;
