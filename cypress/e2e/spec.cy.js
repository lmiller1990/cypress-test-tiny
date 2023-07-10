describe("page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  it("works", () => {
    cy.visit("localhost:8000/index.html");
    cy.get("button").click();
  });
});
