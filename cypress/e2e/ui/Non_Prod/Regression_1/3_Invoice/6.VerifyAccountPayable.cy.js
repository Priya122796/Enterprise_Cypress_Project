describe(" g.Invoice : 6. Verify AccountPayable ", () => {
    it("Verify the ability to 1.Search Invoice, 2.AccountPayable Actions",
        {
            retries: {
                runMode: 3,
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
            //Verify that able to navigate to Search Invoice screen 
            cy.fixture('fakerdata.json')
                .then((data) => {
                    global.fakerData = data
                });

            cy.VisitSummary();
            cy.AccountPayable();

            cy.Logout();
        });

});
