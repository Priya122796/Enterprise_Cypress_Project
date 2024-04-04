* Author : Nifaanya Priya 
* Email : nifa121196@gmail 
* Profile : https://www.linkedin.com/in/nifaanya-priya-qa/

# Introduction

 Cypress automation framework is created to execute Pro O/S E2E test cases. This framework is created to run UI  based functional testing. 

#  Enterprise Cypress Automation Framework Features

* Automated Web based functional testing
* Integrated Tagging to run selected test cases
* Integrated with Azure Devops for Automation execution status
* Integrated with Azure Portal Keyvault for Sensitive information encryption
* Console Logging
* Allure Report
* Integrated fake data creator with Auto generation of Testdata for each scenario
* Scripts covers for these environments : Dev,QA,Staging and production 

# E2E Automation Project Prerequisite

1. Install NodeJS - https://nodejs.org/en/download/
2. Install Visual Studio Code - https://code.visualstudio.com/
3. Install Git - https://gitforwindows.org/ or any git client
   1. Set the path in the environment variable if necessary
4. Install Azure CLI - https://learn.microsoft.com/en-us/cli/azure/install-azure-cli


# Verify the version number

* node -v
* npm -v
* git --version
* az -v



# Get access to Azure Key Vault

* Create ticket to get readonly (Azure KV NP Read Access) access to the keyvault 

# Add the cert

* TODO:// Where to get it? from dev and Pipeline - C:\DevTools\certs
* setx NODE_EXTRA_CA_CERTS "add pem certificate"
* az login



# Verify the keyvault access

* az login - to ensure we have permission to read it
* run node reference.js

```java
Should return the following

+-- -@0.0.1
+-- @azure/identity@3.2.3
+-- @azure/keyvault-secrets@4.7.0
+-- @cypress/grep@3.1.3
+-- @faker-js/faker@7.6.0
+-- @shelex/cypress-allure-plugin@2.34.0
+-- @testing-library/cypress@9.0.0
+-- allure-commandline@2.20.1
+-- chai-json-schema@1.5.1
+-- cypress-highlight@1.2.0
+-- cypress-plugin-api@2.10.0
+-- cypress-real-events@1.7.6
+-- cypress-v10-preserve-cookie@1.2.1
+-- cypress@12.13.0
+-- mocha-allure-reporter@1.4.0
+-- npm@8.18.0
+-- oracledb@5.5.0
+-- save-dev@0.0.1-security
`-- typescript@5.0.4
```

# How to execute the test site for the different environment

* npx cypress open
* npm run cy:run:test:ui:dev01

# Cypress setup

1. Direct download cypress.zip - https://download.cypress.io/desktop/12.3.0
2. Move cypress.zip  to the folder c:\cy
3. set HTTP_PROXY=localhost
4. SET CYPRESS_INSTALL_BINARY=C:\cy\cypress.zip
5. npm -g install cypress --save-dev

# Required Node packages

* -@0.0.1
* npm@8.18.0
* cypress@12.13.0
* cypress-highlight@1.2.0
* cypress-plugin-api@2.10.0
* cypress-real-events@1.7.6
* cypress-v10-preserve-cookie@1.2.1
* @cypress/grep@3.1.3
* @shelex/cypress-allure-plugin@2.34.0
* allure-commandline@2.20.1
* @testing-library/cypress@9.0.0
* @azure/identity@3.2.3
* @azure/keyvault-secrets@4.7.0
* @faker-js/faker@7.6.0
* chai-json-schema@1.5.1
* mocha-allure-reporter@1.4.0
* oracledb@5.5.0
* save-dev@0.0.1-security
* typescript@5.0.4

# Application Access

* Create  Enterprise Application Request ticket to get access the application

# Execute the test framework locally

* * npx cypress open

# Pipeline Setup Prerequisite

* Java Home system variable should be set for Allure
* Should be login in Azure Portal ( "az login" cmd should be checked in cmd prompt )

# Run script for CI/CD

* Execute the script to run UI test suite in [dev01,dev02,qa01,qa02,stg,workflow [Business use case] and production] 10 environments
  npm run cy:run:test:ui:dev01
  npm run cy:run:test:ui:dev02
  npm run cy:run:test:ui:qa01
  npm run cy:run:test:ui:qa02
  cy:run:test:ui:dev01:workflowonly
  cy:run:test:ui:dev02:workflowonly
  cy:run:test:ui:qa01:workflowonly
  cy:run:test:ui:qa02:workflowonly
  cy:run:test:ui:stg
  cy:run:test:ui:prod

# Run suite based on the tag or title

* npx cypress run --env grep=Task,grepFilterTests=true
* npx cypress run --env grep="OnlyProductioncases"
* npx cypress open --env grep=Internal-Task
* npx cypress open --env grep=smoketest


