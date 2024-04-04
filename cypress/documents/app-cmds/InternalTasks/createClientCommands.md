**Table of Content**

- [CreateClient](#create-client)
- [ClientMenuandSearch](/cypress/support/cmdClients.js#L231)
- [ClientSummary](/cypress/support/cmdClients.js#L275)
- [ClientUploadDocument](/cypress/support/cmdClients.js#L400)
- [ClientSummary](/cypress/support/cmdClients.js#L275)
- [ClientUploadDocument](/cypress/support/cmdClients.js#L231)
- [BackButtonAfterLogin](/cypress/support/cmdClients.js#L535)
- [BackButtonAfterLogout](/cypress/support/cmdClients.js#L564)

### Create Client

This command helps you to create a New Client with mandatory fields and

TestCases :
1.[Shared Steps 141783](https://******.*.com/*******/Network%20and%20Operations/_workitems/edit/141783): ****-*** : Creating Client with Mandatory fields

```javascript
Example: 
cy.CreateClient()
```

### ClientSummary

This command helps you to validate Created data are retained in Client Summary Screen

TestCases :
1.[Test Case 141216](https://******.*.com/*******/Network%20and%20Operations/_workitems/edit/141216): Create Client -> Verify that a New Client is created and entered data are retained in Summary Screen

```javascript
Example: 
cy.ClientSummary()
```
