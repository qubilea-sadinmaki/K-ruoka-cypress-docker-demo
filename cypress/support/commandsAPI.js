/// <reference types="cypress" />

Cypress.Commands.add('loginByApi', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')
    cy.log("Send request for login with username and password")
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

    cy.log("Request userinfo to verify we are logged in")
    cy.request('GET', 'https://www.k-ruoka.fi/kr-api/userinfo')
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.email).to.eq(username)
    })
});

Cypress.Commands.add('logoutAPI', () => {
    cy.log("Send request for logout and wait for response")
    cy.request('GET', 'https://www.k-ruoka.fi/kr-api/logout') 
    .should((response) => {
      expect(response.status).to.eq(200)
    })
  
    cy.request('GET', 'https://authentication.kesko.fi/oic/v1/public/logout') 
    .should((response) => {
      expect(response.status).to.eq(200)
    })
  });

  Cypress.Commands.add('emptyShoppingcartAPI', (draftID) => {
    cy.log(`Send request to delete shopping cart contents with ID:${draftID} and wait for response`)
    cy.request({
      method: 'DELETE',
      headers: {Accept: "application/json"},
      url: `https://www.k-ruoka.fi/kr-api/order-drafts/${draftID}`
    })
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.eq('OK')
  })
  });
  
  Cypress.Commands.add('addProductAPI', (productID) => {
    let draftID = '31cd5f69-d9ca-4f92-af12-2094930ce36b'
    cy.request({
      method: 'PUT',
      url: `https://www.k-ruoka.fi/kr-api/order-drafts/${draftID}`,
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    //   id:"xhr212",
      body:[{
        allowSubstitutes: true,
        amountInfo:{amount: 1, unit: "kpl"},
        ean: productID,
        id: productID,
        type: "ITEM"}]
    }).then((response) => {
      expect(response.draft.draftId).exist
    })
  });

  