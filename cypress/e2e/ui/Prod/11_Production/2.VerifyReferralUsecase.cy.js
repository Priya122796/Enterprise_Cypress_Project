describe(" b.Referral Search, Summary, Select Related Items", () => {
	//Test Case 140741: Client->Create Client->To verify that the user can view the "Prepopulated" data in the client information screen.
	it("Verify the ability to 1.Search Referral, 2.Validate Summary 3.Navigate to Related items  ",
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


			cy.fixture('Prod.json')
				.then((data) => {
					global.prodData = data
					cy.Referral_Search()
					cy.Referral_SelectRelated()
					//	cy.Referral_Upload()
				});

			// END Test Suite
		});

})
