describe(" f.Bill : 3. Verify Review Bill", () => {

    it("Verify the ability to 1.Search Bills , 2.Data Validation , 3.review Bill and resolve errors , 4.column search and advanced search newly generated Bill",
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
            cy.ReviewBill()
            cy.Logout();

            // END Test Case
        });

    // END Test Suite
});
