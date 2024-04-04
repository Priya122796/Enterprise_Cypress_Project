describe(" e.Task : 2. Verify Complete Task ", () => {

  it("Verify the ability to 1.Search Task, 2.Complete Task",
    {
      retries: {
        runMode: 2,
        openMode: 0,
      },
    }, () => {

      cy.clearAllLocalStorage();
      cy.clearAllCookies();
      cy.clearAllSessionStorage();
      // Visiting Enterprise Application

      cy.LogNReport("Login into App with Microsoft Credentials")
      cy.visit(Cypress.env('baseUrl'), {
        onBeforeLoad: win => {
          win.sessionStorage.clear();
        }
      });
      cy.LogNReport("Login into Enterprise account from your AAD tenant");
      cy.Login().then(() => {
        cy.intercept(global.Selectors.landing.url.all_Api_Intercept).as("allApiReq")

      })
      cy.fixture('fakerdata.json')
        .then((data) => {
          global.fakerData = data
        });

      //Verify that able to navigate to Task screen
      cy.TaskMenu();
      //Verify that able to Complete Task
      cy.CompleteTask();
      cy.Logout();
      //**Checking Execution log is present for Regression1 else creating a new one with timestamp */
      const currentTimestamp = new Date().toISOString();
      const newContent = `Timestamp: ${currentTimestamp}\n`;
      const fileName = 'ExecutionLog.txt';
      cy.task('fileExists', fileName).then((fileExists) => {
        cy.LogNReport(fileExists)
        if (!fileExists) {
          // cy.task('writeFile', { fileName, newContent });
          cy.writeFile(fileName, newContent);
          cy.LogNReport("Execution Log Added")
        }
      })
    });

});
