const {
  retrieveRecipes,
  retrieveRecipeByID,
  addRecipe,
} = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  const excludes = req.query;
  retrieveRecipes(excludes, (error, recipeData) => {
    if (error) {
      next(error);
    } else {
      res.status(200).send({ recipeData });
    }
  });
};

exports.getRecipesByID = (req, res, next) => {
  const { id } = req.params;
  retrieveRecipeByID(id, (error, recipeData) => {
    if (error) {
      next(error);
    } else {
      res.status(200).send({ recipeData });
    }
  });
};

exports.postRecipe = (req, res, next) => {
  addRecipe(req.body, (error, recipeData) => {
    if (error) {
      next(error);
    } else {
      res.status(201).send({ recipeData });
    }
  });
};
