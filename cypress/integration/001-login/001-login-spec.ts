/// <reference path="../../support/index.d.ts" />

describe('Login and logout by UI', () => {

    it('should login', () => {
        cy.log('Should goto url "https://www.k-ruoka.fi/kauppa". We have baseUrl "https://www.k-ruoka.fi" configured so we only need the end of target url.');
        cy.visit('/kauppa');
        cy.log('Pass cookie modal if needed');
        cy.passCookieModal('_hjFirstSeen', 2500);
        cy.log('Should open main navigation and from the menu click login button');
        cy.get('.main-navi-user-info-profile-link').click();
        cy.get('.login-controls > .btn--primary').click();
        cy.log('Type in username and password, then accept and wait for login window to dissappear');
        cy.get('#input-email',{timeout:10000}).type(Cypress.env('username'));
        cy.log('You can set certain things to not log into console');
        cy.get('#input-password').type(Cypress.env('password'), {log:false});
        cy.get('#ka-button-login').click();
        cy.get('#ka-button-login').should('not.exist');
    })

    it('verify we are logged in', () => { 
        cy.log('Refresh') 
        cy.visit('/kauppa')
        cy.log('Open menu')    
        cy.get('.main-navi-user-info-profile-link').click();
        cy.log('Verify there is user nickname inside of user profile')
        cy.get('.profile-menu-title').contains(Cypress.env('nickname'))
        })
      
    it('should logout', () => {
        cy.log('Refresh') 
        cy.visit('/kauppa')
        cy.log('Should open main navigation and from the menu click logout button')
        cy.get('.main-navi-user-info-profile-link').click()
        cy.get('.menu-item--logout > a').click()
        cy.get('.main-navi-user-info-profile-link').click()
        cy.get('.login-controls > .btn--primary')
    })

    it('verify we are logged out', () => { 
        cy.log('Refresh') 
        cy.visit('/kauppa') 
        cy.log('open main navigation and verify we have login button abled')     
        cy.get('.main-navi-user-info-profile-link').click()
        cy.get('.login-controls > .btn--primary')
      })

      context('Notes: time travel', () => {})
})
