/// <reference path="../../support/index.d.ts" />

describe('Login and logout by UI', () => {
    beforeEach(() => { cy.preserveAutoLogout()} )

    it('should login', () => {
        cy.login()
    })
      
    it('should logout', () => {
        cy.logout()
    })
})
