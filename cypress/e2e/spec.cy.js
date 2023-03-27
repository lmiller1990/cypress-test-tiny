/// <reference types="cypress" />
describe('page', () => {
  it('works', { defaultCommandTimeout: 1000 * 70 }, () => {
    cy.visit('https://example.cypress.io')
    // testing
    cy.wait(1000 * 60)
  })
})
