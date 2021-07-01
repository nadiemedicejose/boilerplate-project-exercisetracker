# Exercise Tracker

[![Run on Repl.it](https://repl.it/badge/github/nadiemedicejose/boilerplate-project-exercisetracker)](https://repl.it/github/nadiemedicejose/boilerplate-project-exercisetracker)

Build a full stack JavaScript app that is functionally similar to this: https://exercise-tracker.freecodecamp.rocks/. Working on this project will involve you writing your code using one of the following methods:

* Clone [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/) and complete your project locally.
* Use [our Replit starter project](https://replit.com/github/freeCodeCamp/boilerplate-project-exercisetracker) to complete your project.
* Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.
When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the `Solution Link` field. Optionally, also submit a link to your projects source code in the `GitHub Link` field.

## User Stories
* [x] You should provide your own project, not the example URL.
* [x] You can `POST` to `/api/users` with form data `username` to create a new user. The returned response will be an object with `username` and `_id` properties.
* [ ] You can make a `GET` request to `/api/users` to get an array of all users. Each element in the array is an object containing a user's `username` and `_id`.
* [ ] You can `POST` to `/api/users/:_id/exercises` with form data `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.
* [ ] You can make a `GET` request to `/api/users/:_id/logs` to retrieve a full exercise log of any user. The returned response will be the user object with a `log` array of all the exercises added. Each log item has the `description`, `duration`, and `date` properties.
* [ ] A request to a user's log (`/api/users/:_id/logs`) returns an object with a `count` property representing the number of exercises returned.
* [ ] You can add `from`, `to` and `limit` parameters to a `/api/users/:_id/logs` request to retrieve part of the log of any user. `from` and `to` are dates in `yyyy-mm-dd` format. `limit` is an integer of how many logs to send back.

https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
