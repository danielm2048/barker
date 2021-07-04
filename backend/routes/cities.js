const router = require("express").Router();

const City = require("../models/city.model");

router.get("/", async (req, res) => {
	const { searchText, lang } = req.query;

	const regex = new RegExp(searchText, "i");

	let cities;
	if (lang === "heb") {
		cities = await City.find({ hebrewName: { $regex: regex } });
	} else {
		cities = await City.find({ name: { $regex: regex } });
	}

	res.json(cities);
});

module.exports = router;
