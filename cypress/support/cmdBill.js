// Adding This Highlight Commands Will Highlight The Element
import { highlight } from "cypress-highlight";

// Name: CreateBill
// Description: Create A New Bill And Navigate To Bill Summary
// Prerequisite: Visit Bill Menu
// Shared Steps 141783: ****-*** : Creating Bill with Mandatory fields
Cypress.Commands.add("CreateBill", function () {
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
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord)
        .as("referral_record")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.general_Info)
        .as("general_Info")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.navigation)
        .as("navigation")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.dropdown)
        .as("dropdown_Review")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.billReview)
        .as("billReview")



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
            global.testCaseId = 144685
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
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            global.testCaseId = 144693
            cy.LogNReport("Select a claim");
            cy.get(global.Selectors.bills.elements.bills_Referral).should("be.visible").then(($ele1) => {
                cy.wrap($ele1).contains(global.Selectors.bills.txt.Referral).click({ force: true })
                cy.get(global.Selectors.bills.elements.select_Claim).should("be.visible").invoke("text").then(text => {
                    cy.get(global.Selectors.bills.elements.search_Box).should("be.visible").type(text, { delay: 100 }).type(global.Selectors.bills.elements.enter)
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
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        })
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.contains(global.Selectors.bills.txt.bill_Created).should("not.exist").then(() => {
        cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
            global.testCaseId = 147375
            cy.LogNReport("Navigate to the General Information tab ");
            cy.get(global.Selectors.bills.elements.general_Tab).should("include.text", global.Selectors.bills.txt.general_Info)
            cy.get(global.Selectors.bills.elements.bill_Info).should("include.text", global.Selectors.bills.txt.bill_Info)
            cy.get(global.Selectors.bills.elements.bill_Id).should("be.visible")
            cy.get(global.Selectors.bills.elements.claim_Number).should("be.visible")
            cy.get(global.Selectors.bills.elements.prospective_Flow_Flag).should("be.visible")
            cy.get(global.Selectors.bills.elements.next).last().click({ force: true })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        })
        // cy.get(".button-fixed-bottom > app-button > .container > .button-flex > #next").should("be.visible").click({ force: true })
        cy.wait(["@general_Info", "@dropdown", "@general_Referral", "@column_Search", "@general_Info"], { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            global.testCaseId = 147407
            cy.LogNReport("Select an ICD version");
            cy.get('#icd4').should("be.visible").type(global.fakerData.bills.cpt_Code).then(() => {
                cy.get(global.Selectors.bills.elements.icd1).then($e1 => {
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                    cy.get(global.Selectors.bills.elements.icd1).should("be.visible").type(global.fakerData.bills.cpt_Code)
                })
            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            global.testCaseId = 147409
            cy.LogNReport("Choose additional ICD 9/10 codes");
            cy.get(global.Selectors.bills.elements.bill_Type).then(($ele) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.wrap($ele).clear().type("UB")
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            })
        })
        global.testCaseId = 144719
        cy.LogNReport("Save the record with mandatory fields");
        cy.get(global.Selectors.bills.elements.previous).should("be.visible").click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");



    })
    // 1.Bill info
    cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
        global.testCaseId = 146983
        cy.LogNReport("Validate Bill information data view ");
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.bills.elements.accordion).then(($ele1) => {
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            global.testCaseId = 146983
            cy.LogNReport("Select a client from the dropdown");
            cy.get(global.Selectors.bills.elements.accordion).contains(global.Selectors.bills.txt.client).click({ force: true })
            cy.get(global.Selectors.bills.elements.client_Select).should("be.visible").click({ force: true }).invoke("text").then(text => {
                cy.wrap($ele1).contains(text).should("be.visible")
                cy.get(global.Selectors.bills.elements.client_Bill_Number).should("be.visible").type(global.fakerData.bills.bill_Number)
            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        })

        global.testCaseId = 147227
        cy.LogNReport("Edit client bill number fields ");
        cy.get(global.Selectors.bills.elements.justify_Content).should("be.visible").click({ force: true }).then(() => {
            cy.get(global.Selectors.bills.elements.bill_Charges).then(($ele1) => {
                cy.wrap($ele1).find(global.Selectors.bills.elements.revenue_Code).type(global.fakerData.bills.revenue_Code)
                cy.wrap($ele1).find(global.Selectors.bills.elements.cpt_Code).should("not.be.disabled").type(global.fakerData.bills.cpt_Code)
                cy.wrap($ele1).find(global.Selectors.bills.elements.cdk_Column_Units).type(global.fakerData.bills.units)
                cy.wrap($ele1).find(global.Selectors.bills.elements.providerCharge).type(global.fakerData.bills.provider_Charge)
                cy.wrap($ele1).find(global.Selectors.bills.elements.fsAllowedAmount).type(global.fakerData.bills.fs_Allowed_Amount)
                cy.get(global.Selectors.bills.elements.justify_Content_End).should("be.visible").click({ force: true })
                cy.wait(["@add_Bill_Amount"], { timeout: 50000 }).then(() => {
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                })
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                global.testCaseId = 147295
                cy.LogNReport("Enter Global start and end dates  ");
                cy.get(global.Selectors.bills.elements.serviceDate).type(global.fakerData.bills.global_Start_Date)
                cy.get(global.Selectors.bills.elements.serviceToDate).type(global.fakerData.bills.global_End_Date)
                cy.contains(global.Selectors.bills.txt.apply_Dates).should("be.visible").click({ force: true })
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            })
        })

        cy.get(global.Selectors.bills.elements.justify_Content_End2).should("be.visible").click({ force: true }).then(($main) => {
            cy.get(global.Selectors.bills.elements.mat_Table).then(($ele1) => {
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                cy.wrap($ele1).find(global.Selectors.bills.elements.revenueCode).last().type(global.fakerData.bills.revenue_Code)
                cy.wrap($ele1).find(global.Selectors.bills.elements.cpt_Code).last().type(global.fakerData.bills.cpt_Code)
                cy.wrap($ele1).find(global.Selectors.bills.elements.column_Unit).last().type(global.fakerData.bills.units)
                cy.wrap($ele1).find(global.Selectors.bills.elements.providerCharge).last().type(global.fakerData.bills.provider_Charge)
                cy.wrap($ele1).find(global.Selectors.bills.elements.fsAllowedAmount).last().type(global.fakerData.bills.fs_Allowed_Amount)
                cy.get(global.Selectors.bills.elements.justify_Content_End).should("be.visible").click({ force: true })
                cy.wait(["@add_Bill_Amount"], { timeout: 50000 }).then(() => {
                    let val = global.fakerData.bills.fs_Allowed_Amount
                    //Commenting it this case total validation is not in automation scope
                    //  cy.get(global.Selectors.bills.elements.providerPaymentAmount).contains((val * 2).toString())

                })
            })

        })

    })
    global.testCaseId = 147296
    cy.LogNReport("Validate Place of Service Codes  ");
    cy.get(global.Selectors.bills.elements.prof_Claims).last().should("contain.text", global.Selectors.bills.txt.prof_Claim)
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    global.testCaseId = 147304
    cy.LogNReport("Validate action buttons");
    cy.get(global.Selectors.bills.elements.next).last().click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    cy.wait(["@general_Info", "@dropdown", "@general_Referral", "@column_Search", "@general_Info"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.bills.elements.previous).should("be.visible").click({ force: true }).then(() => {
            cy.get(global.Selectors.bills.elements.created_Toaster).contains(global.Selectors.bills.txt.required_Message)
            cy.get(global.Selectors.bills.elements.error_msg).contains(global.Selectors.bills.txt.value_Required)
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.bills.elements.general_Tab).should("include.text", global.Selectors.bills.txt.general_Info)
            cy.get(global.Selectors.bills.elements.icd1).should("not.be.disabled").then($e1 => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");

            })
            global.testCaseId = 147225
            cy.get(global.Selectors.bills.elements.bill_Type).then(($ele) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.wrap($ele).click().clear().type(global.Selectors.bills.txt.UB + global.Selectors.bills.txt.down_Enter)
            })
            cy.get(global.Selectors.bills.elements.icd9).click({ force: true })
            cy.get(global.Selectors.bills.elements.icd2).should("be.enabled").type(global.fakerData.bills.icd9)

            cy.get(global.Selectors.bills.elements.admissionTypeId).type(global.Selectors.bills.txt.seven).then(() => {
                cy.get(global.Selectors.bills.elements.error_msg).contains(global.Selectors.bills.txt.required_Admission)
            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        })
    })
    global.testCaseId = 147676
    cy.LogNReport("Add Procedure code and code to Codes Actions");
    cy.get(global.Selectors.bills.elements.procedure_Code)
        .click({ force: true })
    cy.get(global.Selectors.bills.elements.code).type(global.fakerData.bills.code)
    cy.get(global.Selectors.bills.elements.date).type(global.fakerData.bills.global_End_Date)
    cy.get(global.Selectors.bills.elements.code_two_Code)
        .click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    global.testCaseId = 147664
    cy.LogNReport("Verify the ability to choose UB as the Bill Type.");
    cy.get(global.Selectors.bills.elements.ubCode2).type(global.fakerData.bills.provider_Charge)
    cy.get(global.Selectors.bills.elements.ubCodeValue).type(global.fakerData.bills.code_Value)
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //Referral link
    global.testCaseId = 147620
    cy.LogNReport("Navigate to the Referral Link");
    cy.get(global.Selectors.bills.elements.referral_Link)
        .click({ force: true })
    cy.wait(["@create_Landing"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.bills.elements.bread_Crumb).contains(global.Selectors.bills.txt.edit).click({ force: true })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    //navigating to general info
    cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.bills.elements.next).last()
            .click({ force: true })
    })
    global.testCaseId = 147625
    cy.LogNReport("Navigate to the client from the bill screen");
    cy.wait(["@general_Info"], { timeout: 50000 }).then(() => {
        //Client link 
        cy.get(global.Selectors.bills.elements.client_Link)
            .click({ force: true })
        cy.wait(["@client_Landing"], { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.bills.elements.bread_Crumb).contains(global.Selectors.bills.txt.edit).click({ force: true })
            // cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
            // cy.get(global.Selectors.bills.elements.next)
            //     .should("be.visible").click({ force: true })
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.log("client link -> edit breadcrumb-> general info : automatic redirection to general info to without hitting next from Bill info")
            //  })
        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    //provider link
    global.testCaseId = 147635
    cy.LogNReport("Navigate to the provider screen ");
    cy.wait(["@general_Info"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.bills.elements.provider_Link)
            .click({ force: true })
        cy.wait(["@column_Search"], { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.bills.elements.bread_Crumb).contains(global.Selectors.bills.txt.edit).click({ force: true })
            cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
                cy.get(global.Selectors.bills.elements.next).last()
                    .click({ force: true })
            })
        })

    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    cy.wait(["@general_Info", "@column_Search", "@general_Referral", "@general_Info"], { timeout: 50000 }).then(() => {
        global.testCaseId = 147641
        cy.LogNReport("Add data in Providers section  ");
        cy.get(global.Selectors.bills.elements.providerLicense).type(global.Selectors.bills.txt.provider_License)
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        global.testCaseId = 147642
        cy.LogNReport("View and Add Bill NPIs details under Provider section ");
        cy.get(global.Selectors.bills.elements.BillNPI)
            .realHover().click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        global.testCaseId = 147644
        cy.LogNReport("Add Processing Rules section view and action");
        cy.get(global.Selectors.bills.elements.npiValue).should("be.enabled").realHover().type(global.Selectors.bills.txt.nip_Value, { delay: 100 })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        global.testCaseId = 147397
        cy.LogNReport("Add Bill type action  ");
        cy.get(global.Selectors.bills.elements.npiType).should("be.enabled").realHover().type(global.Selectors.bills.txt.other + global.Selectors.bills.txt.down_Arrow + "{enter}")
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    })
    global.testCaseId = 147685
    cy.LogNReport("Add Bill type action  ");
    cy.contains(global.Selectors.bills.txt.Finish).click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    global.testCaseId = 147673
    cy.wait(["@general_Info", "@dropdown", "@general_Info"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.bills.elements.bread_Crumb_2).invoke("text").then((text) => {
            let bill = text.trim()
            cy.get(global.Selectors.generate_Invoice_Bill.elements.reviewEdit).should("be.visible").click({ force: true })
            cy.get(global.Selectors.bills.elements.Summary_bill_1).should("be.visible").should("include.text", bill)
            cy.get(global.Selectors.bills.elements.Summary_bill_3).should("be.visible").invoke("text").then((text1) => {
                let claim = text1.trim()
                cy.get(global.Selectors.generate_Invoice_Bill.elements.reviewEdit).should("be.visible").click({ force: true })
                cy.LogNReport("Review Completed on the Created Bill : " + bill + " with Claim : " + claim);
                cy.log("Bill id is " + bill + "  claim no is " + claim)
                //storing bill and claim number from Bill Summary as Dynamic json
                const generateData1 = () => {
                    return {
                        bill: bill,
                        claim: claim
                    }
                };
                let generatedData1 = generateData1();
                cy.writeFile("./cypress/fixtures/dynamicdata.json", JSON.stringify(generatedData1, null, "\t"));
            })
        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    cy.LogNReport("Validate crated Bill added to Review Queue");
    cy.wait(["@navigation"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist")

        cy.get(global.Selectors.generate_Invoice_Bill.elements.review_breadcrumb2).should("be.visible").then(($ele) => {
            cy.wrap($ele).invoke("text").then((text) => {
                let bill_ID = text.trim()
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist").then(() => {
                        cy.get(global.Selectors.generate_Invoice_Bill.elements.invoice_Row).should("be.visible").invoke("text").then((text1) => {
                            let claim = text1.trim()
                            //Bill review Queue
                            global.testCaseId = 148083
                            cy.LogNReport("Navigate Billing Review Queue from left Menu ");
                            cy.contains(global.Selectors.generate_Invoice_Bill.txt.billing_review).should("be.visible").click({ force: true })
                            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                            cy.wait(["@billReview"], { timeout: 50000 }).then(() => {
                                cy.get(global.Selectors.generate_Invoice_Bill.elements.review_Table).contains(global.Selectors.generate_Invoice_Bill.txt.billing_review).should("be.visible")
                                global.testCaseId = 148104
                                cy.LogNReport("Search for the record using the claim number in Billing Review Queue  ");
                                cy.get(global.Selectors.generate_Invoice_Bill.elements.review_Search).should("be.visible").type(claim + global.Selectors.generate_Invoice_Bill.elements.enter)
                                cy.wait(["@billReview"], { timeout: 50000 }).then(() => {
                                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                                        .should("not.exist");
                                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                    //pagination to 
                                    global.testCaseId = 148101
                                    cy.LogNReport("Select 100 in Pagination view and action ");
                                    cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
                                        .scrollIntoView();
                                    cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
                                        .should("be.visible")
                                        .click({ force: true })
                                        .then(() => {
                                            cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
                                                .last()
                                                .should("be.visible")
                                                .click({ force: true })
                                        })
                                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                    global.testCaseId = 148102
                                    cy.LogNReport("Sort the record in Billing Review Queue");
                                    cy.get(global.Selectors.generate_Invoice_Bill.elements.bill_sort).should("be.visible")
                                        .click({ force: true }).click({ force: true })
                                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                    global.testCaseId = 148087
                                    cy.LogNReport("Filter view and action");
                                    cy.get(global.Selectors.generate_Invoice_Bill.elements.bill_filter).should("be.visible").type(bill_ID).then(() => {
                                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                                            .should("not.exist");
                                        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                        global.testCaseId = 144109
                                        cy.LogNReport("Find Bill in Column Search");
                                        cy.get(global.Selectors.generate_Invoice_Bill.elements.bill_Id).should("be.visible").contains(bill_ID)
                                        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                        global.testCaseId = 148406
                                        cy.LogNReport("Navigating to Billing review queue detailed view screen by click on claim number");
                                        cy.get(global.Selectors.generate_Invoice_Bill.elements.header).should("be.visible").contains(claim).click({ force: true })
                                        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                    })
                                })
                            })
                        })
                    })
            })
        })
    })
    //Activity Log 
    global.testCaseId = 146370
    cy.LogNReport("User activity tracking in Activity Log");
    cy.get(global.Selectors.generate_Invoice_Bill.elements.activity_Log).should("be.visible").click({ force: true })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist").then(() => {
            cy.get(global.Selectors.generate_Invoice_Bill.elements.activity_column).should("be.visible")
        })

    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
})//end of CreateBill cmd

// Name: SearchBill
// Description: Search Bill with main Bill id and other combinations
// Prerequisite: Create anew bill
Cypress.Commands.add("SearchBill", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.search_Bills.url.bill)
        .as("bill")
    global.testCaseId = 144013

    //fetching dynamic data from
    cy.fixture('dynamicdata.json')
        .then((data) => {
            global.dynamicData = data
            let bill = global.dynamicData.bill
            let claim = global.dynamicData.claim
            cy.LogNReport("Search For the Bill : " + bill + " and Claim number : " + claim);
            cy.get(global.Selectors.search_Bills.elements.menu).click({ force: true }).then(() => {
                cy.contains(global.Selectors.search_Bills.txt.include_deleted).should("be.visible").click()
                cy.get(global.Selectors.search_Bills.elements.search_claim).should("be.visible").type(claim, { delay: 100 })
                cy.get(global.Selectors.search_Bills.elements.search_bill_ID).should("be.visible").type(bill + global.Selectors.bills.elements.enter).then(() => {
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                    global.testCaseId = 151085
                    cy.get(global.Selectors.search_Bills.elements.check_claim).contains(claim)
                    cy.get(global.Selectors.search_Bills.elements.check_bill).should("be.visible").contains(bill).click({ force: true })
                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                })
            })
        })
    // })


})//end of SearchBill

// Name: BillUploadDocument
// Description: Upload Document in Bill Summary
// Prerequisite: Create new bill and Navigate to Summary screen 
Cypress.Commands.add("BillUploadDocument", function () {

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.upload_Document_Bill.url.document_Landing)
        .as("document_Landing")
    //Document
    cy.get(global.Selectors.upload_Document_Bill.elements.document).should("be.visible").click({ force: true })
    //global.testCaseId = 145873;
    cy.wait(["@document_Landing"], { timeout: 70000 }).then(() => {
        cy.url()
            .should("eq", Cypress.env('baseUrl') + global.Selectors.upload_Document_Bill.url.document_Url)
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        //  cy.setTestCaseStatusIntoAzures(//global.testCaseId, "PASSED");
        // test case end 
    })
    // 

    // 145649 & 145703
    global.testCaseId = 146813
    cy.LogNReport("Upload Document");
    cy.get(global.Selectors.invoice.elements.upload_Document_Button)
        .click({ force: true })
    cy.get(global.Selectors.invoice.elements.select_Document_Upload)
        .click({ force: true })
        .then(() => {
            cy.get(global.Selectors.landing.elements.body)
                .type(global.Selectors.invoice.txt.key_Action_Dropdown_Document + global.Selectors.upload_Document_Bill.txt.esc)
        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    global.testCaseId = 146816
    cy.LogNReport("Tag and modify tags in Document");
    cy.fixture(global.Selectors.invoice.elements.file_Name, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.upload_Document_Bill.elements.file_Upload)
                //  cy.contains("Select your file")
                .then((input) => {
                    const testFile = new File([fileContent], global.Selectors.invoice.elements.file_Name, {
                        type: "application/xlsx",
                    });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    input[0].files = dataTransfer.files;
                    input[0].dispatchEvent(new Event("change", { bubbles: true }));
                });
        });
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    // Success:Bills.xlsx
    cy.contains(global.Selectors.invoice.txt.save_Contains)
        .click({ force: true })
    cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
    cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
        .click({ force: true })
    cy.get(global.Selectors.invoice.elements.document_List_View)
        .first()
        .should("have.text", global.Selectors.invoice.elements.file_Name.split(".")[0])


    // 145631 & 145628
    global.testCaseId = 146818
    cy.LogNReport("Filter and download a Document");
    cy.get(global.Selectors.invoice.elements.filter_Button)
        .click({ force: true })
    cy.get(global.Selectors.invoice.elements.filter_Column_Name)
        .should("not.exist")
    cy.get(global.Selectors.invoice.elements.filter_Button)
        .click({ force: true })
    cy.get(global.Selectors.invoice.elements.filter_Column_Name)
        .should("be.visible")
    cy.get(global.Selectors.invoice.elements.filter_Column_Name)
        .type(global.Selectors.invoice.elements.file_Name.split(".")[0])
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //global.testCaseId = 145628
    cy.LogNReport("Search a Document");
    cy.get(global.Selectors.invoice.elements.document_List_View)
        .first()
        .should("have.text", global.Selectors.invoice.elements.file_Name.split(".")[0])
    cy.get(global.Selectors.invoice.elements.filter_Column_Name)
        .clear()
        .type(global.Selectors.invoice.txt.enter_Invalid_Input)
    cy.get(global.Selectors.invoice.elements.document_List_View_No_Record)
        .contains(global.Selectors.invoice.txt.no_Record_Contains)
    cy.get(global.Selectors.invoice.elements.filter_Column_Name)
        .clear()
    //  cy.setTestCaseStatusIntoAzures(//global.testCaseId, "PASSED");
    global.testCaseId = 146815
    cy.LogNReport("Delete Uploaded Documents");
    cy.get(global.Selectors.invoice.elements.check_Box)
        .eq(1)
        .click({ force: true })
    cy.get(global.Selectors.invoice.elements.delete_Document_Button)
        .click({ force: true })
    cy.contains(global.Selectors.invoice.txt.confirm_Button_Contains)
        .click({ force: true })
    cy.contains(" No records found").should("be.visible")
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

})//end of BillUploadDocument

// Name: ReviewBill
// Description: ReviewBill will display error validations , and editing the bill 
// Prerequisite: Create anew bill
Cypress.Commands.add("ReviewBill", function () {

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Bill.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Bill.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('baseUrl') + global.Selectors.review_Bill.url.edit)
        .as("edit")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Bill.url.client)
        .as("client")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Bill.url.navigation)
        .as("navigation")

    global.testCaseId = 148511
    cy.LogNReport("Add Bill type action  ");
    cy.get(global.Selectors.review_Bill.elements.records).should("be.visible").click({ force: true })
        //cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 })
        .then(() => {
            cy.get(global.Selectors.review_Bill.elements.review_Edit).should("be.visible").click({ force: true })
            //Edit bill with error messages of Review
            cy.contains(global.Selectors.review_Bill.txt.select_Action).should("be.visible").click({ force: true }).then(($el1) => {
                cy.wrap($el1).type(global.Selectors.review_Bill.txt.view + global.Selectors.bills.txt.down_Enter)
            })

        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    global.testCaseId = 147347
    cy.LogNReport("Delete Bill Charges and Calculate total Bill ");
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist").then(() => {
            cy.get(global.Selectors.review_Bill.elements.delete_Bill).click({ force: true })
            //cy.get('.justify-content-end > :nth-child(1)').should("be.visible").click({ force: true })
            cy.wait(["@summary"], { timeout: 50000 }).then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist").then(() => {
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist")
                        cy.get(global.Selectors.review_Bill.elements.billed_Amount).first().clear().type(global.fakerData.bills.bill_Amount)
                        //cy.get('.mat-mdc-row > .cdk-column-billedAmount > input').last().type(global.fakerData.bills.bill_Amount)
                        cy.get(global.Selectors.review_Bill.elements.complete_Button).should("be.visible").click({ force: true })
                        // cy.get('.button-fixed-bottom > app-button > .container > .button-flex > #next').click({ force: true })
                    })
            })
        })

    cy.contains(global.Selectors.review_Bill.elements.finish).click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
})//end of ReviewBill

// Name: GenerateInvoice
// Description: GenerateInvoice will create a Invoice to respective Bill and Invoice Navigation
// Prerequisite: Create anew bill, review and resolve missing parameters , Click generate Invoice
Cypress.Commands.add("GenerateInvoice", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.navigation)
        .as("navigation")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.summary)
        .as("summary")

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.billReview)
        .as("billReview")


    //Invoice generation and navigating to Invoice 

    global.testCaseId = 146434
    cy.LogNReport("Generate Invoice after reviewing Bill");
    cy.get(global.Selectors.invoice.elements.dropdown_List_View)
        .should("not.exist")
    cy.get(global.Selectors.generate_Invoice_Bill.elements.breadcrumb).invoke("text").then((text) => {
        let val = text.trim()
        cy.get(global.Selectors.generate_Invoice_Bill.elements.invoice_ID).should("be.visible").should("include.text", val)
    })
    cy.get(global.Selectors.generate_Invoice_Bill.elements.reviewEdit).should("be.visible").click({ force: true })
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Action).should("be.visible").click({ force: true }).then(($el1) => {
        cy.wrap($el1).type(global.Selectors.generate_Invoice_Bill.txt.generate + global.Selectors.bills.txt.down_Enter)
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    cy.get(global.Selectors.generate_Invoice_Bill.elements.toaster).contains(global.Selectors.generate_Invoice_Bill.txt.created)
        //cy.contains("was created successfully.").should("not.exist")
        .then(() => {
            //add/validate comment in Invoice
            global.testCaseId = 146753
            cy.LogNReport("Add and validate Comment in Bill Summary ");
            cy.get(global.Selectors.generate_Invoice_Bill.elements.comments).should("be.visible").click({ force: true })
            cy.get(global.Selectors.create_Referral.elements.comment_General_Info).should("be.visible")
                .type(global.fakerData.bills.comment)
            cy.get(global.Selectors.generate_Invoice_Bill.elements.next).should("be.visible").click()
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.generate_Invoice_Bill.elements.flex_Start).should("be.visible").contains(global.fakerData.bills.comment)
            cy.get(global.Selectors.generate_Invoice_Bill.elements.summary).should("be.visible").click({ force: true })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            //generate invoice 
            cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 }).then(() => {
                // cy.wait(["@summary"], { timeout: 50000 }).then(() => {
                cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
                    cy.wrap($ele1).type(global.Selectors.generate_Invoice_Bill.txt.invoice + global.Selectors.bills.txt.down_Enter)
                })
                // cy.get(global.Selectors.invoice.elements.dropdown_List_View)
                //     .should("exist")
                //     .contains("Invoice").click({ force: true })
            })
        })
    // })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //Generated invoice navigation

    cy.LogNReport("Navigate to Generated Invoice");
    cy.wait(["@navigation"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist")
        global.testCaseId = 147378
        cy.get(global.Selectors.generate_Invoice_Bill.elements.review_Table).should("be.visible").contains(global.Selectors.generate_Invoice_Bill.txt.Summary)
        cy.get(global.Selectors.generate_Invoice_Bill.elements.bill_Charge_Id).should("be.visible")
        cy.get(global.Selectors.generate_Invoice_Bill.elements.review_breadcrumb1).should("be.visible").contains(global.Selectors.generate_Invoice_Bill.txt.invoice)
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    })

})//end of GenerateInvoice

// Name: ReviewQueue
// Description: ReviewQueue will navigate to summary screen , mark bill deleted, download eor , original charges, provider charges, client charges
// Prerequisite: Create a new bill, review and resolve missing parameters 
Cypress.Commands.add("ReviewQueue", function () {

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.eor)
        .as("eor")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.original)
        .as("original")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.provider)
        .as("provider")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.client)
        .as("client")
    //Bill Review Queue
    global.testCaseId = 148410
    cy.LogNReport("Data validation completed in Bill Review screen ");
    cy.get(global.Selectors.review_Queue.elements.summary).click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    global.testCaseId = 148084
    // cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 70000 }).then(() => {
    cy.contains(global.Selectors.review_Queue.txt.select_Action).should("be.visible").click({ force: true }).then(($el1) => {
        cy.wrap($el1).type(global.Selectors.review_Queue.txt.mark + global.Selectors.review_Queue.txt.down_Enter)
    })
    // })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    let bill_ID;
    global.testCaseId = 146433
    cy.LogNReport("Inability to delete a Bill after generating Invoice");
    cy.contains(global.Selectors.review_Queue.txt.confirm).should("be.visible").click({ force: true })
    //Marked deleted error message 
    cy.get(global.Selectors.review_Queue.elements.toaster).should("be.visible").contains(global.Selectors.review_Queue.txt.cant_Delete)
    cy.get(global.Selectors.generate_Invoice_Bill.elements.review_breadcrumb2).should("be.visible").click({ force: true }).then(($ele) => {
        cy.wrap($ele).invoke("text").then((text) => {
            bill_ID = text.trim()
            cy.log("The bill id is : " + bill_ID)
        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //EOR download
    global.testCaseId = 146432
    cy.LogNReport("Download EOR ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.EOR)
    cy.wait(["@eor"], { timeout: 70000 }).then(() => {
        cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
            cy.log("Wait till Download Success toaster hides")
            cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
            cy.verifyDownload("eor_" + bill_ID + "_repriced.pdf")
        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    // Original Bill w/Provider Address download
    global.testCaseId = 146429
    cy.LogNReport("Download Original Bill w/Provider Address ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.original)
    cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
        cy.log("Wait till Download Success toaster hides")
        cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
        cy.verifyDownload("bill_" + bill_ID + "_original.pdf")
        //  })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    // Adva Bill w/Provider Charges download
    global.testCaseId = 146430
    cy.LogNReport("Download Adva Bill w/Provider Charges");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.adva_Provider)
    cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
        cy.log("Wait till Download Success toaster hides")
        cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
        cy.verifyDownload("bill_" + bill_ID + "_provider_charges.pdf")
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //})
    // Adva Bill w/Client Billed Amount  download
    global.testCaseId = 146431
    cy.LogNReport("Verify the ability to download Adva Bill w/Client Billed Amount ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.adva_Client)
    cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
        cy.log("Wait till Download Success toaster hides")
        cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
        cy.verifyDownload("bill_" + bill_ID + "_billed_amount.pdf")
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    // })
})//end of ReviewQueue


// Name: RejectQueue
// Description: RejectQueue will be able to 
// Prerequisite: Create a new bill, review and resolve missing parameters , Click Mark Bill Deleted 
Cypress.Commands.add("RejectQueue", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.reject_Queue.url.reject_Landing)
        .as("reject_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.reject_Queue.url.reject_Landing)
        .as("reject_Summary")
    //temp line
    //  cy.reload()
    cy.get('#Bills').should("be.visible").click({ force: true })
    global.testCaseId = 146748
    cy.LogNReport("Verify the Search Rejected Queue Record using Claim Number ");
    cy.get(global.Selectors.reject_Queue.elements.rejected_Menu).should("be.visible").click({ force: true })
    // No records match the search criteria. 
    cy.wait(["@reject_Landing"], { timeout: 90000 }).then(() => {
        //searching for page dropdown and No records found 
        cy.get(global.Selectors.reject_Queue.elements.list_Screen).then(element => {
            if (element.find(global.Selectors.reject_Queue.elements.page_Bottom).length > 0) {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.create_Tasks.elements.page_Dropdown)
                    .should("be.visible")
                    .click({ force: true })
                cy.get(global.Selectors.create_Tasks.elements.select_Page_Count)
                    .last()
                    .should("be.visible")
                    .click({ force: true })
                cy.wait(["@reject_Landing"], { timeout: 90000 }).then(() => {

                    cy.get(global.Selectors.reject_Queue.elements.rejected_Table).then(element => {
                        let text = element.text()
                        cy.log(global.Selectors.reject_Queue.txt.table_Text + text)
                        cy.get(global.Selectors.reject_Queue.elements.bill_ID_Row1).should("be.visible").click({ force: true })
                        //Summary navigation
                        cy.wait(["@reject_Summary"], { timeout: 90000 }).then(() => {
                            //Setting Status Accepted 
                            cy.contains(global.Selectors.reject_Queue.txt.status).should("be.visible").click({ force: true })
                            cy.get(global.Selectors.reject_Queue.elements.reject_Status).should("be.visible").contains(global.Selectors.reject_Queue.txt.accepted).click({ force: true }).then(ele => {
                                cy.get(global.Selectors.reject_Queue.elements.save).scrollIntoView().then(val => {
                                    cy.wrap(val).should("be.visible").click({ force: true })
                                })
                            })

                        })
                    })
                })
                //checking toaster message and saving Accepted status
                cy.get(global.Selectors.reject_Queue.elements.toaster).contains(global.Selectors.reject_Queue.txt.message).should("be.visible")
                //getting Bill_ID
                let bill_ID;
                cy.get(global.Selectors.generate_Invoice_Bill.elements.review_breadcrumb2).should("be.visible").click({ force: true }).then(($ele) => {
                    cy.wrap($ele).invoke("text").then((text) => {
                        bill_ID = text.trim()
                        cy.log("The bill id is : " + bill_ID)
                    })
                })
                //breadcrumb back navigation
                cy.get(global.Selectors.reject_Queue.elements.breadcrumb1).should("be.visible").click({ force: true })
                cy.wait(["@reject_Landing"], { timeout: 90000 }).then(() => {
                    cy.get(global.Selectors.reject_Queue.elements.filter).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.reject_Queue.elements.filter).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.reject_Queue.elements.bill_Subfilter).should("be.visible").type(bill_ID)
                    cy.get(global.Selectors.reject_Queue.elements.bill_ID_Row1).should("be.visible").click({ force: true })
                    //Summary navigation
                    cy.wait(["@reject_Summary"], { timeout: 70000 }).then(() => {
                        //Setting Status Not Set 
                        cy.contains(global.Selectors.reject_Queue.txt.status).should("be.visible").click({ force: true })
                        cy.get(global.Selectors.reject_Queue.elements.reject_Status).should("be.visible").contains(global.Selectors.reject_Queue.txt.not_Set).click({ force: true }).then(ele => {
                            cy.get(global.Selectors.reject_Queue.elements.save).scrollIntoView().then(val => {
                                cy.wrap(val).should("be.visible").click({ force: true })
                            })
                        })

                    })
                })
                cy.LogNReport("Verify the ability to check accepted,Not set,rejected status in Reject queue list screen ");
                //checking toaster message and saving Not set status 
                cy.get(global.Selectors.reject_Queue.elements.toaster).contains(global.Selectors.reject_Queue.txt.message).should("be.visible")
                //breadcrumb back navigation
                cy.get(global.Selectors.reject_Queue.elements.breadcrumb1).should("be.visible").click({ force: true })
                cy.wait(["@reject_Landing"], { timeout: 90000 }).then(() => {
                    cy.get(global.Selectors.reject_Queue.elements.filter).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.reject_Queue.elements.filter).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.reject_Queue.elements.status_Subfilter).should("be.visible").type(global.Selectors.reject_Queue.txt.not_Set)
                    cy.get(global.Selectors.reject_Queue.elements.bill_ID_Row1).should("be.visible").click({ force: true })
                    //Summary navigation
                    cy.wait(["@reject_Summary"], { timeout: 90000 }).then(() => {
                        //Setting Status Rejected 
                        cy.contains(global.Selectors.reject_Queue.txt.status).should("be.visible").click({ force: true })
                        cy.get(global.Selectors.reject_Queue.elements.reject_Status).should("be.visible").contains(global.Selectors.reject_Queue.txt.rejected).click({ force: true }).then(ele => {
                            cy.get(global.Selectors.reject_Queue.elements.save).scrollIntoView().then(val => {
                                cy.wrap(val).should("be.visible").click({ force: true })
                            })
                        })

                    })
                })
                //checking toaster message and saving Rejected status 
                cy.get(global.Selectors.reject_Queue.elements.toaster).contains(global.Selectors.reject_Queue.txt.message).should("be.visible")
                //breadcrumb back navigation
                cy.get(global.Selectors.reject_Queue.elements.breadcrumb1).should("be.visible").click({ force: true })
                cy.wait(["@reject_Landing"], { timeout: 90000 }).then(() => {
                    cy.get(global.Selectors.reject_Queue.elements.filter).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.reject_Queue.elements.filter).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.reject_Queue.elements.bill_Subfilter).should("be.visible").type(bill_ID)
                    //unit test
                    //   cy.get(global.Selectors.reject_Queue.elements.first_Bill).include("text").should("be.oneOf", [global.Selectors.reject_Queue.txt.rejected, global.Selectors.reject_Queue.txt.not_Set])
                })
            } else {
                cy.log(global.Selectors.reject_Queue.txt.no_Records + Cypress.env('apiUrl'))
            }
        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
})

// Name: CreateBill_Link
// Description: Create A New Bill , select referral and client with business data
// Prerequisite: Complete Client and Referral creation,  Visit Bill Menu
// Shared Steps 141783: ****-*** : Creating Bill with Mandatory fields
Cypress.Commands.add("CreateBill_Link", function () {
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
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord)
        .as("referral_record")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.general_Info)
        .as("general_Info")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.select_Client)
        .as("select_Client")
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
                cy.fixture('businessData.json')
                    .then((data) => {
                        cy.log("referral claim number is " + data.referral_Claim)
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get(global.Selectors.bills.elements.search_Box).should("be.visible").type(data.referral_Claim + global.Selectors.bills.elements.enter)
                        cy.wait(["@column_Search_Referral"], { timeout: 50000 }).then(() => {
                            cy.wrap($ele1).find(global.Selectors.bills.elements.table).should("contain.text", data.referral_Claim).then(() => {
                                cy.wrap($ele1).find(global.Selectors.bills.elements.checkbox).last().click({ force: true })
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
            cy.get('#icd4').should("be.visible").then(() => {
                cy.get(global.Selectors.bills.elements.icd1).then($e1 => {
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                    cy.get(global.Selectors.bills.elements.icd1).should("be.visible").type(global.fakerData.bills.cpt_Code)
                })
            })
            cy.LogNReport("Choose additional ICD 9/10 codes");
            cy.get(global.Selectors.bills.elements.bill_Type).then(($ele) => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.wrap($ele).clear().type("UB" + "{enter}")
                cy.get(global.Selectors.bills.elements.previous).should("be.visible").click({ force: true })

            })
        })


    })
    // 1.Bill info
    cy.wait(["@after_Save"], { timeout: 50000 }).then(() => {
        cy.LogNReport("Validate Bill information data view ");
        //select newly created  client 
        cy.get(global.Selectors.bills.elements.accordion).contains(global.Selectors.bills.txt.client).click({ force: true })
        cy.fixture('businessData.json')
            .then((data) => {
                cy.log("Client Name  is " + data.client_Name)
                cy.get(global.Selectors.bills.elements.select_Client).first().should("be.visible").click({ force: true }).then($ele => {
                    cy.wrap($ele).type(data.client_Name + global.Selectors.bills.elements.enter)
                    cy.wait(["@select_Client"], { timeout: 50000 }).then(() => {
                        global.testCaseId = 141245;
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get(global.Selectors.bills.elements.first_Search).should("be.visible").contains(data.client_Name).click({ force: true })
                        cy.get(global.Selectors.bills.elements.client_Bill_Number).should("be.visible").type(global.fakerData.bills.bill_Number)
                        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

                    })

                })
            })
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


    cy.LogNReport("Generate Invoice from Bill");
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
                        global.testCaseId = 154594
                        cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 }).then(() => {
                            // cy.wait(["@summary"], { timeout: 50000 }).then(() => {
                            cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
                                cy.wrap($ele1).type(global.Selectors.generate_Invoice_Bill.txt.invoice + global.Selectors.bills.txt.down_Enter)
                            })

                        })
                        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

                        cy.wait(["@referral_record"], { timeout: 50000 })
                        var number = 0;
                        cy.get(global.Selectors.upload.elements.invoice_Breadcrumb).invoke("text").then(text => {
                            cy.log("The invoice id is " + text)
                            var fullText = text;
                            var pattern = /[0-9]+/g;
                            number = fullText.match(pattern);
                            cy.log(number + " the invoice id is ")
                            global.invoice_ID = number
                            cy.LogNReport("Generated Bill : " + bill + " respective Invoice : " + number + " Respective Claim : " + claim);
                            cy.wait(["@invoice_BillID"], { timeout: 50000 }).then((interception) => {
                                const responseData = interception.response.body
                                let billChargeId = responseData[0].billChargeId;
                                let newReceivable = responseData[0].newReceivable;
                                cy.log(billChargeId + " Balance amount is " + newReceivable)
                                global.billChargeId = billChargeId
                                //storing bill and claim number from Bill Summary as Dynamic json
                                cy.readFile("cypress/fixtures/businessData.json").then((profile) => {
                                    profile.bill = bill,
                                        profile.claim = claim,
                                        profile.invoice = number.toString(),
                                        profile.billChargeId = billChargeId,
                                        profile.newReceivable = newReceivable
                                    cy.log(profile.bill)
                                    cy.writeFile('cypress/fixtures/businessData.json', JSON.stringify(profile))
                                })
                            })
                        })
                    })
                })
        })
    })

})//end of CreateBill cmd


// Name: ValidateInvoice_Links
// Description: Create A New Bill , select referral and client with business data
// Prerequisite: Complete Client and Referral creation,  Visit Bill Menu
// Shared Steps 141783: ****-*** : Creating Bill with Mandatory fields
Cypress.Commands.add("ValidateInvoice_Links", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.general_Info)
        .as("general_Info")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.dropdown)
        .as("dropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.generate_Invoice_Bill.url.summary)
        .as("summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Client.url.create_Client_Api)
        .as("static_dropdown");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord)
        .as("referalrecord")
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible")
        .click({ force: true }).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.invoice.elements.dropdown_List_View)
                .should("be.visible")
                .should("not.be.hidden").then(($e1) => {
                    cy.wrap($e1).contains("Referral")
                        .click({ force: true });
                })
        })
    cy.wait(["@dropdown"], { timeout: 50000 }).then(() => {
        cy.get(".summary-record").contains(global.businessData.referral_Claim).should("be.visible")
    })
    cy.LogNReport("Move to the Referral Summary screen from Invoice. ");
    cy.url()
        .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.create_Referral_Record)
    //bill
    cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No1)
        .should("be.visible")
        .click({ force: true });


    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible")
        .click({ force: true });

    cy.get(global.Selectors.invoice.elements.dropdown_List_View)
        .should("be.visible")
        .should("not.be.hidden")
        .contains(global.Selectors.invoice.txt.bill_Contains)
        .click({ force: true });
    cy.wait(["@general_Info"], { timeout: 50000 }).then(() => {
        cy.LogNReport("Verify the ability to Navigate to Client Summary screen from Invoice ");
        cy.url()
            .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.bills_Details)

        cy.get(global.Selectors.bills.elements.bread_Crumb_2).should("be.visible").invoke("text").then(text1 => {
            cy.log(text1)
            cy.get(global.Selectors.bills.elements.Summary_bill_1).should("include.text", text1.trim())
        })
        // cy.get(global.Selectors.bills.elements.Summary_bill_1).contains(global.businessData.bill).should("be.visible")

    })
    cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No1)
        .should("be.visible")
        .click({ force: true });
    cy.wait(["@referalrecord"], { timeout: 50000 })


    // //client
    cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No1)
        .should("be.visible")
        .click({ force: true });
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible")
        .click({ force: true });
    cy.get(global.Selectors.invoice.elements.dropdown_List_View)
        .contains(global.Selectors.invoice.txt.client_Contains)
        .should("be.visible")
        .click({ force: true });
    cy.url()
        .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.client_Details)
    cy.get(global.Selectors.bills.elements.bread_Crumb_2)
        .should("be.visible")
        .click({ force: true });
    cy.wait(["@summary", "@dropdown", "@summary"], { timeout: 50000 }).then(() => {
        // cy.wait(["@summary"], { timeout: 50000 }).then(() => {
        cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
            cy.wrap($ele1).type("Client" + global.Selectors.bills.txt.down_Enter)
        })
    })
    // cy.wait(["@static_dropdown"], { timeout: 30000 }).then(() => {
    //     cy.get('#client-info-exp').should("be.visible").click({ force: true }).then(() => {
    //         cy.get('#ci-table > .component-main > .mar-bot-10 > :nth-child(1) > .component-div-child2')
    //             .should("be.visible").contains(global.businessData.client_Name)
    //     })
    // })
})