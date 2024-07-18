const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
