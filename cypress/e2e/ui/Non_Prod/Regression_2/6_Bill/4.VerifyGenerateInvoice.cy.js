describe(" f.Bill : 4. Verify Generate Invoice in Bill Summary", () => {

    it("Verify the ability to 1.Search Bills , 2.generate Invoice , 3.review Bill and resolve errors by Editing Bill , 4. Not to generate Invoice with existing Bill errors ",
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

            cy.SearchBill()

            cy.GenerateInvoice()

            cy.Logout();

            // END Test Case
        });

    // END Test Suite
});
