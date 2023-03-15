module.exports = {
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    configFile: "reporters/custom.json",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
