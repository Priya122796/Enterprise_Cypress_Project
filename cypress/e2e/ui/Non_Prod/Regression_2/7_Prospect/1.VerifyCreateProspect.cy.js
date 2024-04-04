describe(" c.Prospect : 1. Verify Create Prospect", () => {
	it("Verify the ability to  1. Create Prospect, 2.Data validation, 3.Advanced Search Random Prospect",
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
			cy.CreateProspect();
			// Navigated To Summary section and Validate
			cy.ProspectSummary();
			// Navigated To Summary Edit
			cy.EditProspect();
			// Navigated To Prospect and Search
			cy.SearchProspect();


			cy.Logout();
		});
	// END Test Suit
});
