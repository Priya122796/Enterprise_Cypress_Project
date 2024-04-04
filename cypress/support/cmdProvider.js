// Name: CreateProvider
// Description: Create A New Provider And Navigate To Provider Summary
// Prerequisite: Login should be successful 
Cypress.Commands.add("CreateProvider", function () {
    cy.LogNReport("Create a Provider.")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider.url.provider)
        .as("provider")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider.url.client)
        .as("client")
    //Provider Menu
    cy.get(global.Selectors.provider.elements.provider_Menu).should("be.visible").click({ force: true })
    cy.url().should("include", Cypress.env('baseUrl') + global.Selectors.provider.url.validation)
    //mandatory fields updation
    cy.get(global.Selectors.provider.elements.create_Btn).should("be.visible").click({ force: true })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.wait(["@provider", "@client"], { timeout: 50000 }).then(() => {
        cy.url().should("include", Cypress.env('baseUrl') + global.Selectors.provider.url.create)
        cy.get(global.Selectors.provider.elements.save).should("be.visible").click({ force: true })
        cy.get(global.Selectors.provider.elements.error_Message).should("be.visible").contains(global.Selectors.provider.txt.value_Required)
        cy.contains(global.Selectors.create_Tasks.txt.required_message).should("not.exist")
        cy.get(global.Selectors.provider.elements.last_Name).should("be.visible").type(global.fakerData.provider.last_Name)
        cy.get(global.Selectors.provider.elements.entity_Type).should("be.visible").click({ force: true })
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.provider.elements.entity_Type).should("be.visible").click({ force: true }).then(($ele) => {
            cy.wrap($ele).should("be.visible").type(global.Selectors.provider.txt.group, { delay: 100 }).type("{downarrow}{enter}")
            // cy.get(global.Selectors.landing.elements.loading_Indicator)
            //     .should("not.exist");
            // cy.contains(global.Selectors.provider.txt.group).should("be.visible")
            // cy.contains(global.Selectors.provider.txt.group).should("be.visible").click({ force: true });
        })
        cy.get(global.Selectors.provider.elements.contract).should("be.visible").click({ force: true }).then(($ele) => {
            cy.contains(global.Selectors.provider.txt.technical).should("be.visible").click({ force: true });
        })
    })

    cy.get(global.Selectors.provider.elements.first_Name).should("be.visible").type(global.fakerData.provider.first_Name)

    cy.get(global.Selectors.provider.elements.title).should("be.visible").click({ force: true }).then(($ele) => {
        cy.contains(global.Selectors.provider.txt.administrator).should("be.visible").click({ force: true });
    })
    cy.get(global.Selectors.provider.elements.email).should("be.visible").type(global.fakerData.provider.email)
    cy.get(global.Selectors.provider.elements.address).should("be.visible").type(global.fakerData.provider.street)
    cy.get(global.Selectors.provider.elements.city).should("be.visible").type(global.fakerData.provider.city)
    cy.get(global.Selectors.provider.elements.phone).should("be.visible").type(global.fakerData.provider.mobile_Number)
    cy.get(global.Selectors.provider.elements.phone_Type_ID).should("be.visible").click({ force: true }).then(($ele) => {
        cy.wrap($ele).should("be.visible").type(global.Selectors.provider.txt.mobile, { delay: 100 }).type("{downarrow}{enter}")
        //  cy.contains(global.Selectors.provider.txt.mobile).should("be.visible").click({ force: true });
    })
    // cy.get(global.Selectors.provider.elements.state).should("be.visible")
    //     .click({ force: true }).then(($e1) => {
    //         cy.get(global.Selectors.landing.elements.loading_Indicator)
    //             .should("not.exist")
    //         cy.contains(global.Selectors.provider.txt.AR)
    //             .should("be.visible").click({ force: true });
    //     })
    cy.get(global.Selectors.provider.elements.state).should("be.visible").click({ force: true }).then(($ele) => {
        cy.wrap($ele).type(global.Selectors.provider.txt.AR, { delay: 100 })
    })
    cy.get(global.Selectors.provider.elements.zip).should("be.visible").type(global.fakerData.provider.zip).then(() => {
        cy.get(global.Selectors.provider.elements.save).should("be.visible").click({ force: true })
    })
    cy.get(global.Selectors.provider.elements.error_Message).should("be.visible").contains(global.Selectors.provider.txt.value_Required)
    cy.contains(global.Selectors.create_Tasks.txt.required_message).should("not.exist")
    cy.get(global.Selectors.provider.elements.provider_Name).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type((global.fakerData.provider.company_Name).toString())
    })
    cy.get(global.Selectors.provider.elements.save).should("be.visible").click({ force: true })
    cy.wait(["@provider", "@provider", "@client", "@provider"], { timeout: 50000 }).then(() => {
        //1.General Info
        global.testCaseId = 151808

        cy.get(global.Selectors.provider.elements.tab1_Title).contains(global.Selectors.provider.txt.tab1)
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

        global.testCaseId = 151966
        cy.get(global.Selectors.provider.elements.caqhId).should("be.visible").type(global.fakerData.provider.company_Name, { delay: 100 })
        cy.get(global.Selectors.provider.elements.lastName).should("be.visible").click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

        global.testCaseId = 151808
        cy.get(global.Selectors.provider.elements.recruiter).should("exist").then(() => {
            cy.get(global.Selectors.provider.elements.recruiter_Id)
                .should("be.visible").click({ force: true }).then(($ele) => {
                    cy.wrap($ele).type(global.Selectors.provider.elements.select_Enter, { delay: 100 })
                })
        })
        cy.get(global.Selectors.provider.elements.provider_Description).should("be.visible").type(global.fakerData.provider.description, { delay: 100 })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
        //alternate way to select 
        // cy.contains('Provider Recruiter').should("be.visible").click({ force: true }).then(($ele) => {
        //     //  cy.get("mat-option >.mdc-list-item__primary-text").should("be.visible").first().click({ force: true })
        //     cy.focused().type("{downarrow}{enter}", { delay: 100 })
        // })
        global.testCaseId = 151979
        cy.get('#mat-tab-nav-panel-0').scrollTo("top").then(() => {
            cy.get(global.Selectors.provider.elements.next).should("be.visible").click({ force: true })
        })
        //cy.get('[ng-reflect-router-link="/providers/edit/details"]').should("be.visible").click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    })
    cy.wait(["@provider", "@provider", "@provider", "@provider", "@provider"], { timeout: 50000 }).then(() => {
        //2.Detailed info
        global.testCaseId = 152058
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.provider.elements.contract_Status).should("be.visible").click({ force: true }).then(($ele) => {
            cy.wrap($ele).type(global.Selectors.provider.txt.onex + global.Selectors.provider.elements.select)
        })
        cy.contains(global.Selectors.provider.txt.states).should("be.visible").click({ force: true })
        cy.get(global.Selectors.provider.elements.div_ListBox).should("be.visible").then(($ele) => {
            cy.wrap($ele).contains(global.Selectors.provider.txt.AE).click({ force: true })
            cy.contains(global.Selectors.provider.txt.AK).click({ force: true }).type(global.Selectors.provider.elements.esc)
            cy.get('#mat-tab-nav-panel-0').click({ force: true })
        })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
        global.testCaseId = 152057

        cy.contains(global.Selectors.provider.txt.update).should("be.visible").click({ force: true })
        cy.get(global.Selectors.provider.elements.content).should("be.visible").then(($ele) => {
            cy.wrap($ele).contains(global.Selectors.provider.txt.post_Acute).should("be.visible").click({ force: true })
            cy.wrap($ele).find(global.Selectors.provider.elements.container).first().click({ force: true })
        })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
        global.testCaseId = 152070
        cy.get(global.Selectors.provider.elements.dialog).should("be.visible").then(($ele) => {
            cy.wrap($ele).find(global.Selectors.provider.elements.span).click({ force: true })
        })
        cy.get(global.Selectors.provider.elements.next).should("be.visible").click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    })
    cy.wait(["@provider", "@provider", "@provider"], { timeout: 50000 }).then(() => {
        //3.Contract Info
        global.testCaseId = 152158

        cy.get(global.Selectors.provider.elements.tab3).click({ force: true }).should("be.visible").then(($ele) => {
            cy.wrap($ele).type(global.Selectors.provider.elements.select_Enter)
        })
        cy.get(global.Selectors.provider.elements.coverage).click({ force: true }).should("be.visible").then(($ele) => {
            cy.wrap($ele).type(global.Selectors.provider.elements.select_Enter)
        })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")


        cy.get(global.Selectors.provider.elements.zip).should("be.visible").then(($ele) => {
            cy.wrap($ele).type(global.fakerData.provider.zip)
        })
        cy.get(global.Selectors.provider.elements.state).should("be.visible").then(($ele) => {
            cy.wrap($ele).type(global.Selectors.provider.txt.AR + global.Selectors.provider.elements.select)
        })
        cy.get(global.Selectors.provider.elements.fee_Percent).should("be.visible").type(global.Selectors.provider.txt.fee_Val)
        cy.contains(global.Selectors.provider.txt.load_Procedure).should('be.visible').click({ force: true })


        cy.get(global.Selectors.provider.elements.select_coverage).click({ force: true }).should("be.visible").then(($ele) => {
            cy.wrap($ele).type(global.Selectors.provider.elements.select_Enter)
        })
        cy.get(global.Selectors.provider.elements.select_Filter).click({ force: true }).should("be.visible").then(($ele) => {
            cy.wrap($ele).type(global.Selectors.provider.txt.zip + global.Selectors.provider.elements.select)
        })
        global.testCaseId = 152292
        cy.get(global.Selectors.provider.elements.search_Value).should("be.visible").type(global.fakerData.provider.zip)
        cy.get(global.Selectors.provider.elements.next).should("be.visible").click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    })
    //4.Payment Info
    cy.wait(["@provider", "@client", "@provider"], { timeout: 50000 }).then(() => {
        global.testCaseId = 152352

        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.provider.elements.zip).should("be.visible").then(() => {
            cy.get(global.Selectors.provider.elements.finish).should("be.visible").click({ force: true })
        })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
        cy.wait(["@provider", "@provider", "@provider"], { timeout: 50000 })
    })
})
// Name: ProviderUploadDocument
// Description: Upload Document in Provider Summary
// Prerequisite: Create new Provider  and Navigate to Summary screen 
Cypress.Commands.add("ProviderUploadDocument", function () {

    cy.intercept(Cypress.env('baseUrl') + global.Selectors.provider_Upload_Document.url.document_Assert)
        .as("document_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.document_tags)
        .as("document_tags")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.document_upload)
        .as("document_upload")
    //Document Tab
    cy.get(global.Selectors.provider_Upload_Document.elements.document_Tab).should("be.visible").click({ force: true })
    cy.wait(["@document_tags", "@document_upload"], { timeout: 50000 }).then(() => {
        global.testCaseId = 148519
        cy.url()
            .should("eq", Cypress.env('baseUrl') + global.Selectors.provider_Upload_Document.url.document_Assert)
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

        // test case end 
    })
    // 

    // 145649 & 145703
    cy.LogNReport("Confirm you can upload documents.");
    cy.get(global.Selectors.invoice.elements.upload_Document_Button)
        .click({ force: true })

    cy.LogNReport("Ensure you can tag documents.");
    cy.fixture(global.Selectors.invoice.elements.file_Name, "binary")
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            // Attach the file to the input element
            cy.get(global.Selectors.invoice.elements.upload_File_Button)
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
    cy.get(global.Selectors.invoice.elements.select_Document_Upload).should("be.visible")
        .click({ force: true })
        .then(() => {
            cy.get(global.Selectors.landing.elements.body).should("be.visible")
                .type(global.Selectors.invoice.txt.key_Action_Dropdown_Document_Enter)
        })
    cy.contains(global.Selectors.invoice.txt.cancel_Contains)
        .click({ force: true })
    // cy.contains(global.Selectors.invoice.txt.save_Contains)
    //     .click({ force: true })
    // cy.get(global.Selectors.invoice.elements.document_List_View)
    //     .first()
    //     .should("have.text", global.Selectors.invoice.elements.file_Name.split(".")[0])


    // // 145631 & 145628
    // cy.LogNReport("Verify the ability to filter a Document");
    // cy.get(global.Selectors.invoice.elements.filter_Button)
    //     .click({ force: true })
    // cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    //     .should("not.exist")
    // cy.get(global.Selectors.invoice.elements.filter_Button)
    //     .click({ force: true })
    // cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    //     .should("be.visible")
    // cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    //     .type(global.Selectors.invoice.elements.file_Name.split(".")[0])
    // cy.LogNReport("Verify the ability to search  a Document");
    // cy.get(global.Selectors.invoice.elements.document_List_View)
    //     .first()
    //     .should("have.text", global.Selectors.invoice.elements.file_Name.split(".")[0])
    // cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    //     .clear()
    //     .type(global.Selectors.invoice.txt.enter_Invalid_Input)
    // cy.get(global.Selectors.invoice.elements.document_List_View_No_Record)
    //     .contains(global.Selectors.invoice.txt.no_Record_Contains)
    // cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    //     .clear()
    // cy.LogNReport("Verify the ability to Delete the Uploaded Documents");
    // cy.get(global.Selectors.invoice.elements.check_Box)
    //     .eq(1)
    //     .click({ force: true })
    // cy.get(global.Selectors.invoice.elements.delete_Document_Button)
    //     .click({ force: true })
    // cy.contains(global.Selectors.invoice.txt.confirm_Button_Contains)
    //     .click({ force: true })
    // cy.contains(" No records found").should("be.visible")
    //Due to defect Testcase is commented : while uploading in Provider
})//end of BillUploadDocument


// Name: SearchProvider
// Description: This used to validate entered details in summary
// Prerequisite: Creation of new Summary should be successful
Cypress.Commands.add("SearchProvider", function () {
    cy.get(global.Selectors.provider.elements.provider_Menu).should("be.visible").click({ force: true })

})//end of SearchProvider



// Name: CreateCommunication
// Description: This used to create communication in Provider details screen
// Prerequisite: Creation of new Provider should be successful
Cypress.Commands.add("CreateCommunication", function () {

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider.url.provider)
        .as("provider")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider.url.communications)
        .as("communications")
    cy.LogNReport("Navigate to the Communication Tab.")
    cy.get(global.Selectors.provider.elements.communications_Tab)
        .click()
    cy.get(global.Selectors.create_Prospect.elements.create_Button)
        .click()

    // Create New Communication
    global.testCaseId = 151054

    cy.LogNReport(" Validate your ability to create new communications.")
    cy.contains(global.Selectors.provider.txt.add_Communication_Contains)
        .should("be.visible")
    cy.get(global.Selectors.prospect_Summary.elements.contact_Reason_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.Credentialing_Contains).click()

    cy.get(global.Selectors.prospect_Summary.elements.contact_Date)
        .type(global.fakerData.prospect_Info.date)
    cy.get(global.Selectors.prospect_Summary.elements.contact_Name)
        .type(global.fakerData.prospect_Info.first_Name)
    cy.get(global.Selectors.prospect_Summary.elements.contact_FU_Method_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.mail_Contains).click()
    cy.get(global.Selectors.prospect_Summary.elements.contact_Follow_Up_Activity_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.Research_Contains).click()

    cy.get(global.Selectors.prospect_Summary.elements.contact_Follow_Up_Due_Date)
        .type(global.fakerData.prospect_Info.due_Date)
    cy.get(global.Selectors.prospect_Summary.elements.save_Button)
        .click()
    cy.get(global.Selectors.prospect_Summary.elements.column_Contact)
        .should("contain.text", global.fakerData.prospect_Info.first_Name)
    cy.get(global.Selectors.prospect_Summary.elements.add_button)
        .click()
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

    global.testCaseId = 151060

    cy.LogNReport("Check for the presence of created communications in the summary.")
    cy.contains(global.Selectors.provider.txt.add_Communication_Contains)
        .should("be.visible")
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

    cy.get(global.Selectors.prospect_Summary.elements.contact_Date)
        .type(global.fakerData.prospect_Info.date_Child)
    cy.get(global.Selectors.prospect_Summary.elements.contact_Name)
        .clear()
        .type(global.fakerData.prospect_Info.client_Name)
    cy.get(global.Selectors.prospect_Summary.elements.contact_FU_Method_Dropdown_Icon).click().then(() => {
        cy.contains(global.Selectors.prospect_Summary.txt.mail_Contains).click()
    })

    global.testCaseId = 151063
    cy.get(global.Selectors.prospect_Summary.elements.contact_Follow_Up_Activity_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.Research_Contains).click()

    cy.get(global.Selectors.prospect_Summary.elements.save_Button)
        .click()
    cy.wait("@communications", { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.prospect_Summary.elements.expand_Button_Communications)
            .click()
    });
    cy.wrap()
        .then(loads => {
            cy.get(global.Selectors.prospect_Summary.elements.Column_1st_Contact_Communications)
                .invoke("text")
                .should("be.oneOf", [global.fakerData.prospect_Info.first_Name, global.fakerData.prospect_Info.client_Name])
            cy.get(global.Selectors.prospect_Summary.elements.Column_2nd_Contact_Communications)
                .invoke("text")
                .should("be.oneOf", [global.fakerData.prospect_Info.first_Name, global.fakerData.prospect_Info.client_Name])
        })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    //Creating Second Record For Sorting In Communication
    cy.LogNReport("Confirm user can add multiple communications.")
    cy.get(global.Selectors.create_Prospect.elements.create_Button)
        .click()
    cy.contains(global.Selectors.provider.txt.add_Communication_Contains)
        .should("be.visible")
    cy.get(global.Selectors.prospect_Summary.elements.contact_Reason_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.Credentialing_Contains).click()
    cy.get(global.Selectors.prospect_Summary.elements.contact_Date)
        .type(global.fakerData.prospect_Info.date_Sort)
    cy.get(global.Selectors.prospect_Summary.elements.contact_Name)
        .type(global.fakerData.prospect_Info.first_Name_Next)
    cy.get(global.Selectors.prospect_Summary.elements.contact_FU_Method_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.mail_Contains).click()
    cy.get(global.Selectors.prospect_Summary.elements.contact_Follow_Up_Activity_Dropdown_Icon).click()
    cy.contains(global.Selectors.prospect_Summary.txt.Research_Contains).click()
    cy.get(global.Selectors.prospect_Summary.elements.contact_Follow_Up_Due_Date)
        .type(global.fakerData.prospect_Info.due_Date)
    cy.get(global.Selectors.prospect_Summary.elements.save_Button)
        .click()

    cy.LogNReport("Confirm your ability to sort the Communication List.")
    cy.get(global.Selectors.prospect_Summary.elements.Column_1st_Contact_Communications)
        .invoke("text")
        .should("be.oneOf", [global.fakerData.prospect_Info.first_Name, global.fakerData.prospect_Info.client_Name, global.fakerData.prospect_Info.first_Name_Next])
    cy.get(global.Selectors.prospect_Summary.elements.sort_Arrow_Button)
        .click()
    cy.get(global.Selectors.prospect_Summary.elements.Column_1st_Contact_Communications)
        .invoke("text")
        .should("be.oneOf", [global.fakerData.prospect_Info.first_Name, global.fakerData.prospect_Info.client_Name, global.fakerData.prospect_Info.first_Name_Next])

    global.testCaseId = 149329

    cy.LogNReport("Ensure activities are tracked in the Activity Log, including new and updated ones.")
    cy.get(global.Selectors.provider.elements.activity_Log)
        .click()
    cy.get(global.Selectors.prospect_Activity_Log.elements.activity_Log_1st_Record)
        .invoke("text")
        .should("be.oneOf", [global.Selectors.prospect_Summary.txt.record_Updated_Contains, global.Selectors.prospect_Summary.txt.updated_Contains])
    cy.get(global.Selectors.provider.elements.activity_Log_3rd_Record)
        .invoke("text")
        .should("be.oneOf", [global.Selectors.prospect_Summary.txt.record_Created_Contains, global.Selectors.prospect_Summary.txt.created_Contains])
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    //
    //sort activity log 
    global.testCaseId = 149581
    cy.get(global.Selectors.provider_Upload_Document.elements.activity_Sort).click().click()
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    //invalid search in activity log 
    global.testCaseId = 149585
    cy.get(global.Selectors.provider_Upload_Document.elements.filter).click().type("Invalid Input").then(($ele) => {
        cy.get(global.Selectors.provider_Upload_Document.elements.main_View).should("be.visible")
        cy.wrap($ele).clear()
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //comments add and validate
    global.testCaseId = 148735

    cy.get(global.Selectors.provider_Upload_Document.elements.comments_Tab).should("be.visible").click({ force: true })
    cy.get(global.Selectors.create_Referral.elements.comment_General_Info).should("be.visible")
        .type(global.fakerData.bills.comment)
    cy.get(global.Selectors.provider_Upload_Document.elements.next).should("be.visible").click()
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.provider_Upload_Document.elements.flex_Start).should("be.visible").contains(global.fakerData.bills.comment)
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //Breadcrumb navigation
    global.testCaseId = 147385
    cy.get(global.Selectors.provider_Upload_Document.elements.breadcrumb).should("be.visible").click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    //wait for the summary screen loads 
    cy.wait(["@provider", "@provider", "@provider"], { timeout: 50000 })
});

// Name: ProviderRelated
// Description: This used to validate navigation to Bills and invoices screen , edit/export , delete 
// Prerequisite: Creation of new Provider should be successful and screen should be navigated to provider summary 
Cypress.Commands.add("ProviderRelated", function () {

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.client_Tags)
        .as("client_Loading")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.providers)
        .as("provider")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.clients)
        .as("client")
    global.testCaseId = 147383
    //detail info expand 
    cy.get(global.Selectors.provider_Upload_Document.elements.detail_Info).should("be.visible").click({ force: true })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    //select an action - edit 
    global.testCaseId = 148521
    cy.contains(global.Selectors.provider_Upload_Document.txt.select_Action).should("be.visible").click({ force: true }).then(($el1) => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        global.testCaseId = 148522
        cy.wrap($el1).type(global.Selectors.provider_Upload_Document.txt.view + global.Selectors.provider_Upload_Document.elements.select_Enter)
        cy.wait(["@provider", "@provider", "@client", "@provider"], { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.provider_Upload_Document.elements.last_Name).should("be.visible").clear().type(global.fakerData.provider.last_Name2).then(() => {
                cy.get(global.Selectors.provider_Upload_Document.elements.finish).should("be.visible").click({ force: true })
            })

        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    global.testCaseId = 148524

    //summary check
    cy.wait(["@provider", "@provider", "@provider"], { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.provider_Upload_Document.elements.general_Info).should("be.visible").click({ force: true }).then(() => {
            cy.get(global.Selectors.provider_Upload_Document.elements.di_Table_LastName).should("be.visible").then(($ele) => {
                cy.wrap($ele).should("include.text", global.fakerData.provider.last_Name2)
            })

        })

    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

    //delete 
    cy.contains(global.Selectors.provider_Upload_Document.txt.select_Action).should("be.visible").click({ force: true }).then(($el1) => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        global.testCaseId = 152353
        cy.wrap($el1).type("Delete" + global.Selectors.provider_Upload_Document.elements.select_Enter)
        cy.contains(" Confirm, Mark Deleted ").should("be.visible").click({ force: true })
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
    })
})//end of ProviderRelated
