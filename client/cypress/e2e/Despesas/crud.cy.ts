describe('Processo de redirecionamento para listar Despesas', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login').type('Cypress');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.get('[data-cy=despesas]').click();
  });

  it('Deve navegar até Despesas', () => {
    cy.contains('Listagem de Despesas');
  });

  it('Deve cadastrar uma nova despesa', () => {
    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=descricao]').type('Despesa Cypress');

    cy.get('[data-cy=valor]').clear().type('10');

    cy.get('[data-cy=data]').type(new Date().toISOString().substring(0, 10));

    cy.get('[data-cy=formaPagamento]').click();
    cy.get('[data-cy-select-option]').last().click();

    cy.get('[data-cy=categoriasSelecionadas]').click();
    cy.get('[data-cy-select-option]').last().click();

    cy.get('body').click();

    cy.get('button[type=submit]').click();

    cy.contains('Despesa Cypress');
  });

  it('Deve editar um compromisso', () => {
    cy.get('[data-cy=editar]').last().click();

    cy.get('[data-cy=descricao]').clear().type('Despesa Cypress Editado');

    cy.get('button[type=submit]').click();

    cy.contains('Despesa Cypress Editado');
  });

  it('Deve excluir um compromisso', () => {
    cy.get('[data-cy=excluir]').last().click();

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Assunto Cypress Editado').should('not.exist');
  });
});
