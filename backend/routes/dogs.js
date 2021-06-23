const router = require("express").Router();
const mongoose = require("mongoose");

const Dog = require("../models/dog.model");
const City = require("../models/city.model");

router.get("/", async (req, res) => {
	const { location, ageMin, ageMax, breed } = req.query;

	
	const city = await City.findOne({ name: location });
	
	const lat = city.location.coordinates[0];
	const long = city.location.coordinates[1];
	const distanceInKm = 20;
	const radius = distanceInKm / 6378.1;
	
	const nearCities = await City.find({
		location: { $geoWithin: { $centerSphere: [[lat, long], radius] } },
	});

	const dogs = await Dog.find({
		// breed,
		// age: { $lte: ageMax, $gte: ageMin },
		locationId: {
			$in: nearCities.map((city) => mongoose.Types.ObjectId(city._id)),
		},
	});

	console.log(dogs);

	const result = await Promise.all(dogs.map(async dog => {
		const cityOfDog = await City.findById(dog.locationId);
		return {
			name: dog.name,
			city: cityOfDog.name
		}
	}))

	res.json(result);
});

router.post("/add", async (req, res) => {
	const { name, breed, age, pictures, info, location, userId } = req.body;

	// Location is the city's name
	const city = await City.findOne({ name: location });

	const newDog = new Dog({
		name,
		breed,
		age,
		pictures,
		info,
		locationId: city._id,
		contactId: userId,
	});

	await newDog.save();

	res.json(newDog);
});

module.exports = router;
