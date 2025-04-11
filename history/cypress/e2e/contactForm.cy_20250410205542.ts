// cypress/e2e/contactForm.cy.ts

describe('Contact Form Integration', () => {
    beforeEach(() => {
      cy.visit('/contact');
    });
  
    it('shows validation errors on empty submission', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Name is required');
      cy.contains('Please enter a valid email address');
      cy.contains('Subject is required');
      cy.contains('Message is required');
    });
  
    it('submits successfully with valid data', () => {
      cy.get('input[name="name"]').type('Mustafa');
      cy.get('input[name="email"]').type('mustafa@example.com');
      cy.get('input[name="subject"]').type('Greetings');
      cy.get('textarea[name="message"]').type('Looking forward to connecting.');
  
      cy.intercept('POST', '/api/contact').as('contactSubmit');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@contactSubmit');
  
      cy.contains('Thanks! Your message was sent successfully.');
    });
  });