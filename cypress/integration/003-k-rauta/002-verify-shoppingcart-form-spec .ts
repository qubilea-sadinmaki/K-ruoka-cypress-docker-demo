/// <reference path="../../support/index.d.ts" />

describe('Search and product, then proceed till deliver', () => {
	before(() => {
		Cypress.on('uncaught:exception', (err, runnable) => {
			// returning false here prevents Cypress from
			// failing the test if uncaught exceptions from the application appear
			return false;
		});
    })

      it('should search and add product "vasara"',{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => { 
        cy.visit('https://www.k-rauta.fi')      
        cy.get('.search-field__input').clear().type('vasara')
        cy.get('.search-field__submit').click()
        cy.contains('article', 'vasara',{matchCase:false}).click()
        cy.get('.buy-button').click()
        cy.get('a.button').click()
        cy.get('#postalCode').type('00400')
        cy.contains('Kaukokiito Kotiinkuljetus').click()
        cy.get('.checkout-view__column-content > .button').click()
        cy.get('#billingAddress-givenName').type('Matti')
        cy.get('#billingAddress-familyName').type('Meikäläinen')
        cy.get('#billingAddress-email').type('matti.meikalainen@gmail.com')
        cy.get('#billingAddress-verifyEmail').type('matti.meikalainen@gmail.com')
        cy.get('#billingAddress-streetAddress').type('Meikäläisentie 1 A 1')
        // cy.get('#billingAddress-postalCode').type('00400')
        cy.get('#billingAddress-phone').type('+358402005662')
        cy.get('input').filter('[name="termsAndConditions"]').click({force:true})
        cy.get('button').filter('[form="payment-address-form"]').click()
        cy.go('back')
        cy.get('.main-header__content > .basket-button').click()
        cy.get('.basket-product__trash > .icon').click()
        cy.get('.empty-basket__title').contains('Ostoskorisi on tyhjä')
      })
})
