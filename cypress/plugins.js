/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
require("dotenv").config();

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require("fs-extra");
const path = require("path");
const tagify = require("cypress-tags");
const pg = require("pg");
//const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
//const { pa11y } = require("@cypress-audit/pa11y");
const { rmdir } = require("fs");

function getConfigurationByFile(file) {
  // const pathToConfigFile = path.resolve("config", `${file}.json`);

  // return fs.readJson(pathToConfigFile);
}

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // on("file:preprocessor", tagify(config));

  /***************************************************
   * Prepare Audit (Lighthouse) - Frontend Performance
   ***************************************************/
  on("before:browser:launch", (browser = {}, launchOptions) => {
    //prepareAudit(launchOptions);
  });

  // on("task", {
  //   lighthouse: lighthouse(),
  //   pa11y: pa11y(console.log.bind(console)),
  // });

  /***************************************************
   * Connects to an env db and fetches query result
   ***************************************************/
  on("task", {
    DATABASE({ dbConfig, sql }) {
      const pool = new pg.Pool(dbConfig);
      try {
        // return pool.query(sql, values)
        return new Promise(function (resolve, reject) {
          pool.query(sql, (err, res) => {
            if (err) {
              console.log("Error quering DB: " + err);
              reject(err);
            } else {
              resolve(res.rows);
            }
            pool.end();
          });
        });
      } catch (e) {
        console.log("Failed to query DB: " + e);
      }
    },
  });

  on("task", {
    createFolder(folderName) {
      if (!fs.existsSync(folderName)) {
        return new Promise((resolve, reject) => {
          fs.mkdir(folderName, { recursive: true }, (err) => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            resolve(null);
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          console.log("Folder %s already available", folderName);
          resolve(null);
        });
      }
    },
  });

  on("task", {
    deleteFolder(folderName) {
      if (fs.existsSync(folderName)) {
        console.log("deleting folder %s", folderName);

        return new Promise((resolve, reject) => {
          rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            resolve(null);
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          console.log("Folder %s already not available", folderName);
          resolve(null);
        });
      }
    },
  });

  on("task", {
    downloads: (downloadspath) => {
      if (fs.existsSync(downloadspath)) {
        return new Promise((resolve, reject) => {
          resolve(fs.readdirSync(downloadspath));
        });
      } else {
        return new Promise((resolve, reject) => {
          console.log("Folder %s  not available", downloadspath);
          resolve([]);
        });
      }
    },
  });

  on("task", {
    compareImages({ image1, image2, imageType }) {
      const Jimp = require("jimp");
      const PNG = require("pngjs").PNG;
      const JPEG = require("jpeg-js");
      const pixelmatch = require("pixelmatch");

      function adjust_image(path, imageType) {
        let type = "image/png";
        if (imageType == "JPG" || imageType.toLowerCase() == "jpeg") {
          type = "image/jpeg";
        }
        const buffer = fs.readFileSync(path);
        const imageData = Jimp.decoders[type](buffer);
        const baseImage = new Jimp(imageData);
        baseImage.resize(1920, 1198);
        baseImage.crop(0, 0, 1919, 1197);
        return baseImage;
      }

      try {
        if (!fs.existsSync(image1)) {
          return new Promise((resolve, reject) => {
            reject(new Error("Error: Invalid path " + String(image1)));
          });
        }

        if (!fs.existsSync(image2)) {
          return new Promise((resolve, reject) => {
            reject(new Error("Error: Invalid path " + String(image2)));
          });
        }
        const img1 = adjust_image(image1, imageType);
        const img2 = adjust_image(image2, imageType);

        const pixels = Jimp.diff(img1, img2, 0.2);
        return new Promise((resolve, reject) => {
          resolve(1 - pixels.percent);
        });
      } catch (error) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    },
  });

  on("task", {
    extractCSV({ csvPath }) {
      try {
        if (!fs.existsSync(csvPath)) {
          return new Promise((resolve, reject) => {
            reject(new Error("Error: Invalid path"));
          });
        }
        const csv = require("csv-parser");
        const results = [];
        return new Promise((resolve, reject) => {
          fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
              resolve(results);
            });
        });
      } catch (error) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    },
  });

  /***********************************************************
   * accept a configFile value or use testing by default
   ***********************************************************/
  if (!process.env.CIRCLECI) {
    // const file = config.env.configFile || "testing";
    // return getConfigurationByFile(file);
  }
  allureWriter(on, config);
  return config;
};