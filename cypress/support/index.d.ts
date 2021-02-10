declare namespace Cypress {
    interface Chainable {
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
       * Custom command to logout K-ruoka. 
       * @example cy.logout()
      */
      logout(): Chainable;

      /**
       * Custom command to logout K-ruoka. 
       * @example cy.logoutAPI()
      */
     logoutAPI();

      /**
       * Custom command to keep user logged in
       * @example cy.preserveAutoLogout()
      */
      preserveAutoLogout():Chainable;

      /**
       * Custom command to pass cookies modal in the first visit
       * @example cy.passCookieModal('cookie_id')
      */
      passCookieModal(cookieID:String, timeout:Number):Chainable;

         /**
       * Custom command to navigate to product and buy it
       * Returns result json of buying action
       * @example cy.naviagateToAndBuyProduct("","","","")
      */
     naviagateToAndBuyProduct(level0:String,level1:String,level2:String,level3:String):Chainable;

     /**
       * Custom command to pass cookies modal in the first visit
        cy.naviagateToAndBuyProduct('Maito, juusto, munat ja rasvat',
        'Maidot ja piimät',
        'Maidot',
        'Pirkka suomalainen kevytmaito 1l')
      */
     verifySubCategory(level0:String,level1:String,level2:String,level3:String):Chainable;

     /**
       * Empties shoppingcart and verifies its empty
       * @example cy.emptyShoppingcart()
      */
     emptyShoppingcart():Chainable;

      /**
       * Empties shoppingcart and verifies its empty 
       * @example cy.emptyShoppingcart('xxxxxxxxx')
      */
     emptyShoppingcartAPI(draftID:String):Chainable;

      /**
       * Add product to shoppingcart and verifies its was added 
       * @example cy.emptyShoppingcart('00000000')
      */
     addProductAPI(productID:String):Chainable;

      /**
       * Go to searchresult url and add product to shoppingcart and verifies its was added 
       * @example cy.visitSearchResultAndAddProduct('maito','maito')
      */
     visitSearchResultAndAddProduct(type:String, name:String):Chainable;
    }
}