declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
      */
      dataCy(value: string): Chainable<Element>;

      /**
       * Custom command to login K-ruoka. It uses username and password from cypress.env.json
       * @example cy.login()
      */
      login(): Chainable;

      /**
       * Custom command to login K-ruoka with request It uses username and password from cypress.env.json
       * @example cy.loginByApi()
      */
     loginByApi(): Chainable;

      /**
       * Custom to logout K-ruoka. 
       * @example cy.logout()
      */
      logout(): Chainable;

      /**
       * Custom command to keep user logged in
       * @example cy.preserveAutoLogout()
      */
      preserveAutoLogout():Chainable;
    }
}