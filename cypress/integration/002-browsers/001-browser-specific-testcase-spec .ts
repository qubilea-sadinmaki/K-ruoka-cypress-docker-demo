/// <reference path="../../support/index.d.ts" />

describe('Browser specific testcase',{ browser:"chrome"}, () => {
  
	before(() => {
        cy.visit('/')
    })

      it('Test 1 in testacase just run on chrome', () => {
        cy.get('#main-logo')
      })
})
