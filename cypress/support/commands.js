/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('.main-navi-user-info-profile-link').click()
    cy.get('.btn--primary').click()
    cy.get('#input-email',{timeout:10000}).type(Cypress.env('username'));
    cy.get('#input-password').type(Cypress.env('password'), {log:false});
    cy.get('#ka-button-login').click()
    cy.get('#loaderImage').should('not.be.visible')
});

Cypress.Commands.add('loginByApi', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')
  
    cy.request({
      method: 'POST',
      url: 'https://authentication.kesko.fi/oic/v1/public/user_security_check',
      form: true,
      body: {
        j_username:username,
        j_password:password,
        client_id:'kruoka',
        remember_me:'on'
      },
      failOnStatusCode: false
    })

    cy.request({
        method: 'GET',
        url: 'https://www.k-ruoka.fi/kr-api/userinfo'
      }).should((response) => {
        expect(response.body.email).to.equal(username) 
      })
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.get('.main-navi-user-info-profile-link').click()
    cy.get('.menu-item--logout > a').click()
    cy.get('.main-navi-user-info-profile-link').click()
    cy.get('.btn--primary')
});



Cypress.Commands.add('preserveAutoLogout', () => {
    Cypress.Cookies.preserveOnce('sessionid')
});

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
  })

Cypress.Commands.add('visitShoppingCart', () => {
    cy.visit('/kauppa')
});

Cypress.Commands.add('navigateToShoppingCart', () => {
  cy.get('[class="nav-item shop-navigation-item isStorePath"').click()
});

Cypress.Commands.add('visitSearch', () => {
  cy.visit('/haku')
});

Cypress.Commands.add('navigateToSearch', () => {
  cy.get('li').filter('.search-nav-item').click()
});
