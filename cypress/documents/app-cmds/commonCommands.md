**Table of Content**

- [Login](/cypress/support/cmdCommon.js#L34)
- [Logout](/cypress/support/cmdCommon.js#98)
- [SaveLocalStorage](/cypress/support/cmdCommon.js#L7)
- [RestoreLocalStorage](/cypress/support/cmdCommon.js#L16)
- [LogNReport](/cypress/support/cmdCommon.js#L134)

### Login

This command helps you to login to Enterprise application with AAD tenant.

```javascript
Example: 
cy.Login()
```

### Logout

This command helps you to logout from Enterprise application.

```javascript
Example: 
cy.Logout()
```

### SaveLocalStorage

This command helps you to Save Local Storage from Enterprise Login application

```javascript
Example: 
cy.SaveLocalStorage()
```

### RestoreLocalStorage

This command helps you to Restore Local Storage after Login used in all BeforeEach to minimize login attempt

```javascript
Example: 
cy.RestoreLocalStorage()
```

### LogNReport

This command helps you to Add message to Allure and Output the log message to Terminal

```javascript
Example: 
cy.LogNReport()
```
