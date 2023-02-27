const { defineConfig } = require("cypress");

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

module.exports = defineConfig({ 
  e2e: {    
    setupNodeEvents(on, config) {      
      on("file:preprocessor",  createBundler())
      return config;
    },  
  },
});
