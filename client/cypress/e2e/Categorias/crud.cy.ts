describe('Processo de redirecionamento para listar categorias', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login').type('Cypress');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.get('[data-cy=categorias]').click();
  });

  it('Deve navegar até categorias', () => {
    cy.contains('Listagem de Categorias');
  });

  it('Deve cadastrar uma nova categoria', () => {
    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=titulo]').type('Categoria Cypress');

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Categoria Cypress');
  });

  it('Deve editar uma categoria', () => {
    cy.get('[data-cy=editar]').last().click();

    cy.get('[data-cy=titulo]').clear();
    cy.get('[data-cy=titulo]').type('Categoria Cypress Editado');

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Categoria Cypress Editado');
  });

  it('Deve excluir uma categoria', () => {
    cy.get('[data-cy=excluir]').last().click();

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Categoria Cypress Editado').should('not.exist');
  });
});
