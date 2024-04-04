describe(" i.Upload Configuration : 6. Verify Upload changes in Invoice  ", () => {

    it("Verify the ability to validate in respective Invoice with all type of Uploads  ",
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

            cy.LogNReport("Log in with Microsoft Credentials")
            cy.visit(Cypress.env('baseUrl'), {
                onBeforeLoad: win => {
                    win.sessionStorage.clear();
                }
            });
            cy.LogNReport("Log in to Enterprise account from your AAD tenant");
            cy.Login().then(() => {
                cy.intercept(global.Selectors.landing.url.all_Api_Intercept).as("allApiReq")

            })

            cy.LogNReport("Generating Faker Data");
            cy.generateFakerData();
            cy.fixture('fakerdata.json')
                .then((data) => {
                    global.fakerData = data

                    cy.fixture('Uploaddata.json')
                        .then((data) => {
                            global.uploadData = data
                            cy.fixture('Uploaddata1.json')
                                .then((data1) => {
                                    global.uploadData1 = data1
                                    cy.fixture('comment.json')
                                        .then((data2) => {
                                            global.comment = data2
                                            cy.LogNReport("Validate Comments, AR/AP entries, Approved file Download status");
                                            cy.BillSearch(global.uploadData1.oldBill)
                                            cy.ValidateComments()
                                            cy.BillSearch(global.uploadData.bill)
                                            cy.ValidateValues(global.uploadData.invoice)
                                            cy.UploadMenu()
                                            cy.ZeroValidate(global.uploadData.invoice, global.uploadData1.oldInvoice)
                                            cy.reload()
                                            global.testCaseId = 157871
                                            cy.LogNReport("Visiting Invoice Reversal.htm file - " + "InvoiceReversal_" + global.uploadData.invoice + '.htm')
                                            cy.visit(global.Selectors.upload.txt.next_Tab + "InvoiceReversal_" + global.uploadData.invoice + '.htm')
                                            cy.readFile(global.Selectors.upload.txt.next_Tab + "ZeroPayment_" + global.uploadData.invoice + '.htm').should("exist")
                                            cy.LogNReport("Validating Approved ZeroPayment is downloaded - " + "ZeroPayment_" + global.uploadData.invoice + '.htm')
                                            var fileName = global.Selectors.upload.txt.next_Tab + "APUpload_" + global.uploadData1.oldInvoice + '.htm'
                                            cy.task('fileExists', fileName).then((fileExists) => {
                                                cy.LogNReport(fileExists)
                                                if (fileExists) {
                                                    cy.readFile(global.Selectors.upload.txt.next_Tab + "APUpload_" + global.uploadData1.oldInvoice + '.htm').should("exist")
                                                }
                                            })

                                            cy.LogNReport("Validating Approved APUpload_ is downloaded - " + "APUpload_" + global.uploadData1.oldInvoice + '.htm')
                                            cy.readFile(global.Selectors.upload.txt.next_Tab + "ARUpload_" + global.uploadData1.oldInvoice + '.htm').should("exist")
                                            cy.LogNReport("Validating Approved ARUpload_ is downloaded - " + "ARUpload_" + global.uploadData1.oldInvoice + '.htm')
                                            cy.readFile(global.Selectors.upload.txt.next_Tab + "BillLineCharge_" + global.uploadData1.oldInvoice + '.htm').should("exist")
                                            cy.LogNReport("Validating Approved BillLineCharge_ is downloaded - " + "BillLineCharge_" + global.uploadData1.oldInvoice + '.htm')
                                            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                        })
                                })
                        })
                });
        });
});
