require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/users");
const dogRoutes = require("./routes/dogs");
const cityRoutes = require("./routes/cities");
const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/messages");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/users", userRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		app.listen(PORT, () =>
			console.log(`🚀 app listening at http://localhost:${PORT}`)
		);
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});
