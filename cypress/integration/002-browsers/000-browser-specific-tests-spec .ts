/// <reference path="../../support/index.d.ts" />

describe('Browser specific tests', () => {
  
	before(() => {
        cy.visit('/')
    })

      it('Specific test only for electron',{
        browser:"electron"
      }, () => {
        cy.log('This test runs only on electron browser')
      })

      it('Specific test only for chrome',{
        browser:"chrome"
      }, () => {
        cy.log('This test runs only on chrome browser')
      })

      it('Specific test only for firefox',{
        browser:"firefox"
      }, () => {
        cy.log('This test runs only on firefox browser')
      })

})
