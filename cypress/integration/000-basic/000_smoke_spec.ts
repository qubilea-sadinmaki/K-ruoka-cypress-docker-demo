/// <reference path="../../support/index.d.ts" />

describe('Check the website is working', () => {
    before(() => {
        Cypress.Cookies.debug(true);
    })

    it('goto homepage', () => {
        cy.visit('/')
        cy.passCookieModal()
    })
})
