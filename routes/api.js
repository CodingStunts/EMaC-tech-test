const apiRouter = require("express").Router();
const recipeRouter = require("./recipe.router");

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.use("/recipes", recipeRouter);

module.exports = apiRouter;
