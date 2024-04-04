describe(" e.Provider Search, Summary, Select Related Items", () => {
	//Test Case 140741: Client->Create Client->To verify that the user can view the "Prepopulated" data in the client information screen.
	it("Verify the ability to 1.Search Provider, 2.Validate Summary 3.Navigate to Related items  ",
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
					cy.Provider_Search()
					cy.Provider_SelectRelated()
					cy.Provider_UploadDocument()
					cy.Provider_Edit()

				});
			const currentTimestamp = new Date().toISOString();

			// Define the file name and content
			const fileName = 'ExecutionLog.txt';
			const newContent = `Business Case execution Completed -  Timestamp: ${currentTimestamp}\n`;

			// Check if the file exists
			//cy.writeFile(fileName, newContent);
			if (Cypress.env("environment") === 'prod') {
				cy.task('fileExists', fileName).then((fileExists) => {
					cy.LogNReport(fileExists)
					if (!fileExists) {
						// cy.task('writeFile', { fileName, newContent });
						cy.writeFile(fileName, newContent);
						cy.LogNReport("Execution Log Added")
					}
					else {
						cy.readFile(fileName, { log: false, failOnStatusCode: false })
							.then((fileContent) => {
								const updatedContent = `${fileContent}\n${newContent}`;
								cy.log("File  exists timestamp added")
								// Write the updated content back to the file
								cy.writeFile(fileName, updatedContent);
								cy.LogNReport(newContent)
							})
					}

					// END Test Suite
				})
			}
		})
})
