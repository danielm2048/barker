const router = require("express").Router();
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const fileUpload = require("express-fileupload");

const Dog = require("../models/dog.model");
const Breed = require("../models/breed.model");
const City = require("../models/city.model");
const User = require("../models/user.model");
const Saved = require("../models/saved.model");

const s3uploader = require("../utils/s3uploader");
const authorizeUser = require("../middleware/authMiddleware");

router.use(fileUpload());

router.get("/", authorizeUser, async (req, res) => {
  const { location, minAge, maxAge, breed, gender, distance } = req.query;
  const { userId } = req.user;

  const user = await User.findById(userId);

  let city;

  if (location) {
    city = await City.findOne({ name: location }).catch((err) =>
      res.status(500).send(err)
    );
  } else {
    city = await City.findById(user.locationId).catch((err) =>
      res.status(500).send(err)
    );
  }

  const lat = city.location.coordinates[0];
  const long = city.location.coordinates[1];
  const distnaceInKm = distance || 100;
  const radius = distnaceInKm / 6378.1;

  const nearCities = await City.find({
    location: { $geoWithin: { $centerSphere: [[lat, long], radius] } },
  }).catch((err) => res.status(500).send(err));

  let cityData = {};

  const saved = await Saved.find({ userId });

  const query = {};

  if (minAge || maxAge) {
    query.age = { $lte: maxAge, $gte: minAge };
    if (minAge && maxAge) {
      query.age = { $lte: maxAge, $gte: minAge };
    } else if (minAge && !maxAge) {
      query.age = { $gte: minAge };
    } else if (maxAge && !minAge) {
      query.age = { $lte: maxAge };
    }
  }

  if (breed) {
    let breeds = JSON.parse(breed);
    query.breed = {
      $in: breeds,
    };
  }

  if (gender !== undefined) {
    query.gender = gender;
  }

  const dogs = await Dog.find({
    _id: {
      $nin: saved.map((save) => mongoose.Types.ObjectId(save.dogId)),
    },
    ...query,
    locationId: {
      $in: nearCities.map((city) => {
        cityData[city._id] = city.name;
        return mongoose.Types.ObjectId(city._id);
      }),
    },
  }).catch((err) => res.status(500).send(err));

  const result = await Promise.all(
    dogs.map(async (dog) => {
      const contact = await User.findById(dog.contactId);

      return {
        id: dog._id,
        name: dog.name,
        age: dog.age,
        gender: dog.gender,
        breed: dog.breed,
        pics: dog.pictures,
        info: dog.info,
        city: cityData[dog.locationId],
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          pic: contact.pic,
          info: contact.info,
          isOrg: contact.isOrganization,
        },
      };
    })
  );

  res.json(result);
});

router.post("/add", authorizeUser, async (req, res) => {
  const { name, breed, age, gender, info, locationId } = req.body;
  const { pic } = req.files;
  const { userId } = req.user;

  if (!name || !breed || !age || !gender || !info || !pic) {
    return res.status(401).json("Please enter all required fields");
  }

  const picId = nanoid();

  const s3Params = {
    Bucket: "barker",
    Key: picId,
    Body: pic.data,
    ACL: "public-read",
    ContentType: pic.mimetype,
  };

  const url = `https://barker.s3.eu-central-1.amazonaws.com/${picId}`;

  const s3UploadedData = await s3uploader(s3Params);

  const newDog = new Dog({
    name,
    breed,
    age,
    pictures: url,
    info,
    locationId,
    contactId: userId,
  });
  try {
    await newDog.save();
    res.json(newDog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/breeds", async (req, res) => {
  const breeds = await Breed.find();

  const result = breeds.map((breed) => breed.name);

  res.json(result);
});

module.exports = router;
