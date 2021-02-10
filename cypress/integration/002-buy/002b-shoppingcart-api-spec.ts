/// <reference path="../../support/index.d.ts" />

describe('Add product, go to shopping cart and verify it goes to creditcard payment site', () => {
    let draftID = '';
    let product = {name:'maito', type:'maito'}
    let paymentInfo = {store:'K‑Citymarket Easton', zip:'00400'}

    beforeEach(() => { cy.preserveAutoLogout()} )

    context('Setup', () => {
      it(`should add product from category "${product.type}"  with name containing "${product.name}"`, () => {
        cy.loginByApi()
        cy.visit(`https://www.k-ruoka.fi/kauppa/tuotehaku?haku=${product.type}`)

        cy.intercept("PUT", "https://www.k-ruoka.fi/kr-api/order-drafts")
        .as('addProduct')

        //get first available product containing string and add it to the shoppingcart
        cy.contains('.product-result-item',product.name)
        .find('[class="amount-plus plus-icon visible"]')
        .click()

        // cache shoppingcart id for later use
        cy.wait('@addProduct', {timeout:20000})
        .then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log("Save shoppingcarts dratfId :" +response.body.draft.draftId + " for later use.")
            draftID = response.body.draft.draftId
        })
    })  
    })

    context('Testcase', () => {
      it('should navigate to shoppingcart and fill in information', () => {
        cy.get('.shop-navigation-item > a').click()

        //verify our information is loaded on shoppingcart
        cy.get('#order-form-display-email')
        .find('.order-form-contact-info__row-value')
        .contains(Cypress.env('username'))
        //should select store
        cy.get('.shopping-list-controls-menu').click()
        cy.contains('Vaihda kauppa').click()
        cy.contains(paymentInfo.store).click()
        cy.get('#store-selector-modal').should('not.exist')
        //should check delivery
        cy.get('#select-order-home-delivery').click()
        //should input zip-code
        cy.get('#order-form-input-zipCode').type(paymentInfo.zip)
        //should choose first available time for delivery
        cy.get('.delivery-time-selector', {timeout:20000})
        .not('.disabled')
        .first()
        .contains('00') //trick for bypassing cy:s shortcoming of handling elements whose parent is not visible
        .click({force:true})
        //should confirm time
        cy.get('#delivery-time-confirm').click()       
      })

      it('should verify paying via webbank is available', () => {
        //should check payment via web-bank
        cy.get('.web > .radio-btn > label').click()
        //should add card
        cy.intercept("POST", "https://www.k-ruoka.fi/kr-api/cards/openTermi")
        .as('openTerminal')
 
        cy.get('.payment-card-selection__add-card > .btn').click()
        
        //should confirm "add card"
        cy.get('.add-payment-card__confirm-button').first() //.click()
      })
    }) 

    context('Teardown', () => {
      it('empty shoppingcart and logout by API', () => {
        cy.emptyShoppingcartAPI(draftID)
        cy.visit('/kauppa')
        cy.logoutAPI()     
        cy.visit('/kauppa')        
      })
    })
})
