describe('Processo de redirecionamento para listar compromissos', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy=login').type('Cypress');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.get('[data-cy=compromissos]').click();
  });

  it('Deve navegar até compromissos', () => {
    cy.contains('Listagem de Compromissos');
  });

  it('Deve cadastrar um novo compromisso sem contato', () => {
    cy.get('[data-cy=cadastrar]').click();

    cy.get('[data-cy=assunto]').type('Assunto Cypress');

    cy.get('[data-cy=tipoLocal]').click();
    cy.get('[data-cy-select-option]').last().click();

    cy.get('[data-cy=local]').type('Local Cypress');

    cy.get('[data-cy=horaInicio]').type('10:00');

    cy.get('[data-cy=horaTermino]').type('14:00');

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Assunto Cypress');
  });

  it('Deve editar um compromisso', () => {
    cy.get('[data-cy=editar]').first().click();

    cy.get('[data-cy=assunto]').clear();
    cy.get('[data-cy=assunto]').type('Assunto Cypress Editado');

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Assunto Cypress Editado');
  });

  it('Deve excluir um compromisso', () => {
    cy.get('[data-cy=excluir]').first().click();

    cy.get('[data-cy=confirmar]').click();

    cy.contains('Assunto Cypress Editado').should('not.exist');
  });
});
