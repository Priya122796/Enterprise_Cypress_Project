describe(" e.Task : 1. Verify Create Task", () => {

  it("Verify the ability to 1.Create Task, 2.Search Task",
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

      cy.LogNReport("Login into App with Microsoft Credentials")
      cy.visit(Cypress.env('baseUrl'), {
        onBeforeLoad: win => {
          win.sessionStorage.clear();
        }
      });
      cy.LogNReport("Login into Enterprise account from your AAD tenant");
      cy.Login().then(() => {
        cy.intercept(global.Selectors.landing.url.all_Api_Intercept).as("allApiReq")

      })
      cy.LogNReport("Generating Faker Data");
      cy.generateFakerData();

      cy.fixture('fakerdata.json')
        .then((data) => {
          global.fakerData = data
        });

      //Verify that able to navigate to Task screen 
      cy.TaskMenu();
      //Verify that able to create New task 
      cy.CreateTask();

      cy.Logout();
    });

});
