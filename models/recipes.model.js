const fs = require("fs");

exports.retrieveRecipes = (callback) => {
  fs.readFile("data/data.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const recipesArray = JSON.parse(data);
      callback(null, recipesArray);
    }
  });
};
