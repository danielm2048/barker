const router = require("express").Router();
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const fileUpload = require("express-fileupload");
const Dog = require("../models/dog.model");
const City = require("../models/city.model");
const s3uploader = require("../utils/s3uploader");

router.use(fileUpload());

router.get("/", async (req, res) => {
  const { location, ageMin, ageMax, breed } = req.query;

  const city = await City.findOne({ name: location }).catch((err) =>
    res.status(500).send(err)
  );

  const lat = city.location.coordinates[0];
  const long = city.location.coordinates[1];
  const distanceInKm = 20;
  const radius = distanceInKm / 6378.1;

  const nearCities = await City.find({
    location: { $geoWithin: { $centerSphere: [[lat, long], radius] } },
  }).catch((err) => res.status(500).send(err));

  let cityData = {};

  const dogs = await Dog.find({
    // breed,
    // age: { $lte: ageMax, $gte: ageMin },
    locationId: {
      $in: nearCities.map((city) => {
        cityData[city._id] = city.name;
        return mongoose.Types.ObjectId(city._id);
      }),
    },
  }).catch((err) => res.status(500).send(err));

  const result = dogs.map((dog) => {
    return {
      name: dog.name,
      age: dog.age,
      breed: dog.breed,
      pics: dog.pictures,
      info: dog.info,
      city: cityData[dog.locationId],
    };
  });

  res.json(result);
});

router.post("/add", async (req, res) => {
  const { name, breed, age, info, locationId, userId } = req.body;
  const { pic } = req.files;

  if (!name || !breed || !age || !userId || !info || !pic) {
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

module.exports = router;
