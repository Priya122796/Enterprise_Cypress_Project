describe(" l.Reports : 1. Verify Reports Management", () => {
    it("Verify the ability to  check various reports",
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
            cy.LogNReport("Generating Faker Data");
            cy.generateFakerData();
            cy.fixture('fakerdata.json')
                .then((data) => {
                    global.fakerData = data
                });
            //Verify that able to request, cancel and request, queue, process , complete , download  the Report
            //  if (Cypress.env("environment") === 'qa02' || Cypress.env("environment") === 'dev01') {
            cy.DailyTrialBalance();
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

            // cy.ClientAging();
            // cy.ProviderAging();
            // cy.BillsReport();
            // cy.ProvidersReport()
            // cy.BillsStatusReport();
            // cy.ProviderDistance()
            //  }
        })


});