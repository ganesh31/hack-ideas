/* eslint-disable no-undef */
describe('Hacks', () => {
  it('Login to the application, add new hack logout', () => {
    
    cy.visit('http://localhost:3000/hacks');
    cy.get('#login').click();
    cy.get('#employeeId').type('1');
    cy.get('#login-submit').click();

    cy.get('#addNewHack').click();
    cy.get('#title').type('Challenge 5');
    cy.get('#description').type('Test your coding skills');
    cy.get('#tag-2').click();
    cy.get('#editor').type('## Question');
    cy.get('#submit').click();

    cy.contains('Challenge 5');

    cy.get('#logout').click();
    cy.get('#login')
  });

  it("search and filter hacks", () => {
    cy.visit('http://localhost:3000/hacks');
    cy.get('#search').click();
    cy.get('#search').type('{backspace}');
    cy.get('#search').type('circ');
    cy.get('[data-testid=tag-1]').click();
  })

  it('sort by likes/createdAt', () => {
    cy.visit('http://localhost:3000/hacks');
    cy.get('#mostLiked').click();
    cy.get('#createdAt').click();
    cy.get('#mostLiked').click();
    cy.get('#mostLiked').click();
    cy.get('#createdAt').click();
    cy.get('#createdAt').click();
    cy.get('#createdAt').click();
    cy.get('#mostLiked').click();
    cy.get('#mostLiked').click();
  });
})

describe('Login', () => {
  it('should navigate to login if the user tries to access protected routes', () => {
    cy.visit('http://localhost:3000/hacks');
    cy.get('#like-1').click();
    cy.url().should('include', '/login')
  });

  it('should route to login if the user is ties add new hack without login', () => {
    cy.visit('http://localhost:3000/add');

    cy.url().should('include', '/login');
  });

  it('should show error message if emp id is not present', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#employeeId').type("12345");
    cy.get('#login-submit').click();
    cy.contains('Employee does not exists')
  })

  it('should be able to register new user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#register').click();
    cy.get('#name').type("Jack");

    cy.get('#register').click();

    cy.contains('Employee ID generated successfully');

    cy.get('#ok').click();

  });


});
