describe(" a.Client : 3. Verify Upload Document In Client Summary", () => {
	//Test Case 140741: Client->Create Client->To verify that the user can view the "Prepopulated" data in the client information screen.
	it("Verify the ability to 1.Search client record created , 2.Upload Documents in Client summary",
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
			// Navigated To Client Summary Instruction and Document Tab
			cy.ClientMenuandSearch();
			cy.ClientUploadDocument();

			cy.Logout();
			// END Test Case
		});

	// END Test Suite
});
