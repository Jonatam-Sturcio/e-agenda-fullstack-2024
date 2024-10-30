describe('Processo de redirecionamento para listar contatos', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login').type('Cypress');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.get('[data-cy=contatos]').click();
  });

  it('Deve navegar até contatos', () => {
    cy.contains('Listagem de Contatos');
  });

  it('Deve cadastrar um novo contato', () => {
    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=nome]').type('Teste Cypress');

    cy.get('[data-cy=email]').type('testeCypress@gmail.com');

    cy.get('[data-cy=telefone]').type('00 12345-1234');

    cy.get('[data-cy=empresa]').type('Empresa Teste');

    cy.get('[data-cy=cargo]').type('Testador');

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Teste Cypress');
  });

  it('Deve editar um contato', () => {
    cy.get('[data-cy=editar]').last().click();

    cy.get('[data-cy=nome]').clear();
    cy.get('[data-cy=nome]').type('Teste Cypress Editado');

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Teste Cypress Editado');
  });

  it('Deve excluir um contato', () => {
    cy.get('[data-cy=excluir]').last().click();

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Teste Cypress Editado').should('not.exist');
  });
});
