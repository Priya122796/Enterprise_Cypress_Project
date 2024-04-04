// cypress.config.js
const { defineConfig } = require("cypress");
const fs = require('fs');
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { verifyDownloadTasks } = require('cy-verify-downloads');

//Bootstrap Allure Report
const allureWriter = require("@shelex/cypress-allure-plugin/writer");


//
// Task: getsecret_fromAzureportal
// Description: This task will get secret value for automation account from live Azure portal(az login)
// Prerequisite:az login command should be used and it should get the current login details
// Input: Secret Name
// Output: Will return the value of Secret Name from Azure Portal

const getsecret_portal = async ({ secret_name, keyvault }) => {

  const firstCredential = new DefaultAzureCredential();
  try {
    const KV_URL = keyvault
    var secretClient = new SecretClient(
      KV_URL,
      firstCredential
    );
    var secret = await secretClient.getSecret(secret_name);
    return secret.value;
  } catch (err) {
    console.log("error code: ", err.code);
    console.log("error .message: ", err.message);
    console.log("error stack: ", err.stack);
    return err;
  }
};


module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {

      const environmentName = config.env.ADVAQAENV
      const environmentFilename = `./${environmentName}.json`
      const settings = require(environmentFilename)
      if (settings.env) {
        config.env = settings.env
      }

      const options = {
        //   printLogsToConsole: "always",
        printLogsToFile: "onFail",
        outputRoot: config.projectRoot,
        outputTarget: {
          'ExecutionLog.txt': 'txt',
          'ExecutionLog.json': 'json',
        }
      };
      require('cypress-terminal-report/src/installLogsPrinter')(on, options);

      require("cypress-timestamps/plugin")(on)
      on('task', verifyDownloadTasks)
      on('before:browser:launch', (browser = {}, launchOptions) => {
        // `args` is an array of all the arguments that will
        // be passed to browsers when it launches
        console.log(launchOptions.args) // print all current args

        if (browser.name === 'edge') {
          // open in incognito
          launchOptions.args.push('--inprivate')
        }

        // whatever you return here becomes the launchOptions
        return launchOptions
      })
      on("task", {
        out(message) {
          //Info log in blue colour
          console.log("\x1b[32m%s\x1b[32m", message);
          return null;
        },
        // callback task which returns secret value
        get_secret({ secret_name, keyvault }) {
          return getsecret_portal({ secret_name, keyvault });
        },

        fileExists: async (fileName) => {
          return fs.existsSync(fileName);
        },

      });

      allureWriter(on, config);
      return config;
    },
    env: {
      grepFilterSpecs: true,
      allure: true,
      allureResultsPath: "allure-results",
      allureReuseAfterSpec: true,
      allureAttachRequests: true,
      allureClearSkippedTests: false,
      allureAddVideoOnPass: false,
    },

    screenshotOnRunFailure: true,
    defaultCommandTimeout: 35000,
    pageLoadTimeout: 30000,
    // experimentalMemoryManagement: true,
    // numTestsKeptInMemory: 10,
    video: false,
    "videoCompression": 10,
    experimentalModifyObstructiveThirdPartyCode: true,
    testIsolation: true,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080
  },
});
