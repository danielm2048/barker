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
const Dog = require("../models/dog.model");
const City = require("../models/city.model");
const Saved = require("../models/saved.model");

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../utils/auth");

router.use(fileUpload());

router.post("/signup", async (req, res) => {
  const { email, name, password, info, isOrganization, locationId, phone } =
    req.body;

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
    info,
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
    info: user.info,
    city: city.name,
    isOrganization: user.isOrganization,
  });
});

router.get("/saved", authorizeUser, async (req, res) => {
  const { userId } = req.user;

  const savedDogIds = await Saved.find({ userId });

  const savedDogs = await Promise.all(
    savedDogIds.map(async (save) => {
      const dog = await Dog.findById(save.dogId);
      const savedBy = await Saved.find({ dogId: dog._id });
      const contact = await User.findById(dog.contactId);
      const city = await City.findById(dog.locationId);

      return {
        id: dog._id,
        name: dog.name,
        age: dog.age,
        gender: dog.gender,
        breed: dog.breed,
        pics: dog.pictures,
        info: dog.info,
        city: city.name,
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          pic: contact.pic,
          info: contact.info,
          isOrg: contact.isOrganization,
        },
        savedBy: savedBy.length,
      };
    })
  );

  res.json(savedDogs);
});

router.post("/save-dog/", authorizeUser, async (req, res) => {
  const { userId } = req.user;
  const { dogId } = req.body;

  const newSave = new Saved({ userId, dogId });

  await newSave.save();

  res.json({ msg: "Dog has been saved successfully", dogId });
});

router.delete("/unsave-dog", authorizeUser, async (req, res) => {
  const { userId } = req.user;
  const { dogId } = req.body;

  const save = await Saved.findOneAndDelete({ userId, dogId });

  if (!save) {
    return res.status(404).json("Saved dog was not found");
  }

  res.json({ msg: "Dog has been unsaved successfully", dogId });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json("User not found...");
  }

  const city = await City.findById(user.locationId);

  const dogs = await Dog.find({ contactId: id });

  const dogData = dogs.map((dog) => {
    return {
      id: dog._id,
      name: dog.name,
      age: dog.age,
      gender: dog.gender,
      breed: dog.breed,
      pics: dog.pictures,
      info: dog.info,
      city: city.name,
      contact: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        pic: user.pic,
        info: user.info,
        isOrg: user.isOrganization,
      },
    };
  });

  res.json({
    id: user._id,
    admin: user.admin,
    name: user.name,
    email: user.email,
    pic: user.pic,
    city: city.name,
    info: user.info,
    isOrganization: user.isOrganization,
    dogs: dogData,
  });
});

module.exports = router;
