/// <reference path="../../support/index.d.ts" />

describe('Login and logout by API', () => {

    it('should log in', () => { 
        cy.visit('/kauppa')      
        cy.loginByApi()
      })

    it('should visit "K-ruoka" and verify we are logged in', () => {  
      cy.reload()    
      cy.get('.shop-navigation-item > a').click()
      cy.get('#order-form-display-email')
      .find('.order-form-contact-info__row-value')
      .contains(Cypress.env('username'))
      })

    it('should logout', () => {
        cy.logoutAPI()
      })

      it('should visit "K-ruoka" and verify we are logged out', () => { 
        cy.reload()     
        cy.get('.main-navi-user-info-profile-link').click()
        cy.get('.login-controls > .btn--primary')
      })

})
