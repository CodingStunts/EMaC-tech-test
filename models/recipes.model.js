const fs = require("fs");
const { filter } = require("lodash");

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

        console.log(filteredArray.length);
        callback(null, filteredArray);
      } else {
        callback(null, recipesArray);
      }
    }
  });
};
