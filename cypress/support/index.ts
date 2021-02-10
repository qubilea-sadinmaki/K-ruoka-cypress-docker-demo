// @ts-check

import './commands';
import './commandsAPI';

//ignore xhr from log
Cypress.Server.defaults({
    ignore: xhr =>  true
})

// Cypress.Screenshot.defaults({
//     screenshotOnRunFailure: false,
// });