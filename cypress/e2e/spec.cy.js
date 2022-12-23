/// <reference types="cypress" />
describe('page', () => {
  it('works', () => {
    cy.visit('http://localhost:8000')
    cy.get('#app').contains('hello').then(() => {
      cy.window().then(win => {
        const resources = win.performance.getEntriesByType("resource");
        console.log('Here', resources)
        resources.forEach((entry) => {
          console.log(entry);
        });
      })
    })
  })
})
