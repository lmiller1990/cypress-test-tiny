/// <reference types="cypress" />
describe('page', { defaultCommandTimeout: 1000 * 20 }, () => {
  it('works', () => {
    cy.visit('https://example.cypress.io')
  })
})
