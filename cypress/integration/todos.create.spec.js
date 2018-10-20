describe('Creating Todos', () => {
  beforeEach( () => {
    cy.resetDb();
  });

  it('Creates a Todo', () => {
    const description = 'Newly Created Todo';

    cy.visit('/');
    cy.get('.todos-list-item').should('have.length', 0);

    cy.get('#todos-form').within(() => {
      cy.get('.todo-description-input').type(description);
      cy.get('.create-todo-button').click();
    })

    cy.get('.todos-list-item')
      .should('have.length', 1)
      .should('contain', description);
  });
});
