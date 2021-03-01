/// <reference path="../../support/index.d.ts" />

describe('Login and logout by API', () => {
    beforeEach(() => { cy.preserveAutoLogout() } )

    it('should log in', () => { 
        cy.visit('/kauppa');     
        cy.loginByApi();
      })

    it('"double-checking" from GUI we are logged in', () => {  
      cy.visit('/kauppa')    
      cy.get('.main-navi-user-info-profile-link').click();
      cy.get('.profile-menu-title').contains(Cypress.env('nickname'))
      })

    it('should logout', () => {
        cy.logoutAPI()
      })

      it('"double-checking" from GUI we are logged out', () => { 
        cy.visit('/kauppa')     
        cy.get('.main-navi-user-info-profile-link').click()
        cy.get('.login-controls > .btn--primary')
      })

})
