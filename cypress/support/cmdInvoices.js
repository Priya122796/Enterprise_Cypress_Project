// Name: SearchInvoice
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("SearchInvoice", function () {
  //intercept
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")
  //https://****-***-dev01.*******.com/#/billing/invoices
  // 148742
  global.testCaseId = 148742;
  cy.LogNReport("Navigate to the Invoice Menu.");
  cy.contains(global.Selectors.invoice.txt.billing_AR_AP_Contains)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.invoice_Menu)
    .should("be.visible")
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Invoice)
  cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
    .should("be.disabled")
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist")
  cy.get(global.Selectors.invoice.elements.select_Filter_Criteria)
    .type(global.Selectors.invoice.txt.enter_Invalid_Input)
  cy.LogNReport("Validate input during Invoice Search.");
  cy.get(global.Selectors.invoice.elements.select_Filter_Criteria_Error_Message)
    .should("have.text", global.Selectors.invoice.txt.filter_Criteria_Error_Message_Occurs)
  cy.get(global.Selectors.invoice.elements.select_Filter_Criteria)
    .invoke("val", "");
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 144427
  global.testCaseId = 144427;
  cy.LogNReport("Select filter criteria.");
  cy.get(global.Selectors.invoice.elements.select_Filter_Criteria)
    .should("be.visible")
    .click({ force: true }).then(() => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
      cy.contains(" Use 'Search' to view the results. ").should("be.visible")
      cy.contains(global.Selectors.invoice.txt.invoice_Number_Contains)
        .should("be.visible")
        .click({ force: true });
    })
  // cy.get(global.Selectors.invoice.elements.dropdown_List_View)
  //   .should("exist")
  //   .invoke("text")
  //   .then(text => {
  //     const textConditions = global.Selectors.invoice.elements.select_Filter_Criteria_List;
  //     const allConditionsMatched = textConditions.every(condition => text.includes(condition));
  //     //  expect(allConditionsMatched).to.be.true; // Assert that at least one condition matches
  //   });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end



  // 144429
  global.testCaseId = 144429;
  cy.LogNReport("Perform a valid search and clear it.");
  cy.get(global.Selectors.invoice.elements.close_Button_Input_Field)
    .should("not.exist")
  cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
    .should("be.visible")
    .should("be.enabled")
    .type(global.Selectors.invoice.txt.invoice_Number)
  cy.get(global.Selectors.invoice.elements.close_Button_Input_Field)
    .should("be.visible")
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 144431
  global.testCaseId = 144431;
  cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
    .should("be.visible")
    .should("be.enabled")
    .clear()
    .type(global.Selectors.invoice.txt.invoice_Number + global.Selectors.landing.elements.enter)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  cy.get(global.Selectors.invoice.elements.list_View_First_Invoices)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist")
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  // test case end
  // Search test case end 
})

// Name: VisitSummary
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("VisitSummary", function () {
  //intercept
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")

  // 148742

  cy.LogNReport("Navigate to the Invoice Menu.");
  cy.contains(global.Selectors.invoice.txt.billing_AR_AP_Contains)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.invoice_Menu)
    .should("be.visible")
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Invoice)
  cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
    .should("be.disabled")

  // 144427

  cy.LogNReport("Select filter criteria.");
  cy.get(global.Selectors.invoice.elements.select_Filter_Criteria)
    .should("be.visible")
    .click({ force: true }).then((ele) => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
      cy.contains(" Use 'Search' to view the results. ").should("be.visible")
      cy.contains(global.Selectors.invoice.txt.invoice_Number_Contains)
        .should("be.visible")
        .click({ force: true });
    })
  // 144429
  cy.LogNReport("Perform a valid search and clear it.");
  cy.get(global.Selectors.invoice.elements.close_Button_Input_Field)
    .should("not.exist")
  cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
    .should("be.visible")
    .should("be.enabled")
    .type(global.Selectors.invoice.txt.invoice_Number)
  cy.get(global.Selectors.invoice.elements.close_Button_Input_Field)
    .should("be.visible")
  // test case end

  // 144431
  cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
    .should("be.visible")
    .should("be.enabled")
    .clear()
    .type(global.Selectors.invoice.txt.invoice_Number + global.Selectors.landing.elements.enter)
  cy.get(global.Selectors.invoice.elements.list_View_First_Invoices)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist")
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  // test case end
  // Search test case end 
})

// Name: RelatedItem
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("RelatedInvoice", function () {
  //intercept
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")
  // 144859
  global.testCaseId = 144859;
  cy.LogNReport("Choose a value in related item dropdown and navigate ");
  // cy.get(global.Selectors.invoice.elements.list_View_First_Invoices)
  //   .should("be.visible")
  //   .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 149004
  global.testCaseId = 149004;
  cy.LogNReport("Navigate successfully using breadcrumbs. ");
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_Search_Menu)
    .should("be.visible")
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Invoice)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  cy.get(global.Selectors.invoice.elements.list_View_First_Invoices)
    .should("be.visible")
    .click({ force: true });

  // 144953
  global.testCaseId = 144953;
  cy.LogNReport("Update the Invoice Summary. ");
  cy.get(global.Selectors.invoice.elements.invoice_Record)
    .should("be.visible")
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 144957
  global.testCaseId = 144957;
  cy.LogNReport("Move to the Referral Summary screen from Invoice. ");
  cy.get(global.Selectors.invoice.elements.referal_Link_Navigation)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.create_Referral_Record)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");


  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });

  // 144959
  global.testCaseId = 144959;
  cy.LogNReport("Go to the Bill Summary screen from Invoice. ");
  cy.get(global.Selectors.invoice.elements.bill_Link_Navigation)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.bills_Details)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 145845
  global.testCaseId = 145845;
  cy.LogNReport("Verify the ability to Add comment.");
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.wait(["@invoice", "@referalrecord", "@referalrecord"], { timeout: 20000 })
    .then((interception) => {
      cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible').then(() => {
        cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
          .should("be.visible")
          .click({ force: true });
        cy.get(global.Selectors.invoice.elements.dropdown_List_View)
          .should("be.visible").then(() => {
            cy.get(global.Selectors.invoice.elements.dropdown_List_View)
              .contains(global.Selectors.invoice.txt.provider_Contains)
              .should("be.visible")
              .click({ force: true });
          })
      });
    })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  global.testCaseId = 144964
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.providers_Summary)
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.dropdown_List_View)
    .contains("Referral")
    .should("be.visible")
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  global.testCaseId = 144965
  cy.LogNReport("Move to the Referral Summary screen from Invoice. ");
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.create_Referral_Record)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.dropdown_List_View)
    .should("be.visible")
  cy.get(global.Selectors.invoice.elements.dropdown_List_View)
    .should("be.visible")
    .should("not.be.hidden")
    .contains(global.Selectors.invoice.txt.bill_Contains)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  cy.LogNReport("Verify the ability to Navigate to Client Summary screen from Invoice ");
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.bills_Details)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.dropdown_List_View)
    .contains(global.Selectors.invoice.txt.client_Contains)
    .should("be.visible")
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.client_Details)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.dropdown_List_View)
    .should("be.visible")
    .contains(global.Selectors.invoice.txt.contracted_Client_Contains)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.client_Details)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.wait(["@referalrecord"], { timeout: 20000 })
    .then((interception) => {
      cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
        .should("be.visible")
        .click({ force: true });
      cy.get(global.Selectors.invoice.elements.dropdown_List_View)
        .contains(global.Selectors.invoice.txt.employed_Insured_Contains)
        .should("be.visible")
        .click({ force: true });
    })
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.client_Details)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
    .should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.dropdown_List_View)
    .contains(global.Selectors.invoice.txt.claim_Admin_Contains)
    .should("be.visible")
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.client_Details)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Invoice_No)
    .should("be.visible")
    .click({ force: true });
})
// Name: SelectAction
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("SelectAction", function () {
  //intercept
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")
  // 144931
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  global.testCaseId = 144931;
  cy.LogNReport("Utilize the \"Select an action\" dropdown menu.");
  cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
  cy.contains(global.Selectors.referral_Summary.txt.select_An_Action).should("be.visible")
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.dropdown_List_View).should("be.visible").then($body => {
    if ($body.text().includes(global.Selectors.invoice.txt.approve_Provider_Payment_Contains)) {
      cy.contains(global.Selectors.invoice.txt.approve_Provider_Payment_Contains)
        .should("be.visible")
        .click({ force: true });
    }
    cy.get("#submitBtn").should("be.visible").click({ force: true })
  });
  cy.wait(["@referalrecord"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
      cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
      cy.contains(global.Selectors.referral_Summary.txt.select_An_Action).should("be.visible")
        .click({ force: true });
      cy.get(global.Selectors.invoice.elements.dropdown_List_View)
        .contains(global.Selectors.invoice.txt.reverse_Invoice_Contains)
        .should("be.visible")
        .click({ force: true });
      cy.get("#submitBtn").should("be.visible").click({ force: true })
      // cy.pause()
      cy.get(global.Selectors.landing.elements.body)
        .type(global.Selectors.invoice.txt.key_Action_Dropdown_Enter)
      cy.get(global.Selectors.invoice.elements.select_Box_Popup_Menu)
        .contains(global.Selectors.invoice.txt.save_Contains)
        .click({ force: true });
    });


  //"@referalrecord",
  cy.wait(["@eopdropdown"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.snack_bar)
        .should("be.visible")
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
        .then((interception) => {
          cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
          cy.contains(global.Selectors.referral_Summary.txt.select_An_Action)
            .should("be.visible")
            .click({ force: true });
          cy.contains(global.Selectors.referral_Summary.txt.select_An_Action).should("be.visible")
            .should("be.visible")
            .click({ force: true })
          cy.get(global.Selectors.invoice.elements.dropdown_List_View)
            .should("be.visible").then(() => {
              cy.get(global.Selectors.invoice.elements.dropdown_List_View).should("be.visible")
                .contains(global.Selectors.invoice.txt.reverse_Invoice_Contains)
                .click({ force: true });
            })
          cy.get("#submitBtn").should("be.visible").click({ force: true })
          cy.get(global.Selectors.invoice.elements.select_Box_Popup_Menu)
            .should("be.visible")
        })
    })

  cy.contains(global.Selectors.invoice.txt.invoice_Reversal_Reason_Contains)
    .should("exist")
    //  .should("be.visible")
    .click({ force: true })

  cy.contains(global.Selectors.invoice.txt.undo_a_Reversal_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.select_Box_Popup_Menu)
    .contains(global.Selectors.invoice.txt.save_Contains)
    .click({ force: true });
  //cy.get('.container > .cancel-btn')
  cy.get(global.Selectors.referral_Summary.elements.popup_Cancel).last()
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end
  // 144963
  global.testCaseId = 144963;
  cy.LogNReport("Verify the ability Select Dropdown actions and cancel selection in Invoice Summary ");
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");
  cy.get(global.Selectors.invoice.elements.eop_Dropdown_Box)
    .first().click({ force: true })
  cy.get(global.Selectors.invoice.elements.eop_Dropdown_Box)
    .first().type(global.Selectors.invoice.txt.key_Action_Dropdown)
  cy.get(global.Selectors.invoice.elements.cancel_Button)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end
})

// Name: AddComment
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("AddComment", function () {
  //intercept
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")
  // 144961
  global.testCaseId = 144961;
  cy.LogNReport("Verify the ability to save the EOP code in Invoice Summary");
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist");


  cy.wait(["@eopdropdown"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
      cy.get(global.Selectors.invoice.elements.eop_Dropdown_Box)
        .first()
        .type(global.Selectors.invoice.txt.key_Action_Dropdown, { force: true })
    })


  cy.get(global.Selectors.invoice.elements.save_Button)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 145883
  global.testCaseId = 145883;
  cy.LogNReport("Verify the ability to Navigating to Comments tab. ");
  cy.get(global.Selectors.invoice.elements.comment_Menu)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Details_Comments)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  // 145885
  global.testCaseId = 145885;
  cy.LogNReport("Verify the ability to view the added Comments ");
  cy.get(global.Selectors.invoice.elements.comment_Arrow_Button)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.comment_Arrow_Button)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.comment_Arrow_Button)
    .click({ force: true });
  cy.get("button[id=\"next\"]").then((body) => {
    if (body.is(':visible')) {
      cy.log("Already Comment Opened")
    }
    else {
      cy.get(global.Selectors.invoice.elements.comment_Arrow_Button)
        .click({ force: true });
    }
  })
  cy.get(global.Selectors.invoice.elements.comment_Box_Field).should("not.be.disabled")
    .type(global.fakerData.invoice.comment)
  cy.get(global.Selectors.invoice.elements.next_Button)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.added_Comment_List_View)
    .should("contain.text", global.fakerData.invoice.comment)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  // test case end

  // 145890,145891,145899
  global.testCaseId = 145890;
  cy.LogNReport("Verify the ability to sort Comments ");
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 145891;
  cy.get(global.Selectors.invoice.elements.comment_Sort_Button)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 145899;
  cy.get(global.Selectors.invoice.elements.comment_Sort_By_Last_Name)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  // test case end
})
// Name: AccountRecievable
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("AccountRecievable", function () {
  // 145109
  global.testCaseId = 145109;
  cy.LogNReport("Verify the ability to Navigation to Accounts Receivable");
  cy.get(global.Selectors.invoice.elements.acccounts_Receivable_Navigation)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Accounts_Receivable)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 145114
  global.testCaseId = 145114;
  cy.LogNReport("Verify the ability to add new Comments ");
  cy.get(global.Selectors.invoice.elements.comment_Arrow_Button)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.comment_Box_Input_Field)
    .type(global.fakerData.invoice.account_Receivable_Comment)
  cy.get(global.Selectors.invoice.elements.next_Button)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  // test case end

  // 145120
  global.testCaseId = 145120;
  cy.LogNReport("Verify the ability to Navigation from Invoice to Referral and Bill link action");
  cy.wait(["@invoice"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.referal_Link_Navigation)
        .click({ force: true });
      cy.url()
        .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.create_Referral_Record)
      cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Current_Invoice_No)
        .should("be.visible")
        .click({ force: true });

      cy.get(global.Selectors.invoice.elements.bill_Link_Navigation)
        .click({ force: true });
      cy.url()
        .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.bills_Details)

      cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Current_Invoice_No)
        .should("be.visible")
        .click({ force: true });
    })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end
  // 145123
  global.testCaseId = 145123;
  cy.LogNReport("Verify the ability to add the amount in adjustment amount field ");
  cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
    .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "0")
  cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
    .type(global.Selectors.invoice.txt.key_Action_Dropdown)
  cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
    .click({ force: true });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "1")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      cy.contains(global.Selectors.invoice.txt.over_Payment_Contains)
        .click()
      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "2")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      if (Cypress.env('apiUrl').includes("qa02")) {
        cy.log("Internal pyament is skipped in QA02")
        cy.contains(global.Selectors.invoice.txt.short_Payment_Contains)
          .click()
      } else {
        cy.contains(global.Selectors.invoice.txt.internal_Payment_Contains)
          .click()
      }

      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true })
    });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "3")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      cy.contains(global.Selectors.invoice.txt.bad_Debt_Contains)
        .click()
      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "4")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      cy.contains(global.Selectors.invoice.txt.payment_Received_Contains)
        .click()
      cy.get(global.Selectors.invoice.elements.check_Number)
        .type(global.fakerData.invoice.account_Receivable_Check_Number)
      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "5")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      cy.contains(global.Selectors.invoice.txt.refund_To_Client_Contains)
        .click()
      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "6")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      cy.contains(global.Selectors.invoice.txt.stop_Payment_Contains)
        .click()
      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.wait(["@add_Adjustment"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "7")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      cy.contains(global.Selectors.invoice.txt.move_Payment_Contains)
        .click()
      cy.get(global.Selectors.invoice.elements.destination_Invoice_ID)
        .type(global.fakerData.invoice.account_Receivable_Destination_Invoice_ID)
      cy.get(global.Selectors.invoice.elements.account_Receivable_Check_Number)
        .type(global.fakerData.invoice.account_Receivable_Check_Number)
      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");

  global.testCaseId = 145124;
  cy.wait(["@allApiReq"], { timeout: 20000 })
    .then((interception) => {
      cy.get(global.Selectors.invoice.elements.adjustment_Amount).clear()
        .type(global.fakerData.invoice.account_Receivable_Adjustment_Amount + "8")
      cy.get(global.Selectors.invoice.elements.adjustment_Dropdown_Box)
        .click()
      if (Cypress.env('apiUrl').includes("qa02")) {
        cy.log("Internal pyament is skipped in QA02")
        cy.contains(global.Selectors.invoice.txt.short_Payment_Contains)
          .click()
      } else {
        cy.contains(global.Selectors.invoice.txt.supplemental_Reconciliation_Contains)
          .click()
      }

      cy.get(global.Selectors.invoice.elements.add_Button_Adjustment)
        .click({ force: true });
    });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end
})

// Name: AccountPayable
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("AccountPayable", function () {
  // 146444
  global.testCaseId = 146444;
  cy.LogNReport("Verify the ability to Navigate to Account Payable tab.");
  cy.get(global.Selectors.invoice.elements.accounts_Payable_Navigation)
    .click()
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Accounts_Payable)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  // 146454
  global.testCaseId = 146454;
  cy.LogNReport("Verify the ability to navigate to Referral and bill link.");
  cy.contains(global.Selectors.invoice.txt.details_Of_Referral_Contains)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.create_Referral_Record)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Current_Invoice_No)
    .click({ force: true });

  cy.contains(global.Selectors.invoice.txt.details_Of_Bill_Contains)
    .click({ force: true });
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.bills_Details)
  cy.get(global.Selectors.invoice.elements.bread_Crumb_To_Current_Invoice_No)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end

  //146457
  global.testCaseId = 146457;
  cy.LogNReport("Verify the ability to Adjustments action.");
  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.invoice_Paid_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });

  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.invoice_Unpaid_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });

  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.partial_Payment_Received_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });

  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.reverse_Provider_Courtesy_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });

  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.refunded_by_Provider_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.disbursementAmount)
    .type(global.fakerData.invoice.account_Payable_Disbursement_Amount)

  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.void_Check)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });

  cy.get(global.Selectors.invoice.elements.code_Value).click()
  cy.contains(global.Selectors.invoice.txt.bad_Debt_AP_Contains)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.add_Adjustment_Button)
    .click({ force: true });
  cy.get(global.Selectors.invoice.elements.disbursementAmount)
    .type(global.fakerData.invoice.account_Payable_Disbursement_Amount)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 146465
  global.testCaseId = 146465;
  cy.LogNReport("Verify the ability to EOP Codes list view under Explanation of payment.");
  cy.get(global.Selectors.landing.elements.loading_Indicator)
    .should("not.exist")

  cy.get(global.Selectors.invoice.elements.EOP_Code_Dropdown)
    .click({ force: true });
  // cy.get(global.Selectors.invoice.elements.EOP_Codes_Panel)
  //   .should("be.visible")
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 146466
  global.testCaseId = 146466;
  cy.LogNReport("Verify the ability to Save EOP button action.");
  cy.get(global.Selectors.invoice.elements.EOP_Code_Dropdown)
    .click({ force: true })
  cy.get(global.Selectors.landing.elements.body).type(global.Selectors.invoice.txt.key_Action_Dropdown)
  cy.contains(global.Selectors.invoice.txt.save_EOP_Contains)
    .click({ force: true });
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145873
  global.testCaseId = 145873;
  cy.LogNReport("Verify the ability to Navigating via tabs to Document screen");
  cy.get(global.Selectors.invoice.elements.document_Menu)
    .click({ force: true })
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Details_Document)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 


}); //end of TaskMenu cmd

// Name: SearchInvoice
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>

Cypress.Commands.add("InvoiceUploadDocument", function () {
  //Search code 
  //intercept
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

  cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")

  // 145873
  global.testCaseId = 145873;
  cy.get(global.Selectors.invoice.elements.document_Menu)
    .click({ force: true })
  cy.url()
    .should("eq", Cypress.env('baseUrl') + global.Selectors.invoice.url.billing_Details_Document)
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145625
  global.testCaseId = 145625;
  cy.LogNReport("Verify the ability of add,edit Comments In Documents");
  cy.get(global.Selectors.invoice.elements.comment_Arrow_Button)
    .click({ force: true })
  cy.get(global.Selectors.invoice.elements.comment_Text_Input)
    .type(global.fakerData.invoice.comment)
  cy.contains(global.Selectors.invoice.txt.add_Comment_Contains)
    .click({ force: true })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145649 & 145703
  global.testCaseId = 145649
  cy.LogNReport("Confirm you can upload documents.");
  cy.get(global.Selectors.invoice.elements.upload_Document_Button)
    .click({ force: true })
  cy.get(global.Selectors.invoice.elements.select_Document_Upload)
    .click({ force: true })
    .then(() => {
      cy.get(global.Selectors.landing.elements.body)
        .type(global.Selectors.invoice.txt.key_Action_Dropdown_Document)
    })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  global.testCaseId = 145703
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
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  cy.contains(global.Selectors.invoice.txt.save_Contains)
    .click({ force: true })
  cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
  cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
    .click({ force: true })
  cy.get(global.Selectors.invoice.elements.document_List_View)
    .first()
    .should("have.text", global.Selectors.invoice.elements.file_Name.split(".")[0])


  // 145631 & 145628
  global.testCaseId = 145631
  cy.LogNReport("Verify the ability to filter a Document");
  // cy.get(global.Selectors.invoice.elements.filter_Button)
  //   .click({ force: true })
  // cy.get(global.Selectors.invoice.elements.filter_Column_Name)
  //   .should("not.exist")
  cy.get(global.Selectors.invoice.elements.filter_Button)
    .click({ force: true })
  cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    .should("be.visible")
  cy.get(global.Selectors.invoice.elements.filter_Column_Name)
    .type(global.Selectors.invoice.elements.file_Name.split(".")[0])
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  global.testCaseId = 145628
  cy.LogNReport("Verify the ability to search  a Document");
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
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145698 
  global.testCaseId = 145698
  cy.LogNReport("Verify the ability to Modify tags of the existing document.");
  cy.get(global.Selectors.invoice.elements.tag_check)
    .first()
    .click({ force: true })
  cy.get(global.Selectors.landing.elements.body)
    .type(global.Selectors.invoice.txt.key_Action_Dropdown_Document_Enter)
  cy.contains(global.Selectors.invoice.txt.save_Contains)
    .click({ force: true })
  cy.get(global.Selectors.invoice.elements.tag_check)
    .first()
    .invoke("text")
    .should("be.oneOf", [global.Selectors.invoice.txt.EP_Contains, global.Selectors.invoice.txt.EP_Contains])
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145700 
  global.testCaseId = 145700
  cy.LogNReport("Verify the ability to list the documents in Document Summary");
  cy.get(global.Selectors.invoice.elements.tag_check)
    .should("exist")
    .should("be.visible")
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145701
  global.testCaseId = 145701
  cy.LogNReport("Verify the ability to Download the document from list view.");
  cy.get(global.Selectors.invoice.elements.document_List_View)
    .first()
    .click({ force: true })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

  // 145697
  global.testCaseId = 145697
  cy.LogNReport("Verify the ability to Delete the Uploaded Documents");
  cy.get(global.Selectors.invoice.elements.check_Box)
    .eq(1)
    .click({ force: true })
  cy.get(global.Selectors.invoice.elements.delete_Document_Button)
    .click({ force: true })
  cy.contains(global.Selectors.invoice.txt.confirm_Button_Contains)
    .click({ force: true })
  cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED");
  // test case end 

})