const router = require("express").Router();
const Message = require("../models/message.model");

router.post("/", async (req, res) => {
	const newMessage = new Message(req.body);

	try {
		const savedMessage = await newMessage.save();
		res.json(savedMessage);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:conversationId", async (req, res) => {
	const { conversationId } = req.params;

	try {
		const messages = await Message.find({
			conversationId,
		});
		res.json(messages);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
