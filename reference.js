// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.



/**
* @summary Tries several authentication methods using a single credential. The simplest way to use `@azure/identity`.
*/



const { DefaultAzureCredential } = require("@azure/identity");
const { AzureCliCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { log } = require("console");



/**
* The `DefaultAzureCredential` is appropriate for most scenarios where the application is intended to ultimately be run in the Azure Cloud.
* This is because the `DefaultAzureCredential` combines credentials commonly used to authenticate when deployed,
* with credentials used to authenticate in a development environment.
*
* For more information, you may go to our readme: [link](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
*/
//DefaultAzureCredential usage



async function getSecrets(secret_name) {
  const generateData = () => {
    return {
      bill: "4642514",
      claim: "96001742"
    }
  }
  cy.writeFile("./cypress/fixtures/dynamicdata.json", JSON.stringify(generatedData, null, "\t"));
  console.log("Entered into async function");
  const credential = new DefaultAzureCredential();
  //method 1
  var secretClient = new SecretClient(
    "",
    credential
  );
  var secret = await secretClient.getSecret("name");
  console.log("The secret from method 1 : ", secret.value);
}



// Try fetch Secrets from Key Vault or throw error
getSecrets("secret_name").catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});