const { defineConfig } = require("cypress")
const { devServer } = require("@cypress/webpack-dev-server")

module.exports = defineConfig({
  projectId: '5tbaxy',
  experimentalWebKitSupport: true,
  component: {
    devServer: (args) => {
      return devServer({...args, webpackConfig: {}})
    },
  },
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
