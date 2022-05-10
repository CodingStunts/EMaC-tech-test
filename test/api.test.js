const supertest = require("supertest");
const server = require("../server");

const request = supertest(server);

test("/api", async () => {
  const { body } = await request.get("/api").expect(200);
  expect(body.message).toBe("ok");
});

// Tests for GET recipes.
// Does it return an array?
// Does it return an array with correct length?
// Does it return all object keys expected?
// Does it take queries? Exlcuding one item? Excluding multiple items?

// Tests for GET recipe by ID.
// Does it return a single recipe? Array length 1.
// Does it return a recipe with the ID in the request?
// Does it return call relevant keys?

// Tests for POST recipe by ID.
// Does it return the newly posted recipe with ID.
// If I make an new DB get request for this ID does it bring back the recipe with all relevant keys?
