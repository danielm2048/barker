const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema({
	type: {
		type: String,
		default: "Point",
	},
	coordinates: {
		type: [Number],
		index: "2dsphere",
	},
});

const citySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	hebrewName: {
		type: String,
		required: true,
	},
	location: geoSchema,
});

module.exports = mongoose.model("City", citySchema);
