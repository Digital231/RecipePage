const Recipe = require("../schemas/recipeSchema");

module.exports = {
  createRecipe: async (req, res) => {
    const { name, imageUrl, ingredients } = req.body;

    try {
      const newRecipe = new Recipe({
        name,
        imageUrl,
        ingredients,
      });

      await newRecipe.save();
      res.json({ status: "success", recipe: newRecipe });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getRecipeById: async (req, res) => {
    const { id } = req.params;

    try {
      const recipe = await Recipe.findById(id);
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  addRatingAndComment: async (req, res) => {
    const { id } = req.params;
    const { username, rating, comment } = req.body;

    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const newComment = { username, rating, comment };
      recipe.comments.push(newComment);

      // Update average rating
      const totalRatings = recipe.comments.reduce(
        (sum, com) => sum + com.rating,
        0
      );
      recipe.averageRating = totalRatings / recipe.comments.length;

      await recipe.save();
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};
