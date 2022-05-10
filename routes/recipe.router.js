const recipeRouter = require("express").Router();
const {
  getRecipes,
  getRecipesByID,
} = require("../controllers/recipes.controller");

recipeRouter.route("/").get(getRecipes); //.post(postRecipe);

recipeRouter.route("/:id").get(getRecipesByID);

module.exports = recipeRouter;
