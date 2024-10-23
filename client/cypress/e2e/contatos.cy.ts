describe('Processo de Login do Usuário', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve autenticar usuario corretamente e redirecionar', () => {
    cy.get('[data-cy=login').type('Cypress');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.contains('Painel de Controle');

    cy.get('[data-cy=contatos]').click();

    cy.contains('Listagem de Contatos');
  });
});
