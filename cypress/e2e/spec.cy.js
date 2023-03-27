/// <reference types="cypress" />
describe('page', { defaultCommandTimeout: 1000 * 20 }, () => {
  it('works', () => {
    cy.visit('https://example.cypress.io')
    // testing
    // cy.wait(1000 * 60)
  })

  for (const n of [1,2,3,4]) {
    it('fails slowly', () => {
      cy.wait(1000 * 18)
      expect(2).to.eq(n)
    })
  }
})
