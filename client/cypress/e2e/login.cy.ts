describe('Processo de Login do Usuário', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve redirecionar para login', () => {
    cy.contains('Login de Usuário');
  });

  it('Deve autenticar usuario corretamente e redirecionar', () => {
    cy.get('[data-cy=login').type('Teste');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.contains('Painel de Controle');

    cy.url().should('contain', 'dashboard');
  });

  it('Deve notificar sobre login vazio', () => {
    cy.get('[data-cy=senha').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.contains('O login precisa ser preenchido.');
  });

  it('Deve notificar sobre senha vazia', () => {
    cy.get('[data-cy=login').type('Teste2');

    cy.get('[data-cy=submit]').click();

    cy.contains('A senha precisa ser preenchida.');
  });
});
