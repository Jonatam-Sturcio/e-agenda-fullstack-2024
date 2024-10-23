describe('Processo de Login do Usuário', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy="registrar"]').click();
  });

  it('Deve redirecionar para registrar', () => {
    cy.contains('Registro de Usuário');
  });

  it('Deve registrar usuario corretamente e redirecionar', () => {
    cy.get('[data-cy=nome').type('Teste Cypress3');

    cy.get('[data-cy=usuario]').type('Cypress3');

    cy.get('[data-cy=email').type('Cypress3@gmail.com');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.contains('Painel de Controle');
  });
});
