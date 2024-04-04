// Adding This Highlight Commands Will Highlight The Element
import { highlight } from "cypress-highlight";

// Name: CreateClient
// Description: Create A New Client And Navigate To Client Summary
// Prerequisite: Visit Client Menu
// Shared Steps 141783: ****-*** : Creating Client with Mandatory fields
Cypress.Commands.add("CreateClient", function () {
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.bills.url.client_Landing)
    .as("client_Landing")
  cy.LogNReport("Confirm Client menu selection");
  global.testCaseId = 140671;
  //*** After Landing , Client Menu Selection
  cy.get(global.Selectors.create_Client.elements.client_Menu)
    .should("be.visible")
    .click({ force: true });
  highlight(global.Selectors.create_Client.elements.client_Menu);
  cy.get(global.Selectors.create_Client.elements.record_Contains)
    .should("be.visible");
  cy.contains(global.Selectors.create_Client.elements.create_Contains)
    .click({ force: true, });

  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.create_Client.url.create_Client_Api)
    .as("static_dropdown");
  cy.LogNReport("Confirm navigating to create client screen");

  global.testCaseId = 140741;
  cy.get(global.Selectors.create_Client.elements.client_Text)
    .should("contain.text", global.Selectors.create_Client.elements.client_Text_Expected);
  cy.get(global.Selectors.create_Client.elements.client_Name)
    .should("be.enabled")
    .click({ force: true });
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");

  // Action Item : Create Client screen elements and then typing the Client Name 
  // Approach 1: Solves Flake In Cypress Typing Into An Input Element
  // Reference : https://glebbahmutov.com/blog/flaky-cy-type/


  cy.LogNReport("Confirm entering mandatory fields");
  cy.get(global.Selectors.create_Client.elements.client_Homescreen)
    .then(($dialog) => {
      // cy.wait(["@static_dropdown"], { timeout: 20000 })
      //   .then(() => {
      //  To Do : To handle Double time loading intercepting the Client Api call
      // Action item : Waiting till Api call completed and Typing ClientName
      // Note : Use this approach only when above approach got failed
      cy.wrap($dialog)
        .find(global.Selectors.create_Client.elements.client_Name)
        .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next)
      // });
    })

  cy.get(global.Selectors.create_Client.elements.street)
    .type(global.fakerData.client_Info.street);
  cy.get(global.Selectors.create_Client.elements.city)
    .type(global.fakerData.client_Info.city);
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.get(global.Selectors.create_Client.elements.state_Id).should("be.visible")
    .click({ force: true }).then(($e1) => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
      cy.contains(global.Selectors.create_Client.elements.state_val)
        .should("be.visible").click({ force: true });
    })
  cy.get(global.Selectors.create_Client.elements.zip)
    .type(global.fakerData.client_Info.zip);
  cy.get(global.Selectors.create_Client.elements.mobile_Number)
    .type(global.fakerData.client_Info.mobile_Number);
  cy.get(global.Selectors.create_Client.elements.ext)
    .type(global.fakerData.client_Info.ext);
  cy.get(global.Selectors.create_Client.elements.website)
    .type(global.fakerData.client_Info.website);
  //**retyping client name , ensuring clear and type is working fine.
  cy.get(global.Selectors.create_Client.elements.client_Name).clear()
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Save the record with mandatory fields");
  global.testCaseId = 141335;
  cy.get(global.Selectors.create_Client.elements.save)
    .click({ force: true });
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.LogNReport("Verify successful creation of Client record - ", global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.contains(global.Selectors.create_Client.elements.toaster_assert)
    .should("not.exist");
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 140688;
  cy.get(global.Selectors.create_Client.elements.next)
    .click();
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.general_Info);

  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm Breadcrumb navigation");
  global.testCaseId = 140853;
  cy.get(global.Selectors.create_Client.elements.bread_Crumb)
    .click();
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.client_Info);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 140728;
  cy.get(global.Selectors.create_Client.elements.next)
    .click();

  cy.LogNReport("Confirm entering details in General Info tab");
  cy.contains(global.Selectors.create_Client.txt.type).should("be.visible").click({ force: true }).then($e1 => {
    cy.get(global.Selectors.invoice.elements.dropdown_List_View).should("be.visible").contains(global.Selectors.create_Client.txt.bill_Review).click({ force: true })
    cy.get(global.Selectors.invoice.elements.dropdown_List_View).should("be.visible").contains(global.Selectors.create_Client.txt.branch).click({ force: true })
    cy.get(global.Selectors.invoice.elements.dropdown_List_View).should("be.visible").contains(global.Selectors.create_Client.txt.mco).click({ force: true })
    cy.get(global.Selectors.invoice.elements.dropdown_List_View).type("{esc}")
    cy.get(global.Selectors.create_Client.elements.app_Multiselect).first().click({ force: true })
    cy.get(global.Selectors.create_Client.elements.next_Tab)
      .should("contain.text", global.Selectors.create_Client.txt.general_Info);
    cy.get(global.Selectors.create_Client.elements.name_Of_Crossverinsurers)
      .should("be.visible")
      .type(global.fakerData.client_Info.last_Name);
    cy.get(global.Selectors.create_Client.elements.next)
      .click();
    cy.contains(global.Selectors.create_Client.txt.corporate_Contact_Contains)
      .should("be.visible");

  })
  cy.get(global.Selectors.create_Client.elements.first_Name)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();

  cy.LogNReport("Confirm entering details in Case Coordination");
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.case_Coordination);
  cy.get(global.Selectors.create_Client.elements.first_Name)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();
  cy.contains(global.Selectors.create_Client.txt.step_2_Contains)
    .should("be.visible");
  cy.get(global.Selectors.create_Client.elements.next)
    .click();

  cy.LogNReport("Confirm entering details in Bill Workflow");
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.bill_Workflow);
  cy.get(global.Selectors.create_Client.elements.first_Name)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();
  cy.contains(global.Selectors.create_Client.txt.step_2_Contains)
    .should("be.visible");
  cy.get(global.Selectors.create_Client.elements.first_Name)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();
  cy.wait(["@client_Landing", "@client_Landing", "@client_Landing"], { timeout: 20000 })
    .then(() => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
      //**Provider navigation from Tab switch
      cy.get(global.Selectors.create_Client.elements.client_Provider).should("be.visible").click({ force: true })
    })


  cy.LogNReport("Confirm entering details in Provider Relations");
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.provider_Relations);
  cy.get(global.Selectors.create_Client.elements.national_Client)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();

  cy.LogNReport("Confirm entering details in Accounts Receivable");
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.accounts_Receivable);
  cy.get(global.Selectors.create_Client.elements.first_Name)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();
  cy.contains(global.Selectors.create_Client.txt.step_2_Contains)
    .should("be.visible");
  cy.get(global.Selectors.create_Client.elements.first_Name)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  cy.get(global.Selectors.create_Client.elements.next)
    .click();

  cy.LogNReport("Confirm entering details in IT Contact");
  cy.get(global.Selectors.create_Client.elements.next_Tab)
    .should("contain.text", global.Selectors.create_Client.txt.it_Contact);
  //**Submitting Finish button with entered Client details 
  cy.get(global.Selectors.create_Client.elements.finish)
    .click();
  //**Validating summary screen navigation
  cy.contains(global.Selectors.client_Summary.elements.summary_Contains)
    .should("contain.text", global.Selectors.client_Summary.elements.summary_Contains);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm Client Summary updation for - " + global.fakerData.client_Info.client_Name);

}); //end of CreateClient cmd

// Name: ClientMenuandSearch
// Description:This cmd helps you to Click Client Menu and Search for recently created Client
// Prerequisite: Login should be successfull
// Shared Steps 141838: ****-*** : User Navigating to Main Menu
Cypress.Commands.add("ClientMenuandSearch", function () {

  global.testCaseId = 144229;
  cy.get(global.Selectors.create_Client.elements.client_Menu)
    .should("be.visible")
    .click({ force: true });
  highlight(global.Selectors.create_Client.elements.client_Menu);
  cy.LogNReport("Confirm global client record search -  " + global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next);
  //**Search for the created client 
  cy.get(global.Selectors.client_Search.elements.search)
    .type(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next + global.Selectors.landing.elements.enter);
  highlight(global.Selectors.client_Search.elements.search);
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  //**Sort the recently created Client to top
  cy.contains(global.Selectors.client_Search.elements.date_sort)
    .should("be.visible")
    .click();
  highlight(global.Selectors.client_Search.elements.date_sort);
  //**Select first entry in search results for client
  cy.contains(global.fakerData.client_Info.client_Name + global.fakerData.client_Info.first_Name_Next)
    .click({ force: true });
  highlight(global.Selectors.client_Search.elements.view_firstclient);
  //**Validating Summary screen navigation
  cy.contains(global.Selectors.client_Summary.elements.summary_Contains)
    .should("contain.text", global.Selectors.client_Summary.elements.summary_Contains);
  highlight(global.Selectors.client_Summary.elements.summary_Contains);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

}); //end of ClientMenuandSearch cmd

// Name: ClientSummary
// Description:This cmd helps you to validate saved data is displayed in the Client summary screen
// Prerequisite: Login and Client creation should be successful
// Shared Steps 141781: ****-*** : Viewing Client Summary Screen
Cypress.Commands.add("ClientSummary", function () {

  cy.LogNReport("Confirm presence of mandatory client details")
  //*** Confirming the entered details are displayed in Client Summary Screen
  cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
    .click();
  cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
    .should("be.visible")
    .should("contain.text", global.fakerData.client_Info.client_Name)
  cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Street)
    .should("be.visible")
    .should("contain.text", global.fakerData.client_Info.street);
  cy.get(global.Selectors.client_Summary.elements.client_Info_Client_City)
    .should("be.visible")
    .should("contain.text", global.fakerData.client_Info.city);
  cy.get(global.Selectors.client_Summary.elements.client_Info_Client_State)
    .should("be.visible")
    .should("contain.text", global.Selectors.create_Client.elements.state_val);
  cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Zip)
    .should("be.visible")
    .should("contain.text", global.fakerData.client_Info.zip);

  global.testCaseId = 141433;
  //*** Confirm No records found message displayed for newly created Client */
  cy.get(global.Selectors.client_Training.elements.training)
    .click();
  cy.LogNReport("Confirm absence of records in Training, Documentation, and Instruction");
  cy.get(global.Selectors.client_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);
  cy.get(global.Selectors.client_Summary.elements.document)
    .click();
  cy.get(global.Selectors.client_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 141380;
  cy.get(global.Selectors.client_Summary.elements.instruction)
    .click();
  cy.get(global.Selectors.client_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm addition of new training");
  global.testCaseId = 141275;
  cy.get(global.Selectors.client_Training.elements.training)
    .click();
  cy.get(global.Selectors.client_Training.elements.create_Training_Button)
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm presence of created training in summary");
  global.testCaseId = 141263;
  cy.contains(global.Selectors.client_Training.txt.training_Contains)
    .should("contain.text", global.Selectors.client_Training.txt.training_Contains);
  cy.get(global.Selectors.client_Training.elements.name_Of_Attendees)
    .should("be.visible")
    .type(global.fakerData.client_Info.client_Name, { force: true });
  cy.get(global.Selectors.client_Training.elements.date_Of_Training)
    .type(global.fakerData.client_Info.date, { force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 141287;
  cy.get(global.Selectors.client_Training.elements.save_Button)
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  //**  Assert Training Record Added
  global.testCaseId = 141289;
  cy.get(global.Selectors.client_Training.elements.current_Training_Record_Object)
    .click();
  cy.get(global.Selectors.client_Training.elements.cancel)
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm sorting capability for training list");
  global.testCaseId = 141265;
  cy.get(global.Selectors.client_Training.elements.sort)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm addition of new instruction");
  cy.get(global.Selectors.client_Instructions.elements.instruction)
    .click({ force: true, });

  cy.LogNReport("Confirm tracking of instruction activity in Activity Log");
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Log)
    .click({ force: true, });

  global.testCaseId = 141547;
  //** Filter Activity log records using column filter 
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Filtericon)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 141406;
  //** Validate next button navigation in Activity log screen */
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Next_Button)
    .should("be.visible")
    .click();
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Log_2st_Record)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.client_Activity_Log.txt.record_Created_Contains, global.Selectors.client_Activity_Log.txt.created_Contains])
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Log_1st_Record)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.client_Activity_Log.txt.record_Updated_Contains, global.Selectors.client_Activity_Log.txt.updated_Contains])
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
}); //end of ClientSummary cmd

// Name: ClientUploadDocument
// Description:This cmd helps you to Upload,Delete and Search/View documents in Instructions and Document Tab
// Prerequisite: Login and Client creation should be successful
// Test Case 141370: Client-Client Summary->Instruction/Document->To verify that the user can upload instructions by clicking the upload button.
Cypress.Commands.add("ClientUploadDocument", function () {
  global.testCaseId = 141370;
  cy.get(global.Selectors.client_Summary.elements.instruction)
    .click();
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.client_Instructions.url.api_Check)
    .as("apiRequest2");
  cy.log("Wait till Instruction api call gets completed");
  cy.wait(["@allApiReq"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
      cy.wait(["@apiRequest2", "@allApiReq"], { timeout: 20000 })
        .then(() => {
          cy.contains(global.Selectors.client_Instructions.txt.upload_Instruction_Contains)
            .click();
          cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
        })

      cy.LogNReport("Confirm searching and adding instruction tag");
      global.testCaseId = 141322;
      cy.get(global.Selectors.client_Instructions.elements.open_Tag)
        .click();
      cy.wait(["@allApiReq"], { timeout: 20000 })
        .then((interception) => {
          cy.get(global.Selectors.landing.elements.body)
            .type(global.Selectors.client_Instructions.elements.instruction_Key_Action);
        });
    });
  cy.fixture(global.Selectors.client_Instructions.elements.file_Name, "binary")
    .then(Cypress.Blob.binaryStringToBlob)
    .then((fileContent) => {
      //** */ Attach the file to the input element
      cy.get(global.Selectors.client_Instructions.elements.upload_File_Button)
        .then((input) => {
          const testFile = new File([fileContent], global.Selectors.client_Instructions.elements.file_Name, { type: "application/xlsx", });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          input[0].files = dataTransfer.files;
          input[0].dispatchEvent(new Event("change", { bubbles: true }));
        });
    });

  cy.contains(global.Selectors.invoice.txt.save_Contains)
    .click({ force: true })
  //**Toaster message validation document uploaded with file name */
  cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
  cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
    .click({ force: true })
  cy.get(global.Selectors.client_Instructions.elements.check_Record)
    .should("have.text", global.Selectors.client_Instructions.elements.file_Name);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm document upload and cancellation");
  global.testCaseId = 141324;
  cy.get(global.Selectors.client_Summary.elements.document)
    .click({ force: true, });
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.contains(global.Selectors.client_Instructions.txt.upload_Instruction_Contains)
    .click();
  cy.get(global.Selectors.general.close_Popup)
    .click();
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm search for an added document");
  global.testCaseId = 141337;
  //**Search for newly uploaded document */
  cy.get(global.Selectors.client_Document.elements.search_Document)
    .type(global.Selectors.client_Instructions.elements.file_Name.split(".")[0]);
  cy.get(global.Selectors.client_Document.elements.check_Record)
    .should("have.text", global.Selectors.client_Instructions.elements.file_Name.split(".")[0]);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm at least one tag in the document  ");
  global.testCaseId = 141340;
  cy.get(global.Selectors.client_Document.elements.tag_check)
    .should("have.text", global.Selectors.client_Document.txt.tag);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm document deletion");
  global.testCaseId = 141332;
  cy.get(global.Selectors.client_Document.elements.check_Box_Tick_Button)
    .click({ force: true });
  cy.get(global.Selectors.client_Document.elements.delete_Document_Button)
    .click({ force: true });
  cy.contains(global.Selectors.client_Document.txt.confirm_Button_Contains)
    .click({ force: true });
  cy.LogNReport("Confirm no records in Documentation ");
  cy.get(global.Selectors.client_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  cy.LogNReport("Confirm no records in Instructions ");
  cy.get(global.Selectors.client_Summary.elements.instruction)
    .click();
  cy.get(global.Selectors.client_Summary.elements.record_Contains)
    .should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);

  cy.LogNReport(" Confirm tracking of updated and uploaded activities in Activity Log ");
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Log)
    .click({ force: true, });
  cy.get(global.Selectors.client_Activity_Log.elements.activity_Log_1st_Record)
    .invoke("text")
    .should("be.oneOf", [global.Selectors.client_Activity_Log.txt.record_Uploaded_Contains, global.Selectors.client_Activity_Log.txt.uploaded_Contains])
}); //end of ClientUploadDocument cmd
