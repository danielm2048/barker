const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authorizeUser = require("../middleware/authMiddleware");

const User = require("../models/user.model");
const City = require("../models/city.model");

const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} = require("../utils/auth");

router.post("/signup", async (req, res) => {
	const { email, userName, password, isOrganisation, location, pic, phone } =
		req.body;
	if (
		!email ||
		!userName ||
		!password ||
		isOrganisation === undefined ||
		!location
	) {
		return res.status(401).json("Please enter all required fields");
	}

	const user = await User.findOne({ email }).catch((err) =>
		res.status(500).send(err)
	);
	if (user) {
		return res.status(401).json("User already exists");
	}

	const hashedPassword = await bcrypt
		.hash(password, 10)
		.catch((err) => res.status(500).send(err));

	const city = await City.findOne({ name: location }).catch((err) =>
		res.status(500).send(err)
	);

	const newUser = new User({
		name: userName,
		email,
		password: hashedPassword,
		isOrganisation,
		locationId: city._id,
		phone,
		pic,
		admin: false,
	});

	await newUser.save().catch((err) => res.status(500).send(err));

	const accessToken = createAccessToken(newUser);
	const refreshToken = createRefreshToken(newUser);
	sendRefreshToken(res, refreshToken);

	res.json({ user: newUser, accessToken });
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(401).json("Please enter all fields!");
	}
	const user = await User.findOne({ email }).catch((err) =>
		res.status(500).send(err)
	);
	if (!user) {
		return res.status(404).json("User was not found!");
	}
	const match = await bcrypt
		.compare(password, user.password)
		.catch((err) => res.status(500).send(err));
	if (!match) {
		return res.status(409).json("Password is incorrect");
	}

	const accessToken = createAccessToken(user);
	const refreshToken = createRefreshToken(user);
	sendRefreshToken(res, refreshToken);

	res.json({ user, accessToken });
});

router.post("/logout", (req, res) => {
	sendRefreshToken(res, "");
	res.json({ loggedOut: true });
});

router.post("/token", cookieParser(), (req, res) => {
	const refreshToken = req.cookies["refresh-token"];

	if (!refreshToken) {
		return res.status(403).json("Refresh token is required");
	}

	const { userId, name, email } = jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET
	);

	const accessToken = createAccessToken({ id: userId, name, email });

	sendRefreshToken(res, refreshToken);
	res.json(accessToken);
});

router.get("/me", authorizeUser, async (req, res) => {
	const { userId } = req.user;

	const user = await User.findById(userId);

	res.json(user);
});

module.exports = router;
