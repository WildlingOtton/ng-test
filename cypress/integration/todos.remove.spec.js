describe('Removing Todos', () => {
  beforeEach( () => {
    cy.resetDb();
    cy.createTodo();
  });

  it('Removes a Todo', () => {
    cy.visit('/');
    cy.get('.todos-list-item').as('todo');

    cy.get('@todo').should('have.length', 1)

    cy.get('@todo').within( () => {
      cy.get('.remove').click();
    })

    cy.get('@todo').should('have.length', 0);
  });
});
