describe('Processo de redirecionamento para listar Tarefas', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login').type('Cypress');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.get('[data-cy=tarefas]').click();
  });

  it('Deve navegar até Tarefas', () => {
    cy.contains('Listagem de Tarefas');
  });

  it('Deve cadastrar uma nova tarefa', () => {
    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=titulo]').type('Tarefa Cypress');

    cy.get('[data-cy=prioridade]').click();
    cy.get('[data-cy-select-option]').last().click();

    cy.get('[data-cy=tituloItem]').type('Item Cypress');

    cy.get('[data-cy=confirmarItem]').click();

    cy.get('button[type=submit]').click();

    cy.contains('Tarefa Cypress');
  });

  it('Deve editar uma tarefa', () => {
    cy.get('[data-cy=editar]').last().click();

    cy.get('[data-cy=titulo]').clear().type('Tarefa Cypress Editada');

    cy.get('button[type=submit]').click();

    cy.contains('Tarefa Cypress Editada');
  });

  it('Deve excluir uma tarefa', () => {
    cy.get('[data-cy=excluir]').last().click();

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Tarefa Cypress Editada').should('not.exist');
  });
});
