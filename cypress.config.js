const preprocessor = require('@cypress/webpack-preprocessor')

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', preprocessor())
    },
  },
}
