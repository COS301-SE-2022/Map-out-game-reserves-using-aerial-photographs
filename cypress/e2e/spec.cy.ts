import { getConfirmNewPasswordField, getFlightHeightInput, getResolutionSelect, getFlightTypeSelect, getParkSelect, getCreateMap, getCurrNameField, getDashboard, getDisplayedNameField, getLoginButton, getLoginEmailInput, getLoginEmailPrompt, getLoginPasswordInput, getLoginPasswordPrompt, getLogoutButton, getMapCatalogue, getNameEdit, getNavAccount, getNewNameField, getNewPasswordField, getPasswordEdit, getSaveNewNameButton, getSaveNewPasswordButton, getFileUploadSubmitBtn, getFileUploadSuccessMsg } from './app.po';
import { S3Client, GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';

const REGION = 'sa-east-1';
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: Cypress.env('ACCESS_KEY_ID'),
    secretAccessKey: Cypress.env('SECRET_ACCESS_KEY')
  }
});
const username = Cypress.env('VALID_USERNAME');
const password = Cypress.env('VALID_PASSWORD');

const S3_BUCKET = "aerial-mapping-bucket80642-dev";

// Testing Quality Requirements
describe('Testing Performance Quality Requirements', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 300000);
  });

  // [Performance Quality Requirement]
  // tests the time taken for an image download to complete
  it.only('Must download a 300KB image from the S3 bucket within 5 seconds', async () => {
    const getParams: GetObjectCommandInput = {
      Bucket: S3_BUCKET,
      Key: 'testing/dylpickles.png'
    }
    const start = new Date().getTime();
    try {
      //const data: GetObjectCommandOutput = await s3Client.send(new GetObjectCommand(getParams));
      //stop timer
      cy.wrap(await s3Client.send(new GetObjectCommand(getParams))).then(() => {
        cy.wrap(new Date().getTime()).then(end => {
          const duration = end - start;

          cy.log(`Image download took ${duration} milliseconds`).then(() => {
            expect(duration < 5000).to.be.true;
          });
        });
      });
    } catch (err) {
      cy.log('' + err);
    }
  });

  // [Performance Quality Requirement]
  // tests the time taken to upload a photo, create an associated image collection and publish an SNS notification.
  it.only('Must upload a 5mb frame, create an image collection, and publish an SNS notification within 15 seconds', () => {
    cy.visit('/login');
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);
    getLoginButton().click();

    cy.url().should('include', '/dashboard').then(() => {
      getCreateMap().click();
      const directory = 'C:/Users/28scd/OneDrive/Pictures/Drone';       //this path must change depending on the machine
      cy.get('input[type=file]').selectFile([`${directory}/1.jpg`], {
        action: 'drag-drop'
      }).then(() => {
        cy.get('input[type=file]').trigger('change');
        getParkSelect().select('Rietvlei Nature Reserve');
        getFlightTypeSelect().select('Drone');
        getResolutionSelect().select('1080p');
        getFlightHeightInput().type('100');

        const start = new Date().getTime();
        getFileUploadSubmitBtn().click();
        getFileUploadSuccessMsg().should('have.text', 'You can now navigate to the map catalogue to see the result of your upload').then(() => {
          cy.wrap(new Date().getTime()).then((end) => {
            const duration = end - start;
            cy.log(`File upload took ${duration} milliseconds`).then(() => {
              expect(duration < 15000).to.be.true;
            });
          });
        });
      });
    });
  });

  //tests time from login button click till dashboard page is loaded
  it.only('Must login within 10 seconds', () => {
    cy.visit('/login');
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);

    let start = new Date().getTime();
    getLoginButton().click();

    cy.url().should('include', 'dashboard').then(() => {
      cy.wrap(new Date().getTime()).then(end => {
        const duration = end - start;
        cy.log(`Login took ${duration} milliseconds`).then(() => {
          expect(duration < 10000).to.be.true;
        });
      })
    });
  });

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });
});

// Testing Login

describe('Logging the user in', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
  });

  it('Visits the initial project landing page', () => {
    cy.url().should('include', '/login');
  })

  it.only('displays "Please enter password" and "Please enter email" when no password and email are entered', () => {
    getLoginButton().click();
    getLoginPasswordPrompt().should('be.visible');
    getLoginEmailPrompt().should('be.visible');
  });

  it.only('does not navigate to the Dashboard page when no password and email are entered', () => {
    getLoginButton().click();
    cy.url().should('include', '/login')
  });

  it.only('does not navigate to the Dashboard page when an incorrect password and email are entered', () => {
    getLoginEmailInput().type('wrong@email.com');
    getLoginPasswordInput().type('12345689898');

    getLoginButton().click();
    cy.url().should('include', '/login')
  });

  it.only('logs in and navigates to the Dashboard page', () => {
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);
    getLoginButton().click();

    cy.url().should('include', '/dashboard')
  });

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });

});

// Testing Navigation

describe('Navigation', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 15000);
    cy.visit('/login').then(() => {
      getLoginEmailInput().type(username);
      getLoginPasswordInput().type(password);
      getLoginButton().click();
    });
  });

  it.only('navigates to the account page', () => {

      getNavAccount().click();
      cy.url().should('include', '/account');

  });

  it.only('navigates to the dashboard page', () => {
    getDashboard().click();
    cy.url().should('include', '/dashboard');
  });

  it.only('navigates to the map catalogue page', () => {
    getMapCatalogue().click();
    cy.url().should('include', '/map-catalogue');
  });

  it.only('navigates to the create map page', () => {
    getCreateMap().click();
    cy.url().should('include', '/create-map');
  });

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });
});

// Testing File Upload Page

describe('File Upload', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);
    getLoginButton().click();
  });
  //it.only('displays the ')

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });
});

// Testing Map-Catalogue Page

// Testing Account Page
describe('Testing Account Page functions', () => {
  beforeEach(() => {
    cy.visit('/login');
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);
    getLoginButton().click();
    getNavAccount().click();
  });
});

// Testing Logout

describe('Account Page', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 20000);
    cy.visit('/login');
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);
    getLoginButton().click();
    cy.wait(500);
    getNavAccount().click();
  });

  it.only("successfully changes the user's name", () => {
    getNameEdit().click();
    getNewNameField().type('New Name');
    getSaveNewNameButton().click();
    cy.wait(500);
    getDisplayedNameField().should('have.value', 'New Name');
  });

  it.only("successfully changes the user's password", (done) => {
    getPasswordEdit().click();
    getNewPasswordField().type(password);
    getConfirmNewPasswordField().type(password);
    getSaveNewPasswordButton().click();
    done();
  });

  // it.only("successfully changes the user's email", () => {
  //   getLogoutButton().click();
  //   cy.url().should('include', '/login');
  // });

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });
});

describe('Logging the user out', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
    getLoginEmailInput().type(username);
    getLoginPasswordInput().type(password);
    getLoginButton().click();
  });

  it('logs the user out', () => {
    getLogoutButton().click();
    cy.url().should('include', '/login');
  });

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });
});
