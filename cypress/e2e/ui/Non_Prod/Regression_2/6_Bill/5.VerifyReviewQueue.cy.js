describe(" f.Bill : 5. Verify Bill in Review Queue List", () => {

    it("Verify the ability to 1.Search Bills  2.select Client,Provider,Referral and navigation to respective screens from Bill creation , 3.search using claim number in Billing Review Queue, 4.user unable to delete Bill when Invoice generated , 5.Download related Action documents ",
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

            cy.ReviewQueue()
            cy.Logout();
            // END Test Case
        });

    // END Test Suite
});
