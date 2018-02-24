import {
  createTodo,
  markAsDone,
  updateTodo,
  deleteTodo,
} from '../helpers/todo_log'

describe('TodoMVC - React', function () {

  beforeEach(function () {
    cy.visit('/#/')
  })

  context('Item', function () {

    it('should add new todo', () => {
      createTodo('Learn Cypress Command API')
        .should('contain', 'Learn Cypress Command API')
    })

    it('should update a todo', () => {
      createTodo('Learn Cypress Command API')
        .then(updateTodo('Learn Cypress composition'))
        .should('contain', 'Learn Cypress composition')
    })

    it('should allow marking a todo as done', () => {
      createTodo('Learn Cypress Command API')
        .then(markAsDone)
        .should('have.class', 'completed')
    })

    it('should allow deleting of a todo', () => {
      createTodo('Learn Cypress Command API')
        .then(deleteTodo)

      cy.get('.todoapp')
        .should('not.contain', 'Learn Cypress composition')
    })

    it('should allow chaining of all the helpers', () => {
      createTodo('Learn Cypress Command API')
        .then(updateTodo('Learn Cypress composition'))
        .then(markAsDone)
        .then(deleteTodo)

      cy.get('.todoapp')
        .should('not.contain', 'Learn Cypress composition')
    })
  })
})
