const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	dogId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Saved", savedSchema);
