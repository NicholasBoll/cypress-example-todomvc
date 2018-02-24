
export const createTodo = (name: string) => {
  const log: any = Cypress.log({
    name: 'createTodo',
    message: name,
    consoleProps() {
      return {
        'Inserted Todo': name,
      }
    }
  })
  cy.get('.new-todo', { log: false }).type(`${name}{enter}`, { log: false })

  return cy
    .get('.todo-list li', { log: false })
    .contains('li', name.trim(), { log: false })
    .then(($el) => {
      log.set({ $el }).snapshot().end()
    })
}

export const updateTodo = (name: string) => ($todo: JQuery) => {
  let log: any

  cy.wrap($todo, { log: false }).within({ log: false }, () => {
    log = Cypress.log({
      name: 'updateTodo',
      message: name,
      $el: $todo
    })
    log.snapshot('before')
    cy.get('label', { log: false }).dblclick({ log: false })
    cy
      .get('.edit', { log: false })
      .clear({ log: false })
      .type(`${name}{enter}`, { log: false })
  })

  return cy
    .wrap($todo, { log: false })
    .then(() => {
      log.snapshot('after').end()
    })
}

export const markAsDone = ($todo: JQuery) => {
  let log: any
  cy
    .wrap($todo, { log: false })
    .then(() => {
      log  = Cypress.log({
        name: 'markAsDone',
        message: getTodoName($todo),
        $el: $todo
      })
      log.snapshot('before')
    })
    .find('.toggle', { log: false })
    .check({ log: false })

  return cy
    .wrap($todo, { log: false })
    .then(() => {
      log.snapshot('after').end()
    })
}

export const getTodoName = ($todo: JQuery) => {
  return $todo.find('label').text()
}

export const deleteTodo = ($todo: JQuery) => {
  let log: any
  return cy
    .wrap($todo, { log: false })
    .then(() => {
      log  = Cypress.log({
        name: 'deleteTodo',
        message: getTodoName($todo),
        $el: $todo
      })
      log.snapshot('before')
    })
    .find('.destroy', { log: false })
    .click({ force: true, log: false })
    .then(() => {
      log.snapshot('after').end()
    })
    .end() // maybe we'd want to return the todo id?
}
