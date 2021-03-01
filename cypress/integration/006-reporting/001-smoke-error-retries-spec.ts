/// <reference path="../../support/index.d.ts" /> 

describe('goto homepage and verify it',
{retries: {runMode: 1,openMode: 1} }, () => {

    it('goto homepage and verify it', () => {
        cy.visit('/')
        cy.get('#main-logo2')
    })

    context('Notes: fail, debug, retries, selector playground, open file, automatic re-run', () => {})
})
