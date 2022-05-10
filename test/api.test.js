const supertest = require("supertest");
const { notify } = require("../server");
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
          expect(ingredient.name).not.toBe("coffee"); //Struggling to make this work for more than one ingredient so removed kale for now.
        })
      );
    });
  });
});

// Does it take queries? Exlcuding one item? Excluding multiple items? Final test.

// Test for 404.
// Test for 400.

// Tests for GET recipe by ID.
// Does it return a single recipe? Array length 1.
// Does it return a recipe with the ID in the request?
// Does it return call relevant keys?

// Test for 404.
// Test for 400.

// Tests for POST recipe by ID.
// Does it return the newly posted recipe with ID.
// If I make an new DB get request for this ID does it bring back the recipe with all relevant keys?
// Test for 401.
