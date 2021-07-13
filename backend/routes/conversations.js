const router = require("express").Router();
const authorizeUser = require("../middleware/authMiddleware");
const Conversation = require("../models/conversation.model");

router.post("/", async (req, res) => {
	const { senderId, receiverId } = req.body;

	const conversation = await Conversation.findOne({
		members: [senderId, receiverId],
	});

	if (conversation) {
		return res.status(400).json("Conversation already exists");
	}

	const newConversation = new Conversation({ members: [senderId, receiverId] });

	try {
		const savedConversation = await newConversation.save();
		res.json(savedConversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/", authorizeUser, async (req, res) => {
	const { userId } = req.user;

	try {
		const conversation = await Conversation.find({
			members: { $in: [userId] },
		});
		res.json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
