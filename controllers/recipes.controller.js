const { retrieveRecipes } = require("../models/recipes.model");

exports.getRecipes = (req, res) => {
  retrieveRecipes((error, recipeData) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send({ recipeData });
    }
  });
};

//postRecipe

//getRecipesByID
