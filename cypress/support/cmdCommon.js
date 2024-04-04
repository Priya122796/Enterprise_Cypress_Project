// Name: LOCAL_STORAGE_MEMORY
// Description: This Variable helps you to save the current session
let LOCAL_STORAGE_MEMORY = {};
// Name: SaveLocalStorage
// Description: This command helps you to save the current session
// Prerequisite: <none>
Cypress.Commands.add("SaveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
}); //end command

// Name: RestoreLocalStorage
// Description: This command helps you to restore the saved session
// Prerequisite: SaveLocalStorage should store the Session
Cypress.Commands.add("RestoreLocalStorage", () => {
  return new Cypress.Promise((resolve, reject) => {
    setTimeout(() => {
      Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
      });
      resolve("Restored LocalStorage");
    }, 3000);
  });
}); //end of RestoreLocalStorage command

// Name: Login 
// Description: Login into the Enterprise application using Azure credentails
// Prerequisite: visit Enterprise application
// Shared Steps 141782: ****-*** : Login into application
Cypress.Commands.add("Login", function () {



  // cy.reload()
  //cy.visit(Cypress.env('baseUrl')).reload();
  cy.get(global.Selectors.landing.elements.login)
    .click();

  cy.LogNReport("Retrieve credentials from Keyvault Secret")
  cy.fixture("Selectors.json")
    .then((Selectors) => {
      global.testCaseId = 140398;

      cy.origin(
        Selectors.landing.url.azure_url,
        {
          args: {
            Selectors,
          },
        },
        ({ Selectors }) => {
          cy.task("get_secret", { secret_name: Cypress.env("secret_name"), keyvault: Cypress.env("keyvault_Url") })
            .then((password) => {
              let username = Cypress.env("user_Name")
              cy.get(Selectors.landing.elements.back_Button)
                .should("be.visible")
              cy.get(Selectors.landing.elements.header)
                .should("be.visible")
                .invoke('text')
                .then((text_of_Element) => {
                  if (text_of_Element == Selectors.landing.txt.approve_Sign_In_Contains) {
                    cy.contains(Selectors.landing.txt.approve_Sign_In_Contains)
                      .should("be.visible");
                    cy.get(Selectors.landing.elements.back_Button)
                      .should("be.visible")
                      .click();
                    cy.get(Selectors.landing.elements.tile_Text)
                      .click();
                  }
                  cy.get(Selectors.landing.elements.email_Text_Field)
                    .type(username, { log: false });
                  cy.get(Selectors.landing.elements.submit_Button)
                    .click();
                  cy.contains(Selectors.landing.txt.enter_Password_Contains)
                    .should("be.visible");
                  cy.get(Selectors.landing.elements.password_Text_Field)
                    .should("be.visible")
                    .type(password, { log: false });
                  cy.get(Selectors.landing.elements.submit_Button)
                    .click();
                })
            });
        });

      cy.LogNReport("Check the landing screen based on the user's role");
      cy.url()
        .should("be.oneOf", [Cypress.env('baseUrl') + Selectors.landing.url.home_Page, Cypress.env('baseUrl') + Selectors.landing.url.home_Page1, Cypress.env('baseUrl') + "/#/"]);
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    });
  //end of Login cmd 
});

// Name: Logout
// Description: This command helps you to logout to Enterprise application.
// prerequisite: <none>
// Test Case 140409: Logout->To verify that when the user clicks the logout button, they are redirected to the login/home page.
Cypress.Commands.add("Logout", function (options = {}) {
  // Landing To Home Page
  global.testCaseId = 140409;
  cy.visit(Cypress.env('baseUrl') + global.Selectors.landing.url.home_Page);
  // Logout From Enterprise application.
  cy.window()
    .then((win) => {
      cy.stub(win, "open")
        .as("windowOpen");
      cy.get(global.Selectors.landing.elements.logout)
        .click();
    });
  // Wait for the new window to open and then perform actions within it
  cy.get("@windowOpen")
    .then(() => {
      cy.window()
        .then((newWin) => {
          newWin.close();
          // Perform actions within the new window
        });
    });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  cy.LogNReport("Logout completed !! Session cleared")

  cy.clearAllLocalStorage();
  cy.clearAllCookies();
  cy.clearAllSessionStorage();
}); //end of Logout command

// Name: LogNReport
// Description: This command helps to log any message to terminal and Allure report
// prerequisite: <none>
Cypress.Commands.add("LogNReport", function (LogMessage) {
  //Add message to Allure
  cy.allure()
    .step(LogMessage);
  //Output the log message to terminal
  cy.task("out", LogMessage);
  //cy.writeFile('ExecutionLog.txt', LogMessage, 'ascii')

  //cy.screenshot(LogMessage)
}); //end of LogNReport command

// Name: WriteEnvironmentInfo
// Description: This command helps to write environmental Information
// prerequisite: send environment json value 
Cypress.Commands.add('WriteEnvironmentInfo', (info) => {
  cy.allure().writeEnvironmentInfo(info);
});//end of WriteEnvironmentInfo command

// Name: BackButtonAfterLogin
// Description:This cmd helps you to validate after login ,back button click action navigation is not back to login screen
// Prerequisite: Login should be successful
//Test Case 140414: Login->To verify that if the user clicks on the browser back button after a successful login, they should not be redirected to the user login screen.
Cypress.Commands.add("BackButtonAfterLogin", function () {
  global.testCaseId = 140414;

  cy.LogNReport(
    "Validate Back button after Login should not navigated to Login screen"
  );
  cy.get(global.Selectors.create_Client.elements.client_Menu)
    .should("be.visible")
    .click({ force: true })
    .then(($ele) => {
      cy.url({ timeout: 10000 }).should(
        "eq", Cypress.env('baseUrl') +
      global.Selectors.landing.url.client_url
      );
    });
  cy.go(-1).then(($ele) => {
    cy.url({ timeout: 10000 }).should(
      "eq", Cypress.env('baseUrl') +
    global.Selectors.landing.url.client_url
    );
  });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
}); //end of BackButtonAfterLogin cmd

// Name: BackButtonAfterLogout
// Description:This cmd helps you to validate after logout ,back button click action navigation is not back to previous screen
// Prerequisite: Login should be successful
//Test Case 140415: Logout->To verify that if the user clicks on the browser "Back" button after a successful logout, they should not be redirected to a logged-in mode.

Cypress.Commands.add("BackButtonAfterLogout", function () {
  global.testCaseId = 140415;
  cy.LogNReport(
    "Check after logout ,back button navigation is not to previous screen"
  );
  cy.go(-1).then(($ele) => {
    cy.url({ timeout: 10000 }).should(
      "contain", Cypress.env('baseUrl') +
    global.Selectors.landing.url.base_url
    );
  });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
}); //end of BackButtonAfterLogout cmd

