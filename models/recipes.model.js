const fs = require("fs");
const { nextTick } = require("process");

exports.retrieveRecipes = (excludes, callback) => {
  fs.readFile("data/data.json", "utf-8", (error, data) => {
    if (error) {
      next(error);
    } else {
      const recipesArray = JSON.parse(data);
      if (excludes.exclude_ingredients) {
        const excluded = excludes.exclude_ingredients;
        const excludedArr = excluded.split(",");

        const filteredArray = recipesArray.filter((recipe) =>
          recipe.ingredients.every((item) => !excludedArr.includes(item.name))
        );
        callback(null, filteredArray);
      } else {
        callback(null, recipesArray);
      }
    }
  });
};

exports.retrieveRecipeByID = (id, callback) => {
  fs.readFile("data/data.json", "utf-8", (error, data) => {
    if (error) {
      next(error);
    } else {
      if (id.slice(0, 7) !== "recipe-") {
        throw new Error({
          status: 400,
          msg: "Your ID format seems to be wrong.",
        });
      } else {
        const recipeArray = JSON.parse(data);
        const filteredArr = recipeArray.filter((recipe) => recipe.id === id);

        callback(null, filteredArr);
      }
    }
  });
};

exports.addRecipe = (newData, callback) => {
  fs.readFile("data/data.json", "utf-8", (error, data) => {
    if (error) {
      next(error);
    } else {
      const recipeArray = JSON.parse(data);
      const newRecipe = { ...newData };
      newRecipe.id = `recipe-${recipeArray.length}`;

      const updatedJSON = [...recipeArray];
      updatedJSON.push(newRecipe);
      fs.writeFile(
        "data/data.json",
        JSON.stringify(updatedJSON),
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );

      callback(null, [newRecipe]);
    }
  });
};
