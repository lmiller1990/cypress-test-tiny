/// <reference types="cypress" />
describe("page", () => {
  it("works", () => {
    cy.visit("http://localhost:8000");
    cy.screenshot()
  });
});
