/// <reference path="../../support/index.d.ts" />

describe('Navigate to product and buy it', () => {
    let draftID = '';

  context('Setup', () => {
      it(`should login by GUI`, () => {
        cy.login()
    })  
  })

  context('Testcase', () => {
    it('should navigate to product via categories and add it to shoppingcart', () => {

        cy.visit('/kauppa')
        
        cy.get('.product-search-category-button').click() 

        cy.get(`.ProductCategories__category`)
        .contains('Maito, juusto, munat ja rasvat')
        .click()
        
        cy.get(`.ProductCategories__category-name`)
        .contains('Maidot ja piimät')
        .click()
        
        cy.get(`.ProductCategories__category-name`)
        .contains('Maidot')
        .click()
  
        cy.intercept("PUT", "https://www.k-ruoka.fi/kr-api/order-drafts")
        .as('addProduct')

        //get first available milk and add it to the shoppingcart
        cy.contains('.product-result-item','maito')
        .find('[class="amount-plus plus-icon visible"]')
        .click()

        cy.wait('@addProduct', {timeout:20000})
        .then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
            draftID = response.body.draft.draftId
        })
    })
  })

  context('Teardown', () => {
    it('empty shoppingcart and logout',() => {
      cy.emptyShoppingcart()
      cy.visit('/kauppa')
      cy.logout()     
      cy.visit('/kauppa')        
    })
  })
})
