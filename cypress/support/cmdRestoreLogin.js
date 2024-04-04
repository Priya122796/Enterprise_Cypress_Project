// Name: LOCAL_STORAGE_MEMORY
// Description: This Variable helps you to save the current session
// Name: SaveLocalStorage
// Description: This command helps you to save the current session
// prerequisite: <none>
Cypress.Commands.add("SaveLocalStorageForNoLogin", () => {
  let LOCAL_STORAGE_MEMORY = {};

  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
  let generatedData = LOCAL_STORAGE_MEMORY
  cy.writeFile("./cypress/fixtures/restoreLogin.json", JSON.stringify(generatedData, null, "\t"));

}); //end command

// Name: RestoreLocalStorage
// Description: This command helps you to restore the saved session
// prerequisite: SaveLocalStorage should store the Session
Cypress.Commands.add("RestoreLocalStorageForNoLogin", () => {
  let LOCAL_STORAGE_MEMORY = require("../fixtures/restoreLogin.json")

  // let restoreLogin = require("../fixtures/restoreLogin.json")
  // let LOCAL_STORAGE_MEMORY = JSON.parse(restoreLogin)

  return new Cypress.Promise((resolve, reject) => {
    setTimeout(() => {
      Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
      });
      resolve("Restored LocalStorage");
    }, 3000);
  });
}); //end of RestoreLocalStorage command

