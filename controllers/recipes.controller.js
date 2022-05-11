const {
  retrieveRecipes,
  retrieveRecipeByID,
  addRecipe,
} = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  const excludes = req.query;
  retrieveRecipes(excludes, (err, recipeData) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send({ recipeData });
    }
  });
};

exports.getRecipesByID = (req, res, next) => {
  const { id } = req.params;
  retrieveRecipeByID(id, (err, recipeData) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send({ recipeData });
    }
  });
};

exports.postRecipe = (req, res, next) => {
  addRecipe(req.body, (err, recipeData) => {
    if (err) {
      next(error);
    } else {
      res.status(201).send({ recipeData });
    }
  });
};
