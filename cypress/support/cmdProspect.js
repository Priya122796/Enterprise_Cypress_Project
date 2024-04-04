// Adding This Highlight Commands Will Highlight The elements
import { highlight } from "cypress-highlight";

// Name: CreateProspect
// Description: Create A New Prospect And Navigate To Prospect Summary
// Prerequisite: Login should be successful 
Cypress.Commands.add("CreateProspect", function () {
  global.testCaseId = 143896;
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.prospect_Summary.url.api_Check)
    .as("apiRequest3")
  cy.LogNReport("Confirm navigation to the Prospects menu");
  // cy.get('#Prospects')
  //   .click()
  cy.url()
    .should("be.oneOf", [Cypress.env('baseUrl') + Selectors.landing.url.home_Page, Cypress.env('baseUrl') + Selectors.landing.url.home_Page1]);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  cy.get(global.Selectors.create_Prospect.elements.search_Box)
    .should("be.visible")
  //highlight(global.Selectors.create_Prospect.elements.search_Box)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 143953
  cy.contains(global.Selectors.create_Prospect.elements.advanced_Search)
    .should("be.visible")
    .click({ force: true })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.get(global.Selectors.create_Prospect.elements.search_Box)
    .should("not.be.visible")

  global.testCaseId = 143954
  cy.get(global.Selectors.create_Prospect.elements.filter_Box)
    .should("be.visible")
  cy.get(global.Selectors.create_Prospect.elements.filter_Button)
    .should("be.visible")
    .click()
  cy.get(global.Selectors.create_Prospect.elements.filter_Box)
    .should('not.exist')
  cy.get(global.Selectors.create_Prospect.elements.filter_Button)
    .should("be.visible")
    .click()
  cy.get(global.Selectors.create_Prospect.elements.filter_Box)
    .should("be.visible")
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 143960
  cy.LogNReport("Reset all the data when clicking Cancel button")
  cy.get(global.Selectors.create_Prospect.elements.create_Button)
    .click()
  highlight(global.Selectors.create_Prospect.elements.create_Button)
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.get(global.Selectors.create_Prospect.elements.main_Content_Screen)
    .should('contain.text', global.Selectors.create_Prospect.txt.Corporate_Contact_Address_Information)
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist").then(() => {
      cy.get(global.Selectors.create_Prospect.elements.providerName)
        .should("be.visible")
        .should("be.enabled")
        .type(global.fakerData.prospect_Info.company_Name)
      highlight(global.Selectors.create_Prospect.elements.providerName)
      cy.get(global.Selectors.create_Prospect.elements.fax)
        .should("be.visible")
        .click({ force: true })
      highlight(global.Selectors.create_Prospect.elements.fax)
      cy.get(global.Selectors.create_Prospect.elements.first_Name)
        .should("be.visible")
        .should("be.enabled").click({ force: true }).then(($ele) => {
          cy.wrap($ele).type(global.fakerData.prospect_Info.client_Name)
        })
    })
  //highlight(global.Selectors.create_Prospect.elements.first_Name)
  cy.get(global.Selectors.create_Prospect.elements.last_Name)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.first_Name_Next)
  //  highlight(global.Selectors.create_Prospect.elements.last_Name)
  cy.get(global.Selectors.create_Prospect.elements.email)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.email)
  cy.get(global.Selectors.create_Prospect.elements.street_Address)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.street)
  cy.get(global.Selectors.create_Prospect.elements.city)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.city)
  cy.get(global.Selectors.create_Prospect.elements.zip)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.zip)
  cy.contains("Cancel")
    .click();
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.landing.url.home_Page);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 143957
  cy.LogNReport("Navigating to create Prospect screen")
  cy.get(global.Selectors.create_Prospect.elements.create_Button)
    .click()
  cy.get(global.Selectors.create_Prospect.elements.main_Content_Screen)
    .should('contain.text', global.Selectors.create_Prospect.txt.Corporate_Contact_Address_Information)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 144330
  cy.LogNReport("Save record by providing only mandatory fields")
  cy.get(global.Selectors.create_Prospect.elements.save_Button)
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 144303
  cy.get(global.Selectors.create_Prospect.elements.snack_bar)
    .should('contain.text', global.Selectors.create_Prospect.txt.please_Enter_Provider_Value)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 144302
  cy.LogNReport("Enter optional fields ")
  cy.get(global.Selectors.create_Prospect.elements.providerName)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.company_Name)
  cy.get(global.Selectors.create_Prospect.elements.first_Name)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.client_Name)
  cy.get(global.Selectors.create_Prospect.elements.last_Name)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.first_Name_Next)
  cy.get(global.Selectors.create_Prospect.elements.email)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.email)
  cy.get(global.Selectors.create_Prospect.elements.street_Address)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.street)
  cy.get(global.Selectors.create_Prospect.elements.city)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.city)
  cy.get(global.Selectors.create_Prospect.elements.zip)
    .should("be.visible")
    .type(global.fakerData.prospect_Info.zip)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 143962
  cy.LogNReport("Verify successful creation of Prospect record -" + global.fakerData.prospect_Info.company_Name)
  cy.get(global.Selectors.create_Prospect.elements.save_Button)
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 143989
  cy.LogNReport("Enter details in General Info tab")
  cy.contains("Prospect Created Successfully").should("not.exist")
  cy.get(global.Selectors.create_Prospect.elements.active_Tab)
    .should("contain.text", global.Selectors.create_Prospect.txt.general_Info)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 144339
  cy.LogNReport("Verify Next,Previous button navigations")
  cy.get(global.Selectors.create_Prospect.elements.url)
    .type(global.fakerData.prospect_Info.website)
  cy.contains(global.Selectors.create_Prospect.txt.next_Button_Contains)
    .should("be.enabled")
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")


  cy.LogNReport("Enter details in Detail Info tab")
  cy.get(global.Selectors.create_Prospect.elements.active_Tab)
    .should("contain.text", global.Selectors.create_Prospect.txt.detail_Info)
  cy.wait(["@apiRequest3", "@allApiReq"], { timeout: 20000 })
    .then(() => {
      cy.get(global.Selectors.create_Prospect.elements.contract_Type_Id)
        .should("be.visible")
        .click({ force: true })
    })
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.get(global.Selectors.create_Prospect.elements.contract_Type_Id)
    .should("be.visible")
    .click({ force: true }).then(($ele) => {
      cy.wrap($ele).type(global.Selectors.create_Prospect.txt.global_Contains + "{downarrow}{enter}")
    })
  // cy.contains(global.Selectors.create_Prospect.txt.global_Contains)
  //   .should("be.visible")
  //   .click()
  cy.get(global.Selectors.create_Prospect.elements.estimated_Locations)
    .type(global.fakerData.prospect_Info.zip, { delay: 100 })

  global.testCaseId = 144263
  cy.LogNReport("Verify Finish button navigation")
  cy.get(global.Selectors.create_Prospect.elements.finish).should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.prospect_Summary.elements.contain_Header)
    .should("contain.text", global.Selectors.prospect_Summary.txt.summary_Contains)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

});

// Name: ProspectSummary
// Description: Navigate To Prospect Summary
// Prerequisite: Navigate To Prospect Summary
Cypress.Commands.add("ProspectSummary", function () {
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.prospect_Summary.url.communications)
    .as("communications")
  global.testCaseId = 144308
  cy.LogNReport("Verify successful updation of Prospect Summary for - " + global.fakerData.prospect_Info.company_Names)
  cy.get(global.Selectors.prospect_Summary.elements.contain_Header)
    .should("contain.text", global.Selectors.prospect_Summary.txt.summary_Contains)
  //Provider name is removed from Prospects Summary
  // cy.get(global.Selectors.prospect_Summary.elements.summary_Info_Company_Name)
  //   .should("contain.text", global.fakerData.prospect_Info.company_Name)
  cy.contains(global.Selectors.prospect_Summary.elements.summary_General_Info_Expand_Button).should("be.visible")
    .click()
  //this section is removedCompany name is removed from General Information
  cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_Company_Name)
    .should("contain.text", global.fakerData.prospect_Info.company_Name)
  cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_Provider_Recruiter)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.prospect_Summary.txt.provider_Name, global.Selectors.prospect_Summary.txt.provider_Name_Two_Times, "NA"])
  cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_First_Name)
    .should("contain.text", global.fakerData.prospect_Info.client_Name)
  cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_Last_Name)
    .should("contain.text", global.fakerData.prospect_Info.first_Name_Next)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 144268
  cy.LogNReport("Navigate to Prospects Summary Tabs")
  cy.get(global.Selectors.prospect_Summary.elements.summary_Comment_Section)
    .click()
  cy.url().should("eq", Cypress.env('baseUrl') + global.Selectors.prospect_Summary.url.landing_Url_Comments);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 144310
  cy.LogNReport("Add a new Comment")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.prospect_Summary.url.api_Check)
    .as("apiRequest3")
  cy.get(global.Selectors.prospect_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.prospect_Summary.txt.no_Record_Contains)
  // cy.get(global.Selectors.prospect_Summary.elements.comment_Arrow).should("be.visible").click({ force: true })
  cy.get(global.Selectors.prospect_Summary.elements.comment_Text_Input)
    .type(global.fakerData.prospect_Info.description)

  // Due to Comment screen has a bug due to new Change request -  This section is commented 
  // cy.get(global.Selectors.prospect_Summary.elements.add_Comment)
  //   .invoke('removeAttr', 'disabled')
  //   .should("be.visible")
  //   .click()
  // cy.wait(["@allApiReq"], { timeout: 20000 })
  // cy.get(global.Selectors.prospect_Summary.elements.sort_By_Button)
  //   .click()
  // cy.get(global.Selectors.prospect_Summary.elements.opened_Sort_Icon)
  //   .should("be.visible")
  // cy.get(global.Selectors.prospect_Summary.elements.sort_Default_Icon)
  //   .click({ force: true })
  // cy.get(global.Selectors.prospect_Summary.elements.opened_Sort_Icon)
  //   .should("not.exist")
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  // cy.get(global.Selectors.prospect_Summary.elements.comment_Text_Entered_Record)
  //   .should("contain.text", global.fakerData.prospect_Info.description)

  cy.LogNReport("Verify no records are available in Documentation Tab")
  cy.get(global.Selectors.prospect_Summary.elements.document_Tab)
    .click()
  cy.get(global.Selectors.prospect_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.prospect_Summary.txt.no_Record_Contains)

  global.testCaseId = 144270
  cy.LogNReport("Navigate to Communication Tab")
  cy.get(global.Selectors.prospect_Summary.elements.communications_Tab)
    .click()
  cy.get(global.Selectors.create_Prospect.elements.create_Button)
    .click()
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  // Create New Communication
  global.testCaseId = 144322
  cy.LogNReport(" Create a new Communication")
  cy.contains(global.Selectors.prospect_Summary.txt.add_Communication_Contains)
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

  global.testCaseId = 144333
  cy.LogNReport("Verify the availability of communication created in Communication summary")
  cy.contains(global.Selectors.prospect_Summary.txt.add_Communication_Contains)
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
  //Creating Second Record For Sorting In Communication
  cy.LogNReport("Add more than one communication")
  cy.get(global.Selectors.create_Prospect.elements.create_Button)
    .click()
  cy.contains(global.Selectors.prospect_Summary.txt.add_Communication_Contains)
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

  global.testCaseId = 144324
  cy.LogNReport("Sort Communication List")
  cy.get(global.Selectors.prospect_Summary.elements.Column_1st_Contact_Communications)
    .invoke("text")
    .should("be.oneOf", [global.fakerData.prospect_Info.first_Name, global.fakerData.prospect_Info.client_Name, global.fakerData.prospect_Info.first_Name_Next])
  cy.get(global.Selectors.prospect_Summary.elements.sort_Arrow_Button)
    .click()
  cy.get(global.Selectors.prospect_Summary.elements.Column_1st_Contact_Communications)
    .invoke("text")
    .should("be.oneOf", [global.fakerData.prospect_Info.first_Name, global.fakerData.prospect_Info.client_Name, global.fakerData.prospect_Info.first_Name_Next])
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 144325
  cy.LogNReport("Verify created and updated activities are tracked in Activity Log")
  cy.get(global.Selectors.prospect_Activity_Log.elements.activity_Log)
    .click()
  cy.get(global.Selectors.prospect_Activity_Log.elements.activity_Log_1st_Record)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.prospect_Summary.txt.record_Updated_Contains, global.Selectors.prospect_Summary.txt.updated_Contains, global.Selectors.prospect_Summary.txt.record_Created_Contains, global.Selectors.prospect_Summary.txt.created_Contains])
  cy.get(global.Selectors.prospect_Activity_Log.elements.activity_Log_2st_Record)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.prospect_Summary.txt.record_Created_Contains, global.Selectors.prospect_Summary.txt.created_Contains, global.Selectors.prospect_Summary.txt.record_Updated_Contains, global.Selectors.prospect_Summary.txt.updated_Contains])
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
});

Cypress.Commands.add("ProspectUploadDocument", function () {
  // Upload Document 
  global.testCaseId = 144312
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.prospect_Summary.url.docs_Api_Check)
    .as("provider_prospect_docs");
  cy.LogNReport("Upload, validate and delete the Prospect Summary Document ")
  cy.get(global.Selectors.prospect_Summary.elements.document_Tab)
    .click()
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
  cy.log("Wait till api request for Document call gets complete")
  cy.wait(["@provider_prospect_docs"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
      global.testCaseId = 144318
      cy.get(global.Selectors.prospect_Summary.elements.delete_Document_Button)
        .should("not.exist")
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

      cy.wait("@allApiReq", { timeout: 20000 })
        .then(() => {
          cy.get(global.Selectors.prospect_Document.elements.upload_Document_Button)
            .click()
          cy.LogNReport("Search and add  tag to a Document")
          cy.get(global.Selectors.prospect_Document.elements.open_Tag)
            .click();
          cy.get(global.Selectors.landing.elements.body)
            .type(global.Selectors.prospect_Document.elements.Document_Key_Action);
        });
    })
  cy.fixture(global.Selectors.prospect_Document.elements.file_Name, "binary")
    .then(Cypress.Blob.binaryStringToBlob)
    .then((fileContent) => {
      // Attach the file to the input element
      cy.get(global.Selectors.prospect_Document.elements.upload_File_Button)
        .then((input) => {
          const testFile = new File([fileContent], global.Selectors.prospect_Document.elements.file_Name, {
            type: "application/xlsx",
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          input[0].files = dataTransfer.files;
          input[0].dispatchEvent(new Event("change", { bubbles: true }));
        });
    });
  cy.LogNReport("Upload document in Document Summary")
  cy.contains(global.Selectors.invoice.txt.save_Contains)
    .click({ force: true })
  cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
  cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
    .click({ force: true })
  cy.get(global.Selectors.prospect_Document.elements.check_Record)
    .should("contain.text", global.Selectors.prospect_Document.elements.file_Name.split(".")[0] + global.Selectors.prospect_Document.txt.tag);

  global.testCaseId = 144313
  cy.LogNReport("Column search a uploaded Document")
  cy.get(global.Selectors.prospect_Document.elements.filter_Search)
    .type(global.Selectors.prospect_Document.elements.file_Name.split(".")[0])
  cy.get(global.Selectors.prospect_Document.elements.check_Record)
    .should("contain.text", global.Selectors.prospect_Document.elements.file_Name.split(".")[0] + global.Selectors.prospect_Document.txt.tag);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 144315
  cy.LogNReport("Sort Document")
  cy.get(global.Selectors.prospect_Document.elements.sort_Button)
    .click()
  cy.wait(["@allApiReq"], { timeout: 20000 })
  cy.get(global.Selectors.prospect_Document.elements.sort_Button)
    .click()
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  cy.get(global.Selectors.prospect_Document.elements.check_Box_Tick_Button).first()
    .click({ force: true });

  global.testCaseId = 144318
  cy.LogNReport("Delete a uploaded document")
  cy.get(global.Selectors.prospect_Document.elements.delete_Document_Button)
    .click({ force: true });
  cy.contains(global.Selectors.prospect_Document.txt.confirm_Button_Contains)
    .click({ force: true });

  cy.get(global.Selectors.prospect_Activity_Log.elements.activity_Log)
    .click();
  cy.get(global.Selectors.prospect_Activity_Log.elements.activity_Log_1st_Record)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.prospect_Summary.txt.record_Uploaded_Contains, global.Selectors.prospect_Summary.txt.uploaded_Contains])
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
});

// Name: EditProspect
// Description: Navigate To Prospect Summary and Edit Prospect
// Prerequisite: Navigate To Prospect Summary
Cypress.Commands.add("EditProspect", function () {
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.prospect_Summary.url.api_Check)
    .as("api_Check");
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.prospect_Summary.url.prospects)
    .as("prospects");
  global.testCaseId = 147561
  cy.LogNReport("Edit mandatory fields in prospects")
  cy.get(global.Selectors.edit_Prospect.elements.prospects_Details_Summary)
    .click()
  cy.get(global.Selectors.edit_Prospect.elements.select_An_Action)
    .click()
  cy.contains(global.Selectors.edit_Prospect.txt.view_Or_Edit)
    .click()
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  global.testCaseId = 144265
  cy.LogNReport("Edit in General Info Tab")
  cy.wait(["@api_Check", "@prospects"], { timeout: 50000 })
    .then(() => {
      cy.get(global.Selectors.edit_Prospect.elements.add_New_Prospect)
        .should("contain.text", global.Selectors.edit_Prospect.txt.general_Information)
      cy.get(global.Selectors.edit_Prospect.elements.last_Name)
        .clear()
        .type(global.fakerData.prospect_Info.last_Name + global.fakerData.prospect_Info.first_Name_Next)
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

      // cy.get(global.Selectors.edit_Prospect.elements.edit_Details)
      //   .click()

      // cy.LogNReport("Verify ability to edit dropdown")
      // cy.get(global.Selectors.create_Prospect.elements.contract_Type_Id).click()
      // cy.contains(global.Selectors.create_Prospect.txt.global_Contains)
      //   .click()
      // cy.get(global.Selectors.create_Prospect.elements.estimated_Locations).clear({ force: true })
      //   .type(global.fakerData.prospect_Info.zip)
      // cy.pause()
      global.testCaseId = 144262
      cy.contains(global.Selectors.edit_Prospect.txt.Finish).should("be.visible")
        .click({ force: true })
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

      //Due to flaxiness in payment Tab this cannot be automated

      // cy.get(global.Selectors.edit_Prospect.elements.edit_Payment)
      // .click()
      // cy.get(global.Selectors.edit_Prospect.elements.edit_Details)
      // .click()
      // cy.wait(["@allApiReq"], { timeout: 20000 })
      // .then(() => {
      //   cy.contains(global.Selectors.edit_Prospect.txt.Finish)
      // .click()
      //   cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
      // })

      global.testCaseId = 144332
      cy.LogNReport("Verify the edited details are updated in Prospects summary page")
      cy.get(global.Selectors.prospect_Summary.elements.contain_Header)
        .should("contain.text", global.Selectors.prospect_Summary.txt.summary_Contains)
      cy.get(global.Selectors.prospect_Summary.elements.summary_Info_Company_Name)
        .should("contain.text", global.fakerData.prospect_Info.company_Name)
      cy.contains(global.Selectors.prospect_Summary.elements.summary_General_Info_Expand_Button).should("be.visible")
        .click()
      //this section is removedCompany name is removed from General Information
      cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_Company_Name)
        .should("contain.text", global.fakerData.prospect_Info.company_Name)
      cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_Provider_Recruiter)
        .invoke("text")
        .should("be.oneOf", [global.Selectors.prospect_Summary.txt.provider_Name, global.Selectors.prospect_Summary.txt.provider_Name_Two_Times, "NA"])
      cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_First_Name)
        .should("contain.text", global.fakerData.prospect_Info.client_Name)
      cy.get(global.Selectors.prospect_Summary.elements.summary_General_Info_Last_Name)
        .should("contain.text", global.fakerData.prospect_Info.last_Name + global.fakerData.prospect_Info.first_Name_Next)
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    })
})

// Name: SearchProspect
// Description: Navigate To Prospect Summary and Search Prospect
// Prerequisite: Navigate To Prospect Summary
Cypress.Commands.add("SearchProspect", function () {

  cy.LogNReport("Verify Breadcrumb navigation");
  global.testCaseId = 144326
  cy.get(global.Selectors.prospect_Summary.elements.breadcrumb_To_Prospect)
    .should("be.visible")
    .click()
  cy.url()
    .should("eq", Cypress.env('baseUrl') + Selectors.landing.url.prospects_List);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

  cy.LogNReport("Search Prospects")
  cy.contains(global.Selectors.search_Prospect.txt.Prospects)
    .should("be.visible")
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.contains(global.Selectors.search_Prospect.elements.advanced_Search)
    .should("be.visible")
    .click()
  cy.get(global.Selectors.search_Prospect.elements.first_Record_Searched)
    .invoke('text')
    .then((txt) => {
      cy.get(global.Selectors.search_Prospect.elements.provider_Name)
        .type(txt)
      cy.contains(global.Selectors.search_Prospect.txt.Search)
        .click();
      cy.contains(global.Selectors.search_Prospect.txt.Search)
        .should("not.be.visible");
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
      cy.get(global.Selectors.search_Prospect.elements.first_Record_Searched_Check)
        .should('contain.text', txt)
      cy.contains(global.Selectors.search_Prospect.elements.advanced_Search)
        .should("be.visible")
        .click()

      global.testCaseId = 143955
      cy.LogNReport("Verify ability to  Refresh the Prospects List ")
      cy.get(global.Selectors.search_Prospect.elements.refresh_Button_In_Search)
        .should("be.visible")
        .click()
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

      global.testCaseId = 144329
      cy.LogNReport("Verify the ability when user refresh the prospect list, search should not get removed/ deleted")
      cy.get(global.Selectors.search_Prospect.elements.provider_Name)
        .should('have.value', txt)
      cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    })
})

// Name: ColumnSearch
// Description: Navigate To Prospect Summary and Search Prospect
// Prerequisite: Navigate To Prospect Summary
Cypress.Commands.add("columnSearch", function () {

  cy.LogNReport("Verify Breadcrumb navigation");
  //  global.testCaseId = 144326
  cy.get(global.Selectors.prospect_Summary.elements.breadcrumb_To_Prospect)
    .should("be.visible")
    .click()
  cy.url()
    .should("eq", Cypress.env('baseUrl') + Selectors.landing.url.prospects_List);
  //cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
  //selecting page count 100
  cy.LogNReport("Search Prospects")
  cy.contains(global.Selectors.search_Prospect.txt.Prospects)
    .should("be.visible")
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
  // cy.get(global.Selectors.landing.elements.loading_Indicator)
  //   .should("not.exist");
  // cy.contains(global.Selectors.search_Prospect.elements.advanced_Search)
  //   .should("be.visible")
  //   .click()
  cy.get(global.Selectors.search_Prospect.elements.nine_Record_Searched)
    .invoke('text')
    .then((txt) => {
      cy.get(global.Selectors.search_Prospect.elements.provider_Column)
        .type(txt + "{enter}")
      // cy.contains(global.Selectors.search_Prospect.txt.Search)
      //   .click();
      // cy.contains(global.Selectors.search_Prospect.txt.Search)
      //   .should("not.be.visible");
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
      cy.get(global.Selectors.search_Prospect.elements.first_Record_Searched_Check)
        .should('contain.text', txt)
      cy.contains(txt).should("be.visible")
        .click({ force: true })

      cy.contains("Summary").should("be.visible")
      // cy.contains(global.Selectors.search_Prospect.elements.advanced_Search)
      //   .should("be.visible")
      //   .click()
    })
})