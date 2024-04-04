describe(" h.Upload Configuration : 3. Verify Upload BillLineCharge ", () => {

    it("Verify the ability to upload BillLineCharge ",
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

            cy.LogNReport("Log in with Microsoft Credentials")
            cy.visit(Cypress.env('baseUrl'), {
                onBeforeLoad: win => {
                    win.sessionStorage.clear();
                }
            });
            cy.LogNReport("Log in to Enterprise account from your AAD tenant");
            cy.Login().then(() => {
                cy.intercept(global.Selectors.landing.url.all_Api_Intercept).as("allApiReq")

            })

            cy.LogNReport("Generating Faker Data");
            cy.generateFakerData();
            cy.fixture('fakerdata.json')
                .then((data) => {
                    global.fakerData = data
                });
            cy.fixture('Uploaddata.json')
                .then((data) => {
                    global.uploadData = data

                    //**Verify that able to navigate to Upload screen 
                    cy.UploadMenu()
                    cy.LogNReport("Upload Bill Line Charge file with Valid format ");
                    cy.BillLineCharge()

                })
        });

});
