import { faker } from "@faker-js/faker";

Cypress.Commands.add("generateFakerData", function (noOfData) {
  const generateData = () => {
    return {
      client_Info: {
        id: faker.random.numeric(),
        first_Name: faker.name.firstName(),
        first_Name_Next: faker.name.firstName(),
        last_Name: faker.name.lastName(),
        client_Name: faker.name.middleName(),
        email: faker.internet.email(),
        mobile_Number: faker.phone.number("501#######"),
        date: faker.date.between("1999/01/01", "2023/06/19"),//between(from: '1950/01/01', to: '2001/12/31').strftime("%d/%m/%Y")    
        due_Date: faker.date.between("now", "2028/06/19"),
        address: faker.address.secondaryAddress(),
        street: faker.address.street(),
        state: faker.address.countryCode("alpha-2"),
        city: faker.address.citySuffix(),
        country: faker.address.country(),
        zip: faker.address.zipCode("#####"),
        ext: faker.phone.number("##"),
        website: faker.internet.url(),
      },
      prospect_Info: {
        company_Name: faker.company.name().slice(0, 25),
        website: faker.internet.url(),
        first_Name: faker.name.firstName(),
        first_Name_Next: faker.name.firstName(),
        last_Name: faker.name.lastName(),
        client_Name: faker.name.middleName(),
        email: faker.internet.email(),
        street: faker.address.street(),
        city: faker.address.citySuffix(),
        zip: faker.address.zipCode("#####"),
        description: faker.lorem.slug(),
        due_Date: faker.date.between("now", "2028/06/19"),
        due_Date_Child: faker.date.between("now", "2028/06/19"),
        date: faker.date.between("1999/01/01", "2023/06/19"),//between(from: '1950/01/01', to: '2001/12/31').strftime("%d/%m/%Y")  
        date_Child: faker.date.between("1999/01/01", "2023/06/19"),//between(from: '1950/01/01', to: '2001/12/31').strftime("%d/%m/%Y")    
        date_Sort: faker.date.between("1999/01/01", "2023/06/19"),//between(from: '1950/01/01', to: '2001/12/31').strftime("%d/%m/%Y")  
        mobile_Number: faker.phone.number("501#######"),
        company_Name: faker.company.name().slice(0, 25),
        name: faker.company.name().slice(0, 2)
      },
      referral_Info: {
        claim_Number: faker.random.numeric(5, { bannedDigits: ['0'] }),
        date_Received: faker.date.past(),
        incident_Date: faker.date.past(),
        first_Name: faker.name.firstName(),
        last_Name: faker.name.lastName(),
        email: faker.internet.email(),
        mobile_Number: faker.phone.number("501#######"),
        company_Name: faker.company.name().slice(0, 25),
        between_Date: faker.date.between("2023/01/01", "now"),
        patient_FirstName: faker.name.suffix(),
        patient_LastName: faker.name.middleName(),


      },
      invoice: {
        comment: faker.lorem.slug(),
        account_Receivable_Comment: faker.lorem.slug(),
        account_Receivable_Adjustment_Amount: faker.random.numeric(5, { bannedDigits: ['0'] }),
        account_Receivable_Check_Number: faker.random.numeric(9, { bannedDigits: ['0'] }),
        account_Receivable_Destination_Invoice_ID: faker.random.numeric(9, { bannedDigits: ['0'] }),
        account_Payable_Disbursement_Amount: faker.random.numeric(4, { bannedDigits: ['0'] }),

      },
      bills: {
        bill_Number: faker.random.numeric(7, { bannedDigits: ['0'] }),
        revenue_Code: faker.random.numeric(3, { bannedDigits: ['0'] }),
        cpt_Code: faker.random.numeric(5, { bannedDigits: ['0'] }),
        units: faker.random.numeric(1, { bannedDigits: ['0'] }),
        provider_Charge: faker.random.numeric(4, { bannedDigits: ['0'] }),
        fs_Allowed_Amount: faker.random.numeric(2, { bannedDigits: ['0'] }),
        global_Start_Date: faker.date.past(),
        global_End_Date: faker.date.future(),
        icd9: faker.random.numeric(5, { bannedDigits: ['0'] }),
        code: faker.random.numeric(9, { bannedDigits: ['0'] }),
        code_Value: faker.name.jobArea(),
        comment: faker.lorem.sentence(),
        bill_Amount: faker.random.numeric(5, { bannedDigits: ['0'] })
      },
      provider: {
        first_Name: faker.name.firstName(),
        last_Name: faker.name.lastName(),
        email: faker.internet.email(),
        street: faker.address.street(),
        city: faker.address.citySuffix(),
        zip: faker.address.zipCode("#####"),
        mobile_Number: faker.phone.number("501#######"),
        description: faker.lorem.slug(),
        company_Name: faker.company.name().slice(0, 5),
        last_Name2: faker.name.lastName(),
      },
      upload: {
        reversal_Amount1: faker.random.numeric(4, { bannedDigits: ['0'] }),
        reversal_Amount2: faker.random.numeric(2, { bannedDigits: ['0'] }),
        reversal_Amount3: faker.random.numeric(3, { bannedDigits: ['0'] }),
        reversal_Amount4: faker.random.numeric(2, { bannedDigits: ['0'] }),
      }
    };
  };
  // This Command will Generate More than one Faker Data as Array
  // let generatedData = Array.from({ length: noOfData || 1 }, generateData);

  // This Command will Generate one Faker Data as Object
  let generatedData = generateData();
  cy.writeFile("./cypress/fixtures/fakerdata.json", JSON.stringify(generatedData, null, "\t"));
});
