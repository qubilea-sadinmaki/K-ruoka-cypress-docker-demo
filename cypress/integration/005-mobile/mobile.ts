/// <reference path="../../support/index.d.ts" />

import { Context } from "mocha"

describe('Goto homepage verify it', () => {

    it('goto homepage and verify it', () => {
        cy.visit('/')
        cy.get('#main-logo')
    })

    context('Notes: baseUrl, cross-browser-testing', () => {})
})
