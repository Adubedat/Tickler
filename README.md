# Tickler

## Features of this example
This project is a simple tickets manager application. It provides a possibility to perform sign up users and manage user's tickets.

## Build the project
Your first need to install `docker` and `docker-compose`
Execute `./scripts/run.sh` from the root of the repository

## Brief architecture overview
This API showcase consists of a front application and two services:
* `webapp` - front-end application in React.js
* `users` service - responsible for CRUD operations on users and authentication
* `tickets-handler` service - responsible for CRUD operations on users tasks records

## Launch services for testing (using docker-compose)
* Execute `/scripts/run.sh` if didn't do it yet.
* Execute `./scripts/run.sh test <SERVICE_NAME>` from the root of the repository
* Or  `./scripts/run.sh coverage <SERVICE_NAME>` from the root of the repository if you want to see the coverage

## Accessing the services and swagger docs for the API
* `webapp` will be accessible on port 3000.
* `users` API will be accessible on port 3010.
* `tickets-handler` API will be accessible on port 3020.

## Documentation
- APIs are documented via URL "https://documenter.getpostman.com/view/5864729/TzCHApcb#intro"
