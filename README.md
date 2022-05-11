# README - EMaC Tech Test - Lizzo's Juice Bar - Jay Hayes

## How it works

This server will allow GET requests on `api/recipes` and `api/recipes/recipe-?` with the `?` being a number from 0 to 99, plus any additionally posted recipes that have been added on POST `api/recipes` since it was completed, eg recipe-105. If you would like to make requests on this server I did so using Insomnia, using `localhost:9090/api`.

## My development choices

Before I cloned this repo and got to work on it I sat down and walked myself through each of the user stories. I then decided what tests would be best suited, what functions I wanted to create, how I wanted to divide my files/folders, and which asynchronous method I wanted to use.

I used Insomnia to check calls to the database during development as well as running the test suite, using TDD to make sure the tests failed before they succeeded, then checking them again to make sure they would continue to pass after repeat runs.

I opted to stick with async/await, like the original test example. I tried to avoid async/await during the bootcamp as I preferred promises and I did my backend project using promises, so wanted to push myself out of my comfort zone a little on this and try and finish it with async.

I chose to divide the server up using MCV into an router/model/controller/error set up to make it as clear and orderly as possible.

## Testing

In all the tests I wanted to make sure they confirmed the structure of the returned data; being an object with an array of further object/s, which then had all relevant keys included. I also made sure to confirm they all returned a 200/201 status when done correctly.

In the first endpoint I further checked that the array length was long enough to include at least all 100 original recipes on the data.JSON. Then I confirmed that the excluded ingredient values didn't show on any of the objects returned for both a single excluded ingredient and multiple when queries were included in the call, ensuring they had been filtered out.

The second endpoint has tests to confirm the correct key being returned and that it is the sole returned object in the array. This is also where I did my error testing as it is the only place where you would likely encounter an error with a bad request on the parametric endpoint or request a not-yet-existent ID number. So here I checked for the relevant error codes of 400 and 404.

In the final endpoint I checked that the server returned the sent object as the only array item with a new ID key generated in the model, with an incremental value. It also then runs a new GET request in the final test for an ID produced after the original 100 recipes in the data.JSON.
