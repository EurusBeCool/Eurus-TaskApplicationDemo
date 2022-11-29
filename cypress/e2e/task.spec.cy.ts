describe('Task Application Test', () => {
  const timestamp = new Date().getTime();
  const newTaskDescription = `new tast - ${timestamp}`;
  const updateTaskDescription = `new tast - ${timestamp} - update`;

  beforeEach('Visit the task list page', () => {
    cy.visit('/');
  })

  it('The initial task list is displayed', () => {
    cy.get('[data-testid="task_list"]').should('exist');
  })

  it('Create a new task', () => {
    cy.get('[data-testid="create_btn"]').click();
    cy.get('[data-testid="task_dialog"]').should('exist');
    cy.get('[data-testid="description_input"]').type(newTaskDescription);
    cy.get('[data-testid="confirm_btn"]').click();
    cy.get(`[data-testid="${newTaskDescription}"]`).should('exist');
  })

  it('Update the created new task', () => {
    cy.get('[data-testid="update_btn"]').last().click();
    cy.get('[data-testid="task_dialog"]').should('exist');
    cy.get('[data-testid="description_input"]').type(' - update');
    cy.get('[data-testid="confirm_btn"]').click();
    cy.get(`[data-testid="${updateTaskDescription}"]`).should('exist');
  })

  it('Delete the created new task', () => {
    cy.get('[data-testid="delete_btn"]').last().click();
    cy.get('[data-testid="task_dialog"]').should('exist');
    cy.get('[data-testid="confirm_btn"]').click();
    cy.get(`[data-testid="${updateTaskDescription}"]`).should('not.exist');
  })
})
