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

The second endpoint has tests to confirm the correct key being returned and that it is the sole returned object in the array. This is also where I did my error testing as it is the only place where you would likely encounter an error with a bad request on the parametric endpoint or request a not-yet-existent ID number. So here I checked for the relevant error codes of 400 and 404. See below for what happened with these.

In the final endpoint I checked that the server returned the sent object as the only array item with a new ID key generated in the model, with an incremental value. It also then runs a new GET request in the final test for an ID produced after the original 100 recipes in the data.JSON.

## What I would do given more time

I did no additional tests for errors on endpoints 1 and 3 because they didn't refer to a particular resource via ID so it would be difficult to run tests for errors on the 404/400 statuses. I think it would be possible to test further on the query in endpoint 1, but with the time limit I didn't have enough time to come up with a proper solution for this. Also I'd like to have included an error for if a POST request was done without any data to send that it would throw an error, as currently it would just make an object with the key for the generated ID only. I struggled to get the endpoint 2 error middleware working and ran out of time to fix them before submission. However I managed to get the basic error structure down on all functions and write some custom error handling in the model for endpoint 2, so hopefully you can see what I was trying and failing to do before the time limit.

I also ran out of time to do anything with the duplicate ingredient keys but having had the time I was considering using a writeFile and maybe the reduce method on the subarray to take any identical keys and add their values together, but not 100% sure how I'd exactly execute this.

Also, sorry for the 50 extra identical recipes!
