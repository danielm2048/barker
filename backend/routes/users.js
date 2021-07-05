require("dotenv").config();
const router = require("express").Router();
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { nanoid } = require("nanoid");

const authorizeUser = require("../middleware/authMiddleware");
const s3uploader = require("../utils/s3uploader");

const User = require("../models/user.model");
const City = require("../models/city.model");

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../utils/auth");

router.use(fileUpload());

router.post("/signup", async (req, res) => {
  const { email, name, password, isOrganization, locationId, phone } = req.body;

  if (
    !email ||
    !name ||
    !password ||
    isOrganization === undefined ||
    !locationId
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

  let url;

  if (req.files) {
    const { pic } = req.files;

    const picId = nanoid();

    const s3Params = {
      Bucket: "barker",
      Key: picId,
      Body: pic.data,
      ACL: "public-read",
      ContentType: pic.mimetype,
    };

    const s3UploadedData = await s3uploader(s3Params);

    url = `https://barker.s3.eu-central-1.amazonaws.com/${picId}`;
  }

  const newUser = new User({
    name: name,
    email,
    password: hashedPassword,
    isOrganization,
    locationId,
    phone,
    pic: url,
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

  const city = await City.findById(user.locationId);

  res.json({
    id: user._id,
    admin: user.admin,
    name: user.name,
    email: user.email,
    pic: user.pic,
    city: city.name,
    isOrganization: user.isOrganization,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json("User not found...");
  }

  const city = await City.findById(user.locationId);

  res.json({
    id: user._id,
    admin: user.admin,
    name: user.name,
    email: user.email,
    pic: user.pic,
    city: city.name,
    isOrganization: user.isOrganization,
  });
});

module.exports = router;
