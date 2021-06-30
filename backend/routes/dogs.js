const router = require("express").Router();
const mongoose = require("mongoose");

const Dog = require("../models/dog.model");
const City = require("../models/city.model");

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
	const { name, breed, age, pictures, info, location, userId } = req.body;

	// Location is the city's name
	const city = await City.findOne({ name: location }).catch((err) =>
		res.status(500).send(err)
	);

	const newDog = new Dog({
		name,
		breed,
		age,
		pictures,
		info,
		locationId: city._id,
		contactId: userId,
	});

	await newDog.save().catch((err) => res.status(500).send(err));

	res.json(newDog);
});

module.exports = router;
