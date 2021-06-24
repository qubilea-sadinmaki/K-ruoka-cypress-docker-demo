/// <reference path="../../support/index.d.ts" />

describe('Search and product, then proceed till deliver', () => {
    let storeA = 'K-Rauta Oulunkylä';
    let storeB = 'K-Rauta Malmi';
	before(() => {
		Cypress.on('uncaught:exception', (err, runnable) => {
			// returning false here prevents Cypress from
			// failing the test if uncaught exceptions from the application appear
			return false;
		});
    })

      it('should pass cookie-modal',{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => { 
        cy.visit('https://www.k-rauta.fi')
        cy.passCookieModal('kconsent', 1000)
      })

      it(`should change store to ${storeA}`,{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => {
        cy.visit('https://www.k-rauta.fi')       
        cy.get('.store-selector-button').click()
        cy.contains('li', storeA)
        .find('button')
        .click()
        cy.get('.modal__close-button').click()
        cy.get('.modal').should('not.exist')
      })

      it(`verify ${storeA} is on button-text and on product availability message`,{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => {
        cy.get('.store-selector-button-text').contains(storeA)
        cy.contains('.card-availability__message', storeA)
      })

      it(`verify ${storeA} is on product availability message after search`,{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => {
        cy.get('.search-field__input').clear().type('vasara')
        cy.get('.search-field__submit').click()
        cy.contains('.card-availability__message', storeA)
      })
      
      it(`should change store to ${storeB}`,{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => {
        cy.get('.main-header__content > .k-rauta-logo-container > .nav-link > .k-rauta-logo-container__logo')
        .click()      
        cy.get('.store-selector-button').click()
        cy.contains('li', storeB)
        .find('button')
        .click()
        cy.get('.modal__close-button').click()
        cy.get('.modal').should('not.exist')
      })

      it(`verify ${storeB} is on button-text and on product availability message`,{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => {
        cy.get('.store-selector-button-text').contains(storeB)
        cy.contains('.card-availability__message', storeB)
      })

      it(`verify ${storeB} is on product availability message after search`,{
        retries: {
          runMode: 2,
          openMode: 2
        },
        defaultCommandTimeout:10000
      }, () => {
        cy.get('.search-field__submit').click()
        cy.contains('.card-availability__message', storeB)
      })
})
