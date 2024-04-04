import { highlight } from "cypress-highlight";

// Name: CreateReferral
// Description: Create A New Referral And Navigate To Referral Summary
// Prerequisite: Login should be successful
Cypress.Commands.add("CreateReferral", function () {

    //Listening to apis at starting of the Create Referral 
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Referral.url.referral)
        .as("billapi");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Referral.url.procedure_Api)
        .as("procedureapi");
    cy.intercept(Cypress.env('apiUrl') + (global.Selectors.create_Referral.url.patient))
        .as("patientapi");
    cy.intercept(Cypress.env('apiUrl') + (global.Selectors.create_Referral.url.dropdown))
        .as("dropdownapi");
    cy.intercept(Cypress.env('apiUrl') + (global.Selectors.create_Referral.url.procedure_List))
        .as("procedure_List");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Referral.url.referral)
        .as("referral_Loading");
    //Referral Menu assertion not be hidden used to remove aria-hidden=true
    cy.LogNReport("Validate the selection of the Referral menu.");
    cy.get(global.Selectors.create_Referral.elements.referral_Menu)
        .should("not.be.hidden")
        .click({ force: true });
    highlight(global.Selectors.create_Referral.elements.referral_Menu);
    cy.url().should(
        "eq",
        Cypress.env("baseUrl") + global.Selectors.create_Referral.url.referral_Menu
    );
    cy.get(global.Selectors.create_Referral.elements.create_Button)
        .should("be.visible")
        .click({ force: true });
    cy.LogNReport("Confirm the navigation to the Referral creation screen.");

    cy.wait(["@allApiReq"], { timeout: 50000 }).then(() => {
        cy.contains(global.Selectors.create_Referral.txt.create_Referral).should(
            "be.visible"
        );
        cy.get(global.Selectors.create_Referral.elements.save_Button)
            .should("be.visible")
            .click({ force: true });
        //mandatory fields 
        cy.LogNReport("Check if mandatory fields can be filled.");
        global.testCaseId = 142447
        cy.contains(global.Selectors.create_Referral.txt.required_Message).should(
            "be.visible"
        );
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        global.testCaseId = 142445;
        cy.get(global.Selectors.create_Referral.elements.cancel).should("be.visible").click()
        cy.get(global.Selectors.create_Referral.elements.create_Button)
            .should("be.visible")
            .click({ force: true });
        cy.get(global.Selectors.create_Referral.elements.claim_Number)
            .should("be.visible")
            .type(global.fakerData.referral_Info.claim_Number);
        cy.get(global.Selectors.create_Referral.elements.type_Of_Payer).click();
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        global.testCaseId = 141991
        cy.contains(global.Selectors.create_Referral.txt.bill_Review_Company).click(
            { force: true }
        );
        cy.get(global.Selectors.create_Referral.elements.date_Recieved).type(
            global.fakerData.referral_Info.date_Received
        );
        cy.get(global.Selectors.create_Referral.elements.type_Of_Contracted_Client)
            .should("be.visible")
            .click();

        cy.contains(global.Selectors.create_Referral.txt.bill_Review_Company).click(
            { force: true }
        );
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        //click save
        cy.LogNReport("Check for mandatory fields' toaster and error messages.");
        global.testCaseId = 142447
        cy.get(global.Selectors.create_Referral.elements.save_Button)
            .should("be.visible")
            .click();
        cy.contains(global.Selectors.create_Referral.txt.required_Message).should(
            "be.visible"
        );
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        //bill review made as mandatory
        cy.LogNReport("Ensure you can save records by providing dynamic mandatory fields, such as Bill Review and Claim Referral.");
        global.testCaseId = 142444
        cy.get(global.Selectors.create_Referral.elements.bill_Review_Company).should("be.visible")
            .click()
            .then(($ele) => {
                cy.get(
                    global.Selectors.create_Referral.elements.val_Of_Bill_Review_Company
                ).last().click({ force: true });
            });
        //144702
        cy.get(global.Selectors.create_Referral.elements.save_Button)
            .should("be.visible")
            .click().then(() => {
                //  cy.get(global.Selectors.create_Referral.elements.claim_Toaster).should("be.visible")
                cy.contains(global.Selectors.create_Referral.txt.required_Message2).should("be.visible")

            });
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        cy.LogNReport("Check the selection of values from the Claim Referral Accordion List.");

        cy.get(global.Selectors.create_Referral.elements.claim_Accordian)
            .should("be.visible")
            .click({ force: true })
            .then(() => {
                cy.get(global.Selectors.create_Referral.elements.select_3rd_Record)
                    .should("be.visible")
                    .last()
                    .invoke("text")
                    .then(($element) => {
                        cy.log($element);
                        cy.contains($element).should("be.visible").click({ force: true });
                    });
            });
        global.testCaseId = 141967
        cy.LogNReport("Verify record creation with only mandatory fields.");
        cy.get(global.Selectors.create_Referral.elements.save_Button)
            .should("be.visible")
            .click();
        cy.contains(global.Selectors.create_Referral.txt.create_Referral).should(
            "be.visible"
        );
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        cy.LogNReport("Verify record creation with only mandatory fields. ", global.fakerData.referral_Info.claim_Number);

        global.testCaseId = 146851
        cy.LogNReport("Confirm the appearance of a successful Toaster message.");
        cy.contains(global.Selectors.create_Referral.txt.created_Referral).should("be.visible")
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        //1.General_info
        cy.contains(global.Selectors.create_Referral.txt.general_Info).should(
            "be.visible"
        );
        cy.get(global.Selectors.create_Referral.elements.assignedTo)
            .should("be.visible")
            .click()
            .type(global.Selectors.landing.elements.enter);
        cy.get(global.Selectors.create_Referral.elements.is_Rush_Radio)
            .first()
            .check();
    })
    global.testCaseId = 143353
    cy.LogNReport("Test the ability to add a comment in General Info.");

    cy.get(global.Selectors.create_Referral.elements.comment_Arrow).should("be.visible").click({ force: true })
    cy.get(global.Selectors.create_Referral.elements.comment_General_Info).should("be.visible")
        .type(global.fakerData.prospect_Info.description)
    cy.get(global.Selectors.create_Referral.elements.add_Button).should("be.visible").click()
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    global.testCaseId = 144495
    cy.get(global.Selectors.create_Referral.elements.add_Button).should("be.visible").first().click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    global.testCaseId = 144310
    cy.contains(global.Selectors.create_Referral.txt.comment_Added).should("be.visible")
    //cy.get('[ng-reflect-router-link="/referral/edit/patient"]')
    //cy.contains("3. Patient Information").should("be.visible").click({ force: true })
    cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").click({ force: true })
    // cy.get(global.Selectors.create_Referral.elements.finish).should("be.visible").click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //Due to Adjustor dropdown is not receiving values all the time across stg and qa02/dev02 , tab 2.Claim Information is commented 

    // cy.get('#actionItem > .mat-mdc-text-field-wrapper').should("be.visible").click({ force: true }).then(() => {
    //     cy.contains("View / Edit").should("be.visible").click({ force: true })
    //     cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").click({ force: true })
    //     cy.get(global.Selectors.landing.elements.loading_Indicator)
    //         .should("not.exist");
    // })
    //2.Claim Information
    global.testCaseId = 144695
    cy.LogNReport("Check data entry in Claim Information with only mandatory fields.");
    cy.get(global.Selectors.create_Referral.elements.referral_Home_Screen)
        .then(($dialog) => {
            cy.wait(["@billapi", "@allApiReq"], { timeout: 50000 })
                .then(() => {
                    cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").click({ force: true })
                    cy.contains(global.Selectors.bills.txt.required_Message).should("not.exist")
                    // cy.contains(global.Selectors.create_Referral.txt.required_Message).should("be.visible");
                    cy.get(global.Selectors.create_Referral.elements.claim_Jurisdiction)
                        //.find(global.Selectors.create_Referral.elements.claim_Jurisdiction)
                        .should("be.visible")
                        .click({ force: true })
                    cy.contains("Claim Jurisdiction").should("be.visible").click({ force: true })
                        .then(($ele) => {
                            cy.get(global.Selectors.create_Referral.elements.claim_Jurisdiction).should("be.visible").type(global.Selectors.create_Referral.txt.claim_Jurisdiction_Val +
                                "{downarrow}{enter}")
                        })
                });
        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    cy.get(global.Selectors.create_Referral.elements.incident_Date).clear().type(
        global.fakerData.referral_Info.incident_Date
    );
    cy.get(global.Selectors.create_Referral.elements.claim_Jurisdiction).clear().type(global.Selectors.create_Referral.txt.claim_Jurisdiction_Val +
        "{downarrow}{enter}")
    cy.get(global.Selectors.create_Referral.elements.referral_Submitted_By_Id).should("be.visible")
        .click({ force: true }).then(($ele) => {
            cy.wrap($ele).type(global.Selectors.create_Referral.txt.referral_Submitted_By_Id_Val + "{enter}")
        })

    cy.get('#adjusterId > .mat-mdc-text-field-wrapper').should("be.visible").click().then(($ele) => {
        cy.wrap($ele).type("Create" + "{downarrow}{enter}")
        // cy.get(global.Selectors.provider.elements.div_ListBox).should("be.visible").click().then(() => {
        //cy.get("div[role=\"listbox\"]> :nth-child(3)").should("be.visible").click({ force: true })
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
    })
    //})
    cy.get(global.Selectors.create_Referral.elements.adjuster_First_Name)
        .should("be.visible")
        .type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.last_Name + global.fakerData.prospect_Info.name);
    cy.get(global.Selectors.create_Referral.elements.adjuster_Last_Name)
        .should("be.visible")
        .type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.first_Name + global.fakerData.prospect_Info.name);
    cy.get(global.Selectors.create_Referral.elements.adjuster_Email)
        .should("be.visible")
        .type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.email);
    cy.get(global.Selectors.create_Referral.elements.adjuster_Phone)
        .should("be.visible")
        .type(global.fakerData.prospect_Info.mobile_Number);
    cy.get(global.Selectors.create_Referral.elements.adjuster_Company)
        .should("be.visible")
        .type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.company_Name + global.fakerData.prospect_Info.name);
    // cy.get(global.Selectors.create_Referral.elements.adjuster_First_Name)
    //     .should("be.visible").clear()
    //     .type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.first_Name);
    cy.LogNReport("Navigate to the next screen with the required details.");
    cy.contains("Next").should("be.visible").click({ force: true })

    //3.Patient Info
    global.testCaseId = 144722
    cy.LogNReport("Enter details in the Patient Info section.");

    cy.wait(["@allApiReq"], { timeout: 50000 })
        .then(() => {
            //cy.contains(global.Selectors.create_Referral.txt.primary_Care_Physician).should("be.visible")
            cy.contains("Next").should("be.visible").click({ force: true })
            cy.contains(global.Selectors.create_Referral.txt.required_Message2).should("not.exist")
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.create_Referral.elements.accordion_Tab3).should("be.visible").click({ force: true });
            cy.get('#createBtn').should("be.visible").click({ froce: true })
            // cy.get(global.Selectors.create_Referral.elements.accordion_Val_Tab3).should("be.visible").click({ force: true })
        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //Wait till selected patient information loads
    cy.wait(["@patientapi"], { timeout: 50000 })
        .then(() => {
            //142681
            global.testCaseId = 142681
            cy.get(global.Selectors.create_Referral.elements.add_Client).then($fullscreen => {

                cy.wrap($fullscreen).find(global.Selectors.create_Referral.elements.phone_Tab3).should("be.visible").click({ force: true }).then(($ele) => {
                    //Only used for exisiting patient selection
                    //cy.wait(["@patientapi"], { timeout: 50000 })
                    cy.get('#pfirstname').should("be.visible").type(global.fakerData.referral_Info.patient_FirstName)
                    cy.get('#plastname').should("be.visible").type(global.fakerData.referral_Info.patient_LastName)
                    cy.get('#pdob').should("be.visible").type(global.fakerData.referral_Info.incident_Date)
                    cy.get((global.Selectors.create_Referral.elements.phone_Tab3)).type(global.fakerData.prospect_Info.mobile_Number)
                    cy.get('#ptype1 > .mat-mdc-text-field-wrapper').should("be.visible").type("Home" +
                        "{downarrow}{enter}")
                    cy.get('#pstreetaddress')
                        .should("be.visible")
                        .type(global.fakerData.client_Info.street);
                    cy.get('#pcity')
                        .should("be.visible")
                        .type(global.fakerData.client_Info.city);

                    cy.get('#pstate > .mat-mdc-text-field-wrapper')
                        .should("be.visible")
                        .click({ force: true }).then(($el1) => {
                            cy.get(global.Selectors.landing.elements.loading_Indicator)
                                .should("not.exist")
                            //  cy.contains(global.Selectors.create_Client.elements.state_val)
                            //    .should("be.visible").click({ force: true });
                            cy.wrap($el1).type("CA" + "{downarrow}{enter}")
                        })
                    cy.get('#pzip')
                        .should("be.visible")
                        .type(global.fakerData.client_Info.zip);
                })
            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

            //142612
            global.testCaseId = 142612
            cy.get(global.Selectors.create_Referral.elements.firstname_Tab3).should("be.visible").type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.first_Name + global.fakerData.prospect_Info.name)
            cy.get(global.Selectors.create_Referral.elements.lastname_Tab3).should("be.visible").type(global.fakerData.prospect_Info.name + global.fakerData.prospect_Info.last_Name + global.fakerData.prospect_Info.name)
            cy.get(global.Selectors.create_Referral.elements.phone_Tab3).should("not.be.disabled").clear().type(global.fakerData.referral_Info.mobile_Number)
            cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").click({ force: true })
        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    cy.LogNReport("Navigate to the next screen by providing only mandatory fields");
    //4.Requested Procedures Tab
    //143360
    global.testCaseId = 143360
    cy.LogNReport("Enter details in Requested Procedures");

    cy.wait(["@billapi", "@procedure_List"], { timeout: 50000 })
        .then(() => {
            cy.get(global.Selectors.create_Referral.elements.authorization_Code_Tab4).should("be.visible")
            cy.get(global.Selectors.create_Referral.elements.service_Type).should("be.visible")
                .click({ force: true }).then(($ele) => {
                    cy.wrap($ele).type(global.Selectors.create_Referral.txt.service_Type_Val +
                        "{downarrow}{enter}")
                })
            cy.get(global.Selectors.create_Referral.elements.released_From).should("be.visible")
                .click({ force: true }).then(($ele) => {
                    cy.wrap($ele).type(global.Selectors.create_Referral.txt.released_From_Val +
                        "{downarrow}{enter}")
                })
            cy.get(global.Selectors.create_Referral.elements.admitted_To).should("be.visible")
                .click({ force: true }).then(($ele) => {
                    cy.wrap($ele).type(global.Selectors.create_Referral.txt.admitted_To_Val +
                        "{downarrow}{enter}{enter}")
                })
        })

    //adding procedures

    // //
    // cy.get(global.Selectors.referral_Summary.elements.add_Btn).should("be.visible").click({ force: true }).then(() => {
    //     //143366
    //     global.testCaseId = 143366
    //     cy.LogNReport("Add Procedures.");

    //     cy.wait(["@procedureapi", "@referral_Loading"], { timeout: 50000 })
    //         .then(() => {
    //             cy.get(global.Selectors.referral_Summary.elements.procedure).should("be.visible").type(global.Selectors.referral_Summary.txt.procedure_Val + "{enter}").then($el1 => {
    //                 //  cy.wait(["@procedureapi"], { timeout: 50000 })
    //                 cy.contains(" - 99449").should("exist")
    //                 cy.get(global.Selectors.landing.elements.loading_Indicator)
    //                     .should("not.exist");
    //                 cy.wrap($el1).type("{downarrow}{enter}", { delay: 100 })
    //             })
    //             cy.contains(global.Selectors.referral_Summary.txt.body_Part).should("be.visible").click({ force: true }).then(($ele) => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.body_Part_Val1).should("not.be.hidden").click({ force: true })
    //             })
    //             cy.get(global.Selectors.referral_Summary.txt.bilater).should("be.visible").click({ force: true }).then(($ele) => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.bilater_Val1).should("not.be.hidden").click({ force: true })
    //             }).then(() => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.save).invoke("show").should("be.visible").click({ force: true })
    //             })
    //         })
    //     cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    // })
    // //})

    // //cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");


    // cy.wait(["@procedure_List"], { timeout: 50000 }).then(() => {
    //     cy.get(global.Selectors.referral_Summary.elements.procedure_Row1).should("be.visible").should("include.text", "99449")
    // })
    // //adding second procedure
    // global.testCaseId = 142090

    // cy.get(global.Selectors.referral_Summary.elements.add_Btn).should("be.visible").click({ force: true }).then(() => {
    //     cy.wait(["@procedureapi", "@referral_Loading"], { timeout: 50000 })
    //         .then(() => {
    //             cy.get(global.Selectors.referral_Summary.elements.procedure).should("be.visible").type(global.Selectors.referral_Summary.txt.procedure_Val1 + "{enter}").then($el1 => {
    //                 cy.wait(["@procedureapi"], { timeout: 50000 })
    //                 cy.contains(" - 00732").should("exist")
    //                 cy.get(global.Selectors.landing.elements.loading_Indicator)
    //                     .should("not.exist");
    //                 cy.wrap($el1).type("{downarrow}{enter}", { delay: 100 })
    //             })
    //             cy.wait(["@procedureapi"], { timeout: 50000 })
    //             cy.contains(global.Selectors.referral_Summary.txt.body_Part).should("be.visible").click({ force: true }).then(($ele) => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.body_Part_Val2).should("not.be.hidden").click({ force: true })
    //             })
    //             cy.get(global.Selectors.referral_Summary.txt.bilater).should("be.visible").click({ force: true }).then(($ele) => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.bilater_Val2).should("not.be.hidden").click({ force: true }).then(() => {
    //                     cy.contains(global.Selectors.referral_Summary.txt.save).invoke("show").should("be.visible").click({ force: true })
    //                 })
    //             })
    //         })
    // })
    //cases depandant to user roles are paused 
    cy.log("Referral summary->To Verify that Assigned to Case Coordinate drop list should be accessible based on User's Role and status of referral - PAUSED")
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "FAILED");
    global.testCaseId = 146221
    cy.contains(global.Selectors.create_Referral.txt.no_Records_Found).should("be.visible")
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").last().click()
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    cy.LogNReport("Navigate to the next screen  with saving entered Details");

    //5.Bill workflow
    //142882
    global.testCaseId = 142882
    cy.LogNReport("Enter details in Bill Workflow.");

    cy.wait(["@billapi"], { timeout: 50000 })
        .then(() => {
            cy.get(global.Selectors.create_Referral.elements.bills_To_Client).should("be.visible")
                .click({ force: true }).then(($ele) => {
                    cy.wait(["@billapi"], { timeout: 50000 })
                    cy.wrap($ele).type(global.Selectors.create_Referral.txt.bill_Type +
                        "{downarrow}{enter}{enter}")
                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                })
            global.testCaseId = 143354
            cy.LogNReport("Select an option from the \"How are bills sent to the client\" question dropdown.");

            cy.get(global.Selectors.create_Referral.elements.bills_To_Client).clear().type(global.Selectors.create_Referral.txt.bill_Type +
                "{downarrow}{enter}{enter}")
            cy.get(global.Selectors.create_Referral.elements.billing_Cycle).should("be.visible").click().then(() => {
                cy.get(global.Selectors.create_Referral.elements.billing_Cycle).type(global.Selectors.create_Referral.txt.billing_Cycle_Val + "{downarrow}{enter}{enter}")

            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            cy.get(global.Selectors.create_Referral.elements.next)
                .should("be.visible").last()
                .click({ force: true });
            cy.LogNReport("Navigate to the next screen  with saving entered details");

        })
    //6.Legal Information

    cy.wait(["@billapi", "@allApiReq"], { timeout: 50000 }).then(() => {
        cy.LogNReport("Enter details in Legal Information.");

        global.testCaseId = 146946
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.contains(global.Selectors.create_Referral.elements.yes).first().should("be.visible").click({ force: true })
        cy.contains(global.Selectors.create_Referral.elements.yes).first().should("be.visible").click({ force: true })
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist").then(() => {
                cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").last().click()
            })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    })
    global.testCaseId = 141982
    cy.wait(["@referral_Loading", "@referral_Loading", "@referral_Loading"], { timeout: 50000 }).then(() => {
        cy.contains(global.Selectors.create_Referral.txt.it_Val).should("be.visible").then(() => {
            cy.get(global.Selectors.create_Referral.elements.finish).should("be.visible").click({ force: true })
        })
    })
    cy.LogNReport("Ensure successful updating of the Referral Summary with Claim number - " + global.fakerData.referral_Info.claim_Number);
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    const generateData1 = () => {
        return {
            claim: global.fakerData.referral_Info.claim_Number
        }
    };
    let generatedData1 = generateData1();
    cy.writeFile("./cypress/fixtures/referral.json", JSON.stringify(generatedData1, null, "\t"));
    //Summary check
    global.testCaseId = 141983
    cy.LogNReport("Automatic navigation to the summary screen after Referral creation. ");
    cy.contains(global.Selectors.create_Referral.txt.summary_Contains).should("be.visible")
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

}); //end of CreateReferral cmd

// Name: ReferralSummary
// Description:This cmd helps you to validate saved data is displayed in the Referral summary screen
// Prerequisite: Login and Client creation should be successful

Cypress.Commands.add("ReferralSummary", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.close_Popup)
        .as("close_Popup");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.referral_Add_Comment)
        .as("referral_Add_Comment");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.document_Landing)
        .as("document_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.document_Landing)
        .as("document_List")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.upload_Doc)
        .as("upload_Doc")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.new_Bill)
        .as("new_Bill")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.referral_List)
        .as("referral_List")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Referral.url.referral)
        .as("referral_Loading");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Referral.url.procedure_Api)
        .as("procedureapi");
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Referral.url.procedure_List)
        .as("procedure_List");
    cy.intercept(Cypress.env('apiUrl') + (global.Selectors.create_Referral.url.dropdown))
        .as("dropdownapi");
    cy.intercept(Cypress.env('apiUrl') + (global.Selectors.create_Referral.url.adjuster))
        .as("adjuster");
    cy.intercept(Cypress.env('apiUrl') + (global.Selectors.create_Referral.url.tab_3))
        .as("tab_3");
    //search
    let claim
    cy.fixture('referral.json')
        .then((data) => {
            global.referral = data
            claim = global.referral.claim

            cy.LogNReport("Validate the selection of the Referral menu.");
            cy.get(global.Selectors.create_Referral.elements.referral_Menu)
                .should("not.be.hidden")
                .click({ force: true });
            highlight(global.Selectors.create_Referral.elements.referral_Menu);
            cy.url().should(
                "eq",
                Cypress.env("baseUrl") + global.Selectors.create_Referral.url.referral_Menu
            );

            global.testCaseId = 142629
            cy.LogNReport("Search using Claim number  " + claim + " and Status " + global.Selectors.referral_Summary.txt.status_Val);

            cy.get(global.Selectors.referral_Summary.elements.claim_Number).should("be.visible").type(claim);
            cy.get(global.Selectors.referral_Summary.elements.status).should("be.visible")
                .click({ force: true }).then(($ele) => {
                    cy.wrap($ele).type(global.Selectors.referral_Summary.txt.status_Val)
                })
            cy.get(global.Selectors.create_Referral.elements.save_Button)
                .should("be.visible")
                .click({ force: true });
            cy.wait(["@referral_List"], { timeout: 90000 }).then(() => {
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

            // cy.wait(("@referral_Loading"), { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.referral_Summary.elements.search_FirstRecord).last().should("be.visible").click({ force: true })
            // })
            //--- end of search
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            global.testCaseId = 142089
            cy.wait(["@allApiReq"], { timeout: 50000 }).then(() => {
                cy.LogNReport("Select the \"Close\" button while the Referral is open");
                // cy.get(global.Selectors.referral_Summary.elements.action_Item)
                cy.contains(global.Selectors.referral_Summary.txt.select_An_Action)
                    .should("be.visible").click({ force: true }).then(($ele2) => {
                        cy.wrap($ele2).type(global.Selectors.referral_Summary.txt.close_Referral)
                        cy.wait(["@close_Popup"], { timeout: 50000 }).then(() => {
                            cy.contains(global.Selectors.referral_Summary.txt.select_Close_Reason).should("be.visible").click().then($ele => {
                                cy.wrap($ele).should("be.visible").type((global.Selectors.referral_Summary.txt.select_Close_Reason_Val)).then(($ele2) => {
                                    cy.wrap($ele2).invoke("show").type("{esc}")
                                })
                                //  cy.contains(global.Selectors.referral_Summary.txt.select_Close_Reason_Val).should("be.visible").click({ force: true })
                            })
                            cy.get(global.Selectors.referral_Summary.elements.save_action).should("be.visible").click()
                        })
                        cy.contains(global.Selectors.referral_Summary.txt.open_To_Close_Message).should("be.visible")

                    })
            })
            cy.LogNReport("Verify the validation message");
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

            global.testCaseId = 142094
            cy.LogNReport("Add a comment in the Referral summary");
            cy.get(global.Selectors.referral_Summary.elements.comment_Tab).should("be.visible").click();
            // cy.get(global.Selectors.referral_Summary.elements.command_Arrow).should("be.visible").click({ force: true })
            cy.get(global.Selectors.referral_Summary.elements.comments_Text).should("be.visible").type(global.fakerData.prospect_Info.description)
            cy.get(global.Selectors.referral_Summary.elements.add_Comment).should("be.visible").click().then(() => {
                cy.wait(["@referral_Add_Comment", "@referral_Add_Comment"], { timeout: 50000 }).then(() => {
                    cy.LogNReport("Check if it's added to the comment list.");
                    cy.contains("The comment has been successfully added.").should("exist").then(() => {
                        cy.get(global.Selectors.landing.elements.loading_Indicator)
                            .should("not.exist");
                        cy.get(global.Selectors.referral_Summary.elements.first_Comment).should("be.visible").then(($ele) => {
                            cy.wrap($ele).should("include.text", global.fakerData.prospect_Info.description)
                        })
                    })
                })
            })

            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");


            cy.LogNReport("Search and add a new Document. ");

            cy.get(global.Selectors.referral_Summary.elements.referral_Doc_Tab).should("be.visible").click({ force: true }).then(() => {
                cy.wait(["@upload_Doc", "@upload_Doc"], { timeout: 50000 }).then(() => {

                    global.testCaseId = 142099
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                    cy.get(global.Selectors.referral_Summary.elements.create_Button).should("be.visible")
                    cy.get(global.Selectors.referral_Summary.elements.create_Button).should("be.visible").click({ force: true })
                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                })
                global.testCaseId = 142113
                cy.get(global.Selectors.referral_Summary.elements.cancel_Button).should("be.visible").click({ force: true })
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.get(global.Selectors.referral_Summary.elements.create_Button).should("be.visible").click({ force: true })
                // cy.contains("Upload Document").should("be.visible").click({ force: true })
                cy.LogNReport("Reopen the document popup. ");
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

                cy.get(global.Selectors.referral_Summary.elements.upload_Doc).should("be.visible").click({ force: true })
                //142112
                global.testCaseId = 142112
                cy.LogNReport("Verify the clickable Save button with at least one tag added.");
                cy.get(global.Selectors.referral_Summary.elements.save_action).should("be.visible").click({ force: true })
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

                //142106
                global.testCaseId = 142106
                cy.LogNReport("Save the changes ");
                cy.contains(global.Selectors.referral_Summary.txt.atleast_One_Tag).should("be.visible")
                cy.wait(["@allApiReq"], { timeout: 50000 })
                    .then((interception) => {
                        //cy.contains(global.Selectors.referral_Summary.txt.tags)
                        cy.get(global.Selectors.prospect_Document.elements.open_Tag).should("be.visible").click({ force: true }).then(($ele) => {
                            cy.get(global.Selectors.referral_Summary.elements.tag_Select1).should("be.visible").click({ force: true })
                            cy.get(global.Selectors.referral_Summary.elements.tag_Select6).should("be.visible").click({ force: true }).then($ele => {
                                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                                cy.wrap($ele).type("{esc}")
                                cy.fixture(global.Selectors.client_Instructions.elements.file_Name, "binary")
                                    .then(Cypress.Blob.binaryStringToBlob)
                                    .then((fileContent) => {
                                        // Attach the file to the input element
                                        cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                                            .then((input) => {
                                                const testFile = new File([fileContent], global.Selectors.client_Instructions.elements.file_Name, { type: "application/xlsx", });
                                                const dataTransfer = new DataTransfer();
                                                dataTransfer.items.add(testFile);
                                                input[0].files = dataTransfer.files;
                                                input[0].dispatchEvent(new Event("change", { bubbles: true }));
                                            });
                                    });
                                cy.get(global.Selectors.referral_Summary.elements.save_action).should("be.visible").click({ force: true })
                            })
                        })
                    })
                cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
                    .click({ force: true })

                cy.LogNReport("Search and add a new Document. ");
                cy.wait(["@upload_Doc"], { timeout: 50000 }).then(() => {
                    cy.get(global.Selectors.referral_Summary.elements.create_Button).should("be.visible").click({ force: true })
                    cy.get(global.Selectors.referral_Summary.elements.upload_Doc).should("be.visible").click({ force: true })

                    cy.wait(["@allApiReq"], { timeout: 50000 })
                        .then((interception) => {
                            cy.get(global.Selectors.landing.elements.loading_Indicator)
                                .should("not.exist");
                            cy.get(global.Selectors.prospect_Document.elements.open_Tag).should("be.visible").click({ force: true }).then(($ele) => {
                                cy.get(global.Selectors.referral_Summary.elements.tag_Select5).should("be.visible").click({ force: true }).then($ele => {
                                    cy.get(global.Selectors.referral_Summary.elements.tag_Select7).should("be.visible").click({ force: true }).then($ele => {
                                        cy.wrap($ele).type("{esc}")
                                        cy.fixture(global.Selectors.client_Instructions.elements.file_Name, "binary")
                                            .then(Cypress.Blob.binaryStringToBlob)
                                            .then((fileContent) => {
                                                // Attach the file to the input element
                                                cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
                                                    .then((input) => {
                                                        const testFile = new File([fileContent], global.Selectors.client_Instructions.elements.file_Name, { type: "application/xlsx", });
                                                        const dataTransfer = new DataTransfer();
                                                        dataTransfer.items.add(testFile);
                                                        input[0].files = dataTransfer.files;
                                                        input[0].dispatchEvent(new Event("change", { bubbles: true }));
                                                    });
                                            });
                                        cy.get(global.Selectors.referral_Summary.elements.save_action).should("be.visible").click({ force: true })
                                    })
                                })
                            })
                        })

                })
                cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
                cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
                    .click({ force: true })
                cy.wait(["@upload_Doc"], { timeout: 50000 }).then(() => {
                    cy.get(global.Selectors.referral_Summary.elements.search_Box).should("be.visible").click({ force: true }).then(($ele) => {
                        cy.wrap($ele).type(global.Selectors.referral_Summary.txt.BL + "{enter}")
                    })
                })
                cy.wait(["@upload_Doc"], { timeout: 50000 }).then(() => {
                    //142103
                    global.testCaseId = 142103
                    cy.contains(global.Selectors.referral_Summary.txt.clear).should("be.visible").click({ force: true }).then(() => {
                        cy.wait(["@upload_Doc"], { timeout: 50000 })
                    })
                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                })
                cy.wait(["@upload_Doc"], { timeout: 50000 }).then(() => {
                    cy.get(global.Selectors.referral_Summary.elements.search_Box).should("be.visible").click({ force: true }).then(($ele) => {
                        cy.wrap($ele).type(global.Selectors.referral_Summary.txt.IN + "{enter}")
                    })
                })
                global.testCaseId = 142161
                cy.LogNReport("Validate that the Delete Button is disabled with no documents uploaded. ");
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.contains(global.Selectors.referral_Summary.txt.BL).should("not.exist")
                cy.contains(global.Selectors.referral_Summary.txt.IN).should("exist")
                cy.get(global.Selectors.referral_Summary.elements.gray_Btn).should("be.disabled")
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
                cy.get(global.Selectors.client_Document.elements.tag_check)
                    .should("contain.text", global.Selectors.referral_Summary.txt.IN).then(() => {
                        cy.wait(["@upload_Doc"], { timeout: 50000 }).then(() => {
                            cy.get(global.Selectors.referral_Summary.elements.checkbox).last().click({ force: true })
                        })
                    })
                cy.get(global.Selectors.referral_Summary.elements.gray_Btn).should("be.enabled").click({ force: true })
                cy.contains(global.Selectors.client_Document.txt.confirm_Button_Contains)
                    .click({ force: true });
                cy.contains(global.Selectors.referral_Summary.txt.clear).should("be.visible").click({ force: true }).then(() => {
                    cy.wait(["@upload_Doc"], { timeout: 50000 })
                })
                cy.get(global.Selectors.landing.elements.loading_Indicator)
                    .should("not.exist");
                cy.contains(global.Selectors.referral_Summary.txt.BL).should("exist")
                // cy.contains(global.Selectors.referral_Summary.txt.IN).should("not.exist")
            })
            //142100 - Invalid search tag input for Document
            global.testCaseId = 142100
            cy.LogNReport("Check for invalid search tag input for a Document.");
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.referral_Summary.elements.search_Box).should("be.visible").click({ force: true }).then(($ele) => {
                cy.wrap($ele).type(global.Selectors.referral_Summary.txt.ws + "{enter}").then(() => {
                    cy.get(global.Selectors.landing.elements.loading_Indicator)
                        .should("not.exist");
                    cy.get(global.Selectors.referral_Summary.elements.intial_Data)
                        .should("be.visible").should("contain.text", global.Selectors.referral_Summary.txt.no_Match)
                })
            })
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");


            //Clinical Tab
            //145644
            global.testCaseId = 145644
            cy.LogNReport("Confirm that no records are found in the Clinical Tab.");
            cy.get(global.Selectors.referral_Summary.elements.clinical_Tab).should("be.visible").click({ force: true })
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.referral_Summary.elements.intial_Data).should("be.visible").should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

            //142310
            global.testCaseId = 142310
            cy.LogNReport("Navigate to the Activity Log Detail Page.");
            cy.get(global.Selectors.referral_Summary.elements.activity_Tab).should("be.visible").click({ force: true })
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.contains(global.Selectors.referral_Summary.txt.activity_Log).should("be.visible")
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
            //142302 
            global.testCaseId = 142302
            cy.LogNReport("Ensure the \"Record Uploaded\" log message is displayed.");
            cy.get(global.Selectors.referral_Summary.elements.first_Record_Action)
                .invoke("text")
                .should("be.oneOf", [global.Selectors.client_Activity_Log.txt.record_Uploaded_Contains, global.Selectors.client_Activity_Log.txt.uploaded_Contains])
            cy.get(global.Selectors.referral_Summary.elements.first_Record_Column)
                .should("contain.text", global.Cypress.env("secret_name")).then(($ele) => {
                    cy.wrap($ele).invoke('show').click({ force: true })
                });
            cy.get(global.Selectors.referral_Summary.elements.activity_Details).first().click({ force: true })
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

            //143542
            global.testCaseId = 143542
            cy.LogNReport("Sort the entries in descending order.");
            cy.get(global.Selectors.referral_Summary.elements.activity_Details_Label).should("be.visible").should("contain.text", " Activity Log Details")
            cy.get(global.Selectors.referral_Summary.elements.activity_Tab).should("be.visible").click({ force: true })
            cy.ge2

            //Summary data validation
            cy.get(global.Selectors.referral_Summary.elements.referral_Tab).should("be.visible").click()
            cy.wait(("@dropdownapi"), { timeout: 50000 }).then(() => {
                cy.contains(global.Selectors.create_Referral.txt.summary_Contains).should("be.visible")
            })
            //144307
            global.testCaseId = 144307
            cy.LogNReport("Check that entered details are displayed in the Referral summary.");
            cy.get(global.Selectors.referral_Summary.elements.referral_Claim_Layout).should("be.visible")
                .should("include.text", (claim))
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        })
    //142488
    global.testCaseId = 142488
    cy.LogNReport("Navigate to Referral Edit.");
    cy.contains(global.Selectors.referral_Summary.txt.select_An_Action)
        .should("be.visible")
        .click({ force: true }).then(($ele2) => {
            cy.wrap($ele2).type(global.Selectors.referral_Summary.txt.edit_Referral)
            cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        })
    cy.wait(("@referral_Loading"), { timeout: 50000 }).then(() => {
        cy.LogNReport("Edit the requested referral");
        cy.get(global.Selectors.create_Referral.elements.rush_Radiobutton).should("be.visible").click({ force: true })

    })
    // cy.wait(["@tab_3"], { timeout: 30000 }).then(() => {
    //     cy.get(global.Selectors.generate_Invoice_Bill.elements.review_breadcrumb1).should("be.visible").contains("Edit")
    //     cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").click({ force: true })
    // })


    //         cy.get(global.Selectors.referral_Summary.elements.requested_Tab).should("include.text", global.Selectors.referral_Summary.txt.requested_Tab_Val)
    //             .click({ force: true }).then(() => {
    //                 cy.wait(["@referral_Loading", "@procedure_List"], { timeout: 50000 }).then(() => {
    //                     cy.get(global.Selectors.referral_Summary.elements.add_Btn).should("be.visible").click({ force: true }).then(() => {
    //                         //143366
    //                         global.testCaseId = 143366
    //                         cy.LogNReport("Add Procedures.");

    //                         cy.wait(["@procedureapi", "@referral_Loading"], { timeout: 50000 })
    //                             .then(() => {
    //                                 cy.get(global.Selectors.referral_Summary.elements.procedure).should("be.visible").type(global.Selectors.referral_Summary.txt.procedure_Val + "{downarrow}{enter}")

    //                                 cy.contains(global.Selectors.referral_Summary.txt.body_Part).should("be.visible").click({ force: true }).then(($ele) => {
    //                                     cy.contains(global.Selectors.referral_Summary.txt.body_Part_Val1).should("not.be.hidden").click({ force: true })
    //                                 })
    //                                 cy.get(global.Selectors.referral_Summary.txt.bilater).should("be.visible").click({ force: true }).then(($ele) => {
    //                                     cy.contains(global.Selectors.referral_Summary.txt.bilater_Val1).should("not.be.hidden").click({ force: true })
    //                                 }).then(() => {
    //                                     cy.contains(global.Selectors.referral_Summary.txt.save).invoke("show").should("be.visible").click({ force: true })
    //                                 })
    //                             })
    //                         cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //                     })
    //                 })
    //             })
    //         cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //     })
    // })
    // cy.wait(["@procedure_List"], { timeout: 50000 }).then(() => {
    //     cy.get(global.Selectors.referral_Summary.elements.procedure_Row1).should("be.visible").should("include.text", "99449")
    // })
    // //adding second procedure
    // global.testCaseId = 142090

    // cy.get(global.Selectors.referral_Summary.elements.add_Btn).should("be.visible").click({ force: true }).then(() => {
    //     cy.wait(["@procedureapi", "@referral_Loading"], { timeout: 50000 })
    //         .then(() => {
    //             cy.get(global.Selectors.referral_Summary.elements.procedure).should("be.visible").type(global.Selectors.referral_Summary.txt.procedure_Val1 + "{downarrow}{enter}")

    //             cy.contains(global.Selectors.referral_Summary.txt.body_Part).should("be.visible").click({ force: true }).then(($ele) => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.body_Part_Val2).should("not.be.hidden").click({ force: true })
    //             })
    //             cy.get(global.Selectors.referral_Summary.txt.bilater).should("be.visible").click({ force: true }).then(($ele) => {
    //                 cy.contains(global.Selectors.referral_Summary.txt.bilater_Val2).should("not.be.hidden").click({ force: true }).then(() => {
    //                     cy.contains(global.Selectors.referral_Summary.txt.save).invoke("show").should("be.visible").click({ force: true })
    //                 })
    //             })
    //         })
    // })
    // //cases depandant to user roles are paused 
    // cy.log("Referral summary->To Verify that Assigned to Case Coordinate drop list should be accessible based on User's Role and status of referral - PAUSED")
    // cy.setTestCaseStatusIntoAzures(global.testCaseId, "FAILED");
    //143585

    global.testCaseId = 143585
    cy.LogNReport("Save the changes");

    // cy.get(global.Selectors.referral_Summary.elements.legal_Tab).should("be.visible").click({ force: true })
    // cy.wait(["@referral_Loading"], { timeout: 50000 }).then(() => {
    //Entering service type value again due to issue occurred 
    // cy.get(global.Selectors.create_Referral.elements.service_Type)
    //     .click({ force: true }).then(($ele) => {
    //         cy.wrap($ele).type(global.Selectors.create_Referral.txt.service_Type_Val +
    //             "{downarrow}{enter}")
    //     })
    cy.contains(global.Selectors.create_Referral.txt.required_Message2).should("not.exist").then(() => {
        //cy.get(global.Selectors.create_Referral.elements.next).should("be.visible").click({ force: true })
        cy.contains(global.Selectors.create_Referral.txt.finish).should("be.visible").click({ force: true })
        // })
    })
    cy.get(global.Selectors.referral_Summary.elements.summary).should("be.visible").click({ force: true })
    cy.wait(("@dropdownapi"), { timeout: 50000 }).then(() => {
        cy.contains(global.Selectors.create_Referral.txt.summary_Contains).should("be.visible")
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    //cy.get(global.Selectors.referral_Summary.elements.action_Item).should("be.visible")
    cy.contains(global.Selectors.referral_Summary.txt.select_An_Action).should("be.visible")
        .click({ force: true }).then(($ele2) => {
            cy.wrap($ele2).type(global.Selectors.referral_Summary.txt.new_Bill).then(() => {
                //143580
                //"@new_Bill",
                global.testCaseId = 143580
                cy.LogNReport("Ensure successful Breadcrumb navigation.");

                cy.wait(["@referral_Loading"], { timeout: 50000 }).then(() => {
                    cy.get(global.Selectors.referral_Summary.elements.breadcrumb).should("be.visible").then(($val) => {
                        cy.wrap($val).should("contain.text", global.Selectors.referral_Summary.txt.create_New_Record)
                    })

                    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

                })
            })
        })
    cy.LogNReport("Confirm successful navigation in the Referral Menu.");
    cy.get(global.Selectors.create_Referral.elements.referral_Menu)
        .should("not.be.hidden")
        .click({ force: true });
    highlight(global.Selectors.create_Referral.elements.referral_Menu);
    cy.get(global.Selectors.referral_Summary.elements.referral_list_Label).should("be.visible")

})
// })