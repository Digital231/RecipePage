const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  addRatingAndComment,
} = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipes", createRecipe);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeById);
router.post("/recipes/:id/rating", addRatingAndComment);

module.exports = router;
