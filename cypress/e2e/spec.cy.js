/// <reference types="cypress" />
describe('page', { defaultCommandTimeout: 1000 * 20 }, () => {
  it('works', () => {
    cy.visit("https://joinmastodon.org/")
    // should be this
    // cy.get(':nth-child(1) > .full-width-bg__inner > .xl\\:col-start-2 > .h4')
    
    // not okay!
    cy.get(':nth-child(1) > .full-width-bg__inner > .xl\:col-start-2 > .h4')
  })
})
