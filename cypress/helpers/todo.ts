
export const createTodo = (name: string) => {
  cy.get('.new-todo').type(`${name}{enter}`)

  return cy
    .get('.todo-list')
    .contains('li', name.trim())
    .first()
}

export const updateTodo = (name: string) => ($todo: JQuery) => {
  cy.wrap($todo).within(() => {
    cy.get('label').dblclick()
    cy.get('.edit').clear().type(`${name}{enter}`)
  })

  return cy.wrap($todo) // ensure we're always returning our wrapped subject
}

export const markAsDone = ($todo: JQuery) => {
  cy.wrap($todo).find('.toggle').check()

  return cy.wrap($todo)
}

export const getTodoName = ($todo: JQuery) => {
  return cy.wrap($todo.find('label').text())
}

export const deleteTodo = ($todo: JQuery) => {
  return cy
    .wrap($todo)
    .find('.destroy')
    .click({ force: true })
    .end() // maybe we'd want to return the todo id?
}
