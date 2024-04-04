// Adding This Highlight Commands Will Highlight The Element
import { highlight } from "cypress-highlight";

// Name: Client Search
Cypress.Commands.add("Client_Search", function () {

    cy.get(global.Selectors.create_Client.elements.client_Menu)
        .should("be.visible")
        .click({ force: true });
    highlight(global.Selectors.create_Client.elements.client_Menu);
    cy.LogNReport("Confirm global client record search -  " + global.prodData.ClientInfo.clientName);
    cy.get(global.Selectors.client_Search.elements.search)
        .type(global.prodData.ClientInfo.clientName + "{enter}");
    highlight(global.Selectors.client_Search.elements.search);
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.contains(global.Selectors.client_Search.elements.date_sort)
        .should("be.visible")
        .click();
    highlight(global.Selectors.client_Search.elements.date_sort);
    cy.contains(global.prodData.ClientInfo.clientName)
        .click({ force: true });
    highlight(global.Selectors.client_Search.elements.view_firstclient);
    cy.contains(global.Selectors.client_Summary.elements.summary_Contains)
        .should("contain.text", global.Selectors.client_Summary.elements.summary_Contains);
    highlight(global.Selectors.client_Summary.elements.summary_Contains);

})


// Name:Client_Summary
Cypress.Commands.add("Client_Summary", function () {
    cy.LogNReport("Confirm presence of mandatory client details" + global.prodData.ClientInfo.clientName)
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.ClientInfo.clientName)
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Street)
        .should("be.visible")
        .should("contain.text", global.prodData.ClientInfo.street);
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_City)
        .should("be.visible")
        .should("contain.text", global.prodData.ClientInfo.city);
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_State)
        .should("be.visible")
        .should("contain.text", global.prodData.ClientInfo.state);
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Zip)
        .should("be.visible")
        .should("contain.text", global.prodData.ClientInfo.zip);
    cy.get(global.Selectors.prod.elements.client_Wrapper).should("be.visible").click({ force: true })
    cy.contains(global.Selectors.create_Client.txt.bills).should("be.visible").click({ force: true })
})

//Name : Referral_Search
Cypress.Commands.add("Referral_Search", function () {
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

    cy.LogNReport("Navigate to the Referral menu - ");
    cy.get(global.Selectors.create_Referral.elements.referral_Menu)
        .should("not.be.hidden")
        .click({ force: true });
    highlight(global.Selectors.create_Referral.elements.referral_Menu);
    cy.url().should(
        "eq",
        Cypress.env("baseUrl") + global.Selectors.create_Referral.url.referral_Menu
    );

    cy.LogNReport("Validate the Referral Search with Claim details - " + global.prodData.ReferralInfo.claim_Number)
    cy.get(global.Selectors.referral_Summary.elements.claim_Number).should("be.visible").type(global.prodData.ReferralInfo.claim_Number);
    cy.get(global.Selectors.referral_Summary.elements.status).should("be.visible").type(global.Selectors.referral_Summary.txt.status_Val_prod)
    cy.get(global.Selectors.create_Referral.elements.save_Button)
        .should("be.visible")
        .click({ force: true });
    cy.wait(["@referral_List"], { timeout: 90000 }).then(() => {

        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
    })
    cy.get(global.Selectors.referral_Summary.elements.search_FirstRecord).should("be.visible").click({ force: true })
    // })
    //--- end of search
})

//Name : Referral_SelectRelated
Cypress.Commands.add("Referral_SelectRelated", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.prod.url.referral_Bill)
        .as("Bill_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.prod.url.referral_Invoice)
        .as("Invoices_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.referrals_Summary)
        .as("referrals_Summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.referral_Summary)
        .as("referral_Summary")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Bill.url.client_Summary)
        .as("client_Summary")
    ///
    cy.wait(["@referrals_Summary", "@referral_Summary"], { timeout: 90000 }).then(() => {
        cy.LogNReport("Validate Client Name is present in Referral Summary " + global.prodData.ReferralInfo.client);
        cy.contains(global.Selectors.prod.txt.Summary).should("be.visible")
        cy.contains(global.Selectors.prod.txt.General_Information).should("be.visible").click({ force: true })
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.prod.elements.nth_Child2).should("be.visible").contains(global.prodData.ReferralInfo.client)
        cy.LogNReport("Validate referral Name is present in Referral Summary " + global.prodData.ReferralInfo.referral);
        cy.get(global.Selectors.prod.elements.nth_Child3).should("be.visible").contains(global.prodData.ReferralInfo.referral)
        cy.LogNReport("Validate Claim number is present in Referral Summary " + global.prodData.ReferralInfo.claim_Number);
        cy.get(global.Selectors.prod.elements.nth_Child1).should("be.visible").contains(global.prodData.ReferralInfo.claim_Number).then(() => {
            // cy.contains("Select a related item")
            cy.contains(global.Selectors.prod.txt.select_Related)
                .should("be.visible").click({ force: true })
                .then(($ele) => {
                    cy.wrap($ele).type(global.Selectors.prod.txt.bills)
                })
        })
    })
    cy.contains(global.Selectors.prod.txt.bills).should("be.visible").then(() => {
        cy.LogNReport("Validate referral name is present in Bills Summary - " + global.prodData.ReferralInfo.referral);
        cy.get(global.Selectors.prod.elements.table).contains(global.prodData.ReferralInfo.claim_Number).should("be.visible")
        cy.get(global.Selectors.bills.elements.referral_Verify).should("be.visible").contains(global.prodData.ReferralInfo.referral)
        //
        cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
    })
    //  cy.contains("Select a related item").should("be.visible").click({ force: true })
    // cy.contains("Invoices").should("be.visible").click({ force: true })
    cy.contains(global.Selectors.prod.txt.select_Related).should("be.visible").click({ force: true }).then(($e1) => {
        // cy.wrap($e1).type("Invoices")
        cy.contains(global.Selectors.prod.txt.Invoices).should("be.visible").click({ force: true })
        cy.wait(["@Invoices_Landing"], { timeout: 40000 }).then(() => {
            cy.LogNReport("Validate referral name is present in Invoice Summary - " + global.prodData.ReferralInfo.referral);
            cy.get(global.Selectors.bills.elements.review_Client).should("be.visible").contains(global.prodData.ReferralInfo.claim)
            cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
        })

    })
    //client 
    cy.wait(["@referrals_Summary", "@referral_Summary"], { timeout: 90000 }).then(() => {
        cy.contains(global.Selectors.prod.txt.select_Related).should("be.visible").click({ force: true })
            .then(($ele) => {
                cy.contains(global.prodData.ReferralInfo.client_Menu).should("be.visible").click({ force: true })
            })
        cy.wait(["@client_Summary"], { timeout: 40000 }).then(() => {
            cy.LogNReport("Validate Client name is present in Referral related links - " + global.prodData.ReferralInfo.client);
            cy.get(global.Selectors.client_Summary.elements.client_Info_Exp).should("be.visible")
                .click();
            cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
                .should("be.visible")
                .should("contain.text", global.prodData.ReferralInfo.client)
        })
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
    //contracted client
    cy.wait(["@referrals_Summary", "@referral_Summary"], { timeout: 90000 }).then(() => {
        cy.contains(global.Selectors.prod.txt.select_Related).should("be.visible").click({ force: true })
            .then(($ele) => {
                cy.contains(global.prodData.ReferralInfo.contract).should("be.visible").click({ force: true })
            })
        cy.wait(["@client_Summary"], { timeout: 40000 }).then(() => {
            cy.get(global.Selectors.client_Summary.elements.client_Info_Exp).should("be.visible")
                .click();
            cy.LogNReport("Validate Contract client name is present in Referral related links - " + global.prodData.ReferralInfo.contract);
            cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
                .should("be.visible")
                .should("contain.text", global.prodData.ReferralInfo.contract)
        })
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
    //claim
    cy.wait(["@referrals_Summary", "@referral_Summary"], { timeout: 90000 }).then(() => {
        cy.contains(global.Selectors.prod.txt.select_Related).should("be.visible").click({ force: true })
            .then(($ele) => {
                cy.contains(global.prodData.ReferralInfo.claim_Menu).should("be.visible").click({ force: true })
            })
        cy.wait(["@client_Summary"], { timeout: 40000 }).then(() => {
            cy.LogNReport("Validate Claim name is present in Referral related links - " + global.prodData.ReferralInfo.claim);
            cy.get(global.Selectors.client_Summary.elements.client_Info_Exp).should("be.visible")
                .click();
            cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
                .should("be.visible")
                .should("contain.text", global.prodData.ReferralInfo.claim)
        })
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

})

//Name : Referral_Upload
Cypress.Commands.add("Referral_Upload", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.document_Landing)
        .as("document_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.referral_Summary.url.document_Landing)
        .as("document_List")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.client_Instructions.url.api_Check)
        .as("apiRequest2");
    cy.LogNReport("Search and Add a new Document in Referral ");
    cy.get(global.Selectors.referral_Summary.elements.referral_Doc_Tab).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@document_Landing", "@document_List", "@allApiReq"], { timeout: 50000 }).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            //   cy.contains(global.Selectors.referral_Summary.txt.no_Records_Found).should("be.visible").then(() => {
            cy.get(global.Selectors.referral_Summary.elements.create_Button).should("be.visible").click({ force: true })
            //})
        })
        cy.LogNReport("Confirm searching and adding instruction tag : " + global.Selectors.client_Instructions.elements.instruction_Key_Action);
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

    cy.contains(global.Selectors.invoice.txt.save_Contains)
        .click({ force: true })
    cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
    cy.contains(global.Selectors.upload_Document_Bill.elements.cancel_Upload)
        .click({ force: true })
    cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("not.exist")


    cy.LogNReport("Confirm search for an added document " + global.Selectors.invoice.elements.file_Name);
    cy.get(global.Selectors.client_Document.elements.search_Document)
        .type(global.Selectors.client_Instructions.elements.file_Name.split(".")[0]);

    cy.LogNReport("Confirm document deletion");

    cy.get(global.Selectors.client_Document.elements.check_Box_Tick_Button).last()
        .click({ force: true }).then(() => {
            cy.get(global.Selectors.client_Document.elements.delete_Document_Button)
                .click({ force: true });
            cy.contains(global.Selectors.client_Document.txt.confirm_Button_Contains)
                .click({ force: true });
            cy.LogNReport("Confirm no records in Documentation ");
            cy.get(global.Selectors.client_Summary.elements.record_Contains)
                .should("contain.text", global.Selectors.client_Summary.txt.no_Record_Contains);
        })
})

// Name: Bill_Search
// Description: Search Bill with main Bill id in prod environment
// Prerequisite: Create a new bill
Cypress.Commands.add("Bill_Search", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.search_Bills.url.bill)
        .as("bill")

    //fetching dynamic data from
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    let bill = global.prodData.BillInfo.bill_Id
    let claim = global.prodData.BillInfo.claim_Id
    cy.log(bill + "        " + claim)
    cy.LogNReport("Validate the Search for Bill : " + bill + " and Claim : " + claim);
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
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.contains(global.Selectors.prod.txt.Summary).should("be.visible")
    cy.LogNReport("Validate Bill id : " + bill + " and Claim Number : " + claim + " is present in Bills Summary ");
    cy.get(global.Selectors.bills.elements.Summary_bill_1).should("be.visible").should("include.text", bill)
    cy.get(global.Selectors.bills.elements.Summary_bill_3).should("be.visible").should("include.text", claim)
})//end of SearchBill

// Name: Bill_SelectRelated
// Description: View related items linked to the Bills
// Prerequisite: Create a new bill
Cypress.Commands.add("Bill_SelectRelated", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.record)
        .as("act_Invoice")
    //referral navigation
    cy.LogNReport("Validate Bills screen Related links " + global.prodData.BillInfo.referral_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.BillInfo.referral_Select)
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.LogNReport("Validate Claim id is present in Bills related links " + global.prodData.BillInfo.referral_Select);
    cy.get(global.Selectors.bills.elements.Summary_bill_1).should("be.visible").should("include.text", global.prodData.BillInfo.claim_Id)
    cy.get(global.Selectors.bills.elements.Summary_bill_3).invoke("text").then(text => {
        cy.get(global.Selectors.prod.elements.bread_Crumb_3).contains(text)
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //invoice navigation
    cy.LogNReport("Validate Invoice is present in Bills related links - " + global.prodData.BillInfo.invoice_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.BillInfo.invoice_Select)
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.wait(["@act_Invoice"], { timeout: 50000 }).then((interception) => {

        let invoice = global.prodData.BillInfo.invoice
        cy.log(invoice)
        cy.LogNReport("Validate Invoice number is present in Breadcrumb : " + invoice);

        cy.get(global.Selectors.prod.elements.bread_Crumb_3).contains(invoice)
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //client navigation
    cy.LogNReport("Validate Client is present in Bills related links - " + global.prodData.BillInfo.client_Select);

    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.BillInfo.client_Select)
    })
    cy.get(global.Selectors.prod.elements.client_Info).should("be.visible")
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.BillInfo.client_Name)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //contract navigation
    cy.LogNReport("Validate Contract client is present in Bills related links - " + global.prodData.BillInfo.contract_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.BillInfo.contract_Select)
    })
    cy.get(global.Selectors.prod.elements.client_Info).should("be.visible")
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.BillInfo.contract)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
    //employee navigation
    cy.LogNReport("Validate Carrier client is present in Bills related links - " + global.prodData.BillInfo.carrier);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.BillInfo.employee_Select)
    })
    cy.get(global.Selectors.prod.elements.client_Info).should("be.visible")
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.BillInfo.carrier)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //claim  navigation
    cy.LogNReport("Validate claim is present in Bills related links - " + global.prodData.BillInfo.claim_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.BillInfo.claim_Select)
    })
    cy.get(global.Selectors.prod.elements.client_Info).should("be.visible")
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.BillInfo.claim)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

})//end of Bill_SelectRelated

// Name: Bill_SummaryValidate
// Description: Validate entries in Bills sections
// Prerequisite: Create a new bill
Cypress.Commands.add("Bill_SummaryValidate", function () {
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.review_Queue.url.eor)
        .as("eor")
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.LogNReport("Validate client id is present in Bills Summary - " + global.prodData.BillInfo.client_Select);
    cy.get(global.Selectors.prod.elements.summary_Record).should("be.visible").then(($e1) => {
        cy.get(global.Selectors.prod.elements.general_To_Client).should("be.visible")
            .click({ force: true }).then(() => {
                cy.contains(global.Selectors.prod.txt.UB).should("be.visible")
                cy.contains(global.prodData.BillInfo.claim_Id).should("be.visible")
            })
        cy.get(global.Selectors.prod.elements.general_Info).should("be.visible")
            .click({ force: true })
        cy.get(global.Selectors.prod.elements.bills_Comments).should("be.visible").click({ force: true })
        cy.get(global.Selectors.prod.elements.bills_Record).should("be.visible").click({ force: true })
        cy.get(global.Selectors.prod.elements.bills_To_Client).should("be.visible")
            .click().then(() => {
                cy.LogNReport("Validate client id is present in Bills Summary - " + global.prodData.BillInfo.client_Select);
                cy.get(global.Selectors.prod.elements.bill_Charge_Id).contains(global.prodData.BillInfo.bill_Charge_Id).should("be.visible")
            })
        cy.get(global.Selectors.prod.elements.bills_Expand).scrollIntoView()
            .click({ force: true })



    })

    let bill_ID = global.prodData.BillInfo.bill_Id
    //EOR download
    cy.LogNReport("Download EOR ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.EOR)
    cy.wait(["@eor"], { timeout: 70000 }).then(() => {
        cy.LogNReport("Validate " + "eor_" + bill_ID + "_repriced.pdf " + "downloaded from Bill Summary");
        cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
            cy.log("Wait till Download Success toaster hides")
            cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
            cy.verifyDownload("eor_" + bill_ID + "_repriced.pdf")

        })
    })
    // Original Bill w/Provider Address download
    cy.LogNReport("Download Original Bill w/Provider Address ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.original)
    cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
        cy.LogNReport("Validate " + "bill_" + bill_ID + "_original.pdf is downloaded");
        cy.log("Wait till Download Success toaster hides")
        cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
        cy.verifyDownload("bill_" + bill_ID + "_original.pdf")

        //  })
    })
    // Adva Bill w/Provider Charges download
    cy.LogNReport("Download Adva Bill w/Provider Charges");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.adva_Provider)
    cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
        cy.LogNReport("Validate " + "bill_" + bill_ID + "_provider_charges.pdf is downloaded");
        cy.log("Wait till Download Success toaster hides")
        cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
        cy.verifyDownload("bill_" + bill_ID + "_provider_charges.pdf")

    })
    //})
    // Adva Bill w/Client Billed Amount  download
    cy.LogNReport("Verify the ability to download Adva Bill w/Client Billed Amount ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.adva_Client)
    cy.contains(global.Selectors.review_Queue.txt.download).should("exist").then(ele => {
        cy.LogNReport("Validate " + "bill_" + bill_ID + "_billed_amount.pdf is downloaded");
        cy.log("Wait till Download Success toaster hides")
        cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
        cy.verifyDownload("bill_" + bill_ID + "_billed_amount.pdf")

    })
    // })
})

// Name: Invoice_Search
// Description: This command helps you to navigate to Search Invoice menu.
// Prerequisite: <none>
Cypress.Commands.add("Invoice_Search", function () {
    //intercept
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_Api_Url).as("invoice")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.eopdropdown).as("eopdropdown")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.referalrecord).as("referalrecord")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.acct_Invoice_List_Receivable_Api_Url).as("add_Adjustment")

    cy.intercept(Cypress.env('apiUrl') + global.Selectors.invoice.url.token).as("token")
    //https://****-***-dev01.*******.com/#/billing/invoices
    // 148742
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
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


    // 144427
    cy.LogNReport("Select filter criteria.");
    cy.get(global.Selectors.invoice.elements.select_Filter_Criteria)
        .should("be.visible")
        .click({ force: true }).then(() => {
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist")
            cy.contains(global.Selectors.prod.txt.search_Label).should("be.visible")
            cy.LogNReport("Validate the Search for Invoice " + global.prodData.InvoiceInfo.invoice_Number);
            cy.contains(global.Selectors.invoice.txt.invoice_Number_Contains)
                .should("be.visible")
                .click({ force: true });
        })

    cy.get(global.Selectors.invoice.elements.invoice_Search_Box)
        .should("be.visible")
        .should("be.enabled")
        .clear()
        .type(global.prodData.InvoiceInfo.invoice_Number + global.Selectors.landing.elements.enter)
    cy.get(global.Selectors.invoice.elements.list_View_First_Invoices)
        .should("be.visible")
        .click({ force: true });
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist")
    cy.LogNReport("Validate the navigation to Invoice Summary");
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.Summary).should('be.visible')
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible")
})// test case end


// Name: Invoice_SelectRelated
// Description: View related items linked to the Invoice
// Prerequisite: Create a new bill
Cypress.Commands.add("Invoice_SelectRelated", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.record)
        .as("act_Invoice")
    //provider navigation
    cy.LogNReport("Validate Provider is present in Invoice related links - " + global.prodData.InvoiceInfo.provider_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.InvoiceInfo.provider_Select)
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.bills.elements.Summary_bill_1).invoke("text").then(text => {
        cy.get(global.Selectors.prod.elements.bread_Crumb_3).contains(text)
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //referral navigation
    cy.LogNReport("Validate Referral is present in Invoice related links - " + global.prodData.InvoiceInfo.referral_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.InvoiceInfo.referral_Select)
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.bills.elements.Summary_bill_1).should("be.visible").should("include.text", global.prodData.InvoiceInfo.claim_Id)
    cy.get(global.Selectors.bills.elements.Summary_bill_3).invoke("text").then(text => {
        cy.get(global.Selectors.prod.elements.bread_Crumb_3).contains(text)
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //bill navigation
    cy.LogNReport("Validate Bill is present in Invoice related links - " + global.prodData.InvoiceInfo.bill_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.InvoiceInfo.bill_Select)
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.bills.elements.Summary_bill_1).should("be.visible").should("include.text", global.prodData.InvoiceInfo.bill_Id)
    cy.get(global.Selectors.bills.elements.Summary_bill_3).invoke("text").then(text => {
        cy.get(global.Selectors.prod.elements.bread_Crumb_3).contains(text)
    })
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //client navigation
    cy.LogNReport("Validate Client is present in Invoice related links - " + global.prodData.InvoiceInfo.client_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.InvoiceInfo.client_Select)
    })
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp).should("be.visible")
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.InvoiceInfo.client_Name)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //contract navigation
    cy.LogNReport("Validate Contract Client is present in Invoice related links - " + global.prodData.InvoiceInfo.contract_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.InvoiceInfo.contract_Select)
    })
    cy.get('#client-info-lbe').should("be.visible")
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.InvoiceInfo.contract_Name)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })

    //claim  navigation
    cy.LogNReport("Validate Referral is present in Invoice related links - " + global.prodData.InvoiceInfo.claim_Select);
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele1) => {
        cy.wrap($ele1).type(global.prodData.InvoiceInfo.claim_Select)
    })
    cy.get(global.Selectors.prod.elements.client_Info).should("be.visible")
    cy.get(global.Selectors.client_Summary.elements.client_Info_Exp)
        .click();
    cy.get(global.Selectors.client_Summary.elements.client_Info_Client_Name)
        .should("be.visible")
        .should("contain.text", global.prodData.InvoiceInfo.claim_Name)

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
    let bill_ID = global.prodData.InvoiceInfo.bill_Id
    // Original bill download
    cy.LogNReport("Download Original Bill ");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.download_Bill + global.Selectors.provider.elements.select)
    cy.get(global.Selectors.prod.elements.submit).should("be.visible").click({ force: true })
    cy.LogNReport("Validate bill_" + bill_ID + "_original.pdf is downloaded in Invoice ");
    cy.log("Wait till Download Success toaster hides")
    cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
    cy.verifyDownload("bill_" + bill_ID + "_original.pdf", { timeout: 70000 })
    //  })
    //})
    // Original Invoice download
    cy.LogNReport("Download Original Invoice");
    cy.get(global.Selectors.review_Queue.elements.select_Action).last().clear({ force: true }).type(global.Selectors.review_Queue.txt.download_Invoice + global.Selectors.provider.elements.select)
    cy.get(global.Selectors.prod.elements.submit).should("be.visible").click({ force: true })
    cy.LogNReport("Validate bill_" + bill_ID + "_repriced.pdf is downloaded in Invoice ");
    cy.log("Wait till Download Success toaster hides")
    cy.contains(global.Selectors.review_Queue.txt.download).should("not.exist")
    cy.verifyDownload("bill_" + bill_ID + "_repriced.pdf", { timeout: 70000 })
    // })


})//end of Invoice_SelectRelated

// Name: Provider_Search
// Description: This used to search for created providery
// Prerequisite: Creation of new provider should be successful
Cypress.Commands.add("Provider_Search", function () {
    // cy.get('#Referrals').should("be.visible").click({ force: true })
    // cy.get('#Providers').should("be.visible").click({ force: true })
    // cy.get(global.Selectors.provider.elements.provider_Menu).should("be.visible").click({ force: true })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    // cy.get('#cancel').should("be.visible").click({ force: true })
    // cy.get('.mdc-form-field > label').should("be.visible").click({ force: true })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.LogNReport("Validate Search for Provider - " + global.prodData.ProviderInfo.provider_Name);

    cy.get(global.Selectors.prod.elements.provider_ID).should("be.visible").then(() => {
        cy.get(global.Selectors.prod.elements.provider_ID).should("be.visible").type(global.prodData.ProviderInfo.provider_Id).then(() => {
            cy.get(global.Selectors.prod.elements.provider_ID).should("be.visible").click({ force: true }).then($ele1 => {
                cy.get(global.Selectors.prod.elements.provider_ID).should("be.visible").clear({ force: true }).type(global.prodData.ProviderInfo.provider_Id)
            })
            cy.contains(global.Selectors.prod.txt.Search).should("be.visible").click({ force: true })
        })
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.bills.elements.table).should("be.visible").contains(global.prodData.ProviderInfo.provider_Id).then(() => {
        //cy.get('.mat-mdc-row > .cdk-column-providerName').should("be.visible").click({ force: true })
        cy.contains(global.prodData.ProviderInfo.provider_Name).should("be.visible").click()
    })
    cy.LogNReport("Validate Summary navigation is successful : ");

    cy.contains(global.Selectors.prod.txt.Summary).should("be.visible")

    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").invoke("text").then(text => {
        var val = text.trim()
        cy.get(global.Selectors.prod.elements.nth_Child1).should("include.text", val)
        cy.LogNReport("Validate Summary navigation is successful : " + val);
    })
})//end of Provider_Search

// Name: Provider_SelectRelated
// Description: This used to view related links  to provider
// Prerequisite: Creation of new provider should be successful
Cypress.Commands.add("Provider_SelectRelated", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.provider_Bill)
        .as("provider_Bill")
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.upload.url.navigation)
        .as("navigation")
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    //Bills
    // cy.get('#selectedItem > .mat-mdc-text-field-wrapper').
    cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related)
        .should("be.visible").click({ force: true }).then(($e1) => {
            cy.wrap($e1).type(global.Selectors.prod.txt.bills)
        })
    cy.wait("@provider_Bill", { timeout: 50000 }).then(() => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.get(global.Selectors.prod.elements.bill_ID_Row1).should("be.visible").contains(global.prodData.ProviderInfo.bill_Id).click({ force: true })
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    // cy.get('.breadcrumb > ul > :nth-child(2) > a').should("be.visible").click({ force: true })
    cy.contains(global.Selectors.prod.txt.select_Related).should("be.visible").click({ force: true }).then(($e1) => {
        cy.LogNReport("Validate Invoice linked to Provider Summary ");
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.contains(global.Selectors.prod.txt.Invoice).should("be.visible").click({ force: true })
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    //Invoice
    cy.wait("@navigation", { timeout: 50000 }).then(() => {

        cy.contains("Summary").should("be.visible")
        cy.get(global.Selectors.prod.elements.active).contains(global.Selectors.prod.txt.Invoice_Record)
        cy.LogNReport("Validate Selecting same Provider from Invoice Summary : " + global.prodData.ProviderInfo.provider_Name)
        // cy.get('#selectedItem > .mat-mdc-text-field-wrapper')
        cy.contains(global.Selectors.generate_Invoice_Bill.txt.select_Related).should("be.visible").click({ force: true }).then(($ele) => {
            cy.wrap($ele).type(global.Selectors.prod.txt.Provider + global.Selectors.prod.txt.enter)
        })
    })
    cy.get(global.Selectors.prod.elements.nth_Child1).should("be.visible").contains(global.prodData.ProviderInfo.provider_Name)
    cy.get(global.Selectors.prod.elements.bread_Crumb_2).should("be.visible").click({ force: true })
    cy.LogNReport("Validate breadcrumb navigation ")
    cy.get(global.Selectors.prod.elements.nth_Child1).should("be.visible").contains(global.prodData.ProviderInfo.provider_Name)
})//end of Provider_SelectRelated

// Name: Provider_Edit
// Description: This used to view related links  to provider
// Prerequisite: Creation of new provider should be successful
Cypress.Commands.add("Provider_Edit", function () {
    cy.get(global.Selectors.prod.elements.provider_Summary).should("be.visible").click()
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.LogNReport("Validate view/Edit screen navigation from Provider Summary : " + global.prodData.ProviderInfo.provider_Name)
    //cy.get('#actionItem > .mat-mdc-text-field-wrapper')
    cy.contains(global.Selectors.prod.txt.select_Action)
        .should("be.visible").click().then(() => {
            cy.contains(global.Selectors.prod.txt.Edit).should("be.visible").click({ force: true })
        })

})

// Name: Provider_UploadDocument
// Description: Upload Document in Provider Summary
// Prerequisite: Create new Provider  and Navigate to Summary screen 
Cypress.Commands.add("Provider_UploadDocument", function () {

    cy.intercept(Cypress.env('baseUrl') + global.Selectors.provider_Upload_Document.url.document_Assert)
        .as("document_Landing")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.document_tags)
        .as("document_tags")
    cy.intercept(Cypress.env('apiUrl') + global.Selectors.provider_Upload_Document.url.document_upload)
        .as("document_upload")
    //Document Tab
    cy.LogNReport("Validating Upload document in Provider screen : ")
    cy.get(global.Selectors.provider_Upload_Document.elements.document_Tab).should("be.visible").click({ force: true })
    cy.wait(["@document_tags", "@document_upload"], { timeout: 50000 }).then(() => {
        cy.url()
            .should("eq", Cypress.env('baseUrl') + global.Selectors.provider_Upload_Document.url.document_Assert)
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        // test case end 
    })
    // 

    // 145649 & 145703
    cy.LogNReport("Confirm you can upload documents.");
    cy.get(global.Selectors.invoice.elements.upload_Document_Button)
        .click({ force: true })

    cy.LogNReport("Ensure user can tag documents.");
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
    cy.contains(global.Selectors.invoice.txt.save_Contains)
        .click({ force: true })
    cy.LogNReport("Validate Success toaster in Provider Document Upload  : " + global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name)
    cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("exist")
    cy.get(global.Selectors.prod.elements.provider_Credentials).should("be.visible").click({ force: true })
    cy.get(global.Selectors.provider_Upload_Document.elements.document_Tab).should("be.visible").click({ force: true })
    cy.wait(["@document_tags", "@document_upload"], { timeout: 50000 })
    cy.contains(global.Selectors.upload_Document_Bill.txt.success + global.Selectors.invoice.elements.file_Name).should("not.exist")
    cy.get(global.Selectors.invoice.elements.document_List_View)
        .first()
        .should("have.text", global.Selectors.invoice.elements.file_Name.split(".")[0])
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.LogNReport("Confirm search for an added document - " + global.Selectors.invoice.elements.file_Name.split(".")[0]);
    cy.get(global.Selectors.client_Document.elements.search_Document)
        .type(global.Selectors.client_Instructions.elements.file_Name.split(".")[0]).then(() => {

            cy.LogNReport("Verify the ability to Delete the Uploaded Documents");
            cy.get(global.Selectors.client_Document.elements.check_Box_Tick_Button).first()
                .click({ force: true }).then(() => {
                    cy.get(global.Selectors.client_Document.elements.delete_Document_Button)
                        .click({ force: true });
                    cy.contains(global.Selectors.client_Document.txt.confirm_Button_Contains)
                        .click({ force: true }).then(() => {
                            cy.get(global.Selectors.landing.elements.loading_Indicator)
                                .should("not.exist");

                        })
                })
        })
})//end of ProviderUploadDocument