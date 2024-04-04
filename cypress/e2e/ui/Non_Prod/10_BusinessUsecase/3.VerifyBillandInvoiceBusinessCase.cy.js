describe(" j. Verify Business Usecase: 3. Bill link to Client,Referral  ", () => {
	//Test Case 140741: Client->Create Client->To verify that the user can view the "Prepopulated" data in the client information screen.
	it("Verify the ability to 1.Create a new Bill with Client and referral , 2.Create a new Invoice  ",
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


					cy.CreateBill_Link()
					cy.fixture('businessData.json')
						.then((data) => {
							global.businessData = data

							cy.ValidateInvoice_Links()
							//cy.Logout();
						})
				});
			const currentTimestamp = new Date().toISOString();

			// Define the file name and content
			const fileName = 'ExecutionLog.txt';
			const newContent = `Business Case execution Completed -  Timestamp: ${currentTimestamp}\n`;

			// Check if the file exists
			//cy.writeFile(fileName, newContent);
			if (Cypress.env("environment") === 'stg') {
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
								cy.log("File exist")
								// Write the updated content back to the file
								cy.writeFile(fileName, updatedContent);
								cy.LogNReport(newContent)
							})
					}

					// END Test Suite
				});
			}
		});


	// END Test Suite
});
