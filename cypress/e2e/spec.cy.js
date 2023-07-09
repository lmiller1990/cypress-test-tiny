describe("User is on Comptia Login Page", () => {
  it("works", () => {
    cy.visit("https://prep.comptia.org/en/");
    cy.get("a").contains("Sign in").click({ force: true });

    cy.origin("https://comptiassostageb2c01.b2clogin.com/", () => {
      // Here after this click domain change to Google OAuth
      cy.get(".options #GoogleExchange").click();
    });

    cy.origin("https://accounts.google.com", () => {
      cy.url().should("include", "accounts.google.com");
      cy.get('input[type="email"]').click(); //Here trying to enter email on Google OAuth page
    });
  });
});
