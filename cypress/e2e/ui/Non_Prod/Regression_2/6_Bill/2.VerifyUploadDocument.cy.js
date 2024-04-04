describe(" f.Bill : 2. Verify Upload Bill document", () => {

    it("Verify the ability to 1.Search Bill 2.Upload/delete a document  3.Activity log status ",
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
            cy.BillUploadDocument()

            cy.Logout();
            // END Test Case
        });

    // END Test Suite
});
