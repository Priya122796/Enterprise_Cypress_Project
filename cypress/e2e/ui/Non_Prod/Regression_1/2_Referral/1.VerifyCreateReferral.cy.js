describe(" b.Referral : 1. Verify Create Referral", () => {
    it("Verify the ability to  1. Create Referral", {
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
        cy.LogNReport("Generating Faker Data");
        cy.generateFakerData().then(() => {

            cy.fixture('fakerdata.json')
                .then((data) => {
                    global.fakerData = data


                    //Verify that able to create Referral with mandatory validations 
                    cy.CreateReferral();

                    cy.Logout();
                });
        })
    });

});
