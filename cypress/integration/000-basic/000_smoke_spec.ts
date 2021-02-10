/// <reference path="../../support/index.d.ts" />

describe('Check the website is working', () => {

    it('goto homepage', () => {
        cy.visit('/')
        cy.contains('k-ruoka')
        // cy.passCookieModal('_hjFirstSeen', 4000)
    })
})
