
// Name: DailyTrialBalance
// Description: Able to select a date then request,cancel, process and complete Daily request report
// Prerequisite: Login should be successful
Cypress.Commands.add("DailyTrialBalance", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.download)
        .as("download");
    cy.LogNReport("Navigate to the Reports Menu");
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
    //  cy.contains(" Daily Trial Balance ").should("be.visible").click({ force: true })
    cy.LogNReport("Validate Mandatory field message");
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
        cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    //Creating a request 
    cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
    //select daily trial label
    var dateReceived = "12-14-23"
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.daily_Label)
    cy.LogNReport("Select Daily Trail Balance Report for  " + dateReceived);
    cy.contains(global.Selectors.reports.txt.daily_Label).should("be.visible").click({ force: true })

    cy.get(global.Selectors.reports.elements.daily_Dynamic).should("be.visible")
        //.type(global.fakerData.referral_Info.date_Received)
        .type(dateReceived)
    global.testCaseId = 150971
    cy.LogNReport("Make Request for Daily Trail Balance");
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])
            cy.log("The status is queued")
        })
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

    let attempt = 1;
    global.testCaseId = 150979
    const whiles = () => {
        cy.log("inside whiles &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)
        cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
            const responseData = interception.response.body
            let firstReportStatus = responseData[0].reportStatus;
            let queueID = responseData[0].reportQueueId;
            cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
            if (firstReportStatus === 22332) {
                cy.LogNReport("Verify Report Status as Queued ");
                cy.log(global.Selectors.reports.txt.queued)
                attempt++
                whiles();
            } else if (firstReportStatus === 700) {
                cy.log(global.Selectors.reports.txt.processing)
                attempt++
                cy.LogNReport("Verify Report Status as Processing ");
                whiles();
            } else if (firstReportStatus === 702) {
                cy.log(global.Selectors.reports.txt.failed)
            } else {
                cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                cy.LogNReport("Verify Report Status as Completed ");

            }
        })
    }
    whiles()
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")
    cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.daily_Label).click({ force: true })
    global.testCaseId = 151158
    cy.LogNReport("Verify Download  - " + global.Selectors.reports.txt.Daily_Download_file + " " + dateReceived + ".xlsx")
    cy.wait(["@download"], { timeout: 70000 }).then(() => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.verifyDownload(global.Selectors.reports.txt.Daily_Download_file + " " + dateReceived + ".xlsx")
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

})
// Name: ClientAging
// Description: Able to select from and to date then request,cancel, process and complete Daily request report
// Prerequisite: Login should be successful
Cypress.Commands.add("ClientAging", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.log("Starting Client Aging Request report")
    cy.get(global.Selectors.reports.elements.Provider).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
        cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
    //select client aging and track it till completed 
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.client_Aging)
    cy.contains(global.Selectors.reports.txt.client_Aging).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.client_Aging_From).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.client_Aging_To).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])
            cy.log("The status is queued")
        })
    })
    let attempt = 1;
    const whiles = () => {
        global.testCaseId = 152043
        cy.log("inside whiles &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)
        cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.client_Aging)
        cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

        cy.get(global.Selectors.reports.elements.row1_status)
            .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing]).then(() => {
                cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
                    const responseData = interception.response.body
                    let firstReportStatus = responseData[0].reportStatus;
                    let queueID = responseData[0].reportQueueId;
                    cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
                    if (firstReportStatus === 22332) {
                        cy.log(global.Selectors.reports.txt.queued)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 700) {
                        cy.log(global.Selectors.reports.txt.processing)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 702) {
                        cy.log(global.Selectors.reports.txt.failed)

                    } else {
                        cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                        cy.get(global.Selectors.reports.elements.status_Column)
                            .invoke("text").then(text => {
                                if (!(text.includes(global.Selectors.reports.txt.completed))) {
                                    attempt++
                                    whiles();
                                }
                            })
                    }
                })
            })
    }
    whiles();


})

// Name: ProviderAging
// Description: Able to select from and to date then request,cancel, process and complete Daily request report
// Prerequisite: Login should be successful
Cypress.Commands.add("ProviderAging", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.log("Starting ProviderAging Request report")
    cy.get(global.Selectors.reports.elements.Provider).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
        cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
    //select ProviderAging and track it till completed 
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.provider_Aging)
    cy.get(global.Selectors.reports.elements.client_Aging_From).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.client_Aging_To).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User", "@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])

            cy.log("The status is queued")
        })
    })
    let attempt = 1;
    const whiles = () => {
        cy.log("inside whiles Provider Aging &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)

        cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
            const responseData = interception.response.body
            let firstReportStatus = responseData[0].reportStatus;
            let queueID = responseData[0].reportQueueId;
            cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
            if (firstReportStatus === 22332) {
                cy.log(global.Selectors.reports.txt.queued)
                attempt++
                whiles();
            } else if (firstReportStatus === 700) {
                cy.log(global.Selectors.reports.txt.processing)
                attempt++
                whiles();
            } else if (firstReportStatus === 22381) {
                cy.log(global.Selectors.reports.txt.cancelled + " Picked second column ")
                attempt++
                whiles();
            }
            else if (firstReportStatus === 702) {
                cy.log(global.Selectors.reports.txt.failed)
            } else {
                cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                cy.get(global.Selectors.reports.elements.status_Column)
                    .invoke("text").then(text => {
                        if (!(text.includes(global.Selectors.reports.txt.completed))) {
                            attempt++
                            whiles();
                        }
                    })
            }
        })
        // })

    }
    whiles()

})


// Name: BillsReport
// Description: Able to select from and to date then request,cancel, process and complete Daily request report
// Prerequisite: Login should be successful
Cypress.Commands.add("BillsReport", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.bill_review_Queue)
        .as("bill_review_Queue");

    cy.log("Starting BillsReport Request report")
    cy.get(global.Selectors.reports.elements.Provider).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
        cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
    //select bills_Report and track it till completed 
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.bills_Report)
    cy.get(global.Selectors.reports.elements.client_Aging_From).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.client_Aging_To).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User", "@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])
            cy.log("The status is queued")
        })
    })
    let attempt = 1;
    const whiles = () => {
        cy.log("inside whiles bills_Report &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)
        cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
            const responseData = interception.response.body
            let firstReportStatus = responseData[0].reportStatus;
            let queueID = responseData[0].reportQueueId;
            cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
            if (firstReportStatus === 22332) {
                cy.log(global.Selectors.reports.txt.queued)
                attempt++
                whiles();
            } else if (firstReportStatus === 700) {
                cy.log(global.Selectors.reports.txt.processing)
                cy.log("Waited till processing ")
            }
        })
        // })

    }
    whiles()

    cy.get(global.Selectors.reports.elements.Provider).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })

    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    //Select Providers Report  and cancel request
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.providers_Report)
    cy.get(global.Selectors.reports.elements.client_Aging_From).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.client_Aging_To).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.providers_Report).then(() => {
                global.testCaseId = 151014
                cy.get(global.Selectors.reports.elements.cancel).contains(global.Selectors.reports.txt.cancel).should("be.visible").click({ force: true })
                cy.wait(["@cancel", "@list_User"], { timeout: 40000 }).then(() => {
                    cy.get(global.Selectors.reports.elements.row1_status)
                        .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.cancelled, global.Selectors.reports.txt.processing])
                    cy.wait(["@list_User"], { timeout: 20000 }).then((interception) => {
                        const responseData = interception.response.body
                        let firstReportStatus = responseData[0].reportStatus;
                        cy.log("Attempt to cancel : " + firstReportStatus)
                        cy.log("Report Status id after cancelling request:***********" + firstReportStatus);
                        cy.log("\n The status is Cancelled")
                        cy.get(global.Selectors.reports.elements.row1_status)
                            .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.cancelled])
                        cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.providers_Report)
                    })
                })
                cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

            })
        })
    })
    //validating second row 
    const whiles_2 = () => {
        cy.log("inside whiles Provider Aging &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)

        cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
            const responseData = interception.response.body
            let firstReportStatus = responseData[1].reportStatus;
            let queueID = responseData[1].reportQueueId;
            cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
            if (firstReportStatus === 22332) {
                cy.log(global.Selectors.reports.txt.queued)
                attempt++
                whiles_2();
            } else if (firstReportStatus === 700) {
                cy.log(global.Selectors.reports.txt.processing)
                attempt++
                whiles_2();
            } else if (firstReportStatus === 22381) {
                cy.log(global.Selectors.reports.txt.cancelled + " Picked second column ")
                attempt++
                whiles_2();
            }
            else if (firstReportStatus === 702) {
                cy.log(global.Selectors.reports.txt.failed)
            } else {
                cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                cy.get(global.Selectors.reports.elements.status_Column2)
                    .invoke("text").then(text => {
                        cy.log("check inside completed " + text)
                        if (!(text.includes(global.Selectors.reports.txt.completed))) {
                            attempt++
                            whiles_2();
                        }
                    })
            }
        })
        // })

    }
    whiles_2()
})


// Name: ProvidersReport
// Description: Able to select from and to date then request,cancel, process and complete ProvidersReport report
// Prerequisite: Login should be successful
Cypress.Commands.add("ProvidersReport", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.log("Starting Providers Report report")
    cy.get(global.Selectors.reports.elements.Provider).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
        cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
    //select Providers Report  and track it till completed 
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.providers_Report)
    cy.get(global.Selectors.reports.elements.client_Aging_From).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.client_Aging_To).should("be.visible").type(global.fakerData.referral_Info.between_Date)
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])
            cy.log("The status is queued")
        })
    })
    let attempt = 1;
    const whiles = () => {

        cy.log("inside whiles &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)
        cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.providers_Report)
        cy.get(global.Selectors.reports.elements.row1_status)
            .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing]).then(() => {
                cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
                    const responseData = interception.response.body
                    let firstReportStatus = responseData[0].reportStatus;
                    let queueID = responseData[0].reportQueueId;
                    cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
                    if (firstReportStatus === 22332) {
                        cy.log(global.Selectors.reports.txt.queued)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 700) {
                        cy.log(global.Selectors.reports.txt.processing)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 702) {
                        cy.log(global.Selectors.reports.txt.failed)

                    } else {
                        cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                        cy.get(global.Selectors.reports.elements.status_Column)
                            .invoke("text").then(text => {
                                if (!(text.includes(global.Selectors.reports.txt.completed))) {
                                    attempt++
                                    whiles();
                                }
                            })
                    }
                })
            })
    }
    whiles();
})

// Name: BillsStatusReport
// Description: able to provide Bill id then request,cancel, process and complete ProvidersReport report
// Prerequisite: Login should be successful
Cypress.Commands.add("BillsStatusReport", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.bill_review_Queue)
        .as("bill_review_Queue");
    cy.log("Starting Bill Status Report ")
    cy.get(global.Selectors.reports.elements.bill_Menu).should("be.visible").click({ force: true })
    cy.contains(global.Selectors.reports.txt.bill_Review).should("be.visible").click({ force: true })
    let bill_ID;
    cy.wait(["@bill_review_Queue"], { timeout: 20000 }).then(() => {
        cy.get(global.Selectors.reports.elements.bill_id).invoke("text").then(text => {
            bill_ID = text.trim()
            cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
            cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
            cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
                cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
            })
            cy.get(global.Selectors.landing.elements.loading_Indicator)
                .should("not.exist");
            cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
            //select Bill Status Report  and track it till completed 
            cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.bill_Status_Report)
            cy.log("the bill id is " + bill_ID)
            cy.get(global.Selectors.reports.elements.bill_Enter).should("be.visible").type(bill_ID)
        })
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])
            cy.log("The status is queued")
        })
    })
    let attempt = 1;
    const whiles = () => {

        cy.log("inside whiles &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)
        cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.bill_Status_Report)
        cy.get(global.Selectors.reports.elements.row1_status)
            .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing]).then(() => {
                cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
                    const responseData = interception.response.body
                    let firstReportStatus = responseData[0].reportStatus;
                    let queueID = responseData[0].reportQueueId;
                    cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
                    if (firstReportStatus === 22332) {
                        cy.log(global.Selectors.reports.txt.queued)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 700) {
                        cy.log(global.Selectors.reports.txt.processing)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 702) {
                        cy.log(global.Selectors.reports.txt.failed)

                    } else {
                        cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                        cy.get(global.Selectors.reports.elements.status_Column)
                            .invoke("text").then(text => {
                                if (!(text.includes(global.Selectors.reports.txt.completed))) {
                                    attempt++
                                    whiles();
                                }
                            })
                    }
                })
            })
    }
    whiles();
})

// Name: ProviderDistance
// Description: Able to enter provider location and select as external, then request,cancel, process and complete Daily request report
// Prerequisite: Login should be successful
Cypress.Commands.add("ProviderDistance", function () {
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.daily_Trial)
        .as("daily_Trial");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.list_User)
        .as("list_User");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.cancel)
        .as("cancel");
    cy.intercept('GET', Cypress.env('apiUrl') + global.Selectors.reports.url.download)
        .as("download");
    cy.log("Starting provider_Distance  report")
    cy.get(global.Selectors.reports.elements.Provider).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.reports_Menu).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true })
    cy.get(global.Selectors.reports.elements.toaster).should("be.visible").contains(global.Selectors.reports.txt.required_Message).then(() => {
        cy.contains(global.Selectors.reports.txt.required_Message).should("not.exist")
    })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.report).should("be.visible").click({ force: true })
    //select provider_Distance and track it till completed 
    cy.get(global.Selectors.reports.elements.report).should("be.visible").type(global.Selectors.reports.txt.provider_Distance)
    cy.get(global.Selectors.reports.elements.location).should("be.visible").type(global.Selectors.reports.txt.zip)
    cy.get(global.Selectors.reports.elements.include_Radio).should("be.visible").click({ force: true })
    cy.get(global.Selectors.landing.elements.loading_Indicator)
        .should("not.exist");
    cy.get(global.Selectors.reports.elements.request).should("be.visible").click({ force: true }).then(() => {
        cy.wait(["@list_User"], { timeout: 20000 }).then(() => {
            cy.get(global.Selectors.reports.elements.row1_status)
                .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing])
            cy.log("The status is queued")
        })
    })
    let attempt = 1;
    const whiles = () => {

        cy.log("inside whiles &&&&&&&&&&&&&&&&&&&& attempt count is " + attempt)
        cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.provider_Distance)
        cy.get(global.Selectors.reports.elements.row1_status)
            .invoke("text").should("be.oneOf", [global.Selectors.reports.txt.queued, global.Selectors.reports.txt.processing]).then(() => {
                cy.wait(["@list_User"], { timeout: 90000 }).then((interception) => {
                    const responseData = interception.response.body
                    let firstReportStatus = responseData[0].reportStatus;
                    let queueID = responseData[0].reportQueueId;
                    cy.log("Report Status:***********" + firstReportStatus + "**************** Queue ID is : " + queueID);
                    if (firstReportStatus === 22332) {
                        cy.log(global.Selectors.reports.txt.queued)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 700) {
                        cy.log(global.Selectors.reports.txt.processing)
                        attempt++
                        whiles();
                    } else if (firstReportStatus === 702) {
                        cy.log(global.Selectors.reports.txt.failed)

                    } else {
                        cy.log(global.Selectors.reports.txt.completed + "\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                        cy.get(global.Selectors.reports.elements.status_Column)
                            .invoke("text").then(text => {
                                if (!(text.includes(global.Selectors.reports.txt.completed))) {
                                    attempt++
                                    whiles();
                                }
                            })
                    }
                })
            })
    }
    whiles();
    cy.get(global.Selectors.reports.elements.row1_colName).should("be.visible").should("include.text", global.Selectors.reports.txt.provider_Distance).click({ force: true })
    global.testCaseId = 151158
    cy.wait(["@download"], { timeout: 70000 }).then(() => {
        cy.get(global.Selectors.landing.elements.loading_Indicator)
            .should("not.exist");
        cy.verifyDownload(global.Selectors.reports.txt.download_file + global.Selectors.reports.txt.zip + ".xlsx")
    })
    cy.setTestCaseStatusIntoAzures(global.testCaseId, "PASSED")

})
