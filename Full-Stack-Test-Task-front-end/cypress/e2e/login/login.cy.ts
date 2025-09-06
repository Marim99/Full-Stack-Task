import { login } from '../../selectors/login.selectors';

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow user to login', () => {
    cy.get(login.emailInput).type('test@example.com');
    cy.get(login.passwordInput).type('password123');
    cy.get(login.loginButton).click();
  });

  it('should navigate user to register if clicked on Sing Up option', () => {
    cy.get(login.signUpButton).click();
    cy.url().should('include', '/register');
  });
});
