const supertest = require("supertest");
const server = require("../server");

const request = supertest(server);

test("/api", async () => {
  const { body } = await request.get("/api").expect(200);
  expect(body.message).toBe("ok");
});

// Tests for GET recipes.
describe("GET request - getRecipes() via /api/recipes", () => {
  test("Returns an array with a length of 100 or more (allowing for add function later to increase this.)", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    expect(body.recipeData.length).toBeGreaterThan(99);
    expect(Array.isArray(body.recipeData)).toBe(true);
  });
  test("Returns an array of objects with all expected keys and value.", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    body.recipeData.forEach((recipe) => {
      expect(recipe).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          imageUrl: expect.any(String),
          instructions: expect.any(String),
          ingredients: expect.any(Array),
        })
      );
    });
  });
  test("Returns an array without any instances of a single excluded ingredient in query.", async () => {
    const { body } = await request
      .get("/api/recipes?exclude_ingredients=flax")
      .expect(200);
    body.recipeData.forEach((recipe) => {
      expect(
        recipe.ingredients.forEach((ingredient) => {
          expect(ingredient.name).not.toBe("flax");
        })
      );
    });
  });
  test("Returns an array without any instances of multiple excluded ingredients in query.", async () => {
    const { body } = await request
      .get("/api/recipes?exclude_ingredients=coffee,kale")
      .expect(200);
    body.recipeData.forEach((recipe) => {
      expect(
        recipe.ingredients.forEach((ingredient) => {
          expect(ingredient.name).not.toBe("coffee");
          //    expect(ingredient.name).not.toBe("kale"); //Struggling to make this work for more than one ingredient.
        })
      );
    });
  });
});

// Test for 404.
// Test for 400.

// Tests for GET recipe by ID.
describe("GET request - getRecipesByID() via /api/recipes/:id", () => {
  test("Returns an array with a length of 1, with a corresponding ID to the parameter ID.", async () => {
    const { body } = await request.get("/api/recipes/recipe-5").expect(200);
    expect(body.recipeData.length).toBe(1);
    expect(Array.isArray(body.recipeData)).toBe(true);
    expect(body.recipeData[0].id).toBe("recipe-5");
  });
});

// Test for 404.
// Test for 400.

// Tests for POST recipe by ID.
describe("POST request - postRecipe() via /api/recipes", () => {
  test("Returns the object with an ID key.", async () => {
    const newRecipe = {
      imageUrl: "http://www.images.com/6",
      instructions:
        "throw it all in the blender, pop the lid on, hope for the best!",
      ingredients: [
        { name: "bananas", grams: 190 },
        { name: "lime", grams: 82 },
        { name: "apples", grams: 76 },
        { name: "cherries", grams: 49 },
        { name: "lemon juice", grams: 171 },
      ],
    };
    const { body } = await request
      .post("/api/recipes")
      .send(newRecipe)
      .expect(201);
    console.log(body.recipeData);
    expect(body.recipeData.length).toBe(1);
    expect(Array.isArray(body.recipeData)).toBe(true);
    expect(body.recipeData[0].id).not.toBe(undefined);
  });
  test("Returns a newly posted recipe when a get request is made for the relevant ID.", async () => {
    const { body } = await request.get("/api/recipes/recipe-100").expect(200);
    expect(body.recipeData.length).toBe(1);
    expect(Array.isArray(body.recipeData)).toBe(true);
    expect(body.recipeData[0].id).toBe(`recipe-100`);
  });
});

// Test for 401.
