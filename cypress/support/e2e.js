// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { gql } from "graphql-request";

export class AbstractQuery {
  constructor(query, variables) {
    this.config = {};
    this.query = query;
    this.variables = variables;
  }

  withConfig(config) {
    this.config = config;
    console.log("CONFIG " + config);
    return this;
  }

  doQuery() {
    return cy
      .wrap(null, { log: false })
      .then(() => {
        TokenGetter.getAccessToken(this.config);
      })
      .then((token) => {
        cy.log("TOKEN: " + token.tokenValue);
        return cy.request({
          method: "POST",
          url: "https://testme.com/gql",
          headers: {
            Authorization: `Bearer ${token.tokenValue}`,
            "Context-Type": "application/graphql",
            Accept: "application/json",
          },
          body: {
            query: gql`
              ${this.query}
            `,
            variables: this.variables,
          },
        });
      });
  }
}
