const mongoose = require("mongoose");

const dogsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		breed: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		picture: {
			type: String,
			required: true,
		},
		info: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		contactId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Dogs", dogsSchema);
