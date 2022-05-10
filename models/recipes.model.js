const fs = require("fs");

exports.retrieveRecipes = (excludes, callback) => {
  fs.readFile("data/data.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const recipesArray = JSON.parse(data);
      if (excludes.exclude_ingredients) {
        const excluded = excludes.exclude_ingredients;
        const excludedArr = excluded.split(",");

        const filteredArray = recipesArray.filter((recipe) =>
          recipe.ingredients.every((item) => item.name !== excludedArr[0])
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
      console.log(error);
    } else {
      const recipeArray = JSON.parse(data);
      const filteredArr = recipeArray.filter((recipe) => recipe.id === id);

      callback(null, filteredArr);
    }
  });
};

exports.addRecipe = (newData, callback) => {
  fs.readFile("data/data.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
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
