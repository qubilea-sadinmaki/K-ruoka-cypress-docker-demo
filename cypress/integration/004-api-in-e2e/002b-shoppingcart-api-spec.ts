/// <reference path="../../support/index.d.ts" />

describe('Add product, go to shopping cart and verify it goes to creditcard payment site', () => {
    let draftID = '';
    let product = {name:'maito', type:'maito'}
    let paymentInfo = {store:'K‑Citymarket Easton', zip:'00400'}

    beforeEach(() => { cy.preserveAutoLogout()} )

    context('Setup', () => {
      it(`should add product from category "${product.type}"  with name containing "${product.name}"`, () => {
        cy.loginByApi()
        cy.log(`Goto search url of product "${product.type}"`)
        cy.visit(`https://www.k-ruoka.fi/kauppa/tuotehaku?haku=${product.type}`)

        cy.log('Specify "order-drafts" request were going to wait later')
        cy.intercept("PUT", "https://www.k-ruoka.fi/kr-api/order-drafts")
        .as('addProduct')

        cy.log('Get first available "milk"-product and add it to the shoppingcart. This triggers "order-drafts" request')
        cy.contains('.product-result-item',product.name)
        .find('[class="amount-plus plus-icon visible"]')
        .click()

        cy.log('Start waiting "order-drafts" request response')
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
        cy.log('Open shopping cart and verify it is fully loaded')
        cy.get('.shop-navigation-item > a').click()

        cy.get('#order-form-display-email')
        .find('.order-form-contact-info__row-value')
        .contains(Cypress.env('username'))

        cy.log('Change to the preferred store')
        cy.get('.shopping-list-controls-menu').click()
        cy.contains('Vaihda kauppa').click()
        cy.contains(paymentInfo.store).click()
        cy.get('#store-selector-modal').should('not.exist')

        cy.log('Choose home delivery and type in preferred zipcode')
        cy.get('#select-order-home-delivery').click()
        cy.get('#order-form-input-zipCode').type(paymentInfo.zip)

        cy.log('Choose first available time for delivery and confirm')
        cy.get('.delivery-time-selector', {timeout:20000})
        .not('.disabled')
        .first()
        .contains('00') //trick for bypassing cy:s shortcoming of handling elements whose parent is not visible
        .click({force:true})

        cy.get('#delivery-time-confirm').click()       
      })

      it('should verify paying via webbank is available', () => {
        cy.log('Check payment via web-bank. Then choose "add card"')
        cy.get('.web > .radio-btn > label').click()
        cy.get('.payment-card-selection__add-card > .btn').click()
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
