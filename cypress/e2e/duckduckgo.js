import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// When("I visit duckduckgo.com", () => {
When("I visit duckduckgo.com", function () {
  cy.visit("https://www.duckduckgo.com");
  cy.get('body').invoke('text').as('text').then((text) => {
    cy.log(text)
  })
});

// Then("I should see a search bar", () => {
Then("I should see a search bar", function () {
  expect(this.text).not.to.be.undefined
  cy.get("input").should(
    "have.attr",
    "placeholder",
    "Search the web without being tracked"
  );
});
