// Write all the integration tests here

// yarn nx run aerial-mapping-e2e:e2e
// node_modules/.bin/cypress open

import { getLoginButton, getLoginEmailInput, getLoginEmailPrompt, getLoginPasswordInput, getLoginPasswordPrompt, getLogoutButton, getNavAccount, getNavFileUpload, getNavImageCatalogue, getNavMapCollections } from '../support/app.po';

const url = 'http://localhost:4200';

describe('Loading the landing page (login page)', () => {
  beforeEach(() => cy.visit('http://localhost:4200/'));

  it.only('displays the login page', () => {
    cy.url().should('include', '/login');
  });
});

describe('Logging the user in', () => {
  beforeEach(() => {
    cy.visit(url + '/login');
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
    getLoginPasswordInput().type('123456');

    getLoginButton().click();
    cy.url().should('include', '/login')
  });

  it.only('logs in and navigates to the Dashboard page', () => {
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('123456');
    getLoginButton().click();

    cy.url().should('include', '/dashboard')
  });

});

//test navigation here

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit(url + '/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('123456');
    getLoginButton().click();
  });

  it.only('navigates to the account page', () => {
    getNavAccount().click();
    cy.url().should('include', '/account');
  });

  it.only('navigates to the map collections page', () => {
    getNavMapCollections().click();
    cy.url().should('include', '/map-collection');
  });

  it.only('navigates to the image catalogue page', () => {
    getNavImageCatalogue().click();
    cy.url().should('include', '/image-catalogue');
  });

  it.only('navigates to the file upload page', () => {
    getNavFileUpload().click();
    cy.url().should('include', '/file-upload');
  });
});

// test file upload things here

describe('File Upload', () => {
  beforeEach(() => {
    cy.visit(url + '/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('123456');
    getLoginButton().click();
  });
  //it.only('displays the ')
});

// test image catalogue things here

// test map collection things here

// test account things here

describe('Logging the user out', () => {
  beforeEach(() => {
    cy.visit(url + '/login');
    getLoginEmailInput().type('correct@email.com');
    getLoginPasswordInput().type('123456');
    getLoginButton().click();
  });

  it.only('successfully logs the user out', () => {
    getNavAccount().click();
    getLogoutButton().click();
    cy.url().should('include', '/login');
  });

});
