/// <reference path="../../support/index.d.ts" />

describe('Browser specific tests', () => {
  let browsers = ["electron","chrome","firefox"]
  
	before(() => {
        cy.visit('/')
    })

    for (let index = 0; index < browsers.length; index++) {
      let browser = browsers[index];
      it(`Specific test only for ${browser}`,{
        browser:browser
      }, () => {
        cy.log(`This test runs only on ${browser}`)
      })      
    }
})
