import { register } from '../../selectors/register.selectors';

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should navigate user to register if clicked on Sing Up option', () => {
    cy.get(register.signInButton).click();
    cy.url().should('include', '/login');
  });

  it('should show errors for invalid input', () => {
    cy.get(register.nameInput).type('Jo');
    cy.get(register.emailInput).type('invalid-email@email.com');
    cy.get(register.passwordInput).type('123');
    cy.get(register.registerButton).click();

    cy.get(register.errorList).should(
      'contain',
      'Name must be at least 3 characters.',
    );
    cy.get(register.errorList).should(
      'contain',
      'Password must be at least 8 characters, include at least one letter, one number, and one special character.',
    );
  });
});
