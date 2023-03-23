/// <reference types="cypress" />
describe('page', () => {
  it('works', () => {
    cy.visit('http://localhost:7777/foo').contains('FOO')
  })

  it('works', () => {
    cy.request('http://localhost:8888/bar').its('body').should('contain', 'BAR')
  })

  it('works', () => {
    cy.request('http://localhost:7777/foo').its('body').should('contain', 'FOO')
  })

  it('works', () => {
    cy.visit('http://localhost:8888/bar').contains('BAR')
  })
})
