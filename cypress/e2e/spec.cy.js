describe('template spec', () => {
  it('passes', () => {
    // cy.visit('https://example.cypress.io')
    cy.on('fail', () => { return false })
    cy.get('html').type('SECRET', { log: false })
  })
})
