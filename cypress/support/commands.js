/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.visit('/kauppa')
    cy.passCookieModal('_hjFirstSeen', 2500)
    cy.get('.main-navi-user-info-profile-link').click()
    cy.get('.login-controls > .btn--primary').click()
    cy.get('#input-email',{timeout:10000}).type(Cypress.env('username'))
    cy.get('#input-password').type(Cypress.env('password'), {log:false})
    cy.get('#ka-button-login').click()
    cy.get('#ka-button-login').should('not.exist')
});

Cypress.Commands.add('passCookieModal', (cookieID, timeout) => {
  // cy.log('Cypress has some problems with clearing cookies between test runs, via UI')
  // cy.log(`should wait for cookie "${cookieID}". If its not loaded we know that there is cookie-modal open and we accept it`)
  cy.wait(timeout)
  // cy.getCookies().then((cookies) => {for (let index = 0; index < cookies.length; index++) {cy.log(cookies[index].name);}})
  
  cy.getCookie(cookieID).then((cookie) => {
    if(cookie === null)
    {
      cy.get('.cookie-notice')
      .find('.primary').click()
    }
  })
});

Cypress.Commands.add('logout', () => {
    cy.get('.main-navi-user-info-profile-link').click()
    cy.get('.menu-item--logout > a').click()
    cy.get('.main-navi-user-info-profile-link').click()
    cy.get('.login-controls > .btn--primary')
});

Cypress.Commands.add('preserveAutoLogout', () => {
    Cypress.Cookies.preserveOnce('session_id') //KESKO_SSO_SESSION
});

Cypress.Commands.add('emptyShoppingcart', () => {
  cy.visit('/kauppa')
  cy.get('.shop-navigation-item > a').click()
  cy.get('.shopping-list-controls-menu').click()

  cy.get('a[class="shopping-list-control delete-shopping-list-button"]')
  .click()

  cy.get('.total-price')
  .contains('0,00')
});

Cypress.Commands.add('visitSearchResultAndAddProduct', (type,name) => {
  cy.visit(`https://www.k-ruoka.fi/kauppa/tuotehaku?haku=${type}`)

  cy.intercept("PUT", "https://www.k-ruoka.fi/kr-api/order-drafts")
  .as('addProduct')

  //get first available product containing string and add it to the shoppingcart
  cy.contains('.product-result-item',name)
  .find('[class="amount-plus plus-icon visible"]')
  .click()

  // cache shoppingcart id for later use
  cy.wait('@addProduct', {timeout:20000})
  .then(({ request, response }) => {
      expect(response.statusCode).to.eq(200)
  })
});

Cypress.Commands.add('naviagateToAndBuyProduct', (level0, level1, level2, level3) => {

  cy.get('.product-search-category-button').click() 

  cy.get(`.ProductCategories__category`)
  .contains(level0)
  .click()
  
  cy.get(`.ProductCategories__category-name`)
  .contains(level1)
  .click()
  
  cy.get(`.ProductCategories__category-name`)
  .contains(level2)
  .click()

  cy.contains('.product-result-item',level3, {timeout:30000})
  .find('[class="amount-plus plus-icon visible"]')
  .click()
});

Cypress.Commands.add('verifySubCategory', (level0, level1, level2, level3) => {

  cy.get('[href="/kauppa/tuotehaku"]').click()
  cy.get(`.ProductCategories__category`).contains(level0).click()
  cy.get(`.ProductCategories__category-name`).contains(level1).click()
  cy.get(`.ProductCategories__category-name`).contains(level2).click()
  cy.get(`.ProductCategories__category-name`).contains(level3).click()

  cy.get('h1').contains(level3)
});

Cypress.Commands.add('verifyProduct', (productname='') => {
  let product_info = {}
  cy.contains('.product-result-item', productname).within(() => {
    cy.get('.price-integer-part')
    cy.get('.price-decimal-separator')
    cy.get('.price-fractional-part')
    cy.get('.pricing-unit')
    cy.get('[class="amount-plus plus-icon visible"]')
    cy.get('[class="amount-minus minus-icon"]')
  })
});

Cypress.Commands.add('gotoShoppingCart', () => {
 cy.get('a[href="/kauppa"]').click()
 cy.get('#order-form-input-zipCode').type('00700')
 //should check pick-up
 cy.get('#select-order-pickup').click()
 //should check delivery
 cy.get('#select-order-home-delivery').click()
 //should check first available time for delivery
 cy.get('.delivery-time-selector')
 //should confirm
 cy.get('#delivery-time-confirm').click()
 //should check payment via web-bank
 cy.get('div[class="select-payment-method__selection-option web"]').click()
 //should add card
 cy.get('.payment-card-selection__add-card > button').click()
 //should confirm "add card"
 cy.get('[class="btn btn--primary btn--square add-payment-card__confirm-button add-payment-card__confirm-button--wide"]')
 .click()
 //should verify we are on the payment site
 // https://epayment.nets.eu/
 cy.get('#merchantInformation_merchantName').contains('K-citymarket')
 cy.get('#cardNumber')
 cy.get('[name="EasyPayment$securityCode"]')
 cy.get('[name="cancelButton"]').click()
});


