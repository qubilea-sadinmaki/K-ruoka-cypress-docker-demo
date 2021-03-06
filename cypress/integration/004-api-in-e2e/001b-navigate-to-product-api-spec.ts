/// <reference path="../../support/index.d.ts" />

describe('Navigate to product and buy it', () => {
    let draftID = '';

  context('Setup', () => {
      it(`should login by API`, () => {
        cy.loginByApi()
    })  
  })

  context('Testcase', () => {
    it('should navigate to product via categories and add it to shoppingcart', () => {

        cy.visit('/kauppa')
        
        cy.log("Navigate through menus to maidot")
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
  
        cy.log('Start listening on "order-drafts" request')
        cy.intercept("PUT", "https://www.k-ruoka.fi/kr-api/order-drafts")
        .as('addProduct')

        cy.log('Get first available "milk"-product and add it to the shoppingcart')
        cy.contains('.product-result-item','maito')
        .find('[class="amount-plus plus-icon visible"]')
        .click()

        cy.wait('@addProduct', {timeout:20000})
        .then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log("Save shoppingcarts dratfId :" +response.body.draft.draftId + " for later use.")
            draftID = response.body.draft.draftId
        })
    })
  })

  context('Teardown', () => {
    it('empty shoppingcart and logout by API',() => {
      cy.emptyShoppingcartAPI(draftID)
      cy.visit('/kauppa')
      cy.logoutAPI()     
      cy.visit('/kauppa')      
    })
  })
})
