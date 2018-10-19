describe('Loading Todos', () => {
  beforeEach( () => {
    cy.server();
    cy.route('GET', '/todos*', 'fixture:todos.json')
  });

  it('Loads Todos', () => {
    cy.visit('/');
    cy.get('.todos-list-item').should('have.length', 4);
  });
});
