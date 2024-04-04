describe(" b.Referral : 2. Verify Referral Summary", () => {
    it("Verify the ability to  1. Search Referral, 2. Add Comment 3. Upload Document, 4.Edit Referral, 5.Add Procedures",
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

                    // Navigated To Summary section and Validate status, entered details
                    cy.ReferralSummary();
                    cy.Logout();
                });
        });

});
