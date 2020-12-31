/// <reference path="../../support/index.d.ts" />

describe('Login and logout by UI', () => {
    before(() => {
        Cypress.Cookies.debug(true);
        cy.login()
    })

    beforeEach(() => { cy.preserveAutoLogout()} )

    it('verify homepage', () => {
        cy.get('.main-logo-image')
    })
      
    it('should logout', () => {
        cy.logout()
    })
})
