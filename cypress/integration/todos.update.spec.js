describe('Updating Todos', () => {
  beforeEach( () => {
    cy.resetDb();
    cy.createTodo();
  });

  it('Updates a Todo', () => {
    cy.visit('/');
    cy.get('.todos-list-item').as('todo');

    cy.get('@todo')
      .should('have.length', 1)
      .should('not.have.class', 'completed')

    cy.get('@todo').within( () => {
      cy.get('.toggle-completed').click();
    })

    cy.get('@todo').should('have.class', 'completed');
  });
});
