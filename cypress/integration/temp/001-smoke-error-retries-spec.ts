/// <reference path="../../support/index.d.ts" /> 

describe('goto homepage and verify it', () => {

    it('test with unpredictable conditions', {retries: {runMode: 1,openMode: 2} }, () => {
        cy.visit('https://www.k-ruoka.fi')
        cy.get('.main-logo-image')
    })

    context('Notes: fail, debug, retries, selector playground, open file, automatic re-run', () => {})
})
