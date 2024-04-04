describe(" f.Bill : 1. Verify Create Bill", () => {

    it("Verify the ability to 1.Create Bills",
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

            cy.CreateBill()

            cy.Logout();
            // END Test Case
        });

    // END Test Suite
});
