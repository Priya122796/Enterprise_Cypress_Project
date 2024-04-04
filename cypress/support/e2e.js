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

// Import Axios For Api request
import axios from "axios";
// Import all the custom commands
import "./cmdCommon";
import "./cmdClients";
import "./cmdFaker";
import "./cmdTFS";
import "./cmdTasks";
import "./cmdProspect";
import "./cmdInvoices";
import "./cmdReferral";
import "./cmdBill";
import "./cmdProvider"
import "./cmdReport";
import "./cmdUpload";
import "./cmdProd"
//Import Cypress plugins
import "@shelex/cypress-allure-plugin";
import "cypress-plugin-api";
import "cypress-real-events";
import 'cypress-mochawesome-reporter/register';
import { expect } from "chai";
//import chaiJsonSchema from "chai-json-schema"; //TODO: remove this, it may not be required
//import "cypress-v10-preserve-cookie"; //Get re-authentication required error message, lets preserve the cookie
//import "@testing-library/cypress/add-commands";

require('cy-verify-downloads').addCustomCommand();
//require('cypress-terminal-report/src/installLogsCollector')();
require('cypress-terminal-report/src/installLogsCollector')({
  xhr: {
    // printHeaderData: true,
    printRequestData: true
  },
  // enableExtendedCollector: true,
  collectTypes: ['cons:log', 'cons:warn', 'cons:error', 'cy:xhr', 'cy:request', 'cy:intercept', 'cy:command']
});
var basicAuth;
//Will get executed on Every Spec file includes Generating Faker data and initializing Selectors
//before for All Login Session Before IT
before("Writing into Allure Config", () => {
  //setting environment
  cy.log(Cypress.browser.name + "   " + Cypress.env('environment') + "  " + new Date().toString())
  const now = new Date();
  const cstDateString = now.toLocaleString('en-US', { timeZone: 'America/Chicago' });
  const generateData1 = (value) => {
    return {
      time: value
    }
  };
  const Timestamp = generateData1(cstDateString.toString())
  // const jsonDate = Timestamp.toJSON();
  cy.WriteEnvironmentInfo({
    Browser: Cypress.browser.name,
    Environment: Cypress.env('baseUrl'),
    Timestamp: new Date().toString()
  })
  cy.writeFile("./timeStamp.json", JSON.stringify(Timestamp));
  const currentHour = new Date().getHours();
  cy.allure().writeExecutorInfo({
    name: 'Azure Pipeline',
    version: Cypress.version,
    buildName: 'Enterprise_Pipeline : ' + Cypress.env('environment'),
    buildUrl:
      'https://*******.visualstudio.com/Network%20and%20Operations/_build?definitionScope=%5CADVA%5CEnterprise%20QA%20Automation',
  });
  cy.fixture('Selectors.json')
    .then((data) => {
      global.Selectors = data;
      basicAuth = global.Selectors.general.basic_Auth
      cy.LogNReport("Getting all Selectors ");
    });
  //  cy.reload()
});
beforeEach(() => {
  cy.reload()
})
//   Cypress.on('window:console', (consoleMessage) => {
//     // Check if the message contains the specific warning
//     if (consoleMessage.type === 'warning' && consoleMessage.text.includes('DevTools failed to load source map')) {
//       // Log the warning
//       console.log('Warning: DevTools failed to load source map');
//       cy.LogNReport('Warning: DevTools failed to load source map')
//       // You can perform additional actions or assertions here if needed
//       throw new Error('Caught in Window:Console - DevTools failed to load source map');
//     }
//   })
// });
// after(() => {
//   // cy.Logout();
//   //Back button click after logout action
//   // cy.BackButtonAfterLogout();
//   //cy.reload()
//   // cy.clearAllLocalStorage();
//   // cy.clearAllCookies();
//   // cy.clearAllSessionStorage();
// });

// Declaration of Plan and Suite
let planID = 108846, suiteID = 145960;

//Load and register the grep feature
const registerCypressGrep = require("@cypress/grep");
registerCypressGrep();
//chai.use(chaiJsonSchema); //TODO: remove this, it may not be required
//Load the allure reports
const allure = Cypress.Allure.reporter.getInterface();
//capture uncaught exceptions
// Cypress.on('uncaught:exception', (err, runnable) => {
//   // returning false here prevents Cypress from
//   //cy.reload()
//   // Check if the error message contains the specific text
//   if (err.message.includes('DevTools failed to load source map')) {
//     // Mark the test as failed immediately
//     throw new Error('DevTools failed to load source map');
//   }
//   // Continue processing other uncaught exceptions

//   console.log('Cypress detected uncaught exception', err);
//   // throw err
// });

Cypress.on("fail", (err, runnable) => {
  console.log("Printing the failed status " + err);
  if (global.testCaseId === undefined) {
    console.log("testcaseID is undefined", global.testCaseId);

    if (err.message.includes('Your page did not fire its `load` event within `30000ms`')) {
      cy.log("Error name is :  " + err.name)
      cy.log("Error message is " + err.message)
      cy.LogNReport("Caught Page timeout exception", err.message)
      expect(true, "Intentional failure for page load error").to.equal(false);
      throw err
    }
  }
  else if (err.message.includes('Your page did not fire its `load` event within `30000ms`')) {
    cy.log("Error name is :  " + err.name)
    cy.log("Error message is " + err.message)
    cy.LogNReport("Caught Page timeout exception", err.message)
    expect(true, "Intentional failure for page load error").to.equal(false);
    throw err
  }
  else {
    setTestCaseStatusIntoAzure(global.testCaseId, "FAILED");
    throw err
    // throw new Error(err.name + err.message);
  }
  // if (err.message.includes('Your page did not fire its `load` event within `30000ms`')
  // ) {
  //   cy.LogNReport("Caught Page timeout exception", err.message)
  //   console.log("Caught Page timeout exception", err.message)
  //   //cy.fail("Cypress Error : Failing pagetimeout after retrying for 30 seconds")
  //   cy.wrap(true).should('be.false');
  //   expect(false).to.eq(true)
  //   cy.reload()
  //   // cy.wrap(true).should('be.false');
  //   throw new Error('DevTools failed to load source map');

  // }
  // cy.log("Error name is :  " + err.name)
  // cy.log("Error message is " + err.message)

});

const setTestCaseStatusIntoAzure = async (testcaseID, status) => {
  //getting testcaseID from TFS using description
  console.log("The testcase id is " + testcaseID + "\n Status is : " + status);
  //getting Pointid from azure API
  let pointId = await axios({
    method: "get",
    url:
      "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/plans/" +
      planID +
      "/suites/" +
      suiteID +
      "/points?testcaseId=" +
      testcaseID +
      "&api-version=5.1",
    headers: {
      authorization: basicAuth,
    },
  }).then((response) => {
    console.log("the point id is : " + response.data.value[0].id);
    return response.data.value[0].id;
  });
  console.log("the point id is : " + pointId);
  createRun(pointId, testcaseID, status);
};

//create run
const createRun = async (pointID, testcaseID, status) => {
  console.log("enter Create Run");
  //https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/runs?api-version=7.0
  let runID = await axios({
    method: "POST",
    // url: 'https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/runs?api-version=7.0',
    url: "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/runs?api-version=7.0",
    headers: {
      authorization: basicAuth,
    },
    data: {
      name: testcaseID,
      plan: {
        id: planID,
      },
      pointIds: [pointID],
    },
  }).then((response) => {
    console.log("create run result data = ", response.data.id);
    return response.data.id;
  });
  console.log("the create run  run id is : " + runID);
  //Getting testresult id through runID
  let resultID = await gettestResultID(runID);
  console.log("the result id is : " + resultID);
  //Updating Status Passed or Failed into TFS PATCH Call
  updateResult(runID, resultID, status);
};

//update result
const updateResult = async (runID, resultID, status) => {
  var comment;
  var bugid;
  if (status.toString() === "PASSED") {
    comment = "Execution Passed!!!";
    await axios({
      method: "PATCH",
      //PATCH https://******.*.com/{organization}/{project}/_apis/test/Runs/{runId}/results?api-version=7.0
      url:
        "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/" +
        runID +
        "/results?api-version=7.0",
      // url: 'https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/' + runID + '/results?api-version=7.0',
      headers: {
        authorization: basicAuth,
      },
      data: [
        {
          id: resultID.toString(),
          outcome: status.toString(),
          state: "Completed",
          comment: comment.toString(),
        },
      ],
    }).then((response) => {
      console.log("Execution is completed in PASSED  results status ");
    });
  } else if (status.toString() === "FAILED") {
    comment = "Execution Failed!!!";
    await axios({
      method: "PATCH",
      url:
        "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/" +
        runID +
        "/results?api-version=7.0",

      headers: {
        authorization: basicAuth,
      },
      data: [
        {
          id: resultID.toString(),
          outcome: status.toString(),
          state: "Completed",
          comment: comment.toString(),
        },
      ],
    }).then((response) => {
      console.log("Execution is completed in FAILED  results status ");
    });
  }
};

const gettestResultID = async (runID) => {
  console.log("runID", typeof runID);
  return await axios({
    method: "GET",
    ////https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/80/results?api-version=7.0
    // url: 'https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/' + runID + '/results?api-version=7.0',
    url:
      "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/" +
      runID +
      "/results?api-version=7.0",
    headers: {
      authorization: basicAuth,
    },
  }).then((response) => {
    console.log("the gettestResultID id is : " + response.data.value[0].id);
    return response.data.value[0].id;
  });
};
