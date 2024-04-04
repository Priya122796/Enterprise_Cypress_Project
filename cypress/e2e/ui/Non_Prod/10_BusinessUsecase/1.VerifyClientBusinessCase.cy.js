describe(" j. Verify Business Usecase : 1.Creation of  Client", () => {
	//Test Case 140741: Client->Create Client->To verify that the user can view the "Prepopulated" data in the client information screen.
	it("Verify the ability to 1.Create new client with Bill info ",
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


					cy.LogNReport("Create Client")
					cy.CreateClient();
					let val = global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next
					const generateData1 = () => {
						return {
							client_Name: val
						}
					};

					let generatedData1 = generateData1();
					cy.writeFile("./cypress/fixtures/businessData.json", JSON.stringify(generatedData1, null, "\t"));
					// cy.LogNReport("Create Referral ")
					// cy.reload()
					// cy.CreateReferral();

					// cy.readFile("cypress/fixtures/businessData.json").then((profile) => {
					// 	profile.referral_Claim = global.fakerData.referral_Info.claim_Number
					// 	cy.writeFile('cypress/fixtures/businessData.json', JSON.stringify(profile))
					// })

					// cy.CreateBill_Link()
					// cy.fixture('businessData.json')
					// 	.then((data) => {
					// 		global.businessData = data

					// 		cy.ValidateInvoice_Links()
					// 		//cy.Logout();
					// 	})
				});
		});

	// END Test Suite
});
