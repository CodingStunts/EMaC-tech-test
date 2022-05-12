const fs = require("fs");

exports.retrieveRecipes = (excludes, callback) => {
  fs.readFile("data/data.json", "utf-8", (err, data) => {
    if (err) {
      callback(err);
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
  fs.readFile("data/data.json", "utf-8", (err, data) => {
    if (err) {
      callback(err);
    } else {
      if (id.slice(0, 7) !== "recipe-") {
        callback({
          status: 400,
          msg: "Your ID format seems to be wrong.",
        });
      } else {
        const recipeArray = JSON.parse(data);
        const filteredArr = recipeArray.filter((recipe) => recipe.id === id);

        if (filteredArr.length === 1) {
          callback(null, filteredArr);
        } else {
          callback({
            status: 404,
            msg: "No resources found for that ID number.",
          });
        }
      }
    }
  });
};

exports.addRecipe = (newData, callback) => {
  fs.readFile("data/data.json", "utf-8", (err, data) => {
    if (err) {
      callback(err);
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
            callback(err);
          }
        }
      );

      callback(null, [newRecipe]);
    }
  });
};
