const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const mainRouter = require("./routers/mainRouter");
const recipeRouter = require("./routers/recipeRouter");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/", mainRouter);
app.use("/", recipeRouter);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
};

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
