const Papa = require('papaparse');
const fs = require('fs');


// Name: CreateBillForUpload
// Description: Create A New Bill And Navigate To Bill Summary
// Prerequisite: Visit Bill Menu
// Shared Steps 141783: ****-*** : Creating Bill with Mandatory fields
Cypress.Commands.add("CreateBillForUpload", function () {
    cy.LogNReport("Creating Bill ");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.create_Landing)
        .as("create_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.column_Search)
        .as("column_Search")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.general_Referral)
        .as("general_Referral")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.column_Search_Referral)
        .as("column_Search_Referral")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.after_Referral_Select)
        .as("after_Referral_Select")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.after_Save)
        .as("after_Save")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.add_Bill_Amount)
        .as("add_Bill_Amount")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.client_Landing)
        .as("client_Landing")

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.general_Info)
        .as("general_Info")

    cy.get(global.Selectors.bills.elements.menu)
        .should("be.visible")
        .click({ force: true })
        .then(($ele) => {
            cy.url({ timeout: 10000 }).should(
                "eq", Cypress.env('baseUrl') +
            global.Selectors.bills.url.landing_Bill
            );
        });
    cy.get(global.Selectors.bills.elements.create)
        .should("be.visible").click({ force: true })
    //  
    cy.wait(["@create_Landing"], { timeout: 70000 }).then(() => {
        cy.get(global.Selectors.bills.elements.add_New_Bill).should("be.visible").then(() => {
            cy.LogNReport("Select a provider");
            cy.get(global.Selectors.bills.elements.bill_Provider).should("be.visible").then(($ele1) => {
                cy.wrap($ele1).contains(global.Selectors.bills.txt.provider).click({ force: true })
                cy.get(global.Selectors.bills.elements.select_Provider, { timeout: 50000 })
                    .should("be.visible").invoke("text").then(text => {
                        cy.get(global.Selectors.bills.elements.sub_Filter).should("be.visible").type(text + global.Selectors.bills.elements.enter)
                        cy.wait(["@column_Search"], { timeout: 50000 }).then(() => {
                            cy.wrap($ele1).get(global.Selectors.bills.elements.checkbox).eq(2).click({ force: true })
                            cy.wrap($ele1).get(global.Selectors.bills.elements.create_Btn).click({ force: true })
                            // })
                        })
                    })
            })
            cy.LogNReport("Select a claim");
            cy.get(global.Selectors.bills.elements.bills_Referral).should("be.visible").then(($ele1) => {
                cy.wrap($ele1).contains(global.Selectors.bills.txt.Referral).click({ force: true })
                cy.get(global.Selectors.bills.elements.select_Claim).should("be.visible").invoke("text").then(text => {
                    cy.get(global.Selectors.bills.elements.search_Box).should("be.visible").type(text + global.Selectors.bills.elements.enter)
                    cy.wait(["@column_Search_Referral"], { timeout: 50000 }).then(() => {
                        cy.wrap($ele1).find(global.Selectors.bills.elements.table).should("have.length", global.Selectors.bills.txt.one).then(() => {
                            cy.wrap($ele1).find(global.Selectors.bills.elements.checkbox).click({ force: true })
                            cy.wrap($ele1).find(global.Selectors.bills.elements.create_Btn).click({ force: true })
                        })
                    })

                })
            })

            cy.wait(["@after_Referral_Select"], { timeout: 50000 }).then(() => {
                cy.get(global.Selectors.bills.elements.save).should("be.visible").click({ force: true })

            })
        })
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.contains(global.Selectors.bills.txt.bill_Created).should("not.exist").then(() => {
        cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
            cy.LogNReport("Navigate to the General Information tab ");
            cy.get(global.Selectors.bills.elements.general_Tab).should("include.text", global.Selectors.bills.txt.general_Info)
            cy.get(global.Selectors.bills.elements.bill_Info).should("include.text", global.Selectors.bills.txt.bill_Info)
            cy.get(global.Selectors.bills.elements.bill_Id).should("be.visible")
            cy.get(global.Selectors.bills.elements.claim_Number).should("be.visible")
            cy.get(global.Selectors.bills.elements.prospective_Flow_Flag).should("be.visible")
            cy.get(global.Selectors.bills.elements.next).last().click({ force: true })
        })
        // cy.get(".button-fixed-bottom > app-button > .container > .button-flex > #next").should("be.visible").click({ force: true })
        cy.wait(["@general_Info", "@dropdown", "@general_Referral", "@column_Search", "@general_Info"], { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.LogNReport("Select an ICD version");
            cy.get(global.Selectors.bills.elements.icd1).then($e1 => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.bills.elements.icd1).type(global.fakerData.bills.cpt_Code)
            }).type(global.fakerData.bills.cpt_Code)
            cy.LogNReport("Choose additional ICD 9/10 codes");
            cy.get(global.Selectors.bills.elements.bill_Type).then(($ele) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.wrap($ele).clear().type("UB" + "{enter}")
                cy.get(global.Selectors.bills.elements.previous).should("be.visible").click({ force: true })

            })
        })
        // cy.get(global.Selectors.bills.elements.previous).click({ force: true })
        // cy.get(global.Selectors.bills.elements.next).should("be.visible").click({ force: true })
        // cy.wait(["@general_Info", "@column_Search", "@general_Referral", "@general_Info"], { timeout: 50000 }).then(() => {
        //     cy.LogNReport("Save the record with mandatory fields");
        //     cy.get(global.Selectors.bills.elements.previous).click({ force: true })
        //     cy.contains(global.Selectors.bills.txt.required_Message).should("not.exist", { timeout: 10000 }).then(() => {
        //         cy.get(global.Selectors.bills.elements.previous).click({ force: true })
        //     })
        // })

    })
    // 1.Bill info
    cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
        cy.LogNReport("Validate Bill information data view ");
        // cy.get(global.Selectors.bills.elements.accordion).should("be.visible").then(($ele1) => {
        //     cy.LogNReport("Select a client from the dropdown");
        //     cy.wrap($ele1).contains(global.Selectors.bills.txt.client).click({ force: true })
        //     cy.get(global.Selectors.bills.elements.client_Select).should("be.visible").click({ force: true }).invoke("text").then(text => {
        //         cy.wrap($ele1).contains(text).should("be.visible")
        //         cy.get(global.Selectors.bills.elements.client_Bill_Number).should("be.visible").type(global.fakerData.bills.bill_Number)
        //     })
        // })

        cy.LogNReport("Edit client bill number fields ");
        cy.get(global.Selectors.bills.elements.previous).click({ force: true })

        cy.get(global.Selectors.bills.elements.justify_Content).click({ force: true }).then(() => {
            cy.get(global.Selectors.bills.elements.bill_Charges).then(($ele1) => {
                cy.wrap($ele1).find(global.Selectors.bills.elements.revenue_Code).type(global.fakerData.bills.revenue_Code)
                cy.wrap($ele1).find(global.Selectors.bills.elements.cpt_Code).should("not.be.disabled").type(global.fakerData.bills.cpt_Code)
                cy.wrap($ele1).find(global.Selectors.bills.elements.cdk_Column_Units).type(global.fakerData.bills.units)
                cy.wrap($ele1).find(global.Selectors.bills.elements.providerCharge).type(global.fakerData.bills.provider_Charge)
                cy.wrap($ele1).find(global.Selectors.bills.elements.fsAllowedAmount).type(global.fakerData.bills.fs_Allowed_Amount)
                cy.wrap($ele1).find(global.Selectors.review_Bill.elements.billed_Amount).type(global.fakerData.bills.bill_Amount)
                cy.get(global.Selectors.bills.elements.justify_Content_End).should("be.visible").click({ force: true })
                cy.wait(["@add_Bill_Amount"], { timeout: 50000 }).then(() => {
                    //    cy.get(global.Selectors.bills.elements.providerPaymentAmount).contains(global.fakerData.bills.bill_Amount)

                })
            })
        })
    })
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.navigation)
        .as("navigation")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.navigation)
        .as("navigation")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.billReview)
        .as("billReview")
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.invoice_BillID)
        .as("invoice_BillID")

    //finish
    cy.contains(global.Selectors.bills.txt.Finish).click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");


    cy.LogNReport("Create Upload json");
    cy.wait(["@general_Info", "@dropdown", "@general_Info"], { timeout: 50000 }).then(() => {

        cy.get(global.Selectors.bills.elements.bread_Crumb_2).invoke("text").then((text) => {
            let bill = text.trim()
            cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Action).should("be.visible").click({ force: true }).then(($el1) => {
                cy.wrap($el1).type(global.Selectors.generate_Invoice_Bill.txt.generate + global.Selectors.bills.txt.down_Enter)
            })
            cy.get(global.Selectors.generate_Invoice_Bill.elements.toaster).contains(global.Selectors.generate_Invoice_Bill.txt.created)
                .then(() => {
                    cy.get(global.Selectors.generate_Invoice_Bill.elements.comments).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.generate_Invoice_Bill.elements.summary).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.bills.elements.Summary_bill_1).should("be.visible").should("include.text", bill)
                    cy.get(global.Selectors.bills.elements.Summary_bill_3).should("be.visible").invoke("text").then((text1) => {
                        let claim = text1.trim()
                        cy.log("Bill id is " + bill + "  claim no is " + claim)
                        //generate invoice 
                        cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 }).then(() => {
                            // cy.wait(["@summary"], { timeout: 50000 }).then(() => {
                            cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
                                cy.wrap($ele1).type(global.Selectors.generate_Invoice_Bill.txt.invoice + global.Selectors.bills.txt.down_Enter)
                            })

                        })

                        var number = 0;
                        cy.get(global.Selectors.upload.elements.invoice_Breadcrumb).invoke("text").then(text => {
                            cy.log("The invoice id is " + text)
                            var fullText = text;
                            var pattern = /[0-9]+/g;
                            number = fullText.match(pattern);
                            cy.log(number + " the invoice id is ")
                            global.invoice_ID = number
                            cy.wait(["@invoice_BillID"], { timeout: 50000 }).then((interception) => {
                                const responseData = interception.response.body
                                let billChargeId = responseData[0].billChargeId;
                                let newReceivable = responseData[0].newReceivable;
                                cy.log(billChargeId + " Balance amount is " + newReceivable)
                                global.billChargeId = billChargeId
                                //storing bill and claim number from Bill Summary as Dynamic json
                                const generateData1 = () => {
                                    return {
                                        bill: bill,
                                        claim: claim,
                                        invoice: number.toString(),
                                        billChargeId: billChargeId,
                                        newReceivable: newReceivable
                                        // 
                                    }
                                };
                                let generatedData1 = generateData1();
                                cy.writeFile("./cypress/fixtures/Uploaddata.json", JSON.stringify(generatedData1, null, "\t"));
                            })
                        })
                    })
                })
        })
    })


})//end of CreateBill cmd

// Name:APUpload
// Description: This command helps you to navigate to UploadMenu .
// // Prerequisite: <none>
Cypress.Commands.add("APUpload", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.lockbox)
        .as("lockbox");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.list)
        .as("list");

    cy.contains(global.Selectors.upload.txt.billing_AR).should("be.visible").click({ force: true }).then(() => {
        cy.contains(" Uploads / Configuration ").should("be.visible").click({ force: true })
    })

    const generateData1 = () => {
        return {
            AP_Comment: 'Payable Amount of ' + global.fakerData.upload.reversal_Amount2 + ' from automation'
        }
    };
    let generatedData1 = generateData1();
    cy.writeFile("./cypress/fixtures/comment.json", JSON.stringify(generatedData1, null, "\t"));
    const jsonData = [
        ['Invoice', 'Payable ID', 'Payable Amount', 'Adjustment Code', 'Activity', 'Comment'],
        [global.invoice_ID, '', global.fakerData.upload.reversal_Amount2, '22331', 'BD', 'Payable Amount of ' + global.fakerData.upload.reversal_Amount2 + ' from automation']
    ];

    var filename = "APUpload_"
    cy.createExcel(global.invoice_ID, jsonData, filename)
    cy.log("The invoice id is " + global.invoice_ID)
    cy.get(global.Selectors.upload.elements.lockbox_Tab2).should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.lockbox_Tab1).should("be.visible").click({ force: true })
    cy.wait(["@lockbox"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
        cy.wait(["@account_Upload", "@account_Upload"], { timeout: 20000 })
            .then((interception) => {
                cy.get(global.Selectors.upload.elements.Upload).should("be.visible").click({ force: true })
                cy.get(global.Selectors.upload.elements.tag_Select).should("be.visible").click({ force: true }).then(() => {
                    cy.contains("span.mdc-list-item__primary-text", "Accounts Payable Adjustment").should("be.visible").click({ force: true })
                })
            })
    })
    global.testCaseId = 150649
    cy.LogNReport("Upload Account Payable Document")
    var filename = "APUpload_" + global.invoice_ID + ".csv"
    cy.fixture(filename, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                .then((input) => {
                    const testFile = new File([fileContent], filename, { type: "application/csv", });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });
    // cy.get("#cancelbtn").should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.save_btn).should("be.visible").click({ force: true })
        .click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
            cy.wrap($e1).type("APUpload_" + global.invoice_ID + "{enter}").then(() => {
                cy.get('tbody')  // Get the tbody element
                    .find('tr')    // Find all tr elements inside tbody
                    .its('length') // Get the number of elements found
                    .should("be.oneOf", [1, 0]);
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                    cy.get(global.Selectors.upload.elements.apply).should("be.enabled").then(($ele) => {
                        cy.wrap($ele).should("be.visible").click({ force: true })
                    })
                })
            })
        })
    })
    global.testCaseId = 157870
    cy.LogNReport("Toaster Validation Successful : The invoice reversal feed has been applied successfully")
    cy.contains("The invoice reversal feed has been applied successfully").should("exist")
    // cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
    // cy.visit(global.Selectors.upload.txt.next_Tab + "APUpload_" + global.invoice_ID + '.htm')
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.wait(["@list"], { timeout: 50000 }).then(() => {

        cy.get('tbody')  // Get the tbody element
            .find('tr')    // Find all tr elements inside tbody
            .its('length') // Get the number of elements found
            .should('be.gt', 1);
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
})

// Name:ARUpload
// Description: This command helps you to navigate to UploadMenu .
// // Prerequisite: <none>
Cypress.Commands.add("ARUpload", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.lockbox)
        .as("lockbox");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.list)
        .as("list");
    cy.get(global.Selectors.upload.elements.lockbox_Tab2).should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.lockbox_Tab1).should("be.visible").click({ force: true })
    cy.wait(["@lockbox"], { timeout: 50000 }).then(() => {
        cy.readFile("cypress/fixtures/comment.json").then((profile) => {
            profile.AR_comment = 'Receivable Amount of 100 from automation'
            cy.writeFile('cypress/fixtures/comment.json', JSON.stringify(profile))
        })
        const jsonData = [
            ['Invoice', 'Receivable ID', 'Adjustment Amount', 'AR Adj Code', 'Adjustment Activity', 'Comment'],
            [global.uploadData.invoice, '', '100', '755', 'SP', 'Receivable Amount of 100 from automation']
        ];

        var filename = "ARUpload_"
        cy.createExcel(global.uploadData.invoice, jsonData, filename)
        cy.log("The invoice id is " + global.uploadData.invoice)

        cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
        cy.wait(["@account_Upload", "@account_Upload"], { timeout: 20000 })
            .then((interception) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.upload.elements.Upload).should("be.visible").click({ force: true })
                cy.get(global.Selectors.upload.elements.tag_Select).should("be.visible").click({ force: true }).then(() => {
                    cy.contains("span.mdc-list-item__primary-text", "Accounts Receivable Adjustment").should("be.visible").click({ force: true })
                })
            })
    })
    global.testCaseId = 150649
    cy.LogNReport("Upload Account Recievable Document")
    var filename1 = "ARUpload_" + global.uploadData.invoice + ".csv"
    cy.fixture(filename1, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                .then((input) => {
                    const testFile = new File([fileContent], filename1, { type: "application/csv", });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });

    cy.get(global.Selectors.upload.elements.save_btn).should("be.visible").click({ force: true })
        .click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
            cy.wrap($e1).type("ARUpload_" + global.uploadData.invoice + "{enter}").then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('tbody')  // Get the tbody element
                    .find('tr')    // Find all tr elements inside tbody
                    .its('length') // Get the number of elements found
                    .should("be.oneOf", [1, 0]);
                cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                    global.testCaseId = 150552
                    cy.LogNReport("Apply AR Upload for Processing");
                    cy.get(global.Selectors.upload.elements.apply).should("be.enabled").then(($ele) => {
                        cy.wrap($ele).should("be.visible").click({ force: true })
                    })
                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
                })
            })
        })
    })
    cy.LogNReport("Toaster Validation Successful : The invoice reversal feed has been applied successfully")
    cy.contains("The invoice reversal feed has been applied successfully").should("exist")
    // cy.visit(global.Selectors.upload.txt.next_Tab + "ARUpload_" + global.invoice_ID + '.htm')
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");

    cy.wait(["@list"], { timeout: 50000 }).then(() => {

        cy.get('tbody')  // Get the tbody element
            .find('tr')    // Find all tr elements inside tbody
            .its('length') // Get the number of elements found
            .should('be.gt', 1);
    })
})

// Name:BillLineCharge
// Description: This command helps you to navigate to UploadMenu .
// // Prerequisite: <none>
Cypress.Commands.add("BillLineCharge", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.lockbox)
        .as("lockbox");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.list)
        .as("list");

    cy.contains(global.Selectors.upload.txt.billing_AR).should("be.visible").click({ force: true }).then(() => {
        cy.contains(" Uploads / Configuration ").should("be.visible").click({ force: true })
    })
    cy.log(global.billChargeId)
    cy.readFile("cypress/fixtures/comment.json").then((profile) => {
        profile.billChargeComment = 'Line adjustment from adjustment file: BillLineCharge_' + global.uploadData.invoice + '.csv'
        cy.writeFile('cypress/fixtures/comment.json', JSON.stringify(profile))
    })
    const jsonData = [
        ['INVOICE_ID', 'SERVICE_DATE', 'CPT_CODE', 'FS_ALLOWED_AMOUNT', 'Correct Receivable', 'Correct Payable', 'BILL_CHARGE_ID'],
        [global.uploadData.invoice, '', '99214', global.fakerData.upload.reversal_Amount3, global.fakerData.upload.reversal_Amount2, global.fakerData.upload.reversal_Amount4, global.uploadData.billChargeId]
    ];
    var filename = "BillLineCharge_"
    cy.createExcel(global.uploadData.invoice, jsonData, filename)
    cy.log("The invoice id is " + global.uploadData.invoice)
    cy.get(global.Selectors.upload.elements.lockbox_Tab2).should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.lockbox_Tab1).should("be.visible").click({ force: true })
    cy.wait(["@lockbox"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
        cy.wait(["@account_Upload", "@account_Upload"], { timeout: 20000 })
            .then((interception) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.upload.elements.Upload).should("be.visible").click({ force: true })
                cy.get(global.Selectors.upload.elements.tag_Select).should("be.visible").click({ force: true }).then(() => {
                    cy.contains("span.mdc-list-item__primary-text", "Bill Charge Line Adjustment").should("be.visible").click({ force: true })
                })
            })
    })

    cy.LogNReport("Upload Bill line Charge Document")
    var filename = "BillLineCharge_" + global.uploadData.invoice + ".csv"
    cy.fixture(filename, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                .then((input) => {
                    const testFile = new File([fileContent], filename, { type: "application/csv", });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });

    cy.get(global.Selectors.upload.elements.save_btn).should("be.visible").click({ force: true })
        .click({ force: true })
    const generateData1 = () => {
        return {
            oldInvoice: global.uploadData.invoice,
            oldBill: global.uploadData.bill,
            oldClaim: global.uploadData.claim,

            "claim": "96001742",
            "invoice": "1964706",
            "billChargeId": 12684484,
            "newReceivable": 63447
        }
    };
    let generatedData1 = generateData1();
    cy.writeFile("./cypress/fixtures/Uploaddata1.json", JSON.stringify(generatedData1, null, "\t"));

    global.BillLine_Invoice = global.uploadData.invoice
    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
            cy.wrap($e1).type("BillLineCharge_" + global.uploadData.invoice + "{enter}").then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('tbody')  // Get the tbody element
                    .find('tr')    // Find all tr elements inside tbody
                    .its('length') // Get the number of elements found
                    .should("be.oneOf", [1, 0]);
                cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                    cy.get(global.Selectors.upload.elements.apply).should("be.enabled").then(($ele) => {
                        cy.wrap($ele).should("be.visible").click({ force: true })
                    })
                })
            })
        })
    })

    // cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
    cy.log(global.BillLine_Invoice)
    cy.wait(["@list"], { timeout: 50000 }).then(() => {
        cy.LogNReport("Toaster Validation Successful : The invoice reversal feed has been applied successfully")
        cy.contains("The invoice reversal feed has been applied successfully").should("exist")
        // cy.visit(global.Selectors.upload.txt.next_Tab + "BillLineCharge_" + global.invoice_ID + '.htm')
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get('tbody')  // Get the tbody element
            .find('tr')    // Find all tr elements inside tbody
            .its('length') // Get the number of elements found
            .should('be.gt', 1);
    })
})



// Name:InvoiceReversal
// Description: This command helps you to navigate to UploadMenu .
// // Prerequisite: <none>
Cypress.Commands.add("InvoiceReversal", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.lockbox)
        .as("lockbox");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.list)
        .as("list");

    cy.contains(global.Selectors.upload.txt.billing_AR).should("be.visible").click({ force: true }).then(() => {
        cy.contains(" Uploads / Configuration ").should("be.visible").click({ force: true })
    })
    cy.readFile("cypress/fixtures/comment.json").then((profile) => {
        profile.IR_comment = 'Denied non compensable-Reverse by automation-DENIED'
        cy.writeFile('cypress/fixtures/comment.json', JSON.stringify(profile))
    })
    const jsonData = [
        ['Invoice', 'Reason', '****-*** Reason ID Code', 'Reversal Type', '****-*** ADJ ID Code', 'Notes/Source', 'Amount'],
        [global.uploadData.invoice, 'Denied by payor', '21335', 'RV', '1041', 'Denied non compensable-Reverse by automation-DENIED', global.uploadData.newReceivable]
    ];

    cy.LogNReport("Upload Invoice Reversal Document")
    var filename = "InvoiceReversal_"
    cy.createExcel(global.uploadData.invoice, jsonData, filename)
    cy.log("The invoice id is " + global.uploadData.invoice)
    cy.get(global.Selectors.upload.elements.lockbox_Tab2).should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.lockbox_Tab1).should("be.visible").click({ force: true })
    cy.wait(["@lockbox"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
        cy.wait(["@account_Upload", "@account_Upload"], { timeout: 20000 })
            .then((interception) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.upload.elements.Upload).should("be.visible").click({ force: true })
                cy.get(global.Selectors.upload.elements.tag_Select).should("be.visible").click({ force: true }).then(() => {
                    cy.contains("span.mdc-list-item__primary-text", "Invoice Reversal").should("be.visible").click({ force: true })
                })
            })
    })
    var filename = "InvoiceReversal_" + global.uploadData.invoice + ".csv"
    cy.fixture(filename, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                .then((input) => {
                    const testFile = new File([fileContent], filename, { type: "application/csv", });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });

    cy.get(global.Selectors.upload.elements.save_btn).should("be.visible").click({ force: true })
        .click({ force: true })

    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
            cy.wrap($e1).type("InvoiceReversal_" + global.uploadData.invoice + "{enter}").then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('tbody')  // Get the tbody element
                    .find('tr')    // Find all tr elements inside tbody
                    .its('length') // Get the number of elements found
                    .should("be.oneOf", [1, 0]);
                cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                    cy.get(global.Selectors.upload.elements.apply).should("be.enabled").then(($ele) => {
                        cy.wrap($ele).should("be.visible").click({ force: true })
                    })
                })
            })
        })
    })
    cy.LogNReport("Toaster Validation Successful : The invoice reversal feed has been applied successfully")
    cy.contains("The invoice reversal feed has been applied successfully").should("exist")
    // cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
    // cy.visit(global.Selectors.upload.txt.next_Tab + "InvoiceReversal_" + global.invoice_ID + '.htm')
    cy.wait(["@list"], { timeout: 50000 }).then(() => {

        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get('tbody')  // Get the tbody element
            .find('tr')    // Find all tr elements inside tbody
            .its('length') // Get the number of elements found
            .should('be.gt', 1);
    })
})

// Name:ZeroPaymentUpload
// Description: This command helps you to navigate to UploadMenu .
// // Prerequisite: <none>
Cypress.Commands.add("ZeroPaymentUpload", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.lockbox)
        .as("lockbox");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.list)
        .as("list");
    cy.contains(global.Selectors.upload.txt.billing_AR).should("be.visible").click({ force: true }).then(() => {
        cy.contains(" Uploads / Configuration ").should("be.visible").click({ force: true })
    })
    cy.readFile("cypress/fixtures/comment.json").then((profile) => {
        profile.Zero_comment = 'Incorrect claim number is Zero Payment Reason added'
        cy.writeFile('cypress/fixtures/comment.json', JSON.stringify(profile))
    })
    const jsonData = [
        ['Invoice', 'Zero Payment Reason', 'Zero Payment Reason Code', 'Notes'],
        [global.uploadData.invoice, 'Services not authorized', '22443', 'Incorrect claim number is Zero Payment Reason added']
    ];
    var filename = "ZeroPayment_"
    cy.createExcel(global.uploadData.invoice, jsonData, filename)
    cy.log("The invoice id is " + global.uploadData.invoice)
    cy.get(global.Selectors.upload.elements.lockbox_Tab2).should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.lockbox_Tab1).should("be.visible").click({ force: true })
    cy.wait(["@lockbox"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
        cy.wait(["@account_Upload", "@account_Upload"], { timeout: 20000 })
            .then((interception) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.upload.elements.Upload).should("be.visible").click({ force: true })
                cy.get(global.Selectors.upload.elements.tag_Select).should("be.visible").click({ force: true }).then(() => {
                    cy.contains("span.mdc-list-item__primary-text", "Zero Payment").should("be.visible").click({ force: true })
                })
            })
    })

    cy.LogNReport("Upload Zero Payment Document")
    var filename = "ZeroPayment_" + global.uploadData.invoice + ".csv"
    cy.fixture(filename, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                .then((input) => {
                    const testFile = new File([fileContent], filename, { type: "application/csv", });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });

    cy.get(global.Selectors.upload.elements.save_btn).should("be.visible").click({ force: true })
        .click({ force: true })

    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
            cy.wrap($e1).type("ZeroPayment_" + global.uploadData.invoice + "{enter}").then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('tbody')  // Get the tbody element
                    .find('tr')    // Find all tr elements inside tbody
                    .its('length') // Get the number of elements found
                    .should("be.oneOf", [1, 0]);
                cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                    cy.get(global.Selectors.upload.elements.apply).should("be.enabled").then(($ele) => {
                        cy.wrap($ele).should("be.visible").click({ force: true })
                    })
                })
            })
        })
    })
    cy.LogNReport("Toaster Validation Successful : The invoice reversal feed has been applied successfully")
    cy.contains("The invoice reversal feed has been applied successfully").should("exist")
    // cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
    // cy.visit(global.Selectors.upload.txt.next_Tab + "InvoiceReversal_" + global.invoice_ID + '.htm')
    cy.wait(["@list"], { timeout: 50000 }).then(() => {

        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");

        cy.get('tbody')  // Get the tbody element
            .find('tr')    // Find all tr elements inside tbody
            .its('length') // Get the number of elements found
            .should('be.gt', 1);
    })
})



// Name: UploadMenu
// Description: This command helps you to navigate to UploadMenu.
// Prerequisite: <none>
Cypress.Commands.add("UploadMenu", function () {
    cy.LogNReport("Verify navigation to Task Menu");
    cy.contains(global.Selectors.upload.txt.billing_AR)
        .should("be.visible")
        .click({ force: true });
    cy.contains(global.Selectors.upload.txt.upload_Menu)
        .should("be.visible")
        .click({ force: true });

});
// Name:PrepZeroAndReversalInvoice
// Description: This command helps you to get the recent invoice make the id applicable to zero and Invoice reversal
// Prerequisite: New bill and Invoice should be generated 
Cypress.Commands.add("PrepZeroPayment", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.bill_review_Queue)
        .as("bill_review_Queue");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.act_Invoice)
        .as("act_Invoice")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.navigation)
        .as("navigation")

    cy.log("Searching Bill ")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.search_Bills.url.bill)
        .as("bill")
    cy.LogNReport("Searching with bill and claim number");
    //fetching dynamic data from

    let bill = global.uploadData.bill
    let claim = global.uploadData.claim
    cy.get(global.Selectors.search_Bills.elements.menu).click({ force: true }).then(() => {
        cy.contains(global.Selectors.search_Bills.txt.include_deleted).should("be.visible").click()
        cy.get(global.Selectors.search_Bills.elements.search_claim).should("be.visible").type(claim, { delay: 100 })
        cy.get(global.Selectors.search_Bills.elements.search_bill_ID).should("be.visible").type(bill + global.Selectors.bills.elements.enter).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.search_Bills.elements.check_claim).contains(claim)
            cy.get(global.Selectors.search_Bills.elements.check_bill).should("be.visible").contains(bill).click({ force: true })
        })
    })

    cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 }).then(() => {

        cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
            cy.wrap($ele1).type(global.Selectors.generate_Invoice_Bill.txt.invoice + global.Selectors.bills.txt.down_Enter)
        })
    })
    var number = 0;
    cy.wait(["@navigation"], { timeout: 50000 }).then(() => {

        cy.get(global.Selectors.upload.elements.table_7).should("be.visible").click({ force: true }).then(($ele) => {
            cy.wrap($ele).clear().type(global.Selectors.upload.txt.zero)
        })
        cy.get(global.Selectors.upload.elements.table_9).should("be.visible").click({ force: true }).then(($ele) => {
            cy.wrap($ele).clear().type(global.Selectors.upload.txt.zero)
        })
        cy.get(global.Selectors.upload.elements.save).should("be.visible").click({ force: true })
        cy.contains(global.Selectors.upload.txt.saved_Txt).should("not.exist")


        // const jsonData = [
        //     ['Invoice', 'Zero Payment Reason', 'Zero Payment Reason Code', 'Notes'],
        //     [global.uploadData.invoice, 'Incorrect claim number', '22443', 'Zero Payment test incorrect zero payment reason']
        // ];
        // var filename = "ZeroPayment_"
        // cy.createExcel(global.uploadData.invoice, jsonData, filename)
    })

});


// Name:ZeroPayment
// Description: This command helps to upload zero payment file 
// Prerequisite: Updating file should be present
Cypress.Commands.add("ZeroPayment", function (invoice) {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.lockbox)
        .as("lockbox");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.contains(global.Selectors.upload.txt.billing_AR).should("be.visible").click({ force: true }).then(() => {
        cy.contains(" Uploads / Configuration ").should("be.visible").click({ force: true })
    })
    cy.log("The invoice id is " + global.invoice_ID)
    cy.get(global.Selectors.upload.elements.lockbox_Tab2).should("be.visible").click({ force: true })
    cy.get(global.Selectors.upload.elements.lockbox_Tab1).should("be.visible").click({ force: true })
    cy.wait(["@lockbox"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
        cy.wait(["@account_Upload", "@account_Upload"], { timeout: 20000 })
            .then((interception) => {
                cy.get(global.Selectors.upload.elements.Upload).should("be.visible").click({ force: true })
                cy.get(global.Selectors.upload.elements.tag_Select).should("be.visible").click({ force: true }).then(() => {
                    cy.get("#upload-option-4").should("be.visible").click({ force: true })
                })
            })
    })
    var filename = "ZeroPayment_" + global.invoice_ID + ".csv"
    cy.fixture(filename, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                .then((input) => {
                    const testFile = new File([fileContent], filename, { type: "application/csv", });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });

    cy.get("#savebtn").should("be.visible").click({ force: true })
        .click({ force: true })

    // cy.get('[href="#/billing/upload-configuration/account-transaction-feed"]').should("be.visible").click({ force: true })
    // cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
    //     //  cy.get('#matTable > tbody > tr:nth-child(1) > td:nth-child(1)> mat-checkbox').should("be.visible").click({ force: true })
    //     cy.get("input[type=\"checkbox\"]").first().should("be.visible").click({ force: true }).then(() => {
    //         cy.get('#applyBtn').should("be.visible").click({ force: true })
    //     })
    // })

})

// Name:UploadMenu
// Description: This command helps you to update specific value in excel
// Prerequisite: Updating file should be present
Cypress.Commands.add("createExcel", function (invoice, jsonData, filename) {
    cy.log("invoice  " + invoice)

    // Convert JSON to CSV using Papa.parse
    const csvData = Papa.unparse(jsonData, {
        header: false
    });
    // Write CSV data to a file
    cy.LogNReport("CSV file generated : " + filename + invoice + '.csv')
    cy.writeFile('./cypress/fixtures/' + filename + invoice + '.csv', csvData).then(() => {
        // Perform assertions or further actions as needed
        // For example, you can validate the CSV file or upload it to a server
        cy.log("csv file updated ")
    });
});

// Name:APValidate
// Description: This command helps you to visit the processed Ap uploaded Invoice
// Prerequisite: Updating file should be present
Cypress.Commands.add("APValidate", function () {
    // /Enterprise-api/jaxrs/accountingTransactions/listFeeds
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.pageCount)
        .as("pageCount");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })

    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
            .should("be.visible")
            .click({ force: true })
    })

    cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })

    cy.LogNReport("Validate AP Document is Processed and Approved")
    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
            .should("be.visible")
            .click({ force: true })
    })
    cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
        .last()
        .should("be.visible")
        .click({ force: true }).then(() => {
            cy.wait(["@pageCount"], { timeout: 70000 }).then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");

                cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
                    cy.wrap($e1).type("APUpload_" + global.uploadData.invoice + "{enter}").then(() => {
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get('tbody')  // Get the tbody element
                            .find('tr')    // Find all tr elements inside tbody
                            .its('length') // Get the number of elements found
                            .should("be.oneOf", [1, 0]);
                        cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                            cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                                cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
                            })
                        })
                    })
                })
            })
        })
    global.testCaseId = 153431
    var fileName = "APUpload_" + global.uploadData.invoice + '.htm'
    cy.readFile('./cypress/downloads/' + fileName).should('exist').then(() => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.visit(global.Selectors.upload.txt.next_Tab + "APUpload_" + global.uploadData.invoice + '.htm')
    });
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
})

// Name:ARValidate
// Description: This command helps you to visit the processed AR uploaded Invoice
// Prerequisite: Updating file should be present
Cypress.Commands.add("ARValidate", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.pageCount)
        .as("pageCount");
    cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
        .should("be.visible")
        .click({ force: true })
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
    cy.LogNReport("Validate AR Document is Processed and Approved")

    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
            .should("be.visible")
            .click({ force: true })
    })
    global.testCaseId = 150667
    cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
        .last()
        .should("be.visible")
        .click({ force: true }).then(() => {
            cy.wait(["@pageCount"], { timeout: 70000 }).then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
                    cy.wrap($e1).type("ARUpload_" + global.uploadData.invoice + "{enter}").then(() => {
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get('tbody')  // Get the tbody element
                            .find('tr')    // Find all tr elements inside tbody
                            .its('length') // Get the number of elements found
                            .should("be.oneOf", [1, 0]);
                        cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                            cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
                        })
                    })
                })
            })
        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.visit(global.Selectors.upload.txt.next_Tab + "ARUpload_" + global.uploadData.invoice + '.htm')

})

// Name:BillValidate
// Description: This command helps you to visit the processed BillLine Charge uploaded Invoice
// Prerequisite: Updating file should be present
Cypress.Commands.add("BillValidate", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.pageCount)
        .as("pageCount");
    cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
        .should("be.visible")
        .click({ force: true })
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
    cy.LogNReport("Validate BillLine Charge Document is Processed and Approved")

    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
            .should("be.visible")
            .click({ force: true })
    })

    cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
        .last()
        .should("be.visible")
        .click({ force: true }).then(() => {
            cy.wait(["@pageCount"], { timeout: 70000 }).then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
                    cy.wrap($e1).type("BillLineCharge_" + global.uploadData1.oldInvoice + "{enter}").then(() => {
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get('tbody')  // Get the tbody element
                            .find('tr')    // Find all tr elements inside tbody
                            .its('length') // Get the number of elements found
                            .should("be.oneOf", [1, 0]);
                        cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                            cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
                        })
                    })
                })
            })
        })
    global.testCaseId = 153434
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.visit(global.Selectors.upload.txt.next_Tab + "BillLineCharge_" + global.uploadData1.oldInvoice + '.htm')
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
})

// Name:ReversalValidate
// Description: This command helps you to visit the processed Reversal Invoice uploaded Invoice
// Prerequisite: Updating file should be present
Cypress.Commands.add("ReversalValidate", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.pageCount)
        .as("pageCount");
    cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
        .should("be.visible")
        .click({ force: true })
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.get(global.Selectors.upload.elements.account_Upload_Tab).should("be.visible").click({ force: true })
    cy.LogNReport("Validate Invoice Reversal Document is Processed and Approved")
    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
            .should("be.visible")
            .click({ force: true })
    })
    cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
        .last()
        .should("be.visible")
        .click({ force: true }).then(() => {
            cy.wait(["@pageCount"], { timeout: 70000 }).then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
                    cy.wrap($e1).type("InvoiceReversal_" + global.uploadData.invoice + "{enter}").then(() => {
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get('tbody')  // Get the tbody element
                            .find('tr')    // Find all tr elements inside tbody
                            .its('length') // Get the number of elements found
                            .should("be.oneOf", [1, 0]);
                        cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                            cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true })
                        })
                    })
                })
            })
        })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");

    cy.visit(global.Selectors.upload.txt.next_Tab + "InvoiceReversal_" + global.uploadData.invoice + '.htm')

})

// Name:ZeroValidate
// Description: This command helps you to visit the processed Zero payment uploaded Invoice
// Prerequisite: Updating file should be present
Cypress.Commands.add("ZeroValidate", function (invoice2, invoice1) {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.pageCount)
        .as("pageCount");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.account_Upload)
        .as("account_Upload");
    cy.get(global.Selectors.upload.elements.account_tab).should("be.visible").click({ force: true })
    cy.LogNReport("Validate Zero Payment Document is Processed and Approved")
    cy.wait(["@account_Upload"], { timeout: 20000 }).then(() => {
        global.testCaseId = 150645
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
            .should("be.visible")
            .click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
        cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
            .last()
            .should("be.visible")
            .click({ force: true }).then(() => {
                cy.wait(["@pageCount"], { timeout: 70000 }).then(() => {
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                    cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
                        cy.wrap($e1).type(invoice2 + "{enter}", { delay: 100 }).then(() => {
                            cy.get(global.Selectors.landing.elements.loading_Indicator)
                                .should("not.exist");
                            cy.get('tbody')  // Get the tbody element
                                .find('tr')    // Find all tr elements inside tbody
                                .its('length') // Get the number of elements found
                                .should('eq', 2);
                            cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                                cy.LogNReport("Download Uploaded Zero Payment Document")
                                cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true }).then(() => {
                                    global.testCaseId = 150554
                                    cy.LogNReport("Download Uploaded Invoice reversal Document")
                                    cy.get(global.Selectors.upload.elements.download1).should("be.visible").click({ force: true })
                                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
                                })
                            })
                        })
                    })
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");

                    cy.get('.cdk-column-fileName > #subFilter').should("be.visible").click({ force: true }).then(($e1) => {
                        cy.wrap($e1).clear().type(invoice1 + "{enter}", { delay: 100 }).then(() => {
                            cy.get(global.Selectors.landing.elements.loading_Indicator)
                                .should("not.exist");
                            cy.get('tbody')  // Get the tbody element
                                .find('tr')    // Find all tr elements inside tbody
                                .its('length') // Get the number of elements found
                                .should('eq', 3);
                            cy.get(global.Selectors.upload.elements.first_Record).first().click({ force: true }).then(() => {
                                cy.LogNReport("Download Uploaded Account Payable Document")
                                global.testCaseId = 150669
                                cy.get(global.Selectors.upload.elements.download).should("be.visible").click({ force: true }).then(() => {
                                    cy.LogNReport("Download Uploaded Account Receivable Document")
                                    cy.get(global.Selectors.upload.elements.download1).should("be.visible").click({ force: true }).then(() => {
                                        cy.LogNReport("Download Uploaded Bill Line Charge Document")
                                        cy.get(global.Selectors.upload.elements.download2).should("be.visible").click({ force: true })
                                    })
                                })
                                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
                            })
                        })
                    })
                })
            })

        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");

    })
})
// Name:BillSearch
// Description: This command helps you to navigate to respective Bill and Invoice screen 
// Prerequisite: Bill and Invoice should be created
Cypress.Commands.add("BillSearch", function (bill) {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.bill_review_Queue)
        .as("bill_review_Queue");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.act_Invoice)
        .as("act_Invoice")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.navigation)
        .as("navigation")

    cy.log("Searching Bill ")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.search_Bills.url.bill)
        .as("bill")
    cy.LogNReport("Searching with bill and claim number");
    //fetching dynamic data from

    cy.get(global.Selectors.search_Bills.elements.menu).click({ force: true }).then(() => {
        cy.contains(global.Selectors.search_Bills.txt.include_deleted).should("be.visible").click()
        // cy.get(global.Selectors.search_Bills.elements.search_claim).should("be.visible").type(claim, { delay: 100 })
        cy.get(global.Selectors.search_Bills.elements.search_bill_ID).should("be.visible").type(bill + global.Selectors.bills.elements.enter).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            // cy.get(global.Selectors.search_Bills.elements.check_claim).contains(claim)
            cy.get(global.Selectors.search_Bills.elements.check_bill).should("be.visible").contains(bill).click({ force: true })
        })
    })

    cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 }).then(() => {

        cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
            cy.wrap($ele1).type(global.Selectors.generate_Invoice_Bill.txt.invoice + global.Selectors.bills.txt.down_Enter)
        })
    })
    var number = 0;
    cy.wait(["@navigation"], { timeout: 50000 }).then(() => {
    })
})

// Name:ValidateComments
// Description: This command helps you to navigate to respective Bill and Invoice screen 
// Prerequisite: Bill and Invoice should be created
Cypress.Commands.add("ValidateComments", function (bill) {

    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.comment)
        .as("comment")
    cy.get(global.Selectors.upload.elements.comment).should("be.visible").click({ force: true })
    cy.wait(["@comment"], { timeout: 90000 }).then(() => {
        cy.LogNReport("Validate Comments are Uploaded ")
        cy.get(global.Selectors.upload.elements.comment_Body).should("be.visible").then(($w1) => {
            cy.LogNReport("Validate Comments are Uploaded from AP " + global.comment.AP_Comment)
            cy.wrap($w1).contains(global.comment.AP_Comment)
            cy.LogNReport("Validate Comments are Uploaded from AR " + global.comment.AR_comment)
            cy.wrap($w1).contains(global.comment.AR_comment)
            cy.LogNReport("Validate Comments are Uploaded from Bill Line Charge " + global.comment.billChargeComment)
            cy.wrap($w1).contains(global.comment.billChargeComment)

        })

    })
})

// Name:ValidateZero
// Description: This command helps you to navigate to respective Bill and Invoice screen 
// Prerequisite: Bill and Invoice should be created
Cypress.Commands.add("ValidateValues", function (invoice) {

    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.comment)
        .as("comment")
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.record)
        .as("record")

    cy.get(global.Selectors.upload.elements.comment).should("be.visible").click({ force: true })
    cy.wait(["@comment"], { timeout: 90000 }).then(() => {
        cy.get(global.Selectors.upload.elements.comment_Body).should("be.visible").then(($w1) => {
            cy.wrap($w1).contains(global.comment.Zero_comment, { timeout: 90000 })
            // cy.wrap($w1).contains(global.comment.IR_comment)
            cy.get(global.Selectors.upload.elements.record).should("be.visible").click({ force: true })
            cy.get(global.Selectors.upload.elements.comment).should("be.visible").click({ force: true })
            cy.wait(["@comment"], { timeout: 90000 }).then(() => {
                cy.LogNReport("Validate - " + global.comment.Zero_comment + " present in respective Invoice")
                cy.get(global.Selectors.upload.elements.comment_Body).should("be.visible").contains(global.comment.Zero_comment, { timeout: 10000 })
            })
        })
        cy.get(global.Selectors.upload.elements.record).should("be.visible").click({ force: true })
        cy.wait(["@record"], { timeout: 30000 }).then(() => {
            cy.wait(["@record"], { timeout: 30000 }).then((interception) => {
                const responseData = interception.response.body
                let zeroPaymentReason = responseData.zeroPaymentReason;
                let reversalReason = responseData.reversalReason
                if (zeroPaymentReason === global.Selectors.upload.txt.Zero_Validate) {
                    cy.log('Zero payment validated : ' + zeroPaymentReason)
                    cy.LogNReport("Validate Zero payment Reason updated as " + zeroPaymentReason)
                }
                if (reversalReason === global.Selectors.upload.txt.reversalReason) {
                    cy.log('Reversal reason validated : ' + reversalReason)
                    cy.LogNReport("Validate Invoice Reversal Reason updated as " + reversalReason)
                }
            })
        })
    })

})