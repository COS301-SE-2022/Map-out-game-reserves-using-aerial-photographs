import { getCreateMap, getDashboard, getLoginButton, getLoginEmailInput, getLoginEmailPrompt, getLoginPasswordInput, getLoginPasswordPrompt, getLogoutButton, getMapCatalogue, getNavAccount } from './app.po';

describe('Initial App Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.url().should('include', '/login');
  })
})

// Testing Login

describe('Logging the user in', () => {
  beforeEach(() => {
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

});

// Testing Navigation

describe('Navigation', () => {
  beforeEach(() => {
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
});

// Testing File Upload Page

describe('File Upload', () => {
  beforeEach(() => {
    cy.visit('/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
    getLoginButton().click();
  });
  //it.only('displays the ')
});

// Testing Map-Catalogue Page

// Testing Account Page

// Testing Logout

describe('Logging the user out', () => {
  beforeEach(() => {
    cy.visit('/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('12345678');
    getLoginButton().click();
  });

  it.only('successfully logs the user out', () => {
    getNavAccount().click();
    getLogoutButton().click();
    cy.url().should('include', '/login');
  });

});
