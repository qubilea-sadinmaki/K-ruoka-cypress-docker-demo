/// <reference path="../../support/index.d.ts" />

import { Context } from "mocha"

describe('Goto homepage verify it', () => {

    it('goto homepage and verify it', () => {
        cy.visit('https://www.k-ruoka.fi')
        cy.get('#main-logo')
    })

    context('Notes: cross-browser-testing', () => {})
})
