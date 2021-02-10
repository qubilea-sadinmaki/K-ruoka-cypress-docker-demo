# K-ruoka-cypress-docker-demo
Demo of using Cypress and Docker.

## Configure your local installation

Create a new file called `cypress.env.json` into your workspace project root, next to `cypress.json`.
This file has been excluded from the repository, so it is specific for the environment.

Add three values to the configuration, `baseUrl`, `username` and `password`, which are used to connect
to the Custobar test enviroment.

The `cypress.env.json` should look like this (with your own values of course):

    {
        "baseUrl": "https://www.k-ruoka.fi",
        "username": "my-user",
        "password": "my-password"
    }
    
## Run tests with Cypress GUI via Docker

1. Clone this repository
2. Add the `cypress.env.json` as instructed above
3. Run `Docker build -t k-ruoka .` 
4. Run `npm start` to start the Cypress GUI

## Run tests with Cypress GUI

1. Clone this repository
2. Add the `cypress.env.json` as instructed above
3. Run `npm i` to install the dependencies, this'll take a while
4. Run `npm start` to start the Cypress GUI

## Run tests at command line

1. Clone this repository
2. Add the `cypress.env.json` as instructed above
3. Run `npm i` to install the dependencies, this'll take a while
4. Run `npm test` to run the unit tests

## Writing tests

The tests are stored in `cypress/integration` folder and end with `-spec.js`. Take
a look e.g. how [`login-spec.js`](/cypress/integration/login-spec.js) is written.

