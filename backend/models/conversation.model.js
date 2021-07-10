const mongoose = require("mongoose");

const conversationsSchema = new mongoose.Schema(
	{
		members: [
			{
				type: String,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Conversations", conversationsSchema);
