const recipeRouter = require("express").Router();
const { getRecipes } = require("../controllers/recipes.controller");

recipeRouter.route("/").get(getRecipes); //.post(postRecipe);

//recipeRouter.route("/:id").get(getRecipesByID);

module.exports = recipeRouter;
