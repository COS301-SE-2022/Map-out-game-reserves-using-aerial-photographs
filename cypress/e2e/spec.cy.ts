import { getConfirmNewPasswordField, getCreateMap, getCurrNameField, getDashboard, getLoginButton, getLoginEmailInput, getLoginEmailPrompt, getLoginPasswordInput, getLoginPasswordPrompt, getLogoutButton, getMapCatalogue, getNameEdit, getNavAccount, getNewNameField, getNewPasswordField, getPasswordEdit, getSaveNewNameButton, getSaveNewPasswordButton } from './app.po';

describe('Initial App Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.url().should('include', '/login');
  })
})

// Testing Login

describe('Logging the user in', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
  });

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
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
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
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
    getLoginButton().click();
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
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
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
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
    getLoginButton().click();
    getNavAccount().click();
  });
});

// Testing Logout

describe('Account Page', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
    getLoginButton().click();
    getNavAccount().click();
  });

  it.only("successfully changes the user's name", () => {
    getNameEdit().click();
    getNewNameField().type('New Name');
    getSaveNewNameButton().click();
    getNameEdit().click();
    getCurrNameField().should('have.value', 'New Name');
  });

  it.only("successfully changes the user's password", () => {
    getPasswordEdit().click();
    getNewPasswordField().type('12345678');
    getConfirmNewPasswordField().type('12345678');
    getSaveNewPasswordButton().click();
  });

  it.only("successfully changes the user's email", () => {
    getLogoutButton().click();
    cy.url().should('include', '/login');
  });

  afterEach(() => {
    Cypress.config('defaultCommandTimeout', 4000);
  });
});

describe('Logging the user out', () => {
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
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
