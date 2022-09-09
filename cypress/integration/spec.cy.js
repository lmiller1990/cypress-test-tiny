beforeEach(() => {
  cy.visit('http://localhost:8080')
  // alias the $btn.text() as 'text'
  cy.get('button').invoke('text').as('text')
})

it('has access to text', function () {
  this.text // is now available
  cy.log(this.text)
})
