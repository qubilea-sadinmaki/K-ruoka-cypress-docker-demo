/// <reference path="../../support/index.d.ts" />

describe('Add product to shopping cart, then empty it', () => {
    let product = {name:'maito', type:'maito'}

    before(() => {
        cy.loginByApi()
    })

    beforeEach(() => { cy.preserveAutoLogout() } )

    after(() => {
        cy.logoutAPI()      
    })

    it(`should add product from category "${product.type}"  with name containing "${product.name}"`, () => {
        cy.visitSearchResultAndAddProduct(product.type,product.name)
    })

    it('should empty shoppingcart and verify its empty', () => {
      cy.emptyShoppingcart()
    })
})
