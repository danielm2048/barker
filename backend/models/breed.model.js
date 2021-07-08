const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Breeds", breedSchema);
