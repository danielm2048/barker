const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isOrganisation: {
			type: Boolean,
			required: true,
		},
		phone: {
			type: String,
		},
		pic: {
			type: String,
			default: "https://barker.s3.eu-central-1.amazonaws.com/profile.png",
		},
		info: {
			type: String,
		},
		locationId: {
			type: String,
			required: true,
		},
		admin: {
			type: Boolean,
			required: true,
		},
		tokenVersion: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Users", userSchema);
