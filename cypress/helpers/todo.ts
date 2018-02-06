
export const createTodo = (name: string) => {
  cy.get('.new-todo').type(`${name}{enter}`)

  return cy.get('.todo-list').contains('li', name.trim())
}

export const updateTodo = (name: string) => ($todo: JQuery) => {
  cy.wrap($todo).within(() => {
    cy.get('label').dblclick()
    cy.get('.edit').clear().type(`${name}{enter}`)
  })

  return cy.wrap($todo)
}

export const markAsDone = ($todo: JQuery) => {
  cy.wrap($todo).find('.toggle').check()

  return cy.wrap($todo)
}

export const deleteTodo = ($todo: JQuery) => {
  cy.wrap($todo).find('.destroy').click({ force: true })
}
