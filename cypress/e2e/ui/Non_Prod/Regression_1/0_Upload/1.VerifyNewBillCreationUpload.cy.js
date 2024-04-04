describe(" h.Upload Configuration : 1. Verify Account payable Upload  ", () => {

    it("Verify the ability to create a new bill and generate invoice  and Upload Account payable type",
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

            //**Verify that able to navigate to Upload screen 

            cy.CreateBillForUpload()
            cy.LogNReport("Upload Account payable  file with Valid format ");
            cy.APUpload()
        });

});
