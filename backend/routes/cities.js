const router = require("express").Router();

const City = require("../models/city.model");

router.get("/", async (req, res) => {
	let cities = await City.find();

	res.json(cities);
});

module.exports = router;
