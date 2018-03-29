
describe('aliases', () => {
  it('should create and use aliases', () => {
    const getFoo = cy.wrap('foo').createAlias()
    const getBar = cy.wrap('bar').createAlias()
    const getOne = cy.wrap(1).createAlias()
    
    // get one alias
    getFoo().then(subject => {
      subject // string
      console.log(subject) // logs 'foo'
    })
    
    // get many aliases - API is similar to Promise.all
    cy.getAliases([getFoo, getBar, getOne]).then(([foo, bar, one]) => {
      foo // string
      bar // string
      one // number
      console.log(foo, bar, one) // logs 'foo', 'bar', 1
    })    
  })

  it('should handle a more complex series of steps', () => {
    cy.visit('/')

    // see app_spec.ts L164
    const getTodos = cy.createDefaultTodos().createAlias()

    const getToggleAll = cy.get('.toggle-all').check().createAlias()

    // this assertion is silly here IMO but
    // it is what TodoMVC does
    getToggleAll().should('be.checked')

    // alias the first todo and then click it
    const getFirstTodo = cy.get('.todo-list li').eq(0).createAlias()
    
    getFirstTodo().find('.toggle').uncheck()

    // reference the .toggle-all element again
    // and make sure its not checked
    getToggleAll().should('not.be.checked')

    // reference the first todo again and now toggle it
    getFirstTodo().find('.toggle').check()

    // assert the toggle all is checked again
    getToggleAll().should('be.checked')
  })

  it('should handle failure correctly', () => {
    // This will time out correctly
    const getNonExistingElement = cy.get('body1').createAlias()

    getNonExistingElement().then(subject => {
      console.log(subject)
    })
  })
})
